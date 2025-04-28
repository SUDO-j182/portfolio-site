// ================================
// QUOTES LOGIC
// ================================

// Define quotes array
const quotes = [
  `"You're that bird looking at the monitor and you're thinking 'I can figure this out' — and he's okay even though he doesn't understand the world."<br><strong>Terry A. Davis</strong>`,
  `"The worst thing a person can do, is to give up."<br><strong>Master Shi Heng Yi</strong>`,
  `"We can forgive children for being afraid of the dark. The real tragedy is when men are afraid of the light."<br><strong>Franz Hartmann</strong>`,
  `"Despite everything, you persist, you create, you love and you fight for meaning in a universe that offers none. That's the most beautiful thing of all."<br><strong>AI on Humanity</strong>`,
  `"I am the master of my fate. I am the captain of my soul."<br><strong>William Ernest Henley</strong>`
];

// Show Random Thought
document.addEventListener('DOMContentLoaded', function() {
  const quotesElement = document.getElementById("random-thought");

  function showRandomThought() {
    if (quotesElement) {
      quotesElement.classList.add("fade-out");

      setTimeout(() => {
        const index = Math.floor(Math.random() * quotes.length);
        quotesElement.innerHTML = quotes[index];
        quotesElement.classList.remove("fade-out");
      }, 1000);
    }
  }

  showRandomThought();
  setInterval(showRandomThought, 7000);
});

// ================================
// SCROLL REVEAL
// ================================
document.addEventListener('DOMContentLoaded', function() {
  const scrollElements = document.querySelectorAll('.scroll-section');

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  scrollElements.forEach(el => scrollObserver.observe(el));
});

// ================================
// PROJECT MODAL HANDLING
// ================================
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const closeButton = document.querySelector(".close-button");

  // Expose openModal to global window scope
  window.openModal = function(title, description) {
    if (modal && modalTitle && modalDescription) {
      modal.style.display = "block";
      modalTitle.textContent = title;
      modalDescription.textContent = description;
    }
  };

  // Close Modal
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close Modal by clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
