using HelpHunterBE.Dto;
using System.Net;

namespace HelpHunterBE.Logic
{
    public interface IUserLogic
    {
        public UserDto GetUserData(int id, string token);
        public HttpStatusCode UpdateUser(UserDto userDto);
        public int GetUserIdByUsername(string username);
    }
}
