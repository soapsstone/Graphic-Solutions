using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Graphic_Solutions.Models
{
    public class Orders
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int UserId { get; set; }
        public int UserTypeId { get; set; }
        public List <OrderDetails> OrderDetails { get; set; }
        //order model needs a list for order details 
        //order model needs a refrence to user
        public UserType UserType { get; set; }
        public User User { get; set; }
    }
}
