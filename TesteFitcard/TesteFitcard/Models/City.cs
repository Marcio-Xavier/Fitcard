using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TesteFitcard.Models
{
    [Table("City")]
    public class City
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(100)]
        public string name { get; set; }

        [Required]
        public int stateID { get; set; }

        public ICollection<Company> companies { get; set; }

        public virtual State state { get; set; }
    }
}