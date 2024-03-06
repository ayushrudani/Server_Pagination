using System.ComponentModel.DataAnnotations;

namespace E_Commerce.Models
{
    public class CategoryModel
    {
        [Key]
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
        public string? Description { get; set; }
    }
}
