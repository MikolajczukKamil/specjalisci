using Easy_Password_Validator;
using Easy_Password_Validator.Models;
using HelpHunterBE.Models;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Globalization;

namespace HelpHunterBE.Controllers;

[Route("api")]
[ApiController]
public class RegistrationController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public RegistrationController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegistrationModel model)
    {
        try
        {
            if (!IsPasswordStrong(model))
            {
                return BadRequest("weak password");
            }
            if(AddUserEntryInDatabase(model))
            {
                return Ok("Ok");
            }
            return StatusCode(500);
            
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
        
    }

    private static bool IsPasswordStrong(RegistrationModel registrationModel)
    {
        var passwordValidator = new PasswordValidatorService(new PasswordRequirements());
        return passwordValidator.TestAndScore(
            registrationModel.password, new string[] { registrationModel.username }
        );
    }

    private bool AddUserEntryInDatabase(RegistrationModel registrationModel)
    {
        using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("Postgres")))
        {
            connection.Open();
            using (var command = new NpgsqlCommand(CreateUserDataBaseRegistrationSqlCommandString(registrationModel), connection))
            {
                return command.ExecuteNonQuery() == 0 ? false : true;
            }
        }
    }

    private string CreateUserDataBaseRegistrationSqlCommandString(RegistrationModel registrationModel)
    {
        return "INSERT INTO users" +
                " (username, email, password, full_name, date_of_birth, is_providing_services," +
                " location, location_coordinates_x , location_coordinates_y) " +
                $"VALUES ('{registrationModel.username}','{registrationModel.email}','{registrationModel.password}'," +
                $"'{registrationModel.full_name}','{registrationModel.date_of_birth}'," +
                $"'{registrationModel.is_providing_services}', '{registrationModel.location}'," +
                $"{registrationModel.location_coordinates_x.ToString(CultureInfo.InvariantCulture)}," +
                $"{registrationModel.location_coordinates_y.ToString(CultureInfo.InvariantCulture)})";
    }
}
