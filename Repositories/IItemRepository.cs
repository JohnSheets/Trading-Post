using TradingPost.Models;

namespace TradingPost.Repositories
{
    public interface IItemRepository
    {
        List<Item> GetAll();
        List<Item> GetItemByUserId(int id);
        void Add(Item item);
        void Delete(int id);
       void Update(Item item);
    }
}
