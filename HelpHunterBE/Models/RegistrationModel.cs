namespace HelpHunterBE.Models;

public record RegistrationModel
{
    public string full_name { get; init; }
    public string location { get; init; }
    public string phone_number { get; init; }
    public string email { get; init; }
    public string password { get; init; }
    public int avatar { get; init; }

}
