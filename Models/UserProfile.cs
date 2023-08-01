using System.ComponentModel.DataAnnotations;

namespace TradingPost.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public byte[]? Profile { get; set; } 
        public string? Email { get; set; }
    }
}
