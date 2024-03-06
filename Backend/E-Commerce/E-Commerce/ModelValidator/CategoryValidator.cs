using E_Commerce.Models;
using FluentValidation;

namespace E_Commerce.ModelValidator
{
    public class CategoryValidator : AbstractValidator<CategoryModel>
    {

        public CategoryValidator()
        {
            RuleFor(x => x.CategoryName).NotEmpty().WithMessage("Category Name is required");
            RuleFor(x => x.CategoryName).MaximumLength(50).WithMessage("Category Name can not be more than 50 characters");
        }
    }
}
