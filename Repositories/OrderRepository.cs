using Azure;
using TradingPost.Models;
using TradingPost.Utils;

namespace TradingPost.Repositories
{
    public class OrderRepository : BaseRepository, IOrderRepository
    {
        public OrderRepository(IConfiguration configuration) : base(configuration) { }

        public List<Order> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id, ItemId, UserProfileId
                FROM [Order]";

                    var reader = cmd.ExecuteReader();

                    var orders = new List<Order>();
                    while (reader.Read())
                    {
                        orders.Add(new Order()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ItemId = DbUtils.GetInt(reader, "ItemId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId")
                        });
                    }

                    reader.Close();

                    return orders;
                }
            }
        }
        public Order GetOrderById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"
                        SELECT Id, ItemId, UserProfileId
                        FROM [Order]
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Order order = null;
                    if (reader.Read())
                    {
                        order = new Order()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ItemId = DbUtils.GetInt(reader, "ItemId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId")
                        };
                    }

                    reader.Close();

                    return order;
                }
            }
        }
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Order WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
