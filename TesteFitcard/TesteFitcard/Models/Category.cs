using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TesteFitcard.Models
{
    [Table("Category")]
    public class Category
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(100)]
        [Display(Name = "Descrição")]
        public string description { get; set; }

        public ICollection<Company> companies { get; set; }
    }
}