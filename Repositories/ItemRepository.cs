﻿using System.Data;
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

    }
}
