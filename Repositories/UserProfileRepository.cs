
using System.Data;
using TradingPost.Models;
using TradingPost.Utils;


namespace TradingPost.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT up.Id, up.UserName, up.Profile, up.Email
                FROM UserProfile up";

                    var reader = cmd.ExecuteReader();

                    var userProfiles = new List<UserProfile>();
                    while (reader.Read())
                    {
                        userProfiles.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserName = DbUtils.GetString(reader, "UserName"),

                            // Read binary data as a byte array from the reader using GetBytes method
                            Profile = ReadBinaryData(reader, "Profile"),

                            Email = DbUtils.GetString(reader, "Email")
                        });
                    }

                    reader.Close();

                    return userProfiles;
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
    }
}