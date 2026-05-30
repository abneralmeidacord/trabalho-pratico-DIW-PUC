# Overwatch Heroes - Trabalho Prático 1

Este projeto foi desenvolvido como parte do **Trabalho Prático 1 - Exibição e Navegação Dinâmicas**. A proposta do site é apresentar personagens do universo do meu game favorito **Overwatch** de forma dinâmica, utilizando **HTML, CSS, Bootstrap, JavaScript e estrutura JSON** para organizar e exibir as informações dos heróis.

## Sobre o projeto

O site funciona como uma página informativa sobre heróis de Overwatch. Na página principal, os personagens são apresentados em formato de cards, contendo informações básicas como nome, imagem, classe e função. Ao selecionar um herói, o usuário é direcionado para uma página de detalhes, onde são exibidas informações mais completas sobre o personagem escolhido (habilidades e subclasses).

O projeto foi pensado para seguir uma estrutura dinâmica, então não ficaram escritos manualmente no HTML. Eles estão armazenados em dentro de uma estrutura JSON, e mapeados e renderizados na tela.

## Funcionalidades

- Exibição dinâmica dos heróis na página inicial;
- Cards com informações principais dos personagens;
- Navegação para uma página de detalhes individual;
- Identificação do herói selecionado por meio do ID enviado na URL;
- Página de detalhes com nome, imagem, classe, função e habilidades do personagem;
- Organização das habilidades vinculadas aos seus respectivos heróis;
- Layout responsivo para diferentes tamanhos de tela;
- Estilização inspirada na identidade visual de Overwatch.

## Status do desenvolvimento

A estrutura principal do projeto já está desenvolvida, incluindo a listagem dinâmica dos personagens, a navegação entre páginas e a exibição dos detalhes dos heróis.

O carrossel de heróis em destaque implementado na página inicial, segue a proposta do trabalho de apresentar 3 personagens em destaque com navegação entre eles e acesso à tela de detalhes.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap
- JSON
- Responsividade com CSS e componentes do Bootstrap

## Estrutura do projeto

```txt
/
├── index.html
├── detalhes.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   └── img/
```

## Como funciona

Na página inicial, o JavaScript percorre a lista de heróis cadastrados no JSON e cria automaticamente os cards na tela. Cada card possui um link que envia o usuário para a página de detalhes usando o ID do personagem na URL.

Exemplo:

```txt
detalhes.html?id=1
```

Na página de detalhes, o JavaScript lê o ID, busca o herói correspondente no JSON e exibe as infos completas. As habilidades também são carregadas de forma dinâmica, de acordo com o herói selecionado.

## Objetivo

O objetivo do projeto é praticar a criação de páginas web dinâmicas, trabalhando com dados estruturados em JSON, manipulação do DOM com JavaScript, navegação por parâmetros na URL e construção de interfaces responsivas.

Além disso, quero evoluir o projeto serve com futuras melhorias, como integração com APIs, filtros, busca de personagens, favoritos e outras funcionalidades mais avançadas.

## Autor
Projeto desenvolvido por **Abner Almeida** - 1512771 (Código de Pessoa).
