using HelpHunterBE.Dto;
using Npgsql;
using System.Net;

namespace HelpHunterBE.Logic
{
    public class UserLogic : IUserLogic
    {
        private readonly IConfiguration _configuration;

        public UserLogic(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public UserDto GetUserData(int userId)
        {
            UserDto user = new UserDto();

            using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("Postgres")))
            {
                connection.Open();

                string query = "SELECT * FROM users WHERE user_id = @userId";

                using (var command = new NpgsqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@UserId", userId);

                    using (NpgsqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            user.Id = reader.GetInt32(0);
                            user.Username = reader.GetString(1);
                            user.Email = reader.GetString(2);
                            user.Password = reader.GetString(3);
                            user.Fullname = reader.GetString(4);
                            user.Birthdate = reader.GetDateTime(5);
                            user.IsProvidingServices = reader.GetBoolean(6);
                            user.Location = reader.GetString(7);
                            user.Latitude = reader.GetDecimal(8);
                            user.Longitude = reader.GetDecimal(9);
                            user.Avatar = reader.GetInt32(10);
                            user.PhoneNumber = reader.GetString(11);
                            user.Description = reader.GetString(12);
                        }
                    }
                }
            }

            return user;
        }

        public HttpStatusCode UpdateUser(UserDto userDto)
        {
            try
            {
                using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("Postgres")))
                {
                    connection.Open();

                    string query = "UPDATE users SET username = @Username, email = @Email, password = @Password, full_name = @Fullname, date_of_birth = @Birthdate, is_providing_services = @IsProvidingServices, location = @Location, location_coordinates_x = @Latitude, location_coordinates_y = @Longitude, avatar = @Avatar, phone_number = @PhoneNumber, description = @Description WHERE user_id = @Id";

                    using (var command = new NpgsqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Id", userDto.Id);
                        command.Parameters.AddWithValue("@Username", userDto.Username);
                        command.Parameters.AddWithValue("@Email", userDto.Email);
                        command.Parameters.AddWithValue("@Password", userDto.Password);
                        command.Parameters.AddWithValue("@Fullname", userDto.Fullname);
                        command.Parameters.AddWithValue("@Birthdate", userDto.Birthdate);
                        command.Parameters.AddWithValue("@IsProvidingServices", userDto.IsProvidingServices);
                        command.Parameters.AddWithValue("@Location", userDto.Location);
                        command.Parameters.AddWithValue("@Latitude", userDto.Latitude);
                        command.Parameters.AddWithValue("@Longitude", userDto.Longitude);
                        command.Parameters.AddWithValue("@Avatar", userDto.Avatar);
                        command.Parameters.AddWithValue("@PhoneNumber", userDto.PhoneNumber);
                        command.Parameters.AddWithValue("@Description", userDto.Description);

                        command.ExecuteNonQuery();
                    }
                }

                return HttpStatusCode.OK;
            }
            catch(Exception exception)
            {
                return HttpStatusCode.InternalServerError;
            }
        }
    }
}
