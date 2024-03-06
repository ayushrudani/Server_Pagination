using System.ComponentModel.DataAnnotations;

namespace E_Commerce.Models
{
    public class SupplierModel
    {
        [Key]
        public int? SupplierID { get; set; }
        public string ContactFName { get; set; }
        public string ContactLName { get; set; }
        public string ContactTitle { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }


        // add picture later
        //public byte[] Logo { get; set; }
        //public string SizeURL { get; set; 
    }
}
