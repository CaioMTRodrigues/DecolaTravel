using System.Net;
using System.Text.Json;

namespace DecolaTravel.Middlewares
{
    /*
     * Esse middleware captura exceções não tratadas durante o processamento 
     * das requisições e retorna uma resposta JSON padronizada.
     */
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context); // Continua a execução da pipeline
            }
            catch (Exception ex)
            {
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = new
                {
                    status = context.Response.StatusCode,

                    //Aqui vai a MSG mais generica, qnd a específica não captura
                    message = "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",
                    error = ex.GetType().Name

                };

                var json = JsonSerializer.Serialize(response);
                await context.Response.WriteAsync(json);
            }
        }
    }

}
