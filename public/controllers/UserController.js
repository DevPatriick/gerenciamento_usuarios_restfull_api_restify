// A classe UserController gerencia as interações com os formulários e a tabela de usuários.
class UserController {

    // O construtor recebe os IDs dos formulários e da tabela e inicializa os atributos da classe.
    constructor(formId, formIdUptade, tableId) {

        // Inicializa as variáveis que armazenam os formulários e a tabela.
        this.formEl = document.getElementById(formId);  // Armazena o formulário de criação.
        this.formElPut = document.getElementById(formIdUptade);  // Armazena o formulário de atualização.
        this.tableEl = document.getElementById(tableId);  // Armazena a tabela de usuários.

        // Chama os métodos logo após a instância da classe.
        this.submit();  // Define o comportamento do envio do formulário de criação.
        this.onEdit();  // Define o comportamento ao editar um usuário.
        this.selectAll();  // Carrega todos os usuários e exibe na tabela.

    }

    // Define o comportamento ao editar um usuário.
    onEdit() {

        // Evento de click no botão de cancelar edição, que exibe o painel de criação.
        document.querySelector(".btn-defaut").addEventListener('click', (e) => {
            this.showPanelCreate();  // Exibe o painel de criação.
        });

        // Evento de submit no formulário de edição, que vai atualizar o usuário.
        this.formElPut.addEventListener("submit", event => {
            event.preventDefault();  // Previne o comportamento padrão do formulário (não recarrega a página).

            let btn = this.formElPut.querySelector("[type=submit]");  // Seleciona o botão de submit do formulário.
            btn.disabled = true;  // Desabilita o botão para evitar múltiplos cliques.

            // Obtém os valores do formulário de edição.
            let value = this.getValue(this.formElPut);  
            console.log(value);  // Exibe os valores no console para depuração.

            let index = this.formElPut.dataset.trIndex;  // Obtém o índice da linha da tabela a ser editada.

            let tr = this.tableEl.rows[index];  // Seleciona a linha correspondente na tabela.

            let userOld = JSON.parse(tr.dataset.user);  // Obtém os dados antigos do usuário da linha.

            // Cria um novo objeto combinando os dados antigos com os novos valores do formulário.
            let result = Object.assign({}, userOld, value);

            this.uptadeCount();  // Atualiza as contagens de usuários e administradores.

            // Faz a chamada para atualizar a foto do usuário.
            this.getPhoto(this.formElPut).then(
                (content) => {
                    // Se não houver foto nova, mantém a foto antiga.
                    if (!value.photo) {
                        result._photo = userOld._photo;
                    } else {
                        result._photo = content;  // Usa a foto nova, se existir.
                    }

                    let user = new User();  // Cria uma instância de User.
                    user.loadFromJSON(result);  // Carrega os dados atualizados do usuário.

                    user.save();  // Salva os dados do usuário no armazenamento local.

                    // Atualiza os dados na linha da tabela.
                    tr.dataset.user = JSON.stringify(result);

                    // Atualiza o conteúdo HTML da linha com os novos dados do usuário.
                    tr.innerHTML = ` 
                        <td><img src="${result._photo}" alt="User Image" class="img-circle img-sm"></td>
                        <td>${result._name}</td>
                        <td>${result._email}</td>
                        <td>${result._admin ? "Sim" : "Não"}</td>
                        <td>${Utils.dateFormat(result._register)}</td>
                        <td>
                            <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                        </td>
                    `;

                    // Adiciona os eventos de edição e exclusão à linha atualizada.
                    this.addEventsTr(tr);
                    this.formElPut.reset();  // Limpa o formulário de edição.
                    btn.disabled = false;  // Reabilita o botão de submit.
                    this.showPanelCreate();  // Exibe o painel de criação novamente.
                },
                (e) => {
                    console.error(e);  // Exibe erro no console caso haja problema ao carregar a foto.
                });
        });
    }

    // Define o comportamento de envio do formulário de criação de usuário.
    submit() {

        // Evento de submit no formulário de criação de usuário.
        this.formEl.addEventListener("submit", (event) => {
            event.preventDefault();  // Previne o comportamento padrão do formulário (não recarrega a página).
            let value = this.getValue(this.formEl);  // Obtém os valores do formulário.

            let btn = this.formEl.querySelector("[type=submit]");  // Seleciona o botão de submit.

            btn.disabled = true;  // Desabilita o botão de submit para evitar múltiplos cliques.

            // Se não houver dados válidos, reabilita o botão e impede o envio.
            if (!value) {
                btn.disabled = false;
                return false;
            }

            // Faz a chamada para obter a foto do usuário.
            this.getPhoto(this.formEl).then(
                (content) => {
                    value.photo = content;  // Adiciona a foto ao objeto de dados.
                    value.save();  // Insere os dados do novo usuário no armazenamento local.
                    this.addLine(value);  // Adiciona uma nova linha à tabela.
                    this.formEl.reset();  // Limpa o formulário de criação.
                    btn.disabled = false;  // Reabilita o botão de submit.
                },
                (e) => {
                    console.error(e);  // Exibe erro no console caso haja problema ao carregar a foto.
                });
        });
    }

    // Função que lida com o upload da foto do usuário.
    getPhoto(formEl) {

        return new Promise((resolve, reject) => {
            let fileReard = new FileReader();  // Cria uma instância de FileReader para ler a imagem.

            let elements = [...formEl.elements].filter(item => {
                if (item.name === "photo") {
                    return item;  // Filtra o campo de foto no formulário.
                }
            });

            let file = elements[0].files[0];  // Obtém o arquivo de foto do campo de upload.

            fileReard.onload = () => {
                resolve(fileReard.result);  // Resolve a Promise com o conteúdo da foto quando carregada.
            }

            fileReard.onerror = (e) => {
                reject(e);  // Rejeita a Promise caso ocorra um erro ao carregar a foto.
            }

            // Verifica se o usuário enviou uma foto.
            if (file) {
                fileReard.readAsDataURL(file);  // Lê o arquivo como uma URL de dados.
            } else {
                resolve('dist/profile-user.png');  // Se não houver foto, resolve com uma foto padrão.
            }
        });
    }

    // Obtém os valores do formulário e valida os campos obrigatórios.
    getValue(formEl) {

        const user = {};  // Cria um objeto para armazenar os dados do usuário.
        let isValid = true;  // Flag para verificar a validade dos dados.

        // Percorre os elementos do formulário e valida os campos obrigatórios.
        [...formEl.elements].forEach(function (field, index) {

            // Verifica se o campo é obrigatório e não foi preenchido.
            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add('has-error');  // Marca o campo como inválido.
                isValid = false;  // Define o status como inválido.
            }

            // Valida o campo "gender" (sexo) para garantir que esteja selecionado.
            if (field.name == "gender") {
                if (field.checked === true) {
                    user[field.name] = field.name;  // Adiciona o valor ao objeto de dados.
                }

            } else if (field.name == "admin") {
                user[field.name] = field.checked;  // Adiciona o estado do checkbox ao objeto de dados.
            } else {
                user[field.name] = field.value;  // Adiciona o valor do campo ao objeto de dados.
            }
        });

        // Se houver algum campo inválido, retorna false.
        if (!isValid) {
            return false;
        } else {
            // Se os dados forem válidos, cria uma instância do modelo User e retorna.
            return new User(
                user.name,
                user.gender,
                user.birth,
                user.country,
                user.email,
                user.password,
                user.photo,
                user.admin
            );
        }
    }

    // Obtém os usuários armazenados no localStorage.
    // Carrega todos os usuários armazenados e os exibe na tabela.
    selectAll(){
        let users = User.getUserStorage();  // Obtém os usuários armazenados.

        users.forEach(data => {
            let user = new User();  // Cria uma nova instância de User.
            user.loadFromJSON(data);  // Carrega os dados de cada usuário.
            this.addLine(user);  // Adiciona os dados à tabela.
        });
    }

    // Adiciona uma nova linha à tabela com os dados do usuário.
    addLine(dataUser) {

        let tr = document.createElement('tr');  // Cria uma nova linha.

        tr.dataset.user = JSON.stringify(dataUser);  // Armazena os dados do usuário na linha.

        // Preenche a linha com os dados do usuário.
        tr.innerHTML = `
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin ? "Sim" : "Não"}</td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
            </td>
        `;

        this.addEventsTr(tr);  // Adiciona eventos de edição e exclusão à linha.

        this.tableEl.appendChild(tr);  // Adiciona a linha à tabela.

        this.uptadeCount();  // Atualiza as contagens de usuários e administradores.

    }

    // Adiciona os eventos de editar e excluir às linhas da tabela.
    addEventsTr(tr) {
        // Adiciona o evento de excluir à linha.
        tr.querySelector(".btn-delete").addEventListener('click', e => {
            if (confirm("Deseja realmente excluir?")) {  // Confirma a exclusão.
                let user = new User();

                user.loadFromJSON(JSON.parse(tr.dataset.user))  // Carrega os dados do usuário.
                user.remove()  // Remove o usuário do armazenamento.
                tr.remove();  // Remove a linha da tabela.
                this.uptadeCount();  // Atualiza as contagens.
            }
        });

        // Adiciona o evento de editar à linha.
        tr.querySelector(".btn-edit").addEventListener('click', e => {
            let json = JSON.parse(tr.dataset.user);  // Obtém os dados do usuário da linha.
            let form = document.querySelector("#form-user-uptade");  // Obtém o formulário de atualização.

            form.dataset.trIndex = tr.sectionRowIndex;  // Armazena o índice da linha.

            // Preenche o formulário com os dados do usuário.
            for (let name in json) {
                let field = form.querySelector("[name=" + name.replace("_", "") + "]");

                if (field) {
                    switch (field.type) {
                        case 'file':
                            continue;  // Ignora o campo de arquivo.
                            break;

                        case 'radio':
                            field = form.querySelector("[name=" + name.replace("_", "") + "][value=" + json[name] + "]");  // Marca o campo de rádio correto.
                            field.checked = true;
                            break;

                        case 'checkbox':
                            field.checked = json[name];  // Marca o checkbox correto.
                            break;

                        default:
                            field.value = json[name];  // Preenche o campo de texto.
                    }
                }
            }

            // Exibe a foto no formulário de edição.
            this.formElPut.querySelector(".photo").src = json._photo;

            this.showPanelUptade();  // Exibe o painel de edição.
        });
    }

    // Exibe o painel de criação de usuário.
    showPanelCreate() {
        const boxpost = document.querySelector(".box-success")
        boxpost.style = "display:block";  // Exibe o painel de criação.
        const boxput = document.querySelector(".box-primary")
        boxput.style = "display:none";  // Oculta o painel de edição.
    }

    // Exibe o painel de atualização de usuário.
    showPanelUptade() {
        const boxpost = document.querySelector(".box-success")
        boxpost.style = "display:none";  // Oculta o painel de criação.
        const boxput = document.querySelector(".box-primary")
        boxput.style = "display:block";  // Exibe o painel de edição.
    }

    // Atualiza as contagens de usuários e administradores na interface.
    uptadeCount() {

        let numberUser = 0;
        let numberAdmin = 0;

        // Percorre todas as linhas da tabela e conta o número de usuários e administradores.
        [...this.tableEl.children].forEach(tr => {
            numberUser++;
            let users = JSON.parse(tr.dataset.user);
            if (users._admin) {
                numberAdmin++;
            }
        });

        // Atualiza os contadores na interface.
        document.querySelector('#number-User').innerHTML = numberUser;
        document.querySelector('#number-Admin').innerHTML = numberAdmin;
    }

}
