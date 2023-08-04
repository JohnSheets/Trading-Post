using System.ComponentModel.DataAnnotations;

namespace TradingPost.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string? UserName { get; set; }

        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string? Profile { get; set; } 
        public string? Email { get; set; }
    }
}
