const { useState } = React;

function CadastroPacote() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [destino, setDestino] = useState("");
  const [duracao, setDuracao] = useState("");
  const [dataDisponivel, setDataDisponivel] = useState("");
  const [datas, setDatas] = useState([]);
  const [valor, setValor] = useState("");
  const [arquivo, setArquivo] = useState(null);
  const [mensagem, setMensagem] = useState("");

  const adicionarData = () => {
    if (dataDisponivel && !datas.includes(dataDisponivel)) {
      setDatas([...datas, dataDisponivel]);
      setDataDisponivel("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("destino", destino);
    formData.append("duracao", duracao);
    formData.append("valor", valor);
    formData.append("datas", JSON.stringify(datas));
    if (arquivo) {
      formData.append("arquivo", arquivo);
    }

    try {
      // Simulando chamada a API de cadastro
      await new Promise((res) => setTimeout(res, 1000));
      console.log("Pacote enviado:", Object.fromEntries(formData));
      setMensagem("Pacote cadastrado com sucesso!");
      limparFormulario();
    } catch (error) {
      setMensagem("Erro ao cadastrar pacote.");
    }
  };

  const limparFormulario = () => {
    setTitulo("");
    setDescricao("");
    setDestino("");
    setDuracao("");
    setValor("");
    setDatas([]);
    setArquivo(null);
    setDataDisponivel("");
  };

  return (
    <div className="form-container">
      <h2>Cadastrar Novo Pacote</h2>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        ></textarea>

        <input
          type="text"
          placeholder="Destino"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Duração (dias)"
          value={duracao}
          onChange={(e) => setDuracao(e.target.value)}
          required
        />

        <div>
          <input
            type="date"
            value={dataDisponivel}
            onChange={(e) => setDataDisponivel(e.target.value)}
          />
          <button type="button" onClick={adicionarData}>+ Adicionar Data</button>
          <div>
            {datas.map((data, index) => (
              <span key={index}>{data} </span>
            ))}
          </div>
        </div>

        <input
          type="number"
          placeholder="Valor (R$)"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/,video/"
          onChange={(e) => setArquivo(e.target.files[0])}
        />

        <button type="submit">Cadastrar Pacote</button>
      </form>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<CadastroPacote />);