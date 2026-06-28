# Overwatch Heroes - Trabalho Prático 1

Este projeto foi desenvolvido como parte do **Trabalho Prático 1 - Exibição e Navegação Dinâmicas**. A proposta do site é apresentar personagens do universo do meu game favorito **Overwatch** de forma dinâmica, utilizando **HTML, CSS, Bootstrap, JavaScript, Bootstrap Icons, Chart.js e estrutura JSON** para organizar e exibir as informações dos heróis.

## Sobre o projeto

O site funciona como uma página informativa sobre heróis de Overwatch. Na página principal, os personagens são apresentados em formato de cards, contendo informações básicas como nome, imagem. Ao selecionar um herói, o usuário é direcionado para uma página de detalhes, onde são exibidas informações mais completas sobre o personagem escolhido, como habilidades e subclasses.

O projeto foi pensado para seguir uma estrutura dinâmica, então os heróis não ficaram escritos manualmente no HTML. Eles estão armazenados dentro de uma estrutura JSON, sendo buscados pelo JavaScript e renderizados automaticamente na tela.

Além da listagem dos heróis, o projeto também possui sistema de login, cadastro de usuários, favoritos e uma página de perfil, onde cada usuário consegue visualizar seus heróis favoritos.

## Funcionalidades

- Exibição dinâmica dos heróis na página inicial;
- Cards com informações principais dos personagens;
- Navegação para uma página de detalhes individual;
- Identificação do herói selecionado por meio do ID enviado na URL;
- Página de detalhes com nome, imagem, classe, função e habilidades do personagem;
- Organização das habilidades vinculadas aos seus respectivos heróis;
- Carrossel de heróis em destaque na página inicial;
- Barra de busca para filtrar heróis pelo nome ou por habilidades;
- Gráfico com a quantidade de heróis por classe e função;
- Sistema de cadastro de usuários;
- Escolha de foto de perfil a partir dos heróis cadastrados;
- Sistema de login com validação simples de usuário e senha;
- Exibição do usuário logado no header;
- Botão de logout para sair da conta;
- Sistema de favoritos na página de detalhes;
- Ícone de estrela vazia para herói ainda não favoritado;
- Ícone de estrela preenchida para herói favoritado;
- Mensagem para o usuário fazer login caso tente acessar a área de favoritos sem estar logado;
- Salvamento dos heróis favoritos dentro do array `fav` do usuário logado;
- Página de perfil do usuário com foto, username e quantidade de heróis favoritos;
- Exibição dos cards dos heróis favoritos na página `perfil-favoritos.html`;
- Layout responsivo para diferentes tamanhos de tela;
- Estilização inspirada na identidade visual de Overwatch.

## Status do desenvolvimento

A estrutura principal do projeto já está desenvolvida, incluindo a listagem dinâmica dos personagens, a navegação entre páginas, a exibição dos detalhes dos heróis, o sistema de login, cadastro, favoritos e perfil do usuário.

O carrossel de heróis em destaque implementado na página inicial segue a proposta do trabalho de apresentar personagens em destaque com navegação entre eles e acesso à tela de detalhes.

Também foram adicionadas funcionalidades extras para deixar o projeto mais completo, como busca de heróis, gráfico com Chart.js, autenticação simples de usuários e sistema de favoritos integrado ao JSON Server.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap
- Bootstrap Icons
- Chart.js
- JSON
- JSON Server
- Responsividade com CSS e componentes do Bootstrap

## Estrutura do projeto

```txt
/
├── db/
│   └── db.json
├── public/
│   ├── index.html
│   ├── detalhes.html
│   ├── login.html
│   ├── sign-up.html
│   ├── perfil-favoritos.html
│   └── assets/
│       ├── css/
│       │   └── styles.css
│       ├── scripts/
│       │   ├── app.js
│       │   └── auth.js
│       └── img/
├── package.json
└── README.md
```

## Como funciona

Na página inicial, o JavaScript busca a lista de heróis cadastrados no `db.json` e cria automaticamente os cards na tela. Cada card possui um link que envia o usuário para a página de detalhes usando o ID do personagem na URL.

Exemplo:

```txt
detalhes.html?id=1
```

Na página de detalhes, o JavaScript lê o ID enviado pela URL, busca o herói correspondente no JSON Server e exibe suas informações completas. As habilidades também são carregadas de forma dinâmica, de acordo com o herói selecionado.

A página inicial também possui uma barra de pesquisa. Essa busca permite encontrar heróis pelo nome ou por suas habilidades. Caso nenhum herói seja encontrado, uma mensagem aparece informando que não há resultado para aquela pesquisa.

Além disso, a página inicial possui um gráfico feito com Chart.js, exibindo os heróis separados por classe e função, usando cores em tons de laranja para seguir a identidade visual do site.

## Login, cadastro e usuários

O projeto possui uma página de login e uma página de cadastro. No cadastro, o usuário informa nome, username, senha, confirmação de senha e escolhe uma foto de perfil com base nos heróis disponíveis no JSON.

Depois de cadastrado, o usuário pode fazer login. Ao entrar, suas informações são salvas temporariamente no `sessionStorage`, permitindo que o site identifique quem está logado durante a navegação.

Quando o usuário está logado, o header deixa de mostrar apenas o botão de login e passa a mostrar a foto de perfil, o username e o botão de logout. Ao clicar no usuário do header, ele é direcionado para a página de perfil e favoritos.

## Sistema de favoritos

Na página de detalhes de cada herói, existe uma área de favoritos. Se o usuário não estiver logado, aparece uma estrela vazia e a mensagem:

```txt
Sign in to be able to favorite heroes
```

Se o usuário estiver logado, ele pode clicar na estrela para adicionar ou remover o herói dos favoritos. Quando o herói ainda não está favoritado, aparece o ícone `star`. Quando está favoritado, aparece o ícone `star-fill`.

Os favoritos são salvos no array `fav` do usuário dentro do `db.json`, utilizando o ID do herói. Dessa forma, cada usuário possui sua própria lista de heróis favoritos.

Exemplo de estrutura do usuário:

```json
{
  "nome": "Abner Almeida",
  "login": "Abnersolk",
  "senha": "123456",
  "fotoPerfil": "url-da-imagem",
  "id": 1,
  "admin": true,
  "fav": [13, 19, 42]
}
```

## Página de perfil e favoritos

A página `perfil-favoritos.html` segue uma estrutura parecida com a página de detalhes do herói, mas adaptada para mostrar os dados do usuário.

Onde antes aparecia a imagem do herói, agora aparece a foto do usuário. Onde antes aparecia o nome do herói, agora aparece o username. A área que antes mostrava classe e função foi substituída por um card com a quantidade de heróis favoritos do usuário.

O botão de retorno também foi adaptado, mudando de `Back to heroes` para `Back to home`.

Na parte onde antes aparecia `ABILITIES`, agora aparece `FAVORITE HEROES`, exibindo os cards dos heróis que estão salvos no array `fav` do usuário logado.

## Como executar o projeto

Para o projeto funcionar corretamente, é necessário iniciar o JSON Server, pois os dados dos heróis, habilidades e usuários vêm do arquivo `db.json`.

Primeiro, instale as dependências:

```txt
npm install
```

Depois, execute o servidor:

```txt
npm start
```

O JSON Server será iniciado usando o arquivo:

```txt
db/db.json
```

Com o servidor rodando, basta abrir as páginas dentro da pasta `public`.

## Objetivo

O objetivo do projeto é praticar a criação de páginas web dinâmicas, trabalhando com dados estruturados em JSON, manipulação do DOM com JavaScript, navegação por parâmetros na URL, construção de interfaces responsivas e uso de recursos externos como Bootstrap, Bootstrap Icons e Chart.js.

Além disso, o projeto evoluiu para trabalhar também com cadastro, login, sessão de usuário, alteração de dados no JSON Server e funcionalidades personalizadas para cada usuário, como o sistema de favoritos.

Futuramente, o projeto pode evoluir ainda mais com melhorias como integração com APIs externas, área administrativa, edição de perfil, filtros mais avançados e novas formas de organização dos heróis.

## Autor

Projeto desenvolvido por **Abner Almeida** - 1512771 (Código de Pessoa).
