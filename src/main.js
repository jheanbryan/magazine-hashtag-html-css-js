import { rendenizarCatalogo } from "./card-produto"
import { atualizarPrecoCarrinho, inicializarCarrinho, renderizarProdutosCarrinho } from "./meu-carrinho";
import { inicializarFiltros } from "./filtros-catalogo";

rendenizarCatalogo();
inicializarCarrinho();
renderizarProdutosCarrinho();
atualizarPrecoCarrinho();
inicializarFiltros();