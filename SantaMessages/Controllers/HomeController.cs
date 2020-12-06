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
        public IBackgroundTaskQueue Queue { get; }

        public HomeController(IBackgroundTaskQueue queue)
        {
            Queue = queue;
        }

        [HttpPost]
        [Route("/message")]
        public string Message()
        {
            string msg = HttpContext.Request.Form["message"];
            try
            {
                Queue.QueueBackgroundWorkItem(async token => {
                    await FileLogger.WriteToFileAsync(msg);
                });
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
