public class ServiceInfo
{
    public int ServiceId { get; set; }
    public string ServiceName { get; set; }
    public decimal? MaxPrice { get; set; }
    public decimal? MinPrice { get; set; }
    public string OperatingMode { get; set; }
    public string CategoryName { get; set; }
    public int CategoryId { get; set; }
    public int UserId { get; set; }
    public int Rating { get; set; }
    public string FullName { get; set; }
    public string Location { get; set; }
    public decimal? LocationCoordinatesX { get; set; }
    public decimal? LocationCoordinatesY { get; set; }
    public double? Distance { get; set; }
}