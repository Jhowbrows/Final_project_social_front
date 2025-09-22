# Rede Social - Interface do Usuario (Front-end)

Este é o repositório do front-end para o projeto de Rede Social, desenvolvido com React. Esta aplicação consome a API RESTful do nosso back-end para fornecer uma experiência de usuario completa, moderna e reativa.

**Aplicação Online:** **[Acesse aqui](https://socialhub-henna.vercel.app/)

---

## Funcionalidades Implementadas

* **Autenticação Completa:** Sistema de registo e login com gestão de sessão por token.
* **Feed de Notícias Dinâmico:** Exibe as publicações dos usuarios que você segue.
* **Criação de Posts:** Interface para criar novas publicações diretamente no feed.
* **Interações Sociais:**
    * **Curtir/Descurtir** publicações.
    * **Comentar** em publicações e ver os comentários de outros.
    * **Seguir/Deixar de Seguir** outros utilizadores.
* **Gestão de Perfil:**
    * Página de perfil pessoal para ver e atualizar os seus dados.
    * Alteração de nome e email.
    * Alteração segura de nome de utilizador e senha (com confirmação).
    * Upload, visualização e remoção de foto de perfil.
* **Perfis Públicos:** Capacidade de clicar em qualquer utilizador para ver o seu perfil público, as suas publicações e as suas listas de seguidores/seguindo.
* **Design Moderno e Responsivo:**
    * Layout estilizado e consistente em toda a aplicação.
    * **Modo Noturno (Dark Mode)** com um botão de troca de tema.
    * Interface totalmente responsiva, adaptada para telemóveis e tablets, incluindo um menu "hambúrguer".

---

## Tecnologias Utilizadas

* **React:** Biblioteca principal para a construção da interface.
* **React Router:** Para a gestão de rotas e navegação entre as páginas.
* **Axios:** Para fazer os pedidos HTTP para a API do back-end.
* **React Context API:** Para a gestão do estado global do tema (Modo Noturno).
* **CSS:** Estilização modularizada com ficheiros CSS dedicados para cada componente e página.

### API Back-end

Esta aplicação consome a API Django disponível no seguinte repositório:
* **Repositório do Back-end:** **[Clique aqui](https://github.com/Jhowbrows/final_project_social_back)**

---

## Como Executar Localmente

Siga os passos abaixo para configurar e executar o projeto no seu ambiente de desenvolvimento.

**Pré-requisitos:**
* Node.js e npm.
* Git.
* **O servidor back-end deve estar a ser executado** (localmente ou em produção).

**Passos:**
1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Jhowbrows/final_project_social_front.git]
    cd final_project_social_front
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure a API:**
    * Abra o ficheiro `src/services/api.js`.
    * Certifique-se de que a `baseURL` está a apontar para o servidor back-end correto (para testes locais, `http://127.0.0.1:8000/api/`).

4.  **Inicie a aplicação:**
    ```bash
    npm start
    ```
    A aplicação será aberta em `http://localhost:3000`.

---

## Deploy

Este projeto está pronto para o deploy em qualquer plataforma moderna de hospedagem