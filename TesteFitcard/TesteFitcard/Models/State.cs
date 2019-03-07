using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TesteFitcard.Models
{
    [Table("State")]
    public class State
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(100)]
        public string name { get; set; }

        [Required]
        [MaxLength(2)]
        public string fu { get; set; }

        public ICollection<City> cities { get; set; }
    }
}