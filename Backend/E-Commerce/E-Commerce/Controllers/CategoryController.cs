using E_Commerce.Models;
using E_Commerce.ModelValidator;
using E_Commerce.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Controllers
{

    [ApiController]
    [Route("[controller]/[action]")]
    public class CategoryController : Controller
    {

        #region Validator
        private readonly CategoryValidator validator = new CategoryValidator();
        #endregion

        #region Constructor

        // Constructor to initialize the DbContext
        private readonly MyDbContext _context;

        public CategoryController(MyDbContext context)
        {
            _context = context;
        }

        #endregion

        #region GetAllCategories
        [HttpPost]
        public async Task<IActionResult> GetAllCategories(FilterModel filter)
        {
            // get those records which are contain the search string
            var categories = await _context.Category.Where(x => filter.search == null || x.CategoryName.Contains(filter.search)).ToListAsync();
            var totalRecords = categories.Count();
            // total pages
            filter.totalPages = (int)Math.Ceiling(totalRecords / (double)filter.pageSize);
            var itemPerPage = categories.Skip((filter.page - 1) * filter.pageSize).Take(filter.pageSize).ToList();
            var responseFilter = new
            {
                TotalRecords = totalRecords,
                TotalPages = filter.totalPages,
                CurrentPage = filter.page,
                PageSize = filter.pageSize,
            };
            if (itemPerPage.Count <= 0)
            {

                return Ok(new
                {
                    status = false,
                    message = "No categories found",
                    response = responseFilter
                });
            }


            return Ok(new
            {
                message = "Record Found",
                data = itemPerPage,
                response = responseFilter,
                success = true
            });
        }
        #endregion

        #region GetCategoryByID
        [HttpGet]
        public async Task<IActionResult> GetCategoryByID(int id)
        {
            var category = await _context.Category.FindAsync(id);
            if (category == null)
            {
                return Ok(new
                {
                    message = "Category not found",
                    success = false,
                });
            }

            return Ok(new
            {
                message = "Category found",
                success = true,
                data = category
            });
        }
        #endregion

        #region AddCategories
        [HttpPost]
        public async Task<IActionResult> AddCategory(CategoryModel category)
        {
            var result = validator.Validate(category);
            if (!result.IsValid)
            {
                return Ok(new
                {
                    message = "Validation failed",
                    success = false,
                    data = result.Errors
                });
            }
            _context.Category.Add(category);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Category added successfully",
                success = true,
                data = category
            });
        }

        #endregion

        #region UpdateCategory
        [HttpPut]
        public async Task<IActionResult> UpdateCategory(CategoryModel category)
        {
            var result = validator.Validate(category);
            if (!result.IsValid)
            {
                return Ok(new
                {
                    message = "Validation failed",
                    success = false,
                    data = result.Errors
                });
            }

            _context.Entry(category).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Category updated successfully",
                success = true,
                data = category
            });
        }
        #endregion

        #region DeleteCategory
        [HttpDelete]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Category.FindAsync(id);
            if (category == null)
            {
                return Ok(new
                {
                    message = "Category not found",
                    success = false,
                });
            }

            _context.Category.Remove(category);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Category deleted successfully",
                success = true,
                data = category
            });
        }
        #endregion

        #region CategoryDropDown
        [HttpGet]
        public async Task<IActionResult> CategoryDropDown()
        {
            var categories = await _context.Category.ToListAsync();
            if (categories == null)
            {
                return Ok(new
                {
                    message = "No categories found",
                    success = false,
                });
            }

            return Ok(new
            {
                message = "Categories found",
                success = true,
                data = categories.Select(x => new
                {
                    x.CategoryID,
                    x.CategoryName
                })
            });
        }

        #endregion
    }
}
