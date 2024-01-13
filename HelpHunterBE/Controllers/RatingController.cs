using HelpHunterBE.Dto;
using HelpHunterBE.Logic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelpHunterBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class RatingController : ControllerBase
    {
        private IRatingLogic _logic;

        public RatingController(IRatingLogic logic)
        {
            this._logic = logic;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetRatings(int userId)
        {
            var ratings = await _logic.GetRatings(userId);

            return Ok(ratings);
        }

        [HttpPost]
        public async Task<IActionResult> PostRating([FromBody] RatingDto rating)
        {
            var result = await _logic.PostRating(rating);

            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}
