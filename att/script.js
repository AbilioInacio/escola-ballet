document.addEventListener("DOMContentLoaded", () => {
  // --- LÓGICA DO MENU HAMBURGUER (CELULAR) ---
  const menuToggle = document.querySelector(".menu-toggle");
  const navUl = document.querySelector("header nav ul");

  menuToggle.addEventListener("click", () => {
    navUl.classList.toggle("active");
  });

  // Fechar o menu ao clicar em um link (opcional, mas bom para UX)
  document.querySelectorAll("header nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navUl.classList.contains("active")) {
        navUl.classList.remove("active");
      }
    });
  });

  // --- LÓGICA DE VISIBILIDADE DOS BOTÕES FLUTUANTES ---
  const stickyButtonsContainer = document.getElementById(
    "sticky-buttons-container"
  );
  const modalidadesSection = document.getElementById("modalidades");

  // Verifica se os elementos existem antes de adicionar o observer
  if (stickyButtonsContainer && modalidadesSection) {
    // Opções para o Intersection Observer
    // threshold: 0.1 significa que a função será chamada quando 10% da seção for visível
    const options = {
      root: null, // viewport
      threshold: 0.1,
      rootMargin: "0px",
    };

    // A função que será executada quando a seção entrar ou sair da tela
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        // Se a seção 'modalidades' estiver visível na tela...
        if (entry.isIntersecting) {
          // ...esconde os botões flutuantes.
          stickyButtonsContainer.classList.add("hidden");
        } else {
          // ...caso contrário, mostra os botões flutuantes.
          stickyButtonsContainer.classList.remove("hidden");
        }
      });
    };

    // Cria o observer
    const observer = new IntersectionObserver(observerCallback, options);

    // Inicia a observação da seção 'modalidades'
    observer.observe(modalidadesSection);
  }
});
