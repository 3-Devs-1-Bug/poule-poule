using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ValuesController : ControllerBase
    {
        // GET values
        [HttpGet]
        public string Get()
        {
            return "This value was returned from the API 👍🏻";
        }
    }
}
