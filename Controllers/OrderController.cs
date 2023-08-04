using Microsoft.AspNetCore.Mvc;
using TradingPost.Repositories;
using TradingPost.Models;

namespace TradingPost.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase 
    {
        private readonly IOrderRepository _orderRepository;
        public OrderController(IOrderRepository orderRepository) 
        {
            _orderRepository = orderRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_orderRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var order = _orderRepository.GetOrderById(id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _orderRepository.Delete(id);
            return NoContent();
        }

    }
}
