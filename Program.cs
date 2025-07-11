using DecolaTravel.Data;
using Microsoft.EntityFrameworkCore;
using DecolaTravel.Filters;
using DecolaTravel.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// Servi�os
builder.Services.AddControllers(options =>
{
    options.Filters.Add<HttpResponseExceptionFilter>();
});

builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseInMemoryDatabase("PacotesDb")); // UseSqlServer para produ��o

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Pipeline
app.UseHttpsRedirection(); // Pode ser comentado se HTTPS n�o estiver configurado
app.UseAuthorization();
app.UseMiddleware<ErrorHandlingMiddleware>();

app.MapControllers();

app.Run();
