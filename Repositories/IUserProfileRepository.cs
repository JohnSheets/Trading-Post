using TradingPost.Models;

namespace TradingPost.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAll();
        UserProfile GetProfileById(int Id);
        void Update(UserProfile userProfile);
        void Add(UserProfile userProfile);
    }
}
