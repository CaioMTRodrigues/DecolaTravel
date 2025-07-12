using System.ComponentModel.DataAnnotations;

namespace DecolaTravel.Models
{
    public class Package
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Titulo { get; set; } = string.Empty;

        [Required]
        [StringLength(500)]
        public string Descricao { get; set; }

        [Required]
        [StringLength(100)]
        public string Destino { get; set; }

        [Required]
        public int DuracaoDias { get; set; }

        [Required]
        public DateTime DataInicio { get; set; }

        [Required]
        public DateTime DataFim { get; set; }

        [Required]
        [Range(0.01, double.MaxValue)]
        public decimal Valor { get; set; }

        public string? ImagemUrl { get; set; }
    }

}
