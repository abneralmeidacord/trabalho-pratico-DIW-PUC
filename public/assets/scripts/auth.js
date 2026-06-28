/* URL base do json-server */
const URL_BASE = "http://localhost:3000";

/* Essa variável guarda o avatar escolhido pelo usuário */
let avatarEscolhido = "";


/* Função para mostrar mensagens de erro na tela */
function mostrarErro(mensagem) {
    const msgErro = document.getElementById("msg-erro");
    const msgSucesso = document.getElementById("msg-sucesso");

    if (msgErro) {
        msgErro.textContent = mensagem;
        msgErro.style.display = "block";
    }

    if (msgSucesso) {
        msgSucesso.style.display = "none";
    }
}


/* Função para mostrar mensagens de sucesso na tela */
function mostrarSucesso(mensagem) {
    const msgErro = document.getElementById("msg-erro");
    const msgSucesso = document.getElementById("msg-sucesso");

    if (msgSucesso) {
        msgSucesso.textContent = mensagem;
        msgSucesso.style.display = "block";
    }

    if (msgErro) {
        msgErro.style.display = "none";
    }
}


/* Função para mostrar ou esconder a senha */
function toggleSenha(idCampo, botao) {
    const campoSenha = document.getElementById(idCampo);

    if (campoSenha.type === "password") {
        campoSenha.type = "text";
        botao.textContent = "x";
    } else {
        campoSenha.type = "password";
        botao.textContent = "👁";
    }
}


/* Função que carrega os heróis para escolher a foto de perfil */
async function carregarAvatares() {
    const listaAvatares = document.getElementById("lista-avatares");

    if (!listaAvatares) {
        return;
    }

    try {
        const resposta = await fetch(`${URL_BASE}/heroes`);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar heróis");
        }

        const heroes = await resposta.json();

        listaAvatares.innerHTML = "";

        if (heroes.length === 0) {
            listaAvatares.innerHTML = "<p class='erro-avatar'>No heroes found.</p>";
            return;
        }

        heroes.forEach(function (hero) {
            /* Só mostra o herói se ele tiver imagem */
            if (!hero.hero_img) {
                return;
            }

            const botaoAvatar = document.createElement("button");
            botaoAvatar.type = "button";
            botaoAvatar.classList.add("avatar-opcao");

            botaoAvatar.innerHTML = `
                <img src="${hero.hero_img}" alt="${hero.hero}">
                <span>${hero.hero}</span>
            `;

            /* Quando clicar, salva o avatar escolhido */
            botaoAvatar.addEventListener("click", function () {
                avatarEscolhido = hero.hero_img;

                const todosAvatares = document.querySelectorAll(".avatar-opcao");

                todosAvatares.forEach(function (avatar) {
                    avatar.classList.remove("selecionado");
                });

                botaoAvatar.classList.add("selecionado");
            });

            listaAvatares.appendChild(botaoAvatar);
        });

    } catch (erro) {
        console.log("Erro ao carregar heróis:", erro);
        listaAvatares.innerHTML = "<p class='erro-avatar'>Error loading heroes. Check if json-server is running.</p>";
    }
}


/* Função que cadastra um novo usuário */
async function cadastrarUsuario(evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const login = document.getElementById("login").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const confirmarSenha = document.getElementById("confirmar-senha").value.trim();
    const btnCadastro = document.getElementById("btn-cadastro");

    /* Validação simples dos campos */
    if (nome === "" || login === "" || senha === "" || confirmarSenha === "") {
        mostrarErro("Please fill in all fields.");
        return;
    }

    if (senha !== confirmarSenha) {
        mostrarErro("Passwords do not match.");
        return;
    }

    if (avatarEscolhido === "") {
        mostrarErro("Choose a profile picture.");
        return;
    }

    btnCadastro.disabled = true;
    btnCadastro.textContent = "Creating account...";

    try {
        const respostaUsuarios = await fetch(`${URL_BASE}/users?login=${login}`);
        const usuarios = await respostaUsuarios.json();

        /* Verifica se já existe usuário com esse login */
        if (usuarios.length > 0) {
            mostrarErro("This username is already being used.");

            btnCadastro.disabled = false;
            btnCadastro.textContent = "Create account →";

            return;
        }

        const novoUsuario = {
            nome: nome,
            login: login,
            senha: senha,
            fotoPerfil: avatarEscolhido
        };

        await fetch(`${URL_BASE}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoUsuario)
        });

        mostrarSucesso("Account created successfully!");

        setTimeout(function () {
            window.location.href = "login.html";
        }, 1000);

    } catch (erro) {
        console.log("Erro ao cadastrar usuário:", erro);

        mostrarErro("Could not create account. Check if json-server is running.");

        btnCadastro.disabled = false;
        btnCadastro.textContent = "Create account →";
    }
}


/* Função que faz o login do usuário */
async function fazerLogin(evento) {
    evento.preventDefault();

    const login = document.getElementById("login").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const btnLogin = document.getElementById("btn-login");

    /* Validação simples dos campos */
    if (login === "" || senha === "") {
        mostrarErro("Please fill in all fields.");
        return;
    }

    btnLogin.disabled = true;
    btnLogin.textContent = "Logging in...";

    try {
        const resposta = await fetch(`${URL_BASE}/users?login=${login}`);
        const usuarios = await resposta.json();

        /* Procura um usuário com o mesmo login e senha */
        const usuarioEncontrado = usuarios.find(function (usuario) {
            return usuario.login === login && usuario.senha === senha;
        });

        if (!usuarioEncontrado) {
            mostrarErro("Incorrect username or password.");

            btnLogin.disabled = false;
            btnLogin.textContent = "Log In →";

            return;
        }

        /* Salva o usuário logado na sessão do navegador */
        sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

        mostrarSucesso("Login successful!");

        setTimeout(function () {
            window.location.href = "index.html";
        }, 1000);

    } catch (erro) {
        console.log("Erro ao fazer login:", erro);

        mostrarErro("Could not connect to the server. Check if json-server is running.");

        btnLogin.disabled = false;
        btnLogin.textContent = "Log In →";
    }
}


/* Função para mostrar o usuário logado na tela */
function mostrarUsuarioNaTela() {
    const areaUsuario = document.getElementById("area-usuario");
    const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));

    if (areaUsuario && usuarioLogado) {
        areaUsuario.innerHTML = `
            <img src="${usuarioLogado.fotoPerfil}" alt="${usuarioLogado.nome}" class="foto-usuario">
            <span>${usuarioLogado.nome}</span>
            <button onclick="sair()">Logout</button>
        `;
    }
}


/* Função para sair da conta */
function sair() {
    sessionStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
}


/* Aqui eu verifico qual formulário existe na página */
const formLogin = document.getElementById("form-login");
const formCadastro = document.getElementById("form-cadastro");

if (formLogin) {
    formLogin.addEventListener("submit", fazerLogin);
}

if (formCadastro) {
    formCadastro.addEventListener("submit", cadastrarUsuario);
    carregarAvatares();
}

/* Se existir a área do usuário, mostra os dados dele */
mostrarUsuarioNaTela();