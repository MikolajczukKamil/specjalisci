namespace HelpHunterBE.Dto
{
    public class UserDto
    {
        public UserDto()
        {
            
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Fullname { get; set; }
        public DateTime Birthdate { get; set; }
        public bool IsProvidingServices { get; set; }
        public string Location { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }
}
