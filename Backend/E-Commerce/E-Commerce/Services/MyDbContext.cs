using E_Commerce.Models;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Services
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
        }
        public DbSet<CategoryModel> Category { get; set; }

        public DbSet<SupplierModel> Supplier { get; set; }

        public DbSet<ProductModel> Product { get; set; }



    }
}
