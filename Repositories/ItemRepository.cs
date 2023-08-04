using Azure;
using System.Data;
using TradingPost.Models;
using TradingPost.Utils;
 
namespace TradingPost.Repositories
{
    public class ItemRepository : BaseRepository, IItemRepository
    {
        public ItemRepository(IConfiguration configuration) : base(configuration) { }

        public List<Item> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT I.Id, I.SellerId, I.Description, I.Price, I.Trade, I.UserProfileId, I.Picture
                FROM Item I";

                    var reader = cmd.ExecuteReader();

                    var items = new List<Item>();
                    while (reader.Read())
                    {
                        items.Add(new Item()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            SellerId = DbUtils.GetInt(reader, "SellerId"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Price = DbUtils.GetInt(reader, "Price"),
                            Trade = reader.GetBoolean(reader.GetOrdinal("Trade")),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Picture = ReadBinaryData(reader, "Picture")
                        });
                    }

                    reader.Close();

                    return items;
                }
            }
        }

        private byte[] ReadBinaryData(IDataReader reader, string columnName)
        {
            // Check if the column is not DBNull
            if (!reader.IsDBNull(reader.GetOrdinal(columnName)))
            {
                long bufferSize = reader.GetBytes(reader.GetOrdinal(columnName), 0, null, 0, 0); // Get the size of the binary data
                byte[] buffer = new byte[bufferSize];
                reader.GetBytes(reader.GetOrdinal(columnName), 0, buffer, 0, (int)bufferSize); // Read binary data into the buffer
                return buffer;
            }

            return null;
        }
        public List <Item> GetItemByUserId(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"
                        SELECT I.Id as ItemId,
                        I.Description, I.Price, I.Trade, I.UserProfileId, I.Picture
                        FROM Item I
                        JOIN UserProfile up ON I.UserProfileId = up.Id
                        WHERE I.UserProfileId = @UserProfileId";

                    DbUtils.AddParameter(cmd, "@UserProfileId", userProfileId);

                    var reader = cmd.ExecuteReader();

                    var items = new List<Item>();
                    while (reader.Read())
                    {
                        items.Add(new Item()
                        {
                            Id = DbUtils.GetInt(reader, "ItemId"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Price = DbUtils.GetInt(reader, "Price"),
                            Trade = reader.GetBoolean(reader.GetOrdinal("Trade")),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Picture = ReadBinaryData(reader, "Picture")
                        });
                    }

                    reader.Close();

                    return items;
                }
            }
        }
        public void Add(Item item)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Item (Description, Price, Trade, UserProfileId, Picture)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Description, @Price, @Trade, @UserProfileId, @Picture)";
                    DbUtils.AddParameter(cmd, "@Description", item.Description);
                    DbUtils.AddParameter(cmd, "@Price", item.Price);
                    DbUtils.AddParameter(cmd, "@Trade", item.Trade);
                    DbUtils.AddParameter(cmd, "@UserProfileId", item.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Picture", item.Picture);


                    item.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = "DELETE FROM Item WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Item item)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Item
                           SET Description = @Description,
                            Price = @Price,
                            Trade = @Trade,
                            UserProfileId = @UserProfileId,
                            Picture = @Picture
                           WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Description", item.Description);
                    DbUtils.AddParameter(cmd, "@Price", item.Price);
                    DbUtils.AddParameter(cmd, "@Trade", item.Trade);
                    DbUtils.AddParameter(cmd, "@UserProfileId", item.UserProfileId);
                    cmd.Parameters.AddWithValue("@Picture", item.Picture);
                    DbUtils.AddParameter(cmd, "@Id", item.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
