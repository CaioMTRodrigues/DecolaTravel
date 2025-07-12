const { useState, useEffect } = React;

function ListagemPacotes() {
  // Filtros
  const [destinoFiltro, setDestinoFiltro] = useState("");
  const [dataInicioFiltro, setDataInicioFiltro] = useState("");
  const [dataFimFiltro, setDataFimFiltro] = useState("");
  const [valorMinFiltro, setValorMinFiltro] = useState("");
  const [valorMaxFiltro, setValorMaxFiltro] = useState("");

  // Pacotes listados
  const [pacotes, setPacotes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dados mockados
  const mockPacotes = [
    {
      id: 1,
      titulo: "Praia Paradisíaca",
      descricao: "Aproveite dias de sol e mar cristalino",
      destino: "Bahamas",
      datasDisponiveis: ["2025-08-01", "2025-08-15"],
      valor: 4500,
    },
    {
      id: 2,
      titulo: "Tour Cultural Europeu",
      descricao: "Conheça museus e arquitetura histórica",
      destino: "Europa",
      datasDisponiveis: ["2025-09-10", "2025-09-25"],
      valor: 6200,
    },
    {
      id: 3,
      titulo: "Aventura nas Montanhas",
      descricao: "Trilhas e esportes radicais para os aventureiros",
      destino: "Serra Gaúcha",
      datasDisponiveis: ["2025-07-05", "2025-07-20"],
      valor: 3800,
    },
    {
      id: 4,
      titulo: "Relax no Spa",
      descricao: "Descanso e bem-estar em hotel de luxo",
      destino: "Bahamas",
      datasDisponiveis: ["2025-08-05", "2025-08-18"],
      valor: 5200,
    },
  ];

  // Função que simula chamada API com filtros aplicados
  const fetchPacotes = () => {
    setLoading(true);

    // Simula atraso
    setTimeout(() => {
      let resultado = mockPacotes;

      if (destinoFiltro)
        resultado = resultado.filter(
          (p) =>
            p.destino.toLowerCase().includes(destinoFiltro.toLowerCase())
        );

      if (dataInicioFiltro)
        resultado = resultado.filter((p) =>
          p.datasDisponiveis.some((d) => d >= dataInicioFiltro)
        );

      if (dataFimFiltro)
        resultado = resultado.filter((p) =>
          p.datasDisponiveis.some((d) => d <= dataFimFiltro)
        );

      if (valorMinFiltro)
        resultado = resultado.filter((p) => p.valor >= Number(valorMinFiltro));

      if (valorMaxFiltro)
        resultado = resultado.filter((p) => p.valor <= Number(valorMaxFiltro));

      setPacotes(resultado);
      setLoading(false);
    }, 700);
  };

  // Atualiza lista quando filtros mudam
  useEffect(() => {
    fetchPacotes();
  }, [destinoFiltro, dataInicioFiltro, dataFimFiltro, valorMinFiltro, valorMaxFiltro]);

  return (
    <div className="container">
      <h1>Pacotes Disponíveis</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Filtrar por destino"
          value={destinoFiltro}
          onChange={(e) => setDestinoFiltro(e.target.value)}
        />
        <input
          type="date"
          placeholder="Data início"
          value={dataInicioFiltro}
          onChange={(e) => setDataInicioFiltro(e.target.value)}
        />
        <input
          type="date"
          placeholder="Data fim"
          value={dataFimFiltro}
          onChange={(e) => setDataFimFiltro(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor mínimo"
          min="0"
          value={valorMinFiltro}
          onChange={(e) => setValorMinFiltro(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor máximo"
          min="0"
          value={valorMaxFiltro}
          onChange={(e) => setValorMaxFiltro(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Carregando pacotes...</p>
      ) : pacotes.length > 0 ? (
        <div className="cards">
          {pacotes.map((pacote) => (
            <div key={pacote.id} className="card">
              <h3>{pacote.titulo}</h3>
              <p><strong>Destino:</strong> {pacote.destino}</p>
              <p>{pacote.descricao}</p>
              <p><strong>Datas disponíveis:</strong> {pacote.datasDisponiveis.join(", ")}</p>
              <p className="valor">R$ {pacote.valor.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum pacote encontrado com os filtros aplicados.</p>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ListagemPacotes />);