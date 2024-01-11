using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using HelpHunterBE.Logic.Searches;

namespace HelpHunterBE.Controllers
{
    [Route("api")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly SearchLogic _searchLogic;

        public SearchController(SearchLogic searchLogic)
        {
            _searchLogic = searchLogic;
        }

        [HttpPost("search")]
        [Authorize]
        public IActionResult Search([FromBody] SearchCriteria criteria)
        {
            var resultList = _searchLogic.ExecuteSearchQuery(criteria);
            return Ok(resultList);
        }
    }
}