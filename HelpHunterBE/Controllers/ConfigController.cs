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
            string mapToken = Environment.GetEnvironmentVariable("MAP_TOKEN");

            if (string.IsNullOrEmpty(mapToken))
            {
                throw new ApplicationException("MAP_TOKEN not found in environment variables.");
            }

            var configResponse = new
            {
                map_token = mapToken
            };

            return Ok(configResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}