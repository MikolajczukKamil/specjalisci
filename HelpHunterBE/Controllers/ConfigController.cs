using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api")]
public class ConfigController : ControllerBase
{
    [HttpGet("config")]
    [Authorize]
    public ActionResult<string> GetConfig()
    {
        try
        {
            string mapKey = Environment.GetEnvironmentVariable("MAP_TOKEN");

            if (mapKey != null)
            {
                return Ok($"{mapKey}");
            }
            else
            {
                return NotFound("MAP_TOKEN environment variable not found");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}