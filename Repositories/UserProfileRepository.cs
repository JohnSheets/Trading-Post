
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

        public UserProfile GetProfileById(int Id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"
                        SELECT up.Id, up.UserName, up.Profile, up.Email
                        FROM UserProfile up
                        WHERE up.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", Id);

                    var reader = cmd.ExecuteReader();
                    UserProfile userProfile = null;

                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserName = DbUtils.GetString(reader, "UserName"),
                            Profile = ReadBinaryData(reader, "Profile"),
                            Email = DbUtils.GetString(reader, "Email")
                        };
                    }

                    reader.Close();

                    return userProfile;
                }
            }
        }
        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (UserName, Profile, Email)
                                        OUTPUT INSERTED.ID
                                        VALUES (@UserName, @Profile, @Email)";
                    DbUtils.AddParameter(cmd, "@UserName", userProfile.UserName);
                    cmd.Parameters.AddWithValue("@Profile", userProfile.Profile);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(UserProfile userProfile) //Dosen't like profile cause its varbinary
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"
                        UPDATE UserProfile
                           SET [UserName] = @UserName,
                               [Profile] = @Profile,
                               [Email] = @Email
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@UserName", userProfile.UserName);
                    cmd.Parameters.AddWithValue("@Profile", userProfile.Profile);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@Id", userProfile.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}