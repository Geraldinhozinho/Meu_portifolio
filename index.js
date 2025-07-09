// === SCRIPT.JS ===

// Animação de digitação no "fullstack" (opcional)
const destaque = document.querySelector('.destaque');
if (destaque) {
  const texto = "FULLSTACK";
  let i = 0;

  function escrever() {
    if (i <= texto.length) {
      destaque.textContent = texto.substring(0, i);
      i++;
      setTimeout(escrever, 100);
    }
  }
  escrever();
}

// Scroll suave para os links de navegação (caso tenha header com links)
document.querySelectorAll('a[href^="#"]').forEach(ancora => {
  ancora.addEventListener('click', function (e) {
    e.preventDefault();
    const destino = document.querySelector(this.getAttribute('href'));
    if (destino) {
      destino.scrollIntoView({ behavior: 'smooth' });
    }
  });
});












let index = 1;
let width = 0;
let isCarouselActive = false;
let intervalId = null;

const inner = document.querySelector(".galeria-inner");
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");

let originalItems = Array.from(document.querySelectorAll(".galeria-item"));

function activateCarousel() {
  if (isCarouselActive) return;

  // Clonar
  const firstClone = originalItems[0].cloneNode(true);
  const lastClone = originalItems[originalItems.length - 1].cloneNode(true);
  firstClone.id = "first-clone";
  lastClone.id = "last-clone";

  inner.innerHTML = ""; // limpa tudo
  inner.appendChild(lastClone);
  originalItems.forEach(item => inner.appendChild(item));
  inner.appendChild(firstClone);

  index = 1;
  isCarouselActive = true;
  updateWidth();
}

function deactivateCarousel() {
  if (!isCarouselActive) return;

  // Limpa os clones e volta ao estado original
  inner.innerHTML = "";
  originalItems.forEach(item => inner.appendChild(item));
  isCarouselActive = false;
}

function updateWidth() {
  width = inner.querySelector(".galeria-item").clientWidth;
  inner.style.transition = "none";
  inner.style.transform = `translateX(-${width * index}px)`;
}

function moveToSlide() {
  inner.style.transition = "transform 0.4s ease-in-out";
  inner.style.transform = `translateX(-${width * index}px)`;
}

btnNext.addEventListener("click", () => {
  if (!isCarouselActive) return;
  if (index >= inner.children.length - 1) return;
  index++;
  moveToSlide();
});

btnPrev.addEventListener("click", () => {
  if (!isCarouselActive) return;
  if (index <= 0) return;
  index--;
  moveToSlide();
});

inner.addEventListener("transitionend", () => {
  if (!isCarouselActive) return;

  const current = inner.children[index];
  if (current.id === "first-clone") {
    inner.style.transition = "none";
    index = 1;
    inner.style.transform = `translateX(-${width * index}px)`;
  } else if (current.id === "last-clone") {
    inner.style.transition = "none";
    index = inner.children.length - 2;
    inner.style.transform = `translateX(-${width * index}px)`;
  }
});

// Ativa/desativa conforme a largura da tela
function handleResize() {
  if (window.innerWidth <= 1024) {
    activateCarousel();
  } else {
    deactivateCarousel();
  }
}

window.addEventListener("resize", handleResize);
window.addEventListener("load", handleResize);
