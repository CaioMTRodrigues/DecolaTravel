using System.ComponentModel.DataAnnotations;

namespace DecolaTravel.Dtos
{
    /*
     * Essa classe representa os dados necessários para criar ou atualizar 
     * um pacote de viagem. Ela é usada para transferir informações entre o 
     * cliente e a API, garantindo que os dados estejam no formato esperado. 
     */
    public class PacoteDto
    {
        [Required]
        public string Titulo { get; set; }

        [Required]
        public string Descricao { get; set; }

        [Required]
        public string Destino { get; set; }

        [Required]
        public int DuracaoDias { get; set; }

        [Required]
        public DateTime DataInicio { get; set; }

        [Required]
        public DateTime DataFim { get; set; }

        [Required]
        public decimal Valor { get; set; }

        public string? ImagemUrl { get; set; }
    }

}
