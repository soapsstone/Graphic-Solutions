using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Graphic_Solutions.Models
{
    public class OrderDetails
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Quantity { get; set; }

        [Required]
        public string Color { get; set; }

        [Required]
        public string Style { get; set; }

        [Required]
        public string Size { get; set; }
    }
}
