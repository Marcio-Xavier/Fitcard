using System;
using System.Linq;
using TesteFitcard.Models;
using System.Web.Mvc;
using TesteFitcard.DAL;
using PagedList;
using TesteFitcard.ViewModels;
using System.Net;

namespace TesteFitcard.Controllers
{
    public class CategoryController : Controller
    {
        public CategoryController()
        {
            _context = new CompanyContext();
        }

        private CompanyContext db = new CompanyContext();

        private CompanyContext _context;

        // GET: Category
        public ActionResult Index(int? i)
        {
            var categories = _context.categories.ToList();
            return View(_context.categories.ToList().ToPagedList(i ?? 1, 8));
        }

        // GET: Category/Details/id
        public ActionResult Details(int? id)
        {
            var category = _context.categories.SingleOrDefault(c => c.ID == id);

            if (category == null)
            {
                return HttpNotFound();
            }

            return View(category);
        }

        // GET: Category/New
        public ActionResult New()
        {
            var viewModel = new CategoryFormViewModel()
            {
                category = new Category()
            };
            return View("CategoryForm", viewModel);
        }

        // GET: Category/Edit
        public ActionResult Edit(int id)
        {
            var category = _context.categories.SingleOrDefault(c => c.ID == id);

            if (category == null)
            {
                return HttpNotFound();
            }
            var viewModel = new CategoryFormViewModel
            {
                category = category
            };

            return View("CategoryForm", viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Save(Category category)
        {
            if (category.ID == 0)
            {
                _context.categories.Add(category);
            }
            else
            {
                var existCategory = _context.categories.Single(c => c.ID == category.ID);
                existCategory.description = category.description;
            }

            try
            {
                _context.SaveChanges();
            }
            catch (Exception)
            {
                return RedirectToAction("New", "Category");
            }

            return RedirectToAction("Index", "Category");
        }

        // POST: Category/Delete/id
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Category category = db.categories.Find(id);
            db.categories.Remove(category);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}