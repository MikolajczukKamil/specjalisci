namespace HelpHunterBE.Dto
{
    public class ServiceDto
    {
        public int? AvailableServiceId { get; set; }

        public int UserId { get; set; }

        public int ServiceId { get; set; }

        public int CategoryId { get; set; }

        public string Description { get; set; }

        public decimal MinPrice { get; set; }

        public decimal MaxPrice { get; set; }

        public string Availability { get; set; }

        public decimal Range { get; set; }

        public string OperatingMode { get; set; }
    }
}
