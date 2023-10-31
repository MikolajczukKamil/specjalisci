using Easy_Password_Validator;
using Easy_Password_Validator.Models;
using Microsoft.AspNetCore.Mvc;

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
            if (await IsUserNameTaken(model.Username))
            {
                return (IActionResult)Results.Conflict("UserName has already been taken");
            }
            if (!IsPasswordStrong(model))
            {
                return (IActionResult)Results.BadRequest("weak password");
            }
            if(await RegisterUserInDataBase(model))
            {
                return (IActionResult)Results.Ok("Ok");
            }
            // not sure if this isnt redundant
            return StatusCode(500);
            
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
        
    }

    private async Task<bool> IsUserNameTaken(string username)
    {
        // search database for given user name
        return false;
    }

    private bool IsPasswordStrong(LoginModel loginModel)
    {
        var passwordValidator = new PasswordValidatorService(new PasswordRequirements());
        return passwordValidator.TestAndScore(loginModel.Password, new string[] { loginModel.Username });
    }

    private async Task<bool> RegisterUserInDataBase(LoginModel loginModel)
    {
        // add database write code
        return true;
    }
}
