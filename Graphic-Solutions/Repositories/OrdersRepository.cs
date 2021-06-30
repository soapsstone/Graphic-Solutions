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
    }
}

