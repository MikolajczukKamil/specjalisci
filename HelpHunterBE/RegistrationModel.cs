namespace HelpHunterBE;

public record RegistrationModel
{
    public int user_id;
    public string username;
    public string email;
    public string password;
    public string full_name ;
    public DateTime date_of_birth ;
    public DateTime registration_date ;
    public bool is_providing_services ;

}
