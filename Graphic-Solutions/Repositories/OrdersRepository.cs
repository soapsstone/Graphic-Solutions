using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Graphic_Solutions.Models;
using Graphic_Solutions.Utils;

namespace Graphic_Solutions.Repositories
{
    public class OrdersRepository : BaseRepository, IOrdersRepository
    {
        public OrdersRepository(IConfiguration configuration) : base(configuration) { }

        public List<Orders> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, Title, UserId
                            FROM Orders";

                    var reader = cmd.ExecuteReader();

                    var orders = new List<Orders>();
                    while (reader.Read())
                    {
                        orders.Add(new Orders()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                        });
                    }

                    reader.Close();

                    return orders;
                }
            }
        }

        public Orders GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, Title, UserId
                    FROM Orders
                    WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Orders orders = null;
                    if (reader.Read())
                    {
                        orders = new Orders()
                        {
                            Id = id,
                            Title = DbUtils.GetString(reader, "Title"),
                            UserId = DbUtils.GetInt(reader, "UserId"),

                        };
                    }

                    reader.Close();

                    return orders;
                }
            }
        }

        public void Add(Orders orders)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Orders (Title, UserId)
                        OUTPUT INSERTED.ID
                        VALUES (@Title, @UserId)";

                    DbUtils.AddParameter(cmd, "@Title", orders.Title);
                    DbUtils.AddParameter(cmd, "@UserId", orders.UserId);

                    orders.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Orders WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Orders orders)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Orders
                           SET Title = @Title,
                               UserId = @UserId
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Title", orders.Title);
                    DbUtils.AddParameter(cmd, "@UserId", orders.UserId);
                    DbUtils.AddParameter(cmd, "@Id", orders.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Orders GetOrderWithDetails(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT o.Id AS OrderId, o.Title, o.UserId AS OrdersUserId,

                       u.Id AS UserId, u.FirstName, u.LastName, u.Email, u.UserTypeId AS UserTypeId,

                       od.Id AS OrderDetailsId, od.Quantity, od.Color, od.Style, od.Size
                  FROM Orders o
                       LEFT JOIN [User] u ON o.UserId = u.id
                       LEFT JOIN OrderDetails od on od.OrderId = o.id
                  WHERE o.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Orders orders = null; 
                    while (reader.Read())
                    {
                        //var ordersId = DbUtils.GetInt(reader, "OrdersId");
                       
                            // if order is null
                            if (orders == null) { 
                                orders = new Orders()
                                {
                                Id = DbUtils.GetInt(reader, "OrderId"),
                                Title = DbUtils.GetString(reader, "Title"),
                                //the should just be the user Id however you will need to add a user to the model to add it to the order 
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                                },
                                OrderDetails = new List<OrderDetails>()
                            };
                        }
                            // there is no orders list 
                            //orders.Add(Orders);

                        if (DbUtils.IsNotDbNull(reader, "OrderDetailsId"))
                        {
                            orders.OrderDetails.Add(new OrderDetails()
                            {
                                Id = DbUtils.GetInt(reader, "OrderDetailsId"),
                                Quantity = DbUtils.GetString(reader, "Quantity"),
                                Color = DbUtils.GetString(reader, "Color"),
                                Style = DbUtils.GetString(reader, "Style"),
                                Size = DbUtils.GetString(reader, "Size"),
                                //add these two to the orderdetails model 
                                OrderId = DbUtils.GetInt(reader, "OrderId")
                                
                                //**************************
                            });
                        }
                    }

                    reader.Close();

                    return orders;
                }
            }
        }
    }
}

