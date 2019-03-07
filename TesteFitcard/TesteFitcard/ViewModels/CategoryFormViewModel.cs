using TesteFitcard.Models;

namespace TesteFitcard.ViewModels
{
    public class CategoryFormViewModel
    {
        public Category category { get; set; }
        //public Company company { get; set; }
        public string title
        {
            get
            {
                if (category != null && category.ID != 0)
                {
                    return "Editar Categoria";
                }
                return "Nova Categoria";
            }
        }
    }
}