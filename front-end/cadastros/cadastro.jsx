import React, { useState } from "react";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmaSenha: "",
    telefone: "",
    documento: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState(""); // 'error' ou 'success'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validarCampos = () => {
    const { senha, confirmaSenha, telefone } = formData;

    if (senha !== confirmaSenha) {
      setMensagem("As senhas não coincidem.");
      setTipoMensagem("error");
      return false;
    }

    if (!/^\d{10,11}$/.test(telefone)) {
      setMensagem("Telefone inválido. Use apenas números.");
      setTipoMensagem("error");
      return false;
    }

    setMensagem("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarCampos()) return;

    try {
      const resposta = await fetch("https://sua-api.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!resposta.ok) {
        const erro = await resposta.json();
        throw new Error(erro.message || "Erro no cadastro.");
      }

      setMensagem("Cadastro realizado com sucesso!");
      setTipoMensagem("success");
      setFormData({
        nome: "",
        email: "",
        senha: "",
        confirmaSenha: "",
        telefone: "",
        documento: "",
      });
    } catch (err) {
      setMensagem(err.message);
      setTipoMensagem("error");
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.title}>Cadastro</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            required
            minLength={6}
            style={styles.input}
          />
          <input
            type="password"
            name="confirmaSenha"
            placeholder="Confirmação de Senha"
            value={formData.confirmaSenha}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="tel"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="documento"
            placeholder="CPF ou Passaporte"
            value={formData.documento}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Cadastrar
          </button>
        </form>

        {mensagem && (
          <div
            style={{
              ...styles.message,
              color: tipoMensagem === "error" ? "red" : "green",
            }}
          >
            {mensagem}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f7fa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  container: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    width: "100%",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
  message: {
    textAlign: "center",
    marginTop: "1rem",
    fontWeight: "bold",
  },
};

export default Cadastro;
console.log(ok)
