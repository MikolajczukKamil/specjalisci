using HelpHunterBE.Dto;
using System.Net;

namespace HelpHunterBE.Logic
{
    public interface IUserLogic
    {
        public UserDto GetUserData(int id, Dictionary<string, string> claims);
        public HttpStatusCode UpdateUser(UserDto userDto);
        public int GetUserIdByUsername(string username);
    }
}
