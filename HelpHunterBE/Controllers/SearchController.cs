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
                    string sqlQuery = "SELECT * FROM users WHERE 1 = 1";

                    // Add conditions to the query based on provided criteria
                    if (!string.IsNullOrEmpty(criteria.Location))
                        sqlQuery += " AND location = @Location";

                    if (criteria.Price > 0)
                        sqlQuery += " AND price <= @Price";

                    if (criteria.Rating > 0)
                        sqlQuery += " AND rating >= @Rating";

                    if (!string.IsNullOrEmpty(criteria.CategoryOrServiceName))
                        sqlQuery += " AND category_or_service_name = @CategoryOrServiceName";

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

                        if (criteria.Rating > 0)
                            command.Parameters.AddWithValue("Rating", criteria.Rating);

                        if (!string.IsNullOrEmpty(criteria.CategoryOrServiceName))
                            command.Parameters.AddWithValue("CategoryOrServiceName", criteria.CategoryOrServiceName);

                        // Execute the query and retrieve the results
                        using (var reader = command.ExecuteReader())
                        {
                            var resultList = new List<User>();

                            while (reader.Read())
                            {
                                // Map the database columns to your user model properties
                                var user = new User
                                {
                                    UserId = reader.GetInt32(reader.GetOrdinal("user_id")),
                                    Username = reader.GetString(reader.GetOrdinal("username")),
                                    Email = reader.GetString(reader.GetOrdinal("email")),
                                    Password = reader.GetString(reader.GetOrdinal("password")),
                                    FullName = reader.GetString(reader.GetOrdinal("full_name")),
                                    DateOfBirth = reader.IsDBNull(reader.GetOrdinal("date_of_birth")) ? (DateTime?)null : reader.GetDateTime(reader.GetOrdinal("date_of_birth")),
                                    IsProvidingServices = reader.GetBoolean(reader.GetOrdinal("is_providing_services")),
                                    Location = reader.IsDBNull(reader.GetOrdinal("location")) ? null : reader.GetString(reader.GetOrdinal("location")),
                                    LocationCoordinatesX = reader.IsDBNull(reader.GetOrdinal("location_coordinates_x")) ? (decimal?)null : reader.GetDecimal(reader.GetOrdinal("location_coordinates_x")),
                                    LocationCoordinatesY = reader.IsDBNull(reader.GetOrdinal("location_coordinates_y")) ? (decimal?)null : reader.GetDecimal(reader.GetOrdinal("location_coordinates_y"))
                                };

                                resultList.Add(user);
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
