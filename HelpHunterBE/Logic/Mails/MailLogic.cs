using HelpHunterBE.Models;
using MailKit.Net.Smtp;
using MimeKit;

namespace HelpHunterBE.Logic.Mails
{
    public class MailLogic : IMailLogic
    {
        public void SendMail(MailDto mailData)
        {
            string url = mailData.Url;
            string receiverFullname = mailData.ReceiverFullname;
            string receiverEmail = mailData.ReceiverEmail;

            var email = new MimeMessage();

            email.From.Add(new MailboxAddress("HelpHunter Pomoc", "helphunterpomoc@gmail.com"));
            email.To.Add(new MailboxAddress("HelpHunter Klient", receiverEmail));

            email.Subject = "Witamy na pokładzie!";
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = "<b>" +
                $"Cześć {receiverFullname}" +
                "<br/>" +
                $"witamy w HelpHunter {url} " +
                "<br/>" +
                $"W razie pytań odpisz!" +
                "<br/>" +
                $"Pozdrawiamy zespół Helphanter" +
                $"</b>"
            };

            using (var smtp = new SmtpClient())
            {
                smtp.Connect("smtp.gmail.com", 587, false);

                smtp.ServerCertificateValidationCallback = (s, c, h, e) => true;
                smtp.Authenticate("helphunterpomoc@gmail.com", "xpxm fllm oxpa sekk");
                smtp.Send(email);
                smtp.Disconnect(true);
            }
        }
    }
}
