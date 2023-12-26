import { rendenizarCatalogo } from "./card-produto.js"
import { atualizarPrecoCarrinho, inicializarCarrinho, renderizarProdutosCarrinho } from "./meu-carrinho.js";
import { inicializarFiltros } from "./filtros-catalogo.js";

rendenizarCatalogo();
inicializarCarrinho();
renderizarProdutosCarrinho();
atualizarPrecoCarrinho();
inicializarFiltros();

console.log('oab');