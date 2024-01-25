
using HelpHunterBE.Logic;
using HelpHunterBE.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace HelpHunterBE.Controllers
{
    [Route("api")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IOrderLogic _orderLogic;
        public OrderController(IConfiguration configuration, IOrderLogic orderLogic)
        {
            _configuration = configuration;
            _orderLogic = orderLogic;
        }

        [HttpPost("order")]
        public HttpStatusCode Order([FromBody] Order model)
        {
           _orderLogic.Add(model);
            return HttpStatusCode.OK;
        }

    }

}
