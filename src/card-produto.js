import { catalogo } from "./utilidades";
import { adicionarAoCarrinho } from "./meu-carrinho";

export function rendenizarCatalogo(){
    for (const produtoCatalogo of catalogo){
        const cartaoProduto = `
            <div class="card-produto ${produtoCatalogo.cpu ? 'cpu' : 'gpu'}">
                <div class="div-img-produto">
                    <img src="${produtoCatalogo.srcImg}" alt="processador athlon3000g" class="img-produto">
                </div>
                <h4 class="nome-produto">${produtoCatalogo.nome}</h4>
                <span>${produtoCatalogo.marca}</span>
                <h4>R$ ${produtoCatalogo.valor}</h4>
                <button class="btn-carrinho" id="add-${produtoCatalogo.id}">Adicionar ao Carrinho</button>
            </div>`
        document.getElementById('container-produto').innerHTML += cartaoProduto;
    }

    for (const produtoCatalogo of catalogo){
        document.getElementById(`add-${produtoCatalogo.id}`).addEventListener('click', () => adicionarAoCarrinho(produtoCatalogo.id))
        //usar () => () => adicionarAoCarrinho(produtoCatalogo.id) ao inves de
        // () => adicionarAoCarrinho(produtoCatalogo.id)
        // o primeiro modo executa a função, pois tem os ()
    }
}
