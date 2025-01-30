# **Sistema de Gerenciamento de Usuários** 🧑‍💻

## Descrição do Projeto

Este projeto é um sistema simples de gerenciamento de usuários. Ele permite criar, editar, excluir e listar usuários, armazenando os dados de forma persistente no navegador utilizando o `localStorage`. Além disso, o sistema oferece funcionalidades de upload de foto para os usuários e controle de permissões de administrador.

## Arquitetura Utilizada 🏗️

A arquitetura do projeto segue o padrão **MVC (Model-View-Controller)**, que é um padrão de arquitetura de software comumente utilizado para organizar e separar a lógica da aplicação em três componentes principais:

1. **Model (Modelo)** 🗃️:
   - Representa os dados e as regras de negócios. No caso deste projeto, o modelo é a classe `User`, que armazena as informações de cada usuário (nome, e-mail, senha, foto, etc.) e lida com as operações de armazenamento e recuperação de dados, como salvar no `localStorage` e carregar os dados do mesmo.

2. **View (Visão)** 👀:
   - Representa a interface de usuário (UI), ou seja, a parte do projeto com a qual o usuário interage. Neste caso, são os formulários de cadastro e edição, a tabela de usuários, e os botões de ação (editar, excluir, etc.).

3. **Controller (Controlador)** 🎮:
   - Serve como intermediário entre o modelo e a visão. Ele gerencia as interações do usuário, atualiza o modelo e a visão conforme necessário. A classe `UserController` é o controlador neste projeto, gerenciando os eventos de formulário, controle das ações de edição e exclusão, e interação com o modelo `User`.

## Linguagens e Tecnologias Utilizadas 🌐

O projeto foi desenvolvido utilizando as seguintes linguagens e tecnologias:

- **HTML5** 📝  
  Utilizado para criar a estrutura e a marcação das páginas web.
  
  ![HTML5 Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/HTML5_logo_2015.svg/800px-HTML5_logo_2015.svg.png)

- **CSS3** 🎨  
  Responsável pela estilização e layout das páginas, proporcionando uma interface amigável ao usuário.
  
  ![CSS3 Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/CSS3_logo.svg/800px-CSS3_logo.svg.png)

- **JavaScript** ⚙️  
  Utilizado para adicionar interatividade ao sistema, como manipulação de DOM, eventos, validação de formulários, controle das operações de CRUD (criar, ler, atualizar, excluir) e integração com o `localStorage`.
  
  ![JavaScript Logo](https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png)

## Conceitos Apresentados 💡

### 1. **Uso do `localStorage`** 🗃️:
   - O `localStorage` é uma ferramenta de armazenamento de dados no lado do cliente (navegador) que permite persistir informações entre as sessões. Os dados são armazenados em formato de chave-valor e são acessíveis enquanto o usuário não limpar o histórico do navegador.
   
   Exemplo de uso:
   ```javascript
   localStorage.setItem("users", JSON.stringify(users));  // Salva os usuários no localStorage
   let users = JSON.parse(localStorage.getItem("users"));  // Recupera os usuários do localStorage
2. Spread Operator (...) ➔:
O spread operator (...) é utilizado para expandir ou copiar os elementos de um array ou objeto. No projeto, ele é utilizado para copiar os elementos do formEl.elements e percorrê-los de maneira eficiente, especialmente em situações onde precisamos manipular múltiplos elementos de uma vez.
Exemplo de uso:

javascript
Copiar
[...formEl.elements].forEach(function(field, index) { 
    // Código para manipulação de cada elemento do formulário 
});
3. FileReader API 📸:
O FileReader é uma API que permite ler arquivos do sistema de arquivos local do usuário de forma assíncrona. No projeto, ele é utilizado para ler e exibir a foto do usuário enviada no formulário de cadastro.
Exemplo de uso:

javascript
Copiar
let fileReard = new FileReader();
fileReard.onload = () => { 
    resolve(fileReard.result);  // Resolvemos a Promise com o conteúdo da foto
}
fileReard.readAsDataURL(file);  // Lê o arquivo como URL de dados.
4. Método forEach() 🔄:
O forEach() é utilizado para iterar sobre os elementos de um array. É um método muito utilizado para realizar ações em cada item do array, como, por exemplo, validar os campos de um formulário.
Exemplo de uso:

javascript
Copiar
[...formEl.elements].forEach(function(field, index) { 
    // Código para validar ou processar cada elemento
});
Funcionalidades 🔧
Cadastro de Usuários: Permite que o usuário insira dados (nome, email, etc.) e salve-os.
Edição de Usuários: Permite editar os dados de um usuário já cadastrado.
Exclusão de Usuários: Permite excluir usuários da lista.
Upload de Foto: Os usuários podem enviar uma foto, que é salva e exibida junto com os dados.
Como Rodar o Projeto 🚀
Clone o repositório:

bash
Copiar
git clone https://github.com/usuario/projeto-usuarios.git
Abra o arquivo index.html no seu navegador.

