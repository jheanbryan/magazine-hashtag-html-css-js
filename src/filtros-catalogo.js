const catalogoProdutos = document.getElementById('container-produto');

function exibirTodos(){
    const produtosEscondidos = Array.from(catalogoProdutos.getElementsByClassName('esconder'));
    for (const produto of produtosEscondidos){
        produto.classList.remove('esconder');
    }

}

function esconderGpus(){
    exibirTodos();
    const gpus = Array.from(catalogoProdutos.getElementsByClassName('gpu'));
    for (const produto in gpus){
        gpus[produto].classList.add('esconder');
    }
}

function esconderCpus(){
    exibirTodos();
    const cpus = Array.from(catalogoProdutos.getElementsByClassName('cpu'));
    for (const produto in cpus){
        cpus[produto].classList.add('esconder');
    }
}


export function inicializarFiltros(){
    document.getElementById('exibir-cpus').addEventListener('click', esconderGpus);
    document.getElementById('exibir-gpus').addEventListener('click', esconderCpus);
    document.getElementById('exibir-todos').addEventListener('click', exibirTodos);
}