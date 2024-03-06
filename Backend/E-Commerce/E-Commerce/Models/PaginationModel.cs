namespace E_Commerce.Models
{
	public class PaginationModel
	{
		public int page { get; set; } = 1;

		public int pageSize { get; set; } = 10;

		public int? totalRecords { get; set; }

		public int? totalPages { get; set; }

	}
}
