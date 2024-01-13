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

        [AllowAnonymous]
        [HttpGet("{specialistId}")]
        public async Task<IActionResult> GetRatings(int specialistId)
        {
            var ratings = await _logic.GetRatings(specialistId);

            return Ok(ratings);
        }

        [HttpPost]
        public async Task<IActionResult> PostRating([FromBody] RatingDto rating)
        {
            Console.WriteLine(rating);

            var result = await _logic.PostRating(rating);

            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}
