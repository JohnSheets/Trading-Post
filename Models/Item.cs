namespace TradingPost.Models
{
    public class Item
    {
        public int Id { get; set; }
        public int SellerId { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public bool Trade { get; set; }
        public int UserProfileId { get; set; }
        public byte[] Picture { get; set; }
    }
}
