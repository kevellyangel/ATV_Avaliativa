// Função para validar o CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove qualquer caractere que não seja número
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // Verifica se tem 11 dígitos e não é uma sequência de números iguais

    let soma = 0, resto;

    // Valida o primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    // Valida o segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

// Função para validar a data de nascimento
function validarDataNascimento(dataNascimento) {
    const hoje = new Date();
    const dataNasc = new Date(dataNascimento);

    // Verifica se a data de nascimento é no futuro
    if (dataNasc > hoje) {
        return false;
    }
    return true;
}

// Função para validar a data de cadastro
function validarDataCadastro(dataCadastro) {
    const hoje = new Date();
    const dataCad = new Date(dataCadastro);

    // Verifica se a data de cadastro é no futuro
    if (dataCad > hoje) {
        return false;
    }
    return true;
}

// Função para adicionar cliente
function adicionarCliente(event) {
    event.preventDefault();

    const CPF = document.getElementById('CPF').value;
    const Nome = document.getElementById('Nome').value;
    const DataNascimento = document.getElementById('DataNascimento').value;
    const Genero = document.getElementById('Genero').value;
    const Email = document.getElementById('Email').value;
    const Telefone = document.getElementById('Telefone').value;
    const Endereço = document.getElementById('Endereço').value;
    const DataCadastro = document.getElementById('DataCadastro').value;
    const fidelidade = document.getElementById('fidelidade').value;
    const Atendimento = document.getElementById('Atendimento').value;

    // Valida CPF
    if (!validarCPF(CPF)) {
        alert("CPF inválido. Por favor, insira um CPF válido.");
        return;
    }

    // Valida Data de Nascimento
    if (!validarDataNascimento(DataNascimento)) {
        alert("Data de nascimento inválida. Por favor, insira uma data de nascimento no passado.");
        return;
    }

    // Valida Data de Cadastro
    if (!validarDataCadastro(DataCadastro)) {
        alert("Data de cadastro inválida. Por favor, insira uma data de cadastro no passado.");
        return;
    }

    // Se passar as validações, prossegue com o cadastro
    const cliente = {
        CPF,
        Nome,
        DataNascimento,
        Genero,
        Email,
        Telefone,
        Endereço,
        DataCadastro,
        fidelidade,
        Atendimento
    };

    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));

    document.getElementById('clienteForm').reset(); // Reseta o formulário
    listarClientes();
}

// Função para listar clientes
function listarClientes() {
    const tbody = document.querySelector('#clienteTable tbody');
    tbody.innerHTML = '';

    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    // Ordena os clientes pelo nome
    clientes.sort((a, b) => a.Nome.localeCompare(b.Nome));

    clientes.forEach((cliente, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cliente.CPF}</td>
            <td>${cliente.Nome}</td>
            <td>${cliente.DataNascimento}</td>
            <td>${cliente.Genero}</td>
            <td>${cliente.Email}</td>
            <td>${cliente.Telefone}</td>
            <td>${cliente.Endereço}</td>
            <td>${cliente.DataCadastro}</td>
            <td>${cliente.fidelidade}</td>
            <td>${cliente.Atendimento}</td>
            <td>
                <button onclick="editarCliente(${index})">Editar</button>
                <button onclick="removerCliente(${index})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para remover cliente
function removerCliente(index) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.splice(index, 1);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    listarClientes();
}

// Função para editar cliente
function editarCliente(index) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const cliente = clientes[index];

    // Preenche o formulário com os dados do cliente a ser editado
    document.getElementById('CPF').value = cliente.CPF;
    document.getElementById('Nome').value = cliente.Nome;
    document.getElementById('DataNascimento').value = cliente.DataNascimento;
    document.getElementById('Genero').value = cliente.Genero;
    document.getElementById('Email').value = cliente.Email;
    document.getElementById('Telefone').value = cliente.Telefone;
    document.getElementById('Endereço').value = cliente.Endereço;
    document.getElementById('DataCadastro').value = cliente.DataCadastro;
    document.getElementById('fidelidade').value = cliente.fidelidade;
    document.getElementById('Atendimento').value = cliente.Atendimento;

    // Remove o cliente atual da lista temporariamente
    removerCliente(index);
}

// Event Listener para adicionar clientes
document.getElementById('clienteForm').addEventListener('submit', adicionarCliente);

// Chama a função para listar clientes ao carregar a página
listarClientes();