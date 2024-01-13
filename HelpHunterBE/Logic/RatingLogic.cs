using HelpHunterBE.Dto;
using Npgsql;

namespace HelpHunterBE.Logic
{
    internal class RatingLogic : IRatingLogic
    {
        private IConfiguration _configuration;

        public RatingLogic(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<RatingDto>> GetRatings(int specialistId)
        {
            return await FindRatingsFor(specialistId);
        }

        public async Task<bool> PostRating(RatingDto rating)
        {
            using var connection = new NpgsqlConnection(_configuration.GetConnectionString("Postgres"));
            await connection.OpenAsync();

            var query = "INSERT INTO ratings (specialist_id, reviewer_id, rating, comment) VALUES (@SpecialistId, @ReviewerId, @Rating, @Comment)";
            using var command = new NpgsqlCommand(query, connection);
            command.Parameters.AddWithValue("@SpecialistId", rating.SpecialistId);
            command.Parameters.AddWithValue("@ReviewerId", rating.ReviewerId);
            command.Parameters.AddWithValue("@Rating", rating.Rating);
            command.Parameters.AddWithValue("@Comment", rating.Comment);

            try
            {
                var result = await command.ExecuteNonQueryAsync();
                return result == 1;
            }
            catch { return false; }
        }

        private async Task<List<RatingDto>> FindRatingsFor(int specialistId)
        {
            using var connection = new NpgsqlConnection(_configuration.GetConnectionString("Postgres"));
            await connection.OpenAsync();

            var query = "SELECT * FROM ratings WHERE specialist_id = @SpecialistId";
            using var command = new NpgsqlCommand(query, connection);
            command.Parameters.AddWithValue("@SpecialistId", specialistId);

            var reader = await command.ExecuteReaderAsync();
            var list = new List<RatingDto>();

            while (reader.Read())
            {
                var rating = new RatingDto
                {
                    Id = reader.GetInt32(0),
                    SpecialistId = reader.GetInt32(1),
                    ReviewerId = reader.GetInt32(2),
                    Rating = reader.GetInt32(3),
                    Comment = reader.GetString(4)
                };

                list.Add(rating);
            }

            return list;
        }
    }
}
