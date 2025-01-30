# 🚀 Gerenciamento de Usuários - RESTful API com Restify

Este projeto demonstra como consumir uma API RESTful de gerenciamento de usuários no front-end, utilizando **JavaScript** puro e **AJAX** para fazer requisições HTTP. A API foi construída com **Restify** e está disponível na porta 3000. O projeto foi estruturado utilizando **Express Generator** para organização e escalabilidade.

## 📌 Funcionalidades
- Consumir dados de uma API RESTful
- Listar todos os usuários
- Adicionar um novo usuário
- Buscar um usuário específico
- Atualizar um usuário existente
- Excluir um usuário

## 🛠 Tecnologias Utilizadas no Front-End
- **JavaScript**: Para lógica e interação com a API.
- **AJAX**: Para requisições assíncronas.
- **Express Generator**: Para gerar a estrutura inicial do projeto.

## 🌎 Estrutura do Projeto
```📂 gerenciamento_usuarios_restfull_api_restify
├── 📂 bin # Scripts de inicialização
│ └── www # Ponto de entrada do servidor
├── 📂 public # Arquivos estáticos (CSS, JS, fonts)
│ ├── 📂 css # Arquivos de estilo (Bootstrap, custom CSS)
│ ├── 📂 js # Arquivos JavaScript (lógica de consumo da API)
│ └── 📂 fonts # Fontes e ícones (Font Awesome, Ionicons)
├── 📂 bower_components # Dependências front-end (Bootstrap, Font Awesome, Ionicons)
├── 📂 class # Classes utilitárias
│ ├── Fetch.js # Classe para requisições HTTP
│ └── HttpRequest.js # Classe para gerenciar requisições
├── 📂 controllers # Controladores da aplicação
│ └── UserController.js # Controlador para gerenciar usuários
├── 📂 dist # Arquivos compilados ou gerados
├── 📂 models # Modelos de dados
│ └── User.js # Modelo de usuário
├── 📂 utils # Funções utilitárias
│ └── Utils.js # Funções auxiliares
├── 📂 routes # Rotas da aplicação
│ ├── index.js # Rotas principais
│ └── users.js # Rotas de usuários
├── 📂 views # Templates EJS para renderização
│ ├── error.ejs # Template para páginas de erro
│ └── index.ejs # Template para a página inicial
├── .gitignore # Arquivo para ignorar arquivos desnecessários no Git
├── app.js # Arquivo principal do servidor
├── package-lock.json # Versões exatas das dependências instaladas
├── package.json # Gerenciador de dependências e scripts
└── README.md # Documentação do projeto
```


## 🔧 Como Rodar o Projeto

1. **Clone o repositório** :
   ```bash
   git clone https://github.com/DevPatriick/gerenciamento_usuarios_restfull_api_restify.git

2. **Instale as dependências:**
  ```npm install```

3. **Inicie o servidor**
```npm start```

4. **Acesse o projeto**
```http://localhost:3000```

# 📌 Rotas de Usuário

A API oferece os seguintes endpoints para gerenciar usuários:

---

### 1. Listar Todos os Usuários
- **Método**: `GET`
- **Endpoint**: `/users`
- **Descrição**: Retorna uma lista de todos os usuários cadastrados.

---

### 2. Adicionar um Novo Usuário
- **Método**: `POST`
- **Endpoint**: `/users`
- **Descrição**: Adiciona um novo usuário ao sistema.

---

### 3. Buscar um Usuário Específico
- **Método**: `GET`
- **Endpoint**: `/users/:id`
- **Descrição**: Retorna os detalhes de um usuário específico com base no ID.

---

### 4. Atualizar um Usuário
- **Método**: `PUT`
- **Endpoint**: `/users/:id`
- **Descrição**: Atualiza os dados de um usuário existente com base no ID.

---

### 5. Excluir um Usuário
- **Método**: `DELETE`
- **Endpoint**: `/users/:id`
- **Descrição**: Remove um usuário com base no ID.

----
----
**🚀 Vamos codar!**

