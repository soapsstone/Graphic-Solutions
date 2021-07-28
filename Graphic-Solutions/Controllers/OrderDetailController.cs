using Graphic_Solutions.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Graphic_Solutions.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly IOrderDetailsRepository _orderDetailsRepository;
        public OrderDetailController(IOrderDetailsRepository orderDetailsRepository)
        {
            _orderDetailsRepository = orderDetailsRepository;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var orderDetail = _orderDetailsRepository.GetById(id);
            if (orderDetail == null)
            {
                return NotFound();
            }
            return Ok(orderDetail);
        }

        [HttpPost]
        public IActionResult Post(OrderDetails orderDetails)
        {
            _orderDetailsRepository.Add(orderDetails);
            return CreatedAtAction("Get", new { id = orderDetails.Id }, orderDetails);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _orderDetailsRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, OrderDetails orderDetails)
        {
            if (id != orderDetails.Id)
            {
                return BadRequest();
            }

            _orderDetailsRepository.Update(orderDetails);
            return Ok(orderDetails);
        }
    }
}
