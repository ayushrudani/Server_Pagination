namespace E_Commerce.Comman
{
    public class CommanFunction
    {
    }
    public class UniqueIdGenerator
    {
        private static long counter = 0;

        public static int GenerateUniqueId()
        {
            // Get the current timestamp in milliseconds
            long timestamp = DateTimeOffset.Now.ToUnixTimeMilliseconds();

            // Combine timestamp with a unique identifier (GUID)
            int uniqueId = (int)(timestamp % int.MaxValue); // Ensuring it fits into an integer

            // Increment the counter to ensure uniqueness in case of rapid requests
            counter++;

            return uniqueId;
        }
    }
}
