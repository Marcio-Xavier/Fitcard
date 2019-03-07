using System;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using TesteFitcard.DAL;
using TesteFitcard.Models;
using TesteFitcard.ViewModels;
using PagedList;

namespace TesteFitcard.Controllers
{
    public class CompanyController : Controller
    {
        public CompanyController()
        {
            _context = new CompanyContext();
        }

        private CompanyContext db = new CompanyContext();

        private CompanyContext _context;

        // GET: Companies
        public ActionResult Index(int? i)
        {
            var companies = _context.companies
                .Include(c => c.state)
                .Include(c => c.city)
                .Include(c => c.category)
                .ToList();
            return View(_context.companies.ToList().ToPagedList(i ?? 1, 8));
        }

        // GET: Company/Details/id
        public ActionResult Details(int? id)
        {
            var company = _context.companies
                .Include(c => c.state)
                .Include(c => c.city)
                .Include(c => c.category)
                .SingleOrDefault(c => c.ID == id);

            if (company == null)
            {
                return HttpNotFound();
            }

            return View(company);
        }

        // GET: Company/New
        public ActionResult New()
        {
            var states = _context.states.ToList();
            var cities = _context.cities.ToList();
            var categories = _context.categories.ToList();

            var viewModel = new CompanyFormViewModel
            {
                states = states,
                cities = cities,
                categories = categories
            };

            return View("CompanyForm", viewModel);
        }

        // GET: Company/Edit
        public ActionResult Edit(int id)
        {
            var company = _context.companies.SingleOrDefault(c => c.ID == id);

            if (company == null)
            {
                return HttpNotFound();
            }
            var viewModel = new CompanyFormViewModel
            {
                company = company,
                states = _context.states.ToList(),
                cities = _context.cities.ToList(),
                categories = _context.categories.ToList()
            };

            return View("CompanyForm", viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Save(Company company)
        {
            if (company.ID == 0)//Nova empresa
            {
                _context.companies.Add(company);
            }
            else//Editando empresa
            {
                var existCompany = _context.companies.Single(c => c.ID == company.ID);

                existCompany.companyName = company.companyName;
                existCompany.tradingName = company.tradingName;
                existCompany.cnpj = company.cnpj;
                existCompany.email = company.email;
                existCompany.address = company.address;
                existCompany.neighborhood = company.neighborhood;
                existCompany.complement = company.complement;
                existCompany.number = company.number;
                existCompany.telephone = company.telephone;
                existCompany.registrationDate = company.registrationDate;
                existCompany.status = company.status;
                existCompany.bankAgency = company.bankAgency;
                existCompany.bankAccount = company.bankAccount;

                existCompany.stateID = company.stateID;
                existCompany.cityID = company.cityID;
                existCompany.categoryID = company.categoryID;
            }

            try
            {
                _context.SaveChanges();
            }
            catch (Exception)
            {
                return RedirectToAction("New", "Company");
            }

            return RedirectToAction("Index", "Company");
        }

        // POST: Company/Delete/id
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Company company = db.companies.Find(id);
            db.companies.Remove(company);
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

        //Retorna as Cidades de acordo com o Estado passado
        public ActionResult GetCities(int stateID)
        {
            return Json(db.cities.Where(c => c.stateID == stateID).Select(c => new
            {
                Id = c.ID,
                Name = c.name
            }).ToList(), JsonRequestBehavior.AllowGet);
        }

        //Retorna se o CNPJ já Existe 
        public ActionResult GetExistingCnpj(string cnpj)
        {
            return Json(db.companies
                .Where(c => c.cnpj == cnpj)
                .Select(c => new
                {
                    Id = c.ID,
                    Cnpj = c.cnpj
                }).ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}
