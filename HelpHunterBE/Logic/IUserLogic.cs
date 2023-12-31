﻿using HelpHunterBE.Dto;
using System.Net;

namespace HelpHunterBE.Logic
{
    public interface IUserLogic
    {
        public UserDto GetUserData(int id);
        public HttpStatusCode UpdateUser(UserDto userDto);
    }
}
