export const catalogo =[
    {   
        id:1,
        nome: "Atlhon 3000G",
        marca: "AMD",
        valor: 500,
        srcImg: "https://github.com/jheanbryan/magazine-hashtag/blob/main/assets/cpus/athlon3000g.png?raw=true",
        cpu: true,
    },
    {
        id:2,
        nome: "I3 10100F",
        marca: "Intel",
        valor: 800,
        srcImg: "https://github.com/jheanbryan/magazine-hashtag/blob/main/assets/cpus/i310100f.png?raw=true",
        cpu: true,
    },
    {
        id:3,
        nome: "Ryzen 5 4600G",
        marca: "AMD",
        valor: 900,
        srcImg: "https://github.com/jheanbryan/magazine-hashtag/blob/main/assets/cpus/ryzen5.jpg?raw=true",
        cpu: true,
    },
    {
        id:4,
        nome: "Ryzen 5 5600G",
        marca: "AMD",
        valor: 1200,
        srcImg: "https://github.com/jheanbryan/magazine-hashtag/blob/main/assets/cpus/ryzen5.jpg?raw=true",
        cpu: true,
    },
    {
        id:5,
        nome: "GTX 1660 Super",
        marca: "MSI",
        valor: 1200,
        srcImg: "https://github.com/jheanbryan/magazine-hashtag/blob/main/assets/gpus/1660s.jpg?raw=true"
    },
    {
        id:6,
        nome: "RTX 2060",
        marca: "GIGABYTE",
        valor: 1500,
        srcImg: "https://github.com/jheanbryan/magazine-hashtag/blob/main/assets/gpus/2060.jpg?raw=true"
    },
    {
        id:7,
        nome: "RTX 4090",
        marca: "AORUS",
        valor: 5000,
        srcImg: "https://github.com/jheanbryan/magazine-hashtag/blob/main/assets/gpus/4090.jpg?raw=true"
    },
    {
        id:8,
        nome: "RX 580",
        marca: "GIGABYTE",
        valor: 600,
        srcImg: "https://github.com/jheanbryan/magazine-hashtag/blob/main/assets/gpus/rx580.png?raw=true"
    },
    
]

export function salvarLocalStorage(chave, informacao){
    localStorage.setItem(chave, JSON.stringify(informacao));
}

export function lerLocalStorage(chave){
    return JSON.parse(localStorage.getItem(chave));
}

export function apagarDoLocalStorage(chave){
    localStorage.removeItem(chave);
}

export function desenharProdutoNoCarrinhoSimples(idProduto, idContainerHtml, quantidadeProduto, url){
    const produto = catalogo.find(p => p.id == idProduto);

    if (produto){
        const containerProdtudosCarrinho = document.getElementById(idContainerHtml);
        const elementoDiv = document.createElement('div');
        elementoDiv.classList.add('card-produto-carrinho');
        const cardProdutoCarrinho = `
            <div class="container-produto-carrinho">
                <div class="div-img-produto-carrinho">
                    <img src=${url}${produto.srcImg} alt="processador athlon3000g" class="img-produto-carrinho">
                </div>
            
                <div class="info-produto-carrinho">
                    <span>${produto.nome}</span>
                    <span>R$ ${produto.valor}</span>
                </div>
            </div>  

            <div class="container-remove-add">
                <div class="menos-mais-btns">
                    <p id="quantidade-${produto.id}">${quantidadeProduto}</p>
                </div>
            </div>
        `;
        
        elementoDiv.innerHTML = cardProdutoCarrinho;    
        containerProdtudosCarrinho.appendChild(elementoDiv); 
        

    } else{
        // Se o produto não for encontrado no catálogo
        console.error(`Produto com ID ${idProduto} não encontrado no catálogo.`);
    }
}