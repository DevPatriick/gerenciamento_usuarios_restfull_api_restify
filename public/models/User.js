// A classe User representa um usuário com várias propriedades e métodos para manipulação de dados.
class User {

    // O construtor inicializa os atributos de um novo usuário.
    // Cada usuário terá nome, gênero, data de nascimento, país, email, senha, foto, permissões de administrador e data de registro.
    constructor(name, gender, birth, country, email, password, photo, admin) {
        this._id;  // ID do usuário (a ser gerado posteriormente).
        this._name = name;  // Nome do usuário.
        this._gender = gender;  // Gênero do usuário.
        this._birth = birth;  // Data de nascimento do usuário.
        this._country = country;  // País de origem do usuário.
        this._email = email;  // Email do usuário.
        this._password = password;  // Senha do usuário.
        this._photo = photo;  // Foto do usuário.
        this._admin = admin;  // Define se o usuário é administrador ou não.
        this._register = new Date();  // Data de registro do usuário (gerada automaticamente no momento da criação).
    }

    // Métodos getter para acessar as propriedades do usuário.

    // Retorna o ID do usuário.
    get id() {
        return this._id;
    }

    // Retorna o nome do usuário.
    get name() {
        return this._name;
    }

    // Retorna o gênero do usuário.
    get gender() {
        return this._gender;
    }

    // Retorna a data de nascimento do usuário.
    get birth() {
        return this._birth;
    }

    // Retorna o país de origem do usuário.
    get country() {
        return this._country;
    }

    // Retorna o email do usuário.
    get email() {
        return this._email;
    }

    // Retorna a senha do usuário (não recomendado expor senha, mas está aqui como parte do exemplo).
    get password() {
        return this._password;
    }

    // Retorna a foto do usuário.
    get photo() {
        return this._photo;
    }

    // Define uma nova foto para o usuário.
    set photo(value) {
        return this._photo = value;
    }

    // Retorna se o usuário é um administrador ou não.
    get admin() {
        return this._admin;
    }

    // Retorna a data de registro do usuário.
    get register() {
        return this._register;
    }

    // Método para carregar os dados de um usuário a partir de um objeto JSON.
    loadFromJSON(json) {
        // Itera sobre os campos do objeto JSON e atribui aos atributos do usuário.
        for (let name in json) {
            switch (name) {
                case '_register':  // Se o campo for '_register', converte o valor em uma data.
                    this[name] = new Date(json[name]);
                    break;
                default:
                    this[name] = json[name];  // Para os outros campos, apenas atribui o valor diretamente.
            }
        }
    }

    // Método estático que retorna todos os usuários armazenados no localStorage.
    static getUserStorage() {
        let users = [];  // Cria um array vazio para armazenar os usuários.

        // Verifica se há dados de usuários armazenados no localStorage.
        if (localStorage.getItem("users")) {
            // Se houver dados, os converte de JSON para um array de objetos.
            users = JSON.parse(localStorage.getItem("users"));
        }

        return users;  // Retorna o array de usuários.
    }

    // Método que gera um novo ID para um usuário.
    getNewID() {
        // Tenta obter o ID atual dos usuários no localStorage.
        let usersID = parseInt(localStorage.getItem("userID"));

        // Se não houver um ID válido, começa com 0.
        if (!usersID > 0) window.id = 0;

        // Incrementa o ID para garantir que seja único.
        usersID++;

        // Atualiza o localStorage com o novo ID.
        localStorage.setItem("userID", usersID);

        return this.id;  // Retorna o ID gerado.
    }

    // Método que salva ou atualiza um usuário no localStorage.
    save() {
        let users = User.getUserStorage();  // Obtém todos os usuários armazenados.

        // Se o usuário já tiver um ID (significa que é uma atualização), busca o usuário e faz a atualização.
        if (this.id > 0) {
            users.map(u => {
                if (u._id == this.id) {
                    // Se o ID do usuário corresponder, atualiza o objeto com os novos dados.
                    Object.assign(u, this);
                    u = this;  // Substitui o usuário antigo pelo novo.
                }
                return u;
            });
        } else {
            // Se o usuário não tiver ID (significa que é um novo usuário), cria um novo ID.
            this._id = this.getNewID();
            users.push(this);  // Adiciona o novo usuário ao array de usuários.
        }

        // Atualiza o localStorage com o array de usuários (agora com o novo usuário ou o atualizado).
        localStorage.setItem("users", JSON.stringify(users));
    }

    // Método que remove um usuário do localStorage.
    remove() {
        let users = User.getUserStorage();  // Obtém todos os usuários armazenados.

        // Itera sobre os usuários para encontrar o que será removido.
        users.forEach((userData, index) => {
            if (this._id == userData._id) {
                // Se o ID do usuário corresponder, remove o usuário do array.
                users.splice(index, 1);
            }
        });

        // Atualiza o localStorage com o array de usuários (agora sem o usuário removido).
        localStorage.setItem("users", JSON.stringify(users));
    }
}
