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

        [HttpPost("search/categoriesByUsername")]
        [AllowAnonymous]
        public IActionResult CategoriesByUsername([FromBody] SpecialistDto specialistDto)
        {
            var searchCriteria = new SearchCriteria()
            {
                Name = specialistDto.Name,
                Surname = specialistDto.Surname
            };
            var specialists = _searchLogic.GetCategoriesByUsername(searchCriteria);
            var toReturn = specialists.Select(x => x.CategoryName).ToList();
            return Ok(toReturn);
        }

        
    }
    public class SpecialistDto
    {
        public string Name { get; set; }
        public string Surname { get; set; }
    }
}