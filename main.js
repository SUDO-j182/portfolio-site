// ================================
// QUOTES LOGIC
// ================================
const quotes = [
  `"You're that bird looking at the monitor and you're thinking 'I can figure this out' — and he's okay even though he doesn't understand the world."<br><strong>Terry A. Davis</strong>`,
  `"The worst thing a person can do, is to give up."<br><strong>Master Shi Heng Yi</strong>`,
  `"We can forgive children for being afraid of the dark. The real tragedy is when men are afraid of the light."<br><strong>Franz Hartmann</strong>`,
  `"Despite everything, you persist, you create, you love and you fight for meaning in a universe that offers none. That's the most beautiful thing of all."<br><strong>AI on Humanity</strong>`,
  `"I am the master of my fate. I am the captain of my soul."<br><strong>William Ernest Henley</strong>`
];

document.addEventListener('DOMContentLoaded', function () {
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
document.addEventListener('DOMContentLoaded', function () {
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
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const closeButton = document.querySelector(".close-button");

  window.openModal = function (title, description, timelineHTML = "") {
    if (modal && modalTitle && modalDescription) {
      modal.style.display = "block";
      modalTitle.textContent = title;
      modalDescription.textContent = description;

      const timeline = document.getElementById("modal-timeline");
      if (timeline) {
        timeline.innerHTML = timelineHTML;
      }
    }
  };

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

// ================================
// JOURNAL SYSTEM (CRUD + LOCK)
// ================================
document.addEventListener('DOMContentLoaded', () => {
  const journalSection = document.getElementById("journal");
  const titleInput = document.getElementById("entry-title");
  const bodyInput = document.getElementById("entry-body");
  const tagsInput = document.getElementById("entry-tags");
  const saveButton = document.getElementById("save-entry");
  const archiveContainer = document.getElementById("entry-archive");
  let editId = null;

  // === LOCK OVERLAY ===
  const lockOverlay = document.createElement('div');
  lockOverlay.id = 'journal-lock';
  lockOverlay.innerHTML = `
    <input id="journal-pass" type="password" placeholder="Enter Access Key">
    <button id="unlock-journal">Unlock</button>
    <p style="margin-top:1rem; font-size:0.7rem;">Journal is protected</p>
  `;

  if (journalSection) {
    journalSection.style.position = "relative";
    journalSection.appendChild(lockOverlay);

    const hashCheck = "9aca7151acec02e10ec3548f9313b81043bbbeebbbdb012547f4b193701e3326a07597b492f949bc84e3d3f650f1d23fcb93628d95d7903ff9f851a8d1aa28bc";

    async function sha512(input) {
      const data = new TextEncoder().encode(input);
      const hashBuffer = await crypto.subtle.digest("SHA-512", data);
      return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    document.getElementById("unlock-journal").addEventListener("click", async () => {
      const userInput = document.getElementById("journal-pass").value.trim();
      const hashedInput = await sha512(userInput);

      if (hashedInput === hashCheck) {
        lockOverlay.remove();
        initJournal();
      } else {
        alert("Incorrect access key.");
      }
    });
  }

  // === JOURNAL SYSTEM FUNCTIONS ===
  function initJournal() {
    function loadEntries() {
      const saved = localStorage.getItem("journalEntries");
      return saved ? JSON.parse(saved) : [];
    }

    function saveEntries(entries) {
      localStorage.setItem("journalEntries", JSON.stringify(entries));
    }

    function renderEntries(entries) {
      archiveContainer.innerHTML = "";

      [...entries].reverse().forEach(entry => {
        const details = document.createElement("details");
        const summary = document.createElement("summary");
        const content = document.createElement("p");
        const actions = document.createElement("div");

        summary.textContent = `[${entry.timestamp}] ${entry.title}`;
        content.textContent = entry.body;

        if (entry.tags && entry.tags.length) {
          const tagBlock = document.createElement("div");
          tagBlock.style.marginTop = "0.5rem";
          tagBlock.innerHTML = entry.tags.map(t => `<span class='entry-tag'>#${t}</span>`).join(" ");
          content.appendChild(tagBlock);
        }

        actions.style.marginTop = "1rem";

        const editBtn = document.createElement("button");
        editBtn.textContent = "📝 Edit";
        editBtn.className = "cta-button";
        editBtn.style.marginRight = "1rem";
        editBtn.onclick = () => {
          titleInput.value = entry.title;
          bodyInput.value = entry.body;
          tagsInput.value = entry.tags.join(", ");
          editId = entry.id;
          saveButton.textContent = "Update Entry";
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️ Delete";
        deleteBtn.className = "cta-button";
        deleteBtn.onclick = () => {
          const updated = loadEntries().filter(e => e.id !== entry.id);
          saveEntries(updated);
          renderEntries(updated);
        };

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        details.appendChild(summary);
        details.appendChild(content);
        details.appendChild(actions);
        archiveContainer.appendChild(details);
      });
    }

    saveButton.addEventListener("click", () => {
      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();
      const tags = tagsInput.value.split(',').map(t => t.trim()).filter(Boolean);
      if (!title || !body) return;

      let entries = loadEntries();

      if (editId) {
        entries = entries.map(e =>
          e.id === editId ? { ...e, title, body, tags } : e
        );
        editId = null;
        saveButton.textContent = "Save Entry";
      } else {
        const newEntry = {
          id: Date.now(),
          title,
          body,
          tags,
          timestamp: new Date().toLocaleString()
        };
        entries.push(newEntry);
      }

      saveEntries(entries);
      renderEntries(entries);
      titleInput.value = "";
      bodyInput.value = "";
      tagsInput.value = "";
    });

    renderEntries(loadEntries());
  }
});