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
    private readonly PasswordValidatorService _passwordValidator;

    public RegistrationController(IConfiguration configuration, PasswordValidatorService passwordValidator)
    {
        _configuration = configuration;
        _passwordValidator = passwordValidator;
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
            if(await RegisterUserInDataBase(model))
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

    private bool IsPasswordStrong(LoginModel loginModel)
    {
        var passwordValidator = new PasswordValidatorService(new PasswordRequirements());
        return passwordValidator.TestAndScore(loginModel.Password, new string[] { loginModel.Username });
    }

    private async Task<bool> RegisterUserInDataBase(LoginModel loginModel)
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
