using DecolaTravel.Data;
using DecolaTravel.Dtos;
using DecolaTravel.Exceptions;
using DecolaTravel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace DecolaTravel.Controllers
{
    
    //Define que essa classe é um controlador de API.
    //A rota base será api/pacotes.
    [ApiController]
    [Route("api/packages")]
    public class PackageController : ControllerBase
    {
        //Injeta o contexto do banco de dados para acessar os dados dos pacotes.
        private readonly AppDbContext _context;

        public PackageController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Package>>> GetAllPacotes()
        {
                return await _context.Packages.ToListAsync();
        }

            //Permite buscar pacotes com filtros opcionais: destino, data e preço máximo.
            [HttpGet]
        public async Task<ActionResult<IEnumerable<Package>>> GetPacotes(
            [FromQuery] string? destino,
            [FromQuery] DateTime? data,
            [FromQuery] decimal? precoMax)
        {
            var query = _context.Packages.AsQueryable();

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
        public async Task<ActionResult<Package>> GetPacote(int id)
        {
            var pacote = await _context.Packages.FindAsync(id);

            if (pacote == null) throw new PackageNotFoundException(id); // Chama a classe pra que trata isso 
            return pacote;
        }

        /*
        * Cria um novo pacote com base nos dados recebidos via DTO.
        * Retorna o pacote criado com status 201 (Created).
        */

        [HttpPost]
        public async Task<ActionResult<Package>> CreatePacote(PackageDto dto)
        {
            var newPackage = new Package
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

            _context.Packages.Add(newPackage);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPacote), new { id = newPackage.Id }, newPackage);
        }

        /*
         * Atualiza os dados de um pacote existente.
         * Retorna 404 se o pacote não for encontrado.
         */

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePacote(int id, PackageDto dto)
        {
            var pacote = await _context.Packages.FindAsync(id);
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
            var pacote = await _context.Packages.FindAsync(id);
            if (pacote == null) throw new PackageNotFoundException(id); // Chama a classe pra que trata isso 

            _context.Packages.Remove(pacote);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
