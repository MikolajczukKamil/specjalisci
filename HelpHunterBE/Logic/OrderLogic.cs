
using HelpHunterBE.Models;
using Npgsql;

namespace HelpHunterBE.Logic
{
    public class OrderLogic:IOrderLogic
    {
       public void Add(Order model)
        {
            using (var connection = new NpgsqlConnection("Postgres"))
            {
                connection.Open();

                using (var command = new NpgsqlCommand("INSERT INTO orders (id, specialistId, consumer_id, status, specialist_pricing, specialist_description, start_date, estimated_time, final_price, end_date) VALUES (@id, @status, @specialist_pricing, @specialist_description, @start_date, @estimated_time, @final_price, @end_date)", connection))
                {
                    command.Parameters.AddWithValue("@id", model.Id);
                    command.Parameters.AddWithValue("specialist_id", model.specialistId);
                    command.Parameters.AddWithValue("consumer_id", model.consumerId);
                    command.Parameters.AddWithValue("@status", (int)model.Status);
                    command.Parameters.AddWithValue("@specialist_pricing", model.SpecialistPricing);
                    command.Parameters.AddWithValue("@specialist_description", model.SpecialistDescription);
                    command.Parameters.AddWithValue("@start_date", model.StartDate);
                    command.Parameters.AddWithValue("@estimated_time", model.EstimatedTime);
                    command.Parameters.AddWithValue("@final_price", model.FinalPrice);
                    command.Parameters.AddWithValue("@end_date", model.EndDate);

                    command.ExecuteNonQuery();
                }

                connection.Close();
            }
        }
    }
}
