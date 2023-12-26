import { 
    desenharProdutoNoCarrinhoSimples,
    lerLocalStorage, apagarDoLocalStorage,
    salvarLocalStorage,
    catalogo } from "./utilidades"

function desenharProdutosCheckout(){
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};

    for (const idProduto in idsProdutoCarrinhoComQuantidade){
        desenharProdutoNoCarrinhoSimples(idProduto, 'container-produtos-checkout',idsProdutoCarrinhoComQuantidade[idProduto], '');
    }
}

function finalizarCompra(evento){
    evento.preventDefault();
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};

    if (Object.keys(idsProdutoCarrinhoComQuantidade) == 0){
        return;
    } else{
        const dataAtual = new Date();
        const pedidoFeito = {
            dataPedido: dataAtual,
            pedido: idsProdutoCarrinhoComQuantidade
        }
        const historicoDePedidos = lerLocalStorage('historico') ?? [];
        const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];
        
        salvarLocalStorage('historico', historicoDePedidosAtualizado);
        apagarDoLocalStorage('carrinho');
        window.location.href = window.location.origin + "/pages/pedidos.html"
    }

}

const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};
let precoTotalCarrinho = 0;
for(const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade){
    precoTotalCarrinho += catalogo.find(p => p.id == idProdutoNoCarrinho).valor * idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
}

desenharProdutosCheckout();
document.getElementById('valorTotal').innerText = `R$ ${precoTotalCarrinho},00`;
document.addEventListener('submit', (evt) => finalizarCompra(evt));