using Graphic_Solutions.Models;

namespace Graphic_Solutions.Controllers
{
    public interface IUserRepository
    {
        User GetByFirebaseUserId(string firebaseUserId);
        void Add(User user);
    }
}