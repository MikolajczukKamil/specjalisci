using System.Net.Mail;
using System.Net;
using HelpHunterBE.Models;

namespace HelpHunterBE.Logic.Mails
{
    public class MailLogic : IMailLogic
    {
        public void SendMail(MailDto mailData, bool accept)
        {
            string fromEmail = mailData.SenderEmail;
            string recipientEmail = mailData.ReceiverEmail;
            string subject = mailData.Subject;
            string senderMessage = mailData.SenderMessage;
            string url = mailData.Url;
            string senderFullname = mailData.SenderFullname;
            string recipientFullname = mailData.SenderFullname;
            string serviceName = mailData.ServiceName;
            decimal servicePrice = mailData.ServicePrice;

            var body = accept ? 
                FillRequestTemplate(recipientFullname, senderFullname, serviceName, url, senderMessage) : 
                FillAcceptTemplate(recipientFullname, senderFullname, serviceName, url, senderMessage, servicePrice);

            try
            {
                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
                smtpClient.Port = 587;
                smtpClient.Credentials = new NetworkCredential("helphunterpomoc@gmail.com", "helphunterpomocSGGW");
                smtpClient.EnableSsl = true;
                smtpClient.UseDefaultCredentials = false;

                MailMessage message = new MailMessage("helphunterpomoc@gmail.com", "rosochackif@gmail.com", subject, body);
                message.IsBodyHtml = true;

                smtpClient.Send(message);
                Console.WriteLine("Email sent successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error sending email: " + ex.Message);
            }
        }

        private string FillRequestTemplate(string recipientFullname, string senderFullname, string serviceName, string url, string senderMessage)
        {
            return $"" +
                $"Cześć {recipientFullname}," +
                $"{senderFullname} chce zamówić u Ciebie usługę {serviceName}" +
                $"Zobacz więcej na platformie Helphanter {url}" +
                $"Wiadomość od klienta:" +
                $"{senderMessage}" +
                $"Pozdrawiamy zespół Helphanter";
        }

        private string FillAcceptTemplate(string recipientFullname, string senderFullname, string serviceName, string url, string senderMessage, decimal servicePrice)
        {
            return $"Cześć {recipientFullname}," +
                $"{senderFullname} zaakceptował Twoje zamówienie na usługę {serviceName} w cenie {servicePrice}" +
                $"Zobacz więcej na platformie Helphanter {url}" +
                $"Wiadomość od specjalisty:" +
                $"{senderMessage}" +
                $"Pozdrawiamy zespół Helphanter";
        }
    }
}
