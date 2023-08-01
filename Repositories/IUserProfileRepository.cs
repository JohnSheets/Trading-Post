using TradingPost.Models;

namespace TradingPost.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAll();
    }
}
