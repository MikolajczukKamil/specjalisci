using Npgsql;

namespace HelpHunterBE.Logic.Searches
{
    public class SearchLogic : ISearchLogic
    {
        private readonly IConfiguration _configuration;

        public SearchLogic(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public List<ServiceInfo> ExecuteSearchQuery(SearchCriteria criteria)
        {
            try
            {
                using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("Postgres")))
                {
                    connection.Open();
                    string sqlQuery = BuildSqlQuery(criteria);
                    using (var command = new NpgsqlCommand(sqlQuery, connection))
                    {
                        AddParametersToCommand(command, criteria);
                        return ExecuteQueryAndMapResults(command, criteria);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw; // Rethrow the exception after logging or handling
            }
        }

        private string BuildSqlQuery(SearchCriteria criteria)
        {
            string sqlQuery = @"SELECT
                                u.user_id,
                                u.full_name,
                                u.location,
                                u.location_coordinates_x,
                                u.location_coordinates_y,
                                s.service_id,
                                s.service_name,
                                avs.max_price,
                                avs.min_price,
                                avs.operating_mode,
                                c.category_name,
                                c.category_id,
                                AVG(r.rating) AS average_rating
                                FROM
                                Users u
                                JOIN
                                Available_Services avs ON u.user_id = avs.user_id
                                JOIN
                                Services s ON avs.service_id = s.service_id
                                JOIN
                                Categories c ON avs.category_id = c.category_id
                                LEFT JOIN
                                Ratings r ON u.user_id = r.user_id
                                WHERE 1 = 1";

            if (!string.IsNullOrEmpty(criteria.Location))
                sqlQuery += " AND u.location = @Location";

            if (criteria.PriceMax > 0)
                sqlQuery += " AND avs.max_price <= @PriceMax";

            if (criteria.PriceMin > 0)
                sqlQuery += " AND avs.min_price <= @PriceMin";

            if (!string.IsNullOrEmpty(criteria.CategoryOrServiceName))
                sqlQuery += " AND (c.category_name = @CategoryOrServiceName OR s.service_name = @CategoryOrServiceName) ";

            sqlQuery += @" GROUP BY
                        u.user_id,
                        u.full_name,
                        u.location,
                        u.location_coordinates_x,
                        u.location_coordinates_y,
                        s.service_id,
                        s.service_name,
                        avs.max_price,
                        avs.min_price,
                        avs.operating_mode,
                        c.category_name,
                        c.category_id";

            if (criteria.RatingMax > 0 || criteria.RatingMin > 0)
                sqlQuery += " HAVING";

            if (criteria.RatingMax > 0)
                sqlQuery += " AVG(r.rating) <= @RatingMax";

            if (criteria.RatingMax > 0 && criteria.RatingMin > 0)
                sqlQuery += " AND";

            if (criteria.RatingMin > 0)
                sqlQuery += " AVG(r.rating) >= @RatingMin";

            sqlQuery += ";";

            return sqlQuery;
        }

        private void AddParametersToCommand(NpgsqlCommand command, SearchCriteria criteria)
        {
            if (!string.IsNullOrEmpty(criteria.Location))
                command.Parameters.AddWithValue("Location", criteria.Location);

            if (criteria.PriceMax > 0)
                command.Parameters.AddWithValue("PriceMax", criteria.PriceMax);

            if (criteria.PriceMin > 0)
                command.Parameters.AddWithValue("PriceMin", criteria.PriceMin);

            if (criteria.RatingMax > 0)
                command.Parameters.AddWithValue("RatingMax", criteria.RatingMax);

            if (criteria.RatingMin > 0)
                command.Parameters.AddWithValue("RatingMin", criteria.RatingMin);

            if (!string.IsNullOrEmpty(criteria.CategoryOrServiceName))
                command.Parameters.AddWithValue("CategoryOrServiceName", criteria.CategoryOrServiceName);
        }

        private List<ServiceInfo> ExecuteQueryAndMapResults(NpgsqlCommand command, SearchCriteria criteria)
        {
            using (var reader = command.ExecuteReader())
            {
                var resultList = new List<ServiceInfo>();

                while (reader.Read())
                {
                    var serviceInfo = MapServiceInfoFromReader(reader, criteria);
                    resultList.Add(serviceInfo);
                }

                return resultList;
            }
        }

        private ServiceInfo MapServiceInfoFromReader(NpgsqlDataReader reader, SearchCriteria criteria)
        {
            float? LocationCoordX = reader.IsDBNull(reader.GetOrdinal("location_coordinates_x")) ? null : reader.GetFloat(reader.GetOrdinal("location_coordinates_x"));
            float? LocationCoordY = reader.IsDBNull(reader.GetOrdinal("location_coordinates_y")) ? null : reader.GetFloat(reader.GetOrdinal("location_coordinates_y"));
            double? CalculatedDistance = Utils.Utils.CalculateDistance(LocationCoordX, LocationCoordY, criteria.UserCoordinateX, criteria.UserCoordinateY);

            var serviceInfo = new ServiceInfo
            {
                ServiceId = reader.GetInt32(reader.GetOrdinal("service_id")),
                ServiceName = reader.GetString(reader.GetOrdinal("service_name")),
                MaxPrice = reader.IsDBNull(reader.GetOrdinal("max_price")) ? null : reader.GetDecimal(reader.GetOrdinal("max_price")),
                MinPrice = reader.IsDBNull(reader.GetOrdinal("min_price")) ? null : reader.GetDecimal(reader.GetOrdinal("min_price")),
                OperatingMode = reader.GetString(reader.GetOrdinal("operating_mode")),
                CategoryName = reader.GetString(reader.GetOrdinal("category_name")),
                CategoryId = reader.GetInt32(reader.GetOrdinal("category_id")),
                UserId = reader.GetInt32(reader.GetOrdinal("user_id")),
                Rating = reader.GetInt32(reader.GetOrdinal("average_rating")),
                FullName = reader.GetString(reader.GetOrdinal("full_name")),
                Location = reader.IsDBNull(reader.GetOrdinal("location")) ? null : reader.GetString(reader.GetOrdinal("location")),
                LocationCoordinatesX = LocationCoordX,
                LocationCoordinatesY = LocationCoordY,
                Distance = CalculatedDistance
            };

            return serviceInfo;
        }
    }
}