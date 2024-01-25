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
        public string Fullname { get; set; }
        public bool IsProvidingServices { get; set; }
        public string? Location { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public int? Avatar { get; set; }
        public string? Phonenumber { get; set; }
        public string? Description {  get; set; }
    }
}
