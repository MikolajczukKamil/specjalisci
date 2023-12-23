using HelpHunterBE.Dto;
using HelpHunterBE.Logic;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace HelpHunterBE.Controllers
{
    [ApiController]
    [Route("[controller]")]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Test")]
    [AllowAnonymous]
    public class UserController : Controller
    {
        private readonly IUserLogic _userLogic;

        public UserController(IUserLogic userLogic)
        {
            _userLogic = userLogic;
        }

        [HttpGet]
        public UserDto GetUserData(int userId)
        {
            return _userLogic.GetUserData(userId);
        }

        [HttpPut]
        public HttpStatusCode UpdateUser(UserDto userDto)
        {
            _userLogic.UpdateUser(userDto);
            return HttpStatusCode.OK;
        }
    }
}
