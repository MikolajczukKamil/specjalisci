namespace HelpHunterBE.Models
{
    public class MailDto
    {
        public string SenderEmail { get; set; }
        public string SenderFullname { get; set; }
        public string ReceiverEmail { get; set; }
        public string ReceiverFullname { get; set; }
        public string Url { get; set; }
        public string Subject { get; set; }
        public string SenderMessage { get; set; }
        public string ServiceName { get; set; }
        public decimal ServicePrice { get; set; }
    }
}
