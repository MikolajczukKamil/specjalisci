using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using HelpHunterBE.Logic;

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

        [HttpPost("GetSpecialistsByCategoryAndDistance")]
        public IActionResult GetSpecialistsByCategoryAndDistance([FromBody] SpecialistDto specialistDto)
        {
            var searchCriteria = new SearchCriteria()
            {
                CategoryOrServiceName = specialistDto.Category,
                UserCoordinateX = Convert.ToSingle(specialistDto.LocationX),
                UserCoordinateY = Convert.ToSingle(specialistDto.LocationY),
            };
            var specialists = _searchLogic.GetSpecialistsByCategoryAndDistance(searchCriteria);
            return Ok(specialists);
        }

        
    }
    public class SpecialistDto
    {
        public string Category { get; set; }
        public double LocationX { get; set; }
        public double LocationY { get; set; }
    }
}