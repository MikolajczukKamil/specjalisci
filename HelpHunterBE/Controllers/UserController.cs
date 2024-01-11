using HelpHunterBE.Dto;
using HelpHunterBE.Logic.Users;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace HelpHunterBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Test")]
    public class UserController : Controller
    {
        private readonly IUserLogic _userLogic;

        public UserController(IUserLogic userLogic)
        {
            _userLogic = userLogic;
        }

        [HttpGet("{userId}")]
        public UserDto GetUserData(int userId)
        {
            return _userLogic.GetUserData(userId);
        }

        [HttpPut]
        public HttpStatusCode UpdateUser(UserDto userDto)
        {
            return _userLogic.UpdateUser(userDto);
        }
    }
}
