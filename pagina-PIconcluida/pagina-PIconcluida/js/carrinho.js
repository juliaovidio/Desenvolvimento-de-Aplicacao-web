// carrinho.js

// Simula um produto no carrinho
const produto = {
    nome: "Barbante Barroco Círculo Multicolor 4/6 200g com 226m",
    preco: 22.19,
    imagem: "caminho/da-imagem.jpg", // atualize com o caminho real
    quantidade: 1
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    preencherResumo(produto);
  });
  
  function preencherResumo(produto) {
    const resumo = document.querySelector(".summary-details");
    const subtotal = produto.preco * produto.quantidade;
  
    resumo.innerHTML = `
      <div class="item-carrinho">
        <img src="${produto.imagem}" alt="${produto.nome}" class="product-image">
        <div>
          <p>${produto.nome}</p>
          <p>Quantidade: ${produto.quantidade}</p>
          <p><strong>R$ ${produto.preco.toFixed(2)}</strong></p>
        </div>
      </div>
      <hr>
      <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
      <p id="frete-info">Frete: Insira o endereço</p>
      <p><strong>Total: R$ ${subtotal.toFixed(2)}</strong></p>
    `;
  }
  