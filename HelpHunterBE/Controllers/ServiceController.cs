using HelpHunterBE.Dto;
using HelpHunterBE.Logic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelpHunterBE.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ServiceController : ControllerBase
    {
        private IServiceLogic _serviceLogic;

        public ServiceController(IServiceLogic serviceLogic)
        {
            _serviceLogic = serviceLogic;
        }

        [HttpGet("{specialistId}")]
        public async Task<IActionResult> GetAvailableServices(int specialistId)
        {
            try
            {
                var results = await _serviceLogic.GetAvailableServices(specialistId);
                return Ok(results);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> AddOrUpdateService([FromBody] ServiceDto service)
        {
            try
            {
                var result = await _serviceLogic.CreateOrUpdateService(service);

                if (result) return Ok();

                return BadRequest();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
