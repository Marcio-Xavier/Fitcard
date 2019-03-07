using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TesteFitcard.Models
{
    [Table("Company")]
    public class Company
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(150)]
        [Display(Name = "Razão Social")]
        public string companyName { get; set; }

        [MaxLength(150)]
        [Display(Name = "Nome Fantasia")]
        public string tradingName { get; set; }

        [Required]
        [MaxLength(18)]
        [Index(IsUnique = true)]
        [Display(Name = "CNPJ")]
        public string cnpj { get; set; }

        [MaxLength(320)]
        [Display(Name = "E-Mail")]
        public string email { get; set; }

        [MaxLength(150)]
        [Display(Name = "Endereço")]
        public string address { get; set; }

        [MaxLength(150)]
        [Display(Name = "Bairro")]
        public string neighborhood { get; set; }

        [MaxLength(150)]
        [Display(Name = "Complemento")]
        public string complement { get; set; }

        [MaxLength(15)]
        [Display(Name = "Número")]
        public string number { get; set; }

        [Required]
        [Display(Name = "Estado")]
        public int stateID { get; set; }

        [Required]
        [Display(Name = "Cidade")]
        public int cityID { get; set; }

        [MaxLength(14)]
        [Display(Name = "Telefone")]
        public string telephone { get; set; }

        [Display(Name = "Data de Cadastro")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime? registrationDate { get; set; }

        [Required]
        [Display(Name = "Categoria")]
        public int categoryID { get; set; }

        [Display(Name = "Status")]
        public bool status { get; set; }

        [MaxLength(5)]
        [Display(Name = "Agência")]
        public string bankAgency { get; set; }

        [MaxLength(8)]
        [Display(Name = "Conta")]
        public string bankAccount { get; set; }

        public virtual Category category { get; set; }

        public virtual State state { get; set; }

        public virtual City city { get; set; }
    }
}