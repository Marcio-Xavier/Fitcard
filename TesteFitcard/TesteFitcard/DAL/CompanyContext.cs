using System.Data.Entity;
using TesteFitcard.Models;

namespace TesteFitcard.DAL
{
    public class CompanyContext : DbContext
    {
        public CompanyContext() : base("CompanyContext")
        {
        }

        public static CompanyContext Create()
        {
            return new CompanyContext();
        }

        public DbSet<Company> companies { get; set; }
        public DbSet<Category> categories { get; set; }
        public DbSet<State> states { get; set; }
        public DbSet<City> cities { get; set; }

    }
}