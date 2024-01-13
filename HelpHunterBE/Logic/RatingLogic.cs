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

        public async Task<List<RatingDto>> GetRatings(int userId)
        {
            return await FindRatingsFor(userId);
        }

        public async Task<bool> PostRating(RatingDto rating)
        {
            using var connection = new NpgsqlConnection(_configuration.GetConnectionString("Postgres"));
            await connection.OpenAsync();

            var query = "INSERT INTO ratings (user_id, reviewer_id, rating, comment) VALUES (@UserId, @ReviewerId, @Rating, @Comment)";
            using var command = new NpgsqlCommand(query, connection);
            command.Parameters.AddWithValue("@UserId", rating.UserId);
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

        private async Task<List<RatingDto>> FindRatingsFor(int userId)
        {
            using var connection = new NpgsqlConnection(_configuration.GetConnectionString("Postgres"));
            await connection.OpenAsync();

            var query = "SELECT ratings.*, users.full_name as reviewer_name FROM ratings INNER JOIN users ON ratings.reviewer_id = users.user_id WHERE ratings.user_id = @UserId";
            using var command = new NpgsqlCommand(query, connection);
            command.Parameters.AddWithValue("@UserId", userId);

            var reader = await command.ExecuteReaderAsync();
            var list = new List<RatingDto>();

            while (reader.Read())
            {
                var rating = new RatingDto
                {
                    Id = reader.GetInt32(0),
                    UserId = reader.GetInt32(1),
                    ReviewerId = reader.GetInt32(2),
                    Rating = reader.GetInt32(3),
                    Comment = reader.GetString(4),
                    ReviewerName = reader.GetString(5)
                };

                list.Add(rating);
            }

            return list;
        }
    }
}
