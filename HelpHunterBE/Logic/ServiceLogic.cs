using HelpHunterBE.Dto;
using Npgsql;

namespace HelpHunterBE.Logic
{
    public class ServiceLogic : IServiceLogic
    {
        private IConfiguration _configuration;

        public ServiceLogic(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<ServiceDto>> GetAvailableServices(int specialistId)
        {
            using var connection = new NpgsqlConnection(_configuration.GetConnectionString("Postgres"));
            await connection.OpenAsync();

            using var command = new NpgsqlCommand("SELECT * FROM available_services WHERE user_id = @UserId", connection);
            command.Parameters.AddWithValue("UserId", specialistId);

            var result = new List<ServiceDto>();
            var reader = await command.ExecuteReaderAsync();

            while (reader.Read())
            {
                var service = new ServiceDto
                {
                    AvailableServiceId = reader.GetInt32(0),
                    UserId = reader.GetInt32(1),
                    ServiceId = reader.GetInt32(2),
                    CategoryId = reader.GetInt32(3),
                    Description = reader.GetString(4),
                    MaxPrice = reader.GetDecimal(5),
                    MinPrice = reader.GetDecimal(6),
                    Availability = reader.GetString(7),
                    Range = reader.GetDecimal(8),
                    OperatingMode = reader.GetString(9)
                };

                result.Add(service);
            }

            return result;
        }

        public async Task<bool> CreateOrUpdateService(ServiceDto service)
        {
            var shouldCreate = service.AvailableServiceId == null;

            using var connection = new NpgsqlConnection(_configuration.GetConnectionString("Postgres"));
            await connection.OpenAsync();

            using var command = PrepareCommand(shouldCreate, service, connection);
            var result = await command.ExecuteNonQueryAsync() > 0;

            return result;
        }

        private NpgsqlCommand PrepareCommand(bool insert, ServiceDto service, NpgsqlConnection connection)
        {
            var query = PrepareQuery(insert);
            var command = new NpgsqlCommand(query, connection); // No 'using' here -- we don't want to close the command upon function return

            command.Parameters.AddWithValue("UserId", service.UserId);
            command.Parameters.AddWithValue("ServiceId", service.ServiceId);
            command.Parameters.AddWithValue("CategoryId", service.CategoryId);
            command.Parameters.AddWithValue("Description", service.Description);
            command.Parameters.AddWithValue("MaxPrice", service.MaxPrice);
            command.Parameters.AddWithValue("MinPrice", service.MinPrice);
            command.Parameters.AddWithValue("Availability", service.Availability);
            command.Parameters.AddWithValue("Range", service.Range);
            command.Parameters.AddWithValue("OperatingMode", service.OperatingMode);

            if (!insert)
            {
                command.Parameters.AddWithValue("AvailableServiceId", service.AvailableServiceId);
            }

            return command;
        }

        private string PrepareQuery(bool insert)
        {
            if (insert)
            {
                return "INSERT INTO available_services (user_id, service_id, category_id, description, max_price, min_price, availability, range, operating_mode) VALUES (@UserId, @ServiceId, @CategoryId, @Description, @MaxPrice, @MinPrice, @Availability, @Range, @OperatingMode)";
            }
            else
            {
                return "UPDATE available_services SET user_id = @UserId, service_id = @ServiceId, category_id = @CategoryId, description = @Description, max_price = @MaxPrice, min_price = @MinPrice, availability = @Availability, range = @Range, operating_mode = @OperatingMode WHERE available_service_id = @AvailableServiceId";
            }
        }
    }
}
