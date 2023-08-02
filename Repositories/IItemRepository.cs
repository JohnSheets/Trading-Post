using TradingPost.Models;

namespace TradingPost.Repositories
{
    public interface IItemRepository
    {
        List<Item> GetAll();
        List<Item> GetItemByUserId(int id);
    }
}
