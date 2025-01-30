class HttpRequest { 

    // Método para fazer requisições GET
    static get(url, params = {}) {
        return HttpRequest.request('GET', url, params);
    }

    // Método para fazer requisições DELETE
    static delete(url, params = {}) {
        return HttpRequest.request('DELETE', url, params);
    }

    // Método para fazer requisições PUT
    static put(url, params = {}) {
        return HttpRequest.request('PUT', url, params);
    }

    // Método para fazer requisições POST
    static post(url, params = {}) {
        return HttpRequest.request('POST', url, params);
    }

    // Método genérico para realizar requisições HTTP com qualquer método (GET, POST, PUT, DELETE)
    static request(method, url, param = {}) {

        return new Promise((resolve, reject) => { // Retorna uma Promise para lidar com operações assíncronas

            let ajax = new XMLHttpRequest(); // Cria um objeto XMLHttpRequest para fazer a requisição AJAX

            ajax.open(method.toUpperCase(), url); // Abre a conexão com o servidor usando o método e URL especificados

            // Define um evento para capturar erros de rede
            ajax.onerror = event => {
                reject(event); // Se houver erro na requisição, rejeita a Promise
            };

            // Define um evento que será executado quando a requisição for concluída
            ajax.onload = event => {
                let obj = {}; // Declara um objeto vazio para armazenar a resposta do servidor

                try {
                    obj = JSON.parse(ajax.responseText); // Converte a resposta JSON do servidor para um objeto JavaScript
                    console.log('Resposta do servidor:', obj); // Exibe a resposta no console para depuração
                } catch (error) {
                    reject(error); // Se houver erro ao converter JSON, rejeita a Promise
                    console.error(`Error: ${error}`); // Exibe o erro no console
                }

                console.log('Tipo de obj.user:', typeof obj.user); // Exibe o tipo do objeto retornado (para depuração)
                console.log('obj.user:', obj.user); // Exibe os dados retornados pelo servidor

                resolve(obj); // Resolve a Promise retornando os dados convertidos
            };

            ajax.send(); // Envia a requisição para o servidor
        });

        // O primeiro parâmetro do método `open` é o tipo de requisição (GET, POST, etc.).
        // O segundo parâmetro é a URL do servidor para onde a requisição será enviada.
    }
}
