using System.Collections.Generic;
using TesteFitcard.Models;

namespace TesteFitcard.ViewModels
{
    public class CompanyFormViewModel
    {
        public IEnumerable<State> states { get; set; }
        public IEnumerable<City> cities { get; set; }
        public IEnumerable<Category> categories { get; set; }
        public Company company { get; set; }

        public string title
        {
            get
            {
                if (company != null && company.ID != 0)
                {
                    return "Editar Estabelecimento";
                }
                return "Novo Estabelecimento";
            }
        }
    }
}