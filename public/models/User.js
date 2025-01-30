// A classe User representa um usuário com várias propriedades e métodos para manipulação de dados.
class User {

    // O construtor inicializa os atributos de um novo usuário.
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

    // Define o ID do usuário (não utilizado diretamente no código).
    set id(value) {
        return this._id = value;  // O setter foi escrito incorretamente, deveria atualizar _id e não _photo.
    }

    // Retorna o nome do usuário.
    get name() {
        return this._name;
    }

    // Define o nome do usuário.
    set name(value) {
        return this._name = value;
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

    // Define um novo email para o usuário.
    set email(value) {
        return this._email = value;
    }

    // Retorna a senha do usuário (não recomendado expor senha, mas está aqui como parte do exemplo).
    get password() {
        return this._password;
    }

    // Define uma nova senha para o usuário.
    set password(value) {
        return this._password = value;
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
                    if (name.substring(0, 1) === '_') this[name] = json[name];  // Para os outros campos, apenas atribui o valor diretamente.
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

    // // Método que gera um novo ID para um usuário.
    // getNewID() {
    //     // Tenta obter o ID atual dos usuários no localStorage.
    //     let usersID = parseInt(localStorage.getItem("userID"));

    //     // Se não houver um ID válido, começa com 0.
    //     if (!usersID > 0) window.id = 0;

    //     // Incrementa o ID para garantir que seja único.
    //     usersID++;

    //     // Atualiza o localStorage com o novo ID.
    //     localStorage.setItem("userID", usersID);

    //     return this.id;  // Retorna o ID gerado.
    // }

    // Converte o objeto User para JSON, incluindo apenas propriedades que não sejam undefined.
    toJSON() {
        let json = {};  // Cria um objeto JSON vazio.
        Object.keys(this).forEach(key => {
            if (this[key] !== undefined) json[key] = this[key];  // Adiciona ao JSON apenas as propriedades definidas.
        });

        return json;  // Retorna o objeto JSON.
    }

    // Método que salva ou atualiza um usuário no localStorage.
    save() {
        return new Promise((resolve, reject) => {
            let promise;
            // Se o usuário já tem um ID, faz um PUT (atualiza).
            if (this.id) {
                promise = HttpRequest.put(`/users/${this.id}`, this.toJSON());
            } else {
                // Se o usuário não tem um ID, faz um POST (cria um novo).
                promise = HttpRequest.post(`/users`, this.toJSON());
            }

            // Quando a requisição for bem-sucedida, carrega os dados do usuário atualizados.
            promise.then(data => {
                this.loadFromJSON(data);  // Atualiza os dados do usuário com a resposta do servidor.
                resolve(data);  // Resolve a Promise com os dados.
            }).catch(e => {
                reject(e);  // Se houver erro, rejeita a Promise com o erro.
            });
        });
    }

    // Método que remove um usuário do localStorage.
    remove() {
            return  HttpRequest.delete(`/users/${this.id}`)
    }
}
