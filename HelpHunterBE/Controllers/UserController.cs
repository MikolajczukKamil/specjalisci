using HelpHunterBE.Dto;
using HelpHunterBE.Logic.Users;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using HelpHunterBE.Logic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.IdentityModel.Tokens.Jwt;

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
        public object GetUserData(int userId)
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

            if (jsonToken != null)
            {
                var claims = jsonToken.Claims;
                var claimsDictionary = claims.ToDictionary(c => c.Type, c => c.Value);

                return _userLogic.GetUserData(userId, claimsDictionary);
            }
            else
            {
                return StatusCode(500, "No JWT token");
            }
        }

        [HttpPut]
        public HttpStatusCode UpdateUser(UserDto userDto)
        {
            return _userLogic.UpdateUser(userDto);
        }
    }
}
