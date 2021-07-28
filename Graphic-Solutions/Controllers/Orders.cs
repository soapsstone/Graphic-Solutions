using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Graphic_Solutions.Repositories;
using Graphic_Solutions.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Graphic_Solutions.Controllers
{
        
        [Route("api/[controller]")]
        [ApiController]
        public class OrdersController : ControllerBase
        {
            private readonly IOrdersRepository _ordersRepository;
            public OrdersController(IOrdersRepository ordersRepository)
            {
                _ordersRepository = ordersRepository;
            }

            [HttpGet]
            public IActionResult Get()
            {
                return Ok(_ordersRepository.GetAll());
            }

            [HttpGet("{id}")]
            public IActionResult Get(int id)
            {
                var order = _ordersRepository.GetById(id);
                if (order == null)
                {
                    return NotFound();
                }
                return Ok(order);
            }

        [HttpPost]
        public IActionResult Post(Orders orders)
        {
            _ordersRepository.Add(orders);
            return CreatedAtAction("Get", new { id = orders.Id }, orders);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _ordersRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Orders orders)
        {
            if (id != orders.Id)
            {
                return BadRequest();
            }

            _ordersRepository.Update(orders);
            return Ok(orders);
        }

        [HttpGet("GetWithDetails/{id}")]
        public IActionResult GetWithDetails(int id)
        {
            var orders = _ordersRepository.GetOrderWithDetails(id);
            return Ok(orders);
        }
    }
}
