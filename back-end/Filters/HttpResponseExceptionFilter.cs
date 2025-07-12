using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DecolaTravel.Filters
{
    //Esse filtro trata exceções lançadas durante a execução de ações nos controladores da API.
    public class HttpResponseExceptionFilter : IExceptionFilter //permitindo interceptar exceções
                                                                //não tratadas.
    {
        public void OnException(ExceptionContext context)
        {
            if (context.Exception is Exceptions.PackageNotFoundException ex)
            {

                var brasiliaTimeZone = TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time");
                var localTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, brasiliaTimeZone);

                context.Result = new NotFoundObjectResult(new
                {
                    status = 404,
                    message = ex.Message,
                    timestamp = localTime.ToString("dd/MM/yyyy HH:mm:ss") // Formato brasileiro
                });
                context.ExceptionHandled = true;
            }
        }
    }
}