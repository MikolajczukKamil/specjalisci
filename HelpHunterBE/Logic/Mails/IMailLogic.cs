using HelpHunterBE.Models;

namespace HelpHunterBE.Logic.Mails
{
    public interface IMailLogic
    {
        void SendMail(MailDto mailData);
    }
}
