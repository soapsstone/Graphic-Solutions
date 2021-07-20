using Graphic_Solutions.Models;

namespace Graphic_Solutions.Controllers
{
    public interface IOrderDetailsRepository
    {
        OrderDetails GetById(int id);
        void Add(OrderDetails orderDetails);
        void Delete(int id);
        void Update(OrderDetails orderDetails);
    }
}