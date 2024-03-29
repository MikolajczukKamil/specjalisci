﻿using Easy_Password_Validator;
using Easy_Password_Validator.Models;
using HelpHunterBE.Logic.Mails;
using HelpHunterBE.Models;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Globalization;

namespace HelpHunterBE.Controllers;

[Route("api")]
[ApiController]
public class RegistrationController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly IMailLogic _mailLogic;

    public RegistrationController(IConfiguration configuration, IMailLogic mailLogic)
    {
        _configuration = configuration;
        _mailLogic = mailLogic;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegistrationModel model)
    {
        try
        {
            if (!IsPasswordStrong(model))
            {
                return BadRequest("weak password");
            }
            if (AddUserEntryInDatabase(model))
            {
                var mailData = new MailDto
                {
                    ReceiverFullname = model.full_name,
                    ReceiverEmail = model.email,
                    Url = "helphunter.pl",
                };
                _mailLogic.SendMail(mailData);

                return Ok("Ok");
            }
            return StatusCode(409, "Email in use");

        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }

    }

    private static bool IsPasswordStrong(RegistrationModel registrationModel)
    {
        var passwordValidator = new PasswordValidatorService(new PasswordRequirements());
        return passwordValidator.TestAndScore(
            registrationModel.password, new string[] { registrationModel.email }
        );
    }

    private bool AddUserEntryInDatabase(RegistrationModel registrationModel)
    {
        using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("Postgres")))
        {
            connection.Open();
            using (var command = new NpgsqlCommand(CreateUserDataBaseRegistrationSqlCommandString(registrationModel), connection))
            {
                var result = command.ExecuteScalar();
                if (result != null && result != DBNull.Value)
                    {
                        return (bool)result;
                    }
                    else
                    {
                        return false;
                    }
            }
        }
    }

    private string CreateUserDataBaseRegistrationSqlCommandString(RegistrationModel registrationModel)
    {
        return "SELECT register(" +
    $"'{registrationModel.full_name}', " +
    $"'{registrationModel.phone_number}', " +
    $"'{registrationModel.email}', " +
    $"'{registrationModel.password}', " +
    $"'{registrationModel.avatar}'" +
    ");";

    }
}
