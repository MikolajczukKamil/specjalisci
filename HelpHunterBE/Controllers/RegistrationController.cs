using Easy_Password_Validator;
using Easy_Password_Validator.Models;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

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
            if(RegisterUserInDataBase(model))
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

    private bool RegisterUserInDataBase(RegistrationModel registrationModel)
    {
        using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("YourConnectionString")))
        {
            connection.Open();
            var commandString = "INSERT INTO Users" +
                " (username, email, password, full_name, date_of_birth, registration_date) " +
                $"VALUES ('{registrationModel.username}','{registrationModel.email}','{registrationModel.password}," +
                $"'{registrationModel.full_name}','{registrationModel.date_of_birth}','{registrationModel.registration_date}'," +
                $"'{registrationModel.is_providing_services}')";
            using (var command = new NpgsqlCommand(commandString, connection))
            {
                return (bool)command.ExecuteScalar();
            }
        }
    }
}
