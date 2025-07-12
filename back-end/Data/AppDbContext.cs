using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace DecolaTravel.Data
{
    /*
     *Essa classe representa o contexto de banco de dados da aplicação, usada pelo 
     *Entity Framework Core para mapear e gerenciar entidades no banco. 
     */

    public class AppDbContext : DbContext //Classe base do EF Core que gerencia a conexão
                                          //com o banco e o rastreamento de entidades.
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        /*
         * DbSet<Pacote> Pacotes: Representa a tabela de pacotes no banco de dados, 
         * permitindo consultas e operações CRUD.
         */
        public DbSet<Models.Package> Packages { get; set; }
    }
}