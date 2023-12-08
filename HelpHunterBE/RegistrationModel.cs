namespace HelpHunterBE;

public record RegistrationModel
{
    public string username { get; init; }
    public string email { get; init; }
    public string password { get; init; }
    public string full_name { get; init; }
    public DateTime date_of_birth { get; init; }
    public DateTime registration_date { get; init; }
    public bool is_providing_services { get; init; }
    public double location_coordinates_x { get; init; }
    public double location_coordinates_y { get; init; }
    public string location{ get; init; }
}
