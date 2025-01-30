// Instancio a classe UserController na variável userController e passo os 
// parâmetros exigidos no construtor da classe para inicializar a instância.

// O primeiro parâmetro "form-user-create" é o ID do formulário de criação de usuário.
// O segundo parâmetro "form-user-uptade" é o ID do formulário de atualização de usuário.
// O terceiro parâmetro "tableUser" é o ID da tabela onde os usuários serão listados.

// Ao criar essa instância, o construtor da classe UserController será chamado,
// e o comportamento do formulário de criação, edição e a tabela de usuários será inicializado.
let userController = new UserController("form-user-create", "form-user-uptade", "tableUser");
