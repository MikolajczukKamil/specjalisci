
namespace HelpHunterBE.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int specialistId { get; set; }
        public int consumerId { get; set; }
        public Status Status { get; set; }
        public decimal SpecialistPricing { get; set; }
        public string SpecialistDescription { get; set; }
        public DateTime StartDate { get; set; }
        public double EstimatedTime { get; set; }
        public decimal FinalPrice { get; set; }
        public DateTime EndDate { get; set; }
    }

    public enum Status
    {
        New = 0,
        Accepted = 1,
        InProgress = 2,
        Done = 3,
    }
}
