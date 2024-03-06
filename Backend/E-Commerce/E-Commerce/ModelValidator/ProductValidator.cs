using E_Commerce.Models;
using FluentValidation;

namespace E_Commerce.ModelValidator
{
    public class ProductValidator : AbstractValidator<ProductModel>
    {
        public ProductValidator()
        {
            RuleFor(p => p.ProductName).NotEmpty().WithMessage("Product Name is required");
            RuleFor(p => p.ProductName).MaximumLength(50).WithMessage("Product Name can not be more than 50 characters");
            RuleFor(p => p.ProductDescription).NotEmpty().WithMessage("Product Description is required");
            RuleFor(p => p.SupplierID).NotEmpty().WithMessage("Supplier ID is required");
            RuleFor(p => p.CategoryID).NotEmpty().WithMessage("Category ID is required");
            RuleFor(p => p.UnitPrice).NotEmpty().WithMessage("Unit Price is required");
            RuleFor(p => p.Price).NotEmpty().WithMessage("Price is required");
            RuleFor(p => p.ProductAvailable).NotEmpty().WithMessage("Product Available is required");
            RuleFor(product => product).Custom((product, context) =>
            {
                if (product.DiscountAvailable && product.Discount == null)
                {
                    context.AddFailure(nameof(product.Discount), "Discount is required when DiscountAvailable is true.");
                }
            });
            RuleFor(p => p.AvailableItems).NotEmpty().WithMessage("Available Items is required");
        }
    }
}
