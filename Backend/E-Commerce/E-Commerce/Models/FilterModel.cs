namespace E_Commerce.Models
{
	public class FilterModel
	{
		public int page { get; set; } = 1;

		public int pageSize { get; set; } = 10;

		public int totalPages { get; set; }

		public string? search { get; set; }

	}
}
