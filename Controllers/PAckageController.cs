using Microsoft.AspNetCore.Mvc;
using System;

namespace DecolaTravel.Controllers
{
    public class PackageController
    //Define que essa classe é um controlador de API.
    //A rota base será api/pacotes.
    [ApiController]
    [Route("api/[controller]")]
    public class PacotesController : ControllerBase
    {
        //Injeta o contexto do banco de dados para acessar os dados dos pacotes.
        private readonly AppDbContext _context;

        public PacotesController(AppDbContext context)
        {
            _context = context;
        }

        //Permite buscar pacotes com filtros opcionais: destino, data e preço máximo.
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pacote>>> GetPacotes(
            [FromQuery] string? destino,
            [FromQuery] DateTime? data,
            [FromQuery] decimal? precoMax)
        {
            var query = _context.Pacotes.AsQueryable();

            if (!string.IsNullOrEmpty(destino))
                query = query.Where(p => p.Destino.Contains(destino));

            if (data.HasValue)
                query = query.Where(p => p.DataInicio <= data && p.DataFim >= data);

            if (precoMax.HasValue)
                query = query.Where(p => p.Valor <= precoMax);

            return await query.ToListAsync();
        }

        /*
         * Retorna um pacote específico pelo ID.
         * Lança exceção personalizada se não for encontrado.
         */

        [HttpGet("{id}")]
        public async Task<ActionResult<Pacote>> GetPacote(int id)
        {
            var pacote = await _context.Pacotes.FindAsync(id);

            if (pacote == null) throw new PacoteNotFoundException(id); // Chama a classe pra que trata isso 
            return pacote;
        }

        /*
        * Cria um novo pacote com base nos dados recebidos via DTO.
        * Retorna o pacote criado com status 201 (Created).
        */

        [HttpPost]
        public async Task<ActionResult<Pacote>> CreatePacote(PacoteCreateDto dto)
        {
            var pacote = new Pacote
            {
                Titulo = dto.Titulo,
                Descricao = dto.Descricao,
                Destino = dto.Destino,
                DuracaoDias = dto.DuracaoDias,
                DataInicio = dto.DataInicio,
                DataFim = dto.DataFim,
                Valor = dto.Valor,
                ImagemUrl = dto.ImagemUrl
            };

            _context.Pacotes.Add(pacote);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPacote), new { id = pacote.Id }, pacote);
        }

        /*
         * Atualiza os dados de um pacote existente.
         * Retorna 404 se o pacote não for encontrado.
         */

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePacote(int id, PacoteCreateDto dto)
        {
            var pacote = await _context.Pacotes.FindAsync(id);
            if (pacote == null)
                return NotFound();

            pacote.Titulo = dto.Titulo;
            pacote.Descricao = dto.Descricao;
            pacote.Destino = dto.Destino;
            pacote.DuracaoDias = dto.DuracaoDias;
            pacote.DataInicio = dto.DataInicio;
            pacote.DataFim = dto.DataFim;
            pacote.Valor = dto.Valor;
            pacote.ImagemUrl = dto.ImagemUrl;

            await _context.SaveChangesAsync();

            return NoContent();
        }
        /*
         *  Remove um pacote pelo ID.
         *  Lança exceção personalizada se não for encontrado. 
         */

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePacote(int id)
        {
            var pacote = await _context.Pacotes.FindAsync(id);
            if (pacote == null) throw new PacoteNotFoundException(id); // Chama a classe pra que trata isso 

            _context.Pacotes.Remove(pacote);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}