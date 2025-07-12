const { useState, useEffect } = React;

function DetalhesPacote() {
  const [pacote, setPacote] = useState(null);
  const [loading, setLoading] = useState(true);

  // ID do pacote (simulado — em um app real viria da URL com react-router)
  const pacoteId = 2;

  const pacotesMock = [
    {
      id: 1,
      titulo: "Praia Paradisíaca",
      descricao: "Aproveite dias de sol e mar cristalino em um paraíso tropical.",
      destino: "Bahamas",
      fotos: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=60",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=60"
      ],
      datasDisponiveis: ["2025-08-01", "2025-08-15"],
      valor: 4500
    },
    {
      id: 2,
      titulo: "Tour Cultural Europeu",
      descricao: "Conheça museus, arquitetura histórica e a rica cultura europeia.",
      destino: "Europa",
      fotos: [
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=60",
        "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=600&q=60"
      ],
      datasDisponiveis: ["2025-09-10", "2025-09-25"],
      valor: 6200
    }
  ];

  useEffect(() => {
    // Simulando busca na API com delay
    setLoading(true);
    setTimeout(() => {
      const pacoteEncontrado = pacotesMock.find(p => p.id === pacoteId);
      setPacote(pacoteEncontrado || null);
      setLoading(false);
    }, 700);
  }, []);

  if (loading) {
    return <p>Carregando pacote...</p>;
  }

  if (!pacote) {
    return <p>Pacote não encontrado.</p>;
  }

  return (
    <div className="container">
      <h1>{pacote.titulo}</h1>
      <p>{pacote.descricao}</p>

       

      <div className="dates">
        <strong>Datas disponíveis:</strong> {pacote.datasDisponiveis.join(", ")}
      </div>

      <div className="valor">
        Valor: R$ {pacote.valor.toFixed(2)}
      </div>

      <button className="button-voltar" onClick={() => window.history.back()}>
        Voltar
      </button>
    </div>
  );
}

// Renderiza o componente na div root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<DetalhesPacote />);