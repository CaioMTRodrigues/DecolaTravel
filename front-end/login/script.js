document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const erroMensagem = document.getElementById("erroMensagem");

  erroMensagem.textContent = "";

  try {
    const dados = await mockApiLogin(email, senha);

    // Armazenando token e perfil
    localStorage.setItem("token", dados.token);
    localStorage.setItem("perfil", dados.usuario.perfil);

    // Redirecionamento
    if (dados.usuario.perfil === "admin") {
      window.location.href = "/admin/dashboard";
    } else {
      window.location.href = "/my-account";
    }
  } catch (err) {
    erroMensagem.textContent = err.message;
  }
});

// API fictícia simulada
async function mockApiLogin(email, senha) {
  await new Promise((res) => setTimeout(res, 500)); // atraso

  const usuarios = [
    {
      email: "admin@email.com",
      senha: "123456",
      perfil: "admin",
      token: "admin.token.jwt"
    },
    {
      email: "usuario@email.com",
      senha: "123456",
      perfil: "user",
      token: "user.token.jwt"
    }
  ];

  const usuario = usuarios.find(
    (u) => u.email === email && u.senha === senha
  );

  if (!usuario) {
    throw new Error("Credenciais inválidas");
  }

  return {
    token: usuario.token,
    usuario: {
      nome: usuario.email.split("@")[0],
      perfil: usuario.perfil
    }
  };
}