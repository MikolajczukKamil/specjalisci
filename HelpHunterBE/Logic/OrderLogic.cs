
using HelpHunterBE.Models;
using Npgsql;

namespace HelpHunterBE.Logic
{
    public class OrderLogic : IOrderLogic
    {
        private IConfiguration _configuration;
        public OrderLogic(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public void Add(Order model)
        {
            using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("Postgres")))
            {
                connection.Open();

                using (var command = new NpgsqlCommand("INSERT INTO orders (specialistid, customerid, status, specialist_pricing, specialist_description, start_date, estimated_time, final_price, end_date) VALUES ( @specialistid, @customerid, @status, @specialist_pricing, @specialist_description, @start_date, @estimated_time, @final_price, @end_date)", connection))
                {
                    command.Parameters.AddWithValue("id", model.Id);
                    command.Parameters.AddWithValue("specialistid", model.specialistId);
                    command.Parameters.AddWithValue("customerid", model.consumerId);
                    command.Parameters.AddWithValue("status", (int)model.Status);
                    command.Parameters.AddWithValue("specialist_pricing", model.SpecialistPricing);
                    command.Parameters.AddWithValue("specialist_description", model.SpecialistDescription);
                    command.Parameters.AddWithValue("start_date", model.StartDate);
                    command.Parameters.AddWithValue("estimated_time", model.EstimatedTime);
                    command.Parameters.AddWithValue("final_price", model.FinalPrice);
                    command.Parameters.AddWithValue("end_date", model.EndDate);

                    command.ExecuteNonQuery();
                }

                connection.Close();
            }
        }
    }
}
