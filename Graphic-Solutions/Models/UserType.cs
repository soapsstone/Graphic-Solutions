using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Graphic_Solutions.Models
{
    public class UserType
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        // These read-only static properties correspond to the ID values in the database
        //  for the "Admin" and "User" user types.
        public static int ADMIN_ID => 1;
        public static int CUSTOMER_ID => 2;
    }
}
