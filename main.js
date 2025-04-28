// Define an array of motivational quotes with attributions
const quotes = [
  `"You're that bird looking at the monitor and you're thinking 'I can figure this out' — and he's okay even though he doesn't understand the world."<br><strong>Terry A. Davis</strong>`,
  `"The worst thing a person can do, is to give up."<br><strong>Master Shi Heng Yi</strong>`,
  `"We can forgive children for being afraid of the dark. The real tragedy is when men are afraid of the light."<br><strong>Franz Hartmann</strong>`,
  `"Despite everything, you persist, you create, you love and you fight for meaning in a universe that offers none. That's the most beautiful thing of all."<br><strong>AI on Humanity</strong>`,
  `"I am the master of my fate. I am the captain of my soul."<br><strong>William Ernest Henley</strong>`
];

// Get the element where quotes will be displayed
const quotesElement = document.getElementById("random-thought");

// Function to display a random quote with fade transition
function showRandomThought() {
  quotesElement.classList.add("fade-out"); // Trigger fade-out CSS animation

  setTimeout(() => {
    const index = Math.floor(Math.random() * quotes.length); // Select random index
    quotesElement.innerHTML = quotes[index]; // Update content
    quotesElement.classList.remove("fade-out"); // Remove fade-out after new content
  }, 1000); // Delay matches fade-out duration
}

// Show initial quote immediately on page load
showRandomThought();

// Update quote every 7 seconds
setInterval(showRandomThought, 7000);

// Reveal scroll-based sections when they come into view
const scrollElements = document.querySelectorAll('.scroll-section');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible'); // Add reveal class
      scrollObserver.unobserve(entry.target); // Stop observing after it's visible
    }
  });
}, {
  threshold: 0.1 // 10 percent of the element must be visible to trigger
});

// Start observing each scroll section
scrollElements.forEach(el => scrollObserver.observe(el));
