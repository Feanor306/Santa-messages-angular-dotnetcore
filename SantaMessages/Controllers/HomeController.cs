using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using SantaMessages.Services;

namespace SantaMessages.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        [Route("/message")]
        public string Message()
        {
            string msg = HttpContext.Request.Form["message"];
            try
            {
                FileLogger.WriteToFile(msg);
                return JsonConvert.SerializeObject(new
                {
                    status = "Message Accepted",
                    message = msg
                });
            }
            catch
            {
                return JsonConvert.SerializeObject(new
                {
                    status = "Message Rejected"
                });
            }
        }
    }
}
