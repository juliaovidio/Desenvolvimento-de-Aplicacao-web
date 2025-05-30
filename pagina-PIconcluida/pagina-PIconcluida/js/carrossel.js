
const imagens = document.querySelectorAll('.carrossel img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let index = 0;

// Função para mostrar imagem com base no índice
function mostrarImagem(n) {
  imagens.forEach(img => img.classList.remove('active'));
  imagens[n].classList.add('active');
}

// Próxima imagem
function proximaImagem() {
  index = (index + 1) % imagens.length;
  mostrarImagem(index);
}

// Imagem anterior
function imagemAnterior() {
  index = (index - 1 + imagens.length) % imagens.length;
  mostrarImagem(index);
}

// Botões de navegação
nextBtn.addEventListener('click', proximaImagem);
prevBtn.addEventListener('click', imagemAnterior);

// Troca automática a cada 3 segundos
setInterval(proximaImagem, 3000);
