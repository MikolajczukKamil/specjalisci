using Npgsql;

namespace HelpHunterBE.utils
{
    public static class NpgsqlUtils
    {
        public static T? GetNullableField<T>(this NpgsqlDataReader reader, int ordinal)
        {
            try
            {
                return reader.GetFieldValue<T>(ordinal);
            }
            catch
            {
                return default;
            }
        }
    }
}
