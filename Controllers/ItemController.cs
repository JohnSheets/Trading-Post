using Microsoft.AspNetCore.Mvc;
using TradingPost.Repositories;

namespace TradingPost.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemRepository _itemRepository;
        public ItemController(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_itemRepository.GetAll());
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var item = _itemRepository.GetItemByUserId(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

    }
}
