using System;
using System.Collections.Generic;
using System.Linq;
using Api.DTO;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
  [ApiController]
  [Route("sayings")]
  public class SayingController : ControllerBase
  {
    private readonly ISayingService _sayingService;

    public SayingController(ISayingService sayingService)
    {
      _sayingService = sayingService;
    }

    [HttpGet]
    public ActionResult GetSaying()
    {
      var randomSaying = _sayingService.GetRandom();
      return Ok(randomSaying);
    }
  }
}
