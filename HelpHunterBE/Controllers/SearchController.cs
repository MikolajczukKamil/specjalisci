using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Npgsql;

namespace HelpHunterBE.Controllers
{
    [Route("api")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public SearchController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("search")]
        [Authorize]
        public IActionResult Search([FromBody] SearchCriteria criteria)
        {
            try
            {
                using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("Postgres")))
                {
                    connection.Open();
                    // Construct the base SQL query
                    string sqlQuery = @"SELECT
                                            s.service_id,
                                            s.service_name,
                                            avs.max_price,
                                            avs.min_price,
                                            avs.operating_mode,
                                            c.category_name,
                                            c.category_id,
                                            u.user_id,
                                            u.full_name,
                                            u.location,
                                            u.location_coordinates_x,
                                            u.location_coordinates_y
                                        FROM
                                            Available_Services avs
                                        JOIN
                                            Services s ON avs.service_id = s.service_id
                                        JOIN
                                            Categories c ON avs.category_id = c.category_id
                                        JOIN
                                            Users u ON avs.user_id = u.user_id
                                        WHERE 1 = 1";

                    // Add conditions to the query based on provided criteria
                    if (!string.IsNullOrEmpty(criteria.Location))
                        sqlQuery += " AND u.location = @Location";

                    if (criteria.Price > 0)
                        sqlQuery += " AND avs.max_price <= @Price";

                    if (!string.IsNullOrEmpty(criteria.CategoryOrServiceName))
                        sqlQuery += " AND (c.category_name = @CategoryOrServiceName OR s.service_name = @CategoryOrServiceName)";

                    if (!string.IsNullOrEmpty(criteria.OrderBy))
                        sqlQuery += " ORDER BY @OrderBy";

                    Console.WriteLine(sqlQuery);

                    using (var command = new NpgsqlCommand(sqlQuery, connection))
                    {
                        // Add parameters to the query only if the criteria have values
                        if (!string.IsNullOrEmpty(criteria.Location))
                            command.Parameters.AddWithValue("Location", criteria.Location);

                        if (criteria.Price > 0)
                            command.Parameters.AddWithValue("Price", criteria.Price);

                        if (!string.IsNullOrEmpty(criteria.CategoryOrServiceName))
                            command.Parameters.AddWithValue("CategoryOrServiceName", criteria.CategoryOrServiceName);

                        if (!string.IsNullOrEmpty(criteria.OrderBy))

                            switch (criteria.OrderBy)
                            {
                                case "price":
                                    command.Parameters.AddWithValue("OrderBy", "avs.min_price");
                                    break;

                                case "range":
                                    command.Parameters.AddWithValue("OrderBy", "avs.range");
                                    break;
                            }
                        


                        // Execute the query and retrieve the results
                        using (var reader = command.ExecuteReader())
                        {
                            var resultList = new List<ServiceInfo>();

                            while (reader.Read())
                            {
                                // Map the database columns to your user model properties
                                var serviceInfo = new ServiceInfo
                                {
                                    ServiceId = reader.GetInt32(reader.GetOrdinal("service_id")),
                                    ServiceName = reader.GetString(reader.GetOrdinal("service_name")),
                                    MaxPrice = reader.IsDBNull(reader.GetOrdinal("max_price")) ? (decimal?)null : reader.GetDecimal(reader.GetOrdinal("max_price")),
                                    MinPrice = reader.IsDBNull(reader.GetOrdinal("min_price")) ? (decimal?)null : reader.GetDecimal(reader.GetOrdinal("min_price")),
                                    OperatingMode = reader.GetString(reader.GetOrdinal("operating_mode")),
                                    CategoryName = reader.GetString(reader.GetOrdinal("category_name")),
                                    CategoryId = reader.GetInt32(reader.GetOrdinal("category_id")),
                                    UserId = reader.GetInt32(reader.GetOrdinal("user_id")),
                                    FullName = reader.GetString(reader.GetOrdinal("full_name")),
                                    Location = reader.IsDBNull(reader.GetOrdinal("location")) ? null : reader.GetString(reader.GetOrdinal("location")),
                                    LocationCoordinatesX = reader.IsDBNull(reader.GetOrdinal("location_coordinates_x")) ? (decimal?)null : reader.GetDecimal(reader.GetOrdinal("location_coordinates_x")),
                                    LocationCoordinatesY = reader.IsDBNull(reader.GetOrdinal("location_coordinates_y")) ? (decimal?)null : reader.GetDecimal(reader.GetOrdinal("location_coordinates_y"))
                                };

                                resultList.Add(serviceInfo);
                            }

                            return Ok(resultList);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions (e.g., log the error, return a 500 Internal Server Error response)
                return StatusCode(500, "An error occurred while processing the request.");
            }
        }
    }
}
