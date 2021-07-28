using Graphic_Solutions.Models;
using Graphic_Solutions.Utils;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Graphic_Solutions.Controllers;

namespace Graphic_Solutions.Repositories
{
    public class OrderDetailsRepository : BaseRepository, IOrderDetailsRepository
    {
        public OrderDetailsRepository(IConfiguration configuration) : base(configuration) { }
        public void Add(OrderDetails orderDetails)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO OrderDetails (Quantity, Color, Style, Size, OrderId)
                        OUTPUT INSERTED.ID
                        VALUES (@Quantity, @Color, @Style, @Size, @OrderId)";

                    DbUtils.AddParameter(cmd, "@Quantity", orderDetails.Quantity);
                    DbUtils.AddParameter(cmd, "@Color", orderDetails.Color);
                    DbUtils.AddParameter(cmd, "@Style", orderDetails.Style);
                    DbUtils.AddParameter(cmd, "@Size", orderDetails.Size);
                    DbUtils.AddParameter(cmd, "@OrderId", orderDetails.OrderId);

                    orderDetails.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = @"DELETE FROM OrderDetails WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(OrderDetails orderDetails)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                 UPDATE OrderDetails
                           SET Quantity = @Quantity,
                               Color = @Color,
                               Style = @Style,
                               Size = @Size,
                               OrderId = @OrderId
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Quantity", orderDetails.Quantity);
                    DbUtils.AddParameter(cmd, "@Color", orderDetails.Color);
                    DbUtils.AddParameter(cmd, "@Style", orderDetails.Style);
                    DbUtils.AddParameter(cmd, "@Size", orderDetails.Size);
                    DbUtils.AddParameter(cmd, "@OrderId", orderDetails.OrderId);
                    DbUtils.AddParameter(cmd, "@Id", orderDetails.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public OrderDetails GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, Quantity, Color, Style, Size, OrderId
                    FROM OrderDetails
                    WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    OrderDetails orderDetails = null;
                    if (reader.Read())
                    {
                        orderDetails = new OrderDetails()
                        {
                            Id = id,
                            Quantity = DbUtils.GetString(reader, "Quantity"),
                            Color = DbUtils.GetString(reader, "Color"),
                            Style = DbUtils.GetString(reader, "Style"),
                            Size = DbUtils.GetString(reader, "Size"),
                            OrderId = DbUtils.GetInt(reader, "OrderId"),

                        };
                    }

                    reader.Close();

                    return orderDetails;
                }
            }
        }
    }
}
