namespace DecolaTravel.Exceptions
{
    /*
     * Essa classe define uma exceção personalizada para quando um pacote de 
     * viagem não é encontrado no sistema.
     */
    public class PackageNotFoundException : Exception //Herda de Exception: Permite lançar e capturar esse
                                                     //erro como parte do fluxo de tratamento.
    {
        public PackageNotFoundException(int id)

        //Pode personalizar a MSG aqui  ( ERRO específico )
        : base($"O pacote com ID {id} não foi encontrado. Verifique se o código está correto.") { }
    }

}
