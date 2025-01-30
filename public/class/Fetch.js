class Fetch {

    // Método para fazer requisições GET
    static get(url, params = {}) {
        return Fetch.request('GET', url, params);
    }

    // Método para fazer requisições DELETE
    static delete(url, params = {}) {
        return Fetch.request('DELETE', url, params);
    }

    // Método para fazer requisições PUT
    static put(url, params = {}) {
        return Fetch.request('PUT', url, params);
    }

    // Método para fazer requisições POST
    static post(url, params = {}) {
        return Fetch.request('POST', url, params);
    }

    // Método genérico para realizar requisições HTTP com qualquer método (GET, POST, PUT, DELETE)
    static request(method, url, params = {}) {

        return new Promise((resolve, reject) => { // Retorna uma Promise para lidar com operações assíncronas
            let request;

            switch (method.toLowerCase()) {
                case 'get':
                    request = url;
                    break
                default:
                    request = new Request(url, {
                        method,
                        body: JSON.stringify(params),
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    });
            }

            
            fetch(url).then(response => {
                response.json().then(json => {
                    resolve(json)
                })
            }).catch(e => {
                reject(e)
            })
        }).catch(e => {
            reject(e)
        })

        // O primeiro parâmetro do método `open` é o tipo de requisição (GET, POST, etc.).
        // O segundo parâmetro é a URL do servidor para onde a requisição será enviada.
    }
}
