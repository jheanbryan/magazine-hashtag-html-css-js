import { catalogo, salvarLocalStorage, lerLocalStorage } from "./utilidades";

const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};

function abrirCarrinho(){
    document.getElementById('carrinho').style.right = '0';
}

function fecharCarrinho(){
    document.getElementById('carrinho').style.right = '-300px';
}

function irParaCheckout(){
    if (Object.keys(idsProdutoCarrinhoComQuantidade) == 0 ){
        console.log('Carro fazio')
    } else{
        window.location.href = window.location.origin + "/pages/checkout.html"
    }
}

export function inicializarCarrinho(){
    document.getElementById('btnAbrirCarrinho').addEventListener('click', abrirCarrinho);
    document.getElementById('btnFecharCarrinho').addEventListener('click', fecharCarrinho);
    document.getElementById('btnFinalizarCompra').addEventListener('click', irParaCheckout);
} 

function removerDoCarrinho(idProduto){
    delete idsProdutoCarrinhoComQuantidade[idProduto];
    renderizarProdutosCarrinho();
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
}

function atualizarInfoQuantidade(idProduto){
    document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoComQuantidade[idProduto];
}

function incrementarQtdProduto(idProduto){
    idsProdutoCarrinhoComQuantidade[idProduto] ++;
    atualizarInfoQuantidade(idProduto);
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
    atualizarPrecoCarrinho();

}
function decrementarQtdProduto(idProduto){
    if (idsProdutoCarrinhoComQuantidade[idProduto] ==   1){
        removerDoCarrinho(idProduto);
        return;
    }
    idsProdutoCarrinhoComQuantidade[idProduto] --;
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
    atualizarInfoQuantidade(idProduto);
    atualizarPrecoCarrinho();
}

function desenharProdutoNoCarrinho(idProduto){
    const produto = catalogo.find(p => p.id == idProduto);

    if (produto){
        const containerProdtudosCarrinho = document.getElementById('produtos-carrinho');
        const elementoDiv = document.createElement('div');
        elementoDiv.classList.add('card-produto-carrinho');
        const cardProdutoCarrinho = `
            <div class="container-produto-carrinho">
                <div class="div-img-produto-carrinho">
                    <img src=${produto.srcImg} alt="processador athlon3000g" class="img-produto-carrinho">
                </div>
            
                <div class="info-produto-carrinho">
                    <span>${produto.nome}</span>
                    <span>R$ ${produto.valor}</span>
                </div>
            </div>  

            <div class="container-remove-add">
                <img src="assets/icons/circle-xmark-regular.svg" alt="" class="icon icon-remove" id="remover-item-${produto.id}">   

                <div class="menos-mais-btns">
                    <button id="decrementar-produto-${produto.id}">-</button>
                    <p  id="quantidade-${produto.id}">${idsProdutoCarrinhoComQuantidade[produto.id]}</p>
                    <button id="incrementar-produto-${produto.id}">+</button>
                </div>
            </div>
        `;
        
        elementoDiv.innerHTML = cardProdutoCarrinho;    
        containerProdtudosCarrinho.appendChild(elementoDiv); 
        
        document.getElementById(`decrementar-produto-${produto.id}`).addEventListener('click', () => decrementarQtdProduto(produto.id));

        document.getElementById(`incrementar-produto-${produto.id}`).addEventListener('click', () => incrementarQtdProduto(produto.id));

        document.getElementById(`remover-item-${produto.id}`).addEventListener('click', () => removerDoCarrinho(produto.id));

    } else{
        // Se o produto não for encontrado no catálogo
        console.error(`Produto com ID ${idProduto} não encontrado no catálogo.`);
    }
}

export function renderizarProdutosCarrinho(){
    const containerProdtudosCarrinho = document.getElementById('produtos-carrinho');
    containerProdtudosCarrinho.innerHTML = "";

    for (const idProduto in idsProdutoCarrinhoComQuantidade){
        desenharProdutoNoCarrinho(idProduto);
    }
}



export function adicionarAoCarrinho(idProduto){
    if (idProduto in idsProdutoCarrinhoComQuantidade){
        incrementarQtdProduto(idProduto);
        return;
    }
    idsProdutoCarrinhoComQuantidade[idProduto] = 1;
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
    desenharProdutoNoCarrinho(idProduto);
    atualizarPrecoCarrinho();
}

export function atualizarPrecoCarrinho(){
    let precoCarrinho = document.getElementById('preco-total');
    let precoTotalCarrinho = 0;

    for(const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade){
        precoTotalCarrinho += catalogo.find(p => p.id == idProdutoNoCarrinho).valor * idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
    }

    precoCarrinho.style.display = 'inline';
    precoCarrinho.innerText = `Total: R$ ${precoTotalCarrinho},00`

    if (precoTotalCarrinho == 0) {
        precoCarrinho.style.display = 'none ';
        precoCarrinho.innerText = ""    
    }

}