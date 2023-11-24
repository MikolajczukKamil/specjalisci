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
    public async Task<IActionResult> Register([FromBody] LoginModel model)
    {
        try
        {
            if (!IsPasswordStrong(model))
            {
                return (IActionResult)Results.BadRequest("weak password");
            }
            if(RegisterUserInDataBase(model))
            {
                return (IActionResult)Results.Ok("Ok");
            }
            return StatusCode(500);
            
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
        
    }

    private static bool IsPasswordStrong(LoginModel loginModel)
    {
        var passwordValidator = new PasswordValidatorService(new PasswordRequirements());
        return passwordValidator.TestAndScore(loginModel.Password, new string[] { loginModel.Username });
    }

    private bool RegisterUserInDataBase(LoginModel loginModel)
    {
        using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("YourConnectionString")))
        {
            connection.Open();

            using (var command = new NpgsqlCommand("Insert add_user(@username, @password)", connection))
            {
                command.Parameters.AddWithValue("username", loginModel.Username);
                command.Parameters.AddWithValue("password", loginModel.Password);

                return (bool)command.ExecuteScalar();
            }
        }
    }
}
