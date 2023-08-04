using TradingPost.Models;

namespace TradingPost.Repositories
{
    public interface IOrderRepository
    {
        List<Order> GetAll();
        Order GetOrderById(int id);
        void Delete(int id);
    }
}
