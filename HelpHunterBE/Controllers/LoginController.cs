using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using HelpHunterBE.Logic;
using Npgsql;

namespace HelpHunterBE.Controllers
{
    [Route("api")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserLogic _userLogic;

        public LoginController(IConfiguration configuration, IUserLogic userLogic)
        {
            _configuration = configuration;
            _userLogic = userLogic;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (IsUserValid(model.Username, model.Password))
            {
                var token = GenerateJwtToken(model.Username);
                return Ok(new { Token = token });
            }

            return Unauthorized();
        }

        private bool IsUserValid(string username, string password)
        {
            // Call the validate_password function in the database
            using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("Postgres")))
            {
                connection.Open();

                using (var command = new NpgsqlCommand("SELECT validate_password(@username, @password)", connection))
                {
                    command.Parameters.AddWithValue("username", username);
                    command.Parameters.AddWithValue("password", password);

                    var result = command.ExecuteScalar();
                    if (result != null && result != DBNull.Value)
                    {
                        return (bool)result;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
        }
        private string GenerateJwtToken(string username)
        {
            string signingKey = Environment.GetEnvironmentVariable("JWT_KEY");
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey));
            var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            // Fetch user_id from the database based on the username
            var userId = _userLogic.GetUserIdByUsername(username);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role, "Test"), // We can add more roles later like this
                new Claim("user_id", userId.ToString()) // Custom claim for user_id
            };

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: signingCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
