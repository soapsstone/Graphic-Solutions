using Graphic_Solutions.Models;
using System.Collections.Generic;

namespace Graphic_Solutions.Repositories
{
    public interface IOrdersRepository
    {
        List<Orders> GetAll();
        Orders GetById(int id);
        void Add(Orders orders);
    }
}