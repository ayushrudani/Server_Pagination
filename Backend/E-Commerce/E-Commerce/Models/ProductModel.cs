using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_Commerce.Models
{
    public class ProductModel
    {
        [Key]

        public int? ProductID { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }


        //fk to supplier
        public int SupplierID { get; set; }

        //fk to category
        public int CategoryID { get; set; }
        public string? QuantityPerUnit { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal UnitPrice { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Price { get; set; }
        public string? AvailableSize { get; set; }
        public string? AvailableColors { get; set; }
        public string? Size { get; set; }
        public string? Color { get; set; }

        [Column(TypeName = "decimal(4,2)")]
        public decimal? Discount { get; set; }
        public bool ProductAvailable { get; set; }
        public bool DiscountAvailable { get; set; }
        public int AvailableItems { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }

        public string? ImageSrc { get; set; }
        // add picture later
        //public byte[] Picture { get; set; }

    }
}
