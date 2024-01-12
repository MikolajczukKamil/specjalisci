using HelpHunterBE.Dto;
using HelpHunterBE.Logic;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace HelpHunterBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
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
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            return _userLogic.GetUserData(userId, token);
        }

        [HttpPut]
        public HttpStatusCode UpdateUser(UserDto userDto)
        {
            return _userLogic.UpdateUser(userDto);
        }
    }
}
