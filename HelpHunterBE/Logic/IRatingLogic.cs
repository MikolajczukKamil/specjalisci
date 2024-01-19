using HelpHunterBE.Dto;

namespace HelpHunterBE.Logic
{
    public interface IRatingLogic
    {
        Task<List<RatingDto>> GetRatings(int specialistId);

        Task<bool> PostRating(RatingDto rating);
    }
}
