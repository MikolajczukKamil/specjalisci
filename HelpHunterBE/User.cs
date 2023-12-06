public class User
{
    public int UserId { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string FullName { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public bool IsProvidingServices { get; set; }
    public string Location { get; set; }
    public decimal? LocationCoordinatesX { get; set; }
    public decimal? LocationCoordinatesY { get; set; }
}