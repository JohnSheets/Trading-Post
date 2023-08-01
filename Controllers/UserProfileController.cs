using Microsoft.AspNetCore.Mvc;
using TradingPost.Repositories;
using TradingPost.Models;
using System;

namespace TradingPost.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }


    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_userProfileRepository.GetAll());
    }
}
}