// Subroutine for generating the HTML head dynamically 
function generateHead() {
    let head = document.head; // Get the <head> element

    // Define page titles.
    let titles = {
        "index.html": "Home | My Portfolio",
        "projects.html": "Projects | My Portfolio",
        "about.html": "About Me | My Portfolio",
        "contact.html": "Contact | My Portfolio"
    };

    // Get the current page filename
    let currentPage = window.location.pathname.split("/").pop();
    
    // Create and set the <title> element dynamically
    let title = document.createElement("title");
    title.textContent = titles[currentPage] || "My Portfolio"; // Default title if not found
    head.appendChild(title); // Append <title> to <head>

    // Setting the meta tags
    let metaCharset = document.createElement("meta");
    metaCharset.setAttribute("charset", "UTF-8");
    head.appendChild(metaCharset);

    let metaViewport = document.createElement("meta");
    metaViewport.setAttribute("name", "viewport");
    metaViewport.setAttribute("content", "width=device-width, initial-scale=1.0");
    head.appendChild(metaViewport);

    // Linking the CSS file dynamically
    let cssLink = document.createElement("link");
    cssLink.setAttribute("rel", "stylesheet");
    cssLink.setAttribute("href", "styles.css");
    head.appendChild(cssLink);

    console.log("Head section - LOADED!");
}

// Subroutine for generating the navigation menu dynamically
function generateNav() {
    let nav = document.createElement("nav"); // Create <nav> element
    let menu = document.createElement("ul"); // Create <ul> tags

    // Define pages and their file names
    let pages = [
        { name: "Home", file: "index.html" },
        { name: "Projects", file: "projects.html" },
        { name: "About Me", file: "about.html" },
        { name: "Contact", file: "contact.html" }
    ];

    // Define `currentPage` to highlight the current page 
    let currentPage = window.location.pathname.split("/").pop() || "index.html";

    // Loop through all pages and create navigation links
    pages.forEach(page => {
        let li = document.createElement("li"); // Creating <li> tags
        let a = document.createElement("a");   // Creating <a> tags
        a.textContent = page.name;             // Set the link text
        a.href = page.file;                    // Set the link URL
        if (page.file === currentPage) {
            a.classList.add("active");        // Highlight the current page
        }

        li.appendChild(a);            // Append <a> to <li>
        menu.appendChild(li);         // Append <li> to <ul>
    });

    nav.appendChild(menu); // Append <ul> to <nav>
    document.body.prepend(nav); // Add <nav> to the top of <body>

    console.log("Nav menu - LOADED!");
}

// Subroutine for generating the hero section dynamically
function generateHero() {
    let hero = document.createElement("section"); // Create a <section> for the hero
    hero.setAttribute("id", "hero"); // Set an ID for styling

    // Identify the current page
    let currentPage = window.location.pathname.split("/").pop();

    if (currentPage === "index.html") {
        // Create terminal window container
        let terminal = document.createElement("div"); // Create a <div> for the terminal
        terminal.setAttribute("id", "terminal"); // Set an ID for styling
        terminal.classList.add("terminal-window");

        // Create terminal title bar
        let titleBar = document.createElement("div");
        titleBar.setAttribute("id", "terminal-title");
        titleBar.classList.add("terminal-title");
        titleBar.innerHTML = `
            <span class="terminal-btn close"></span>
            <span class="terminal-btn minimize"></span>
            <span class="terminal-btn maximize"></span>
            <span class="terminal-title-text">~/portfolio</span>
        `;

        // Create terminal body for welcome message
        let terminalBody = document.createElement("div");
        terminalBody.setAttribute("id", "terminal-body");
        terminalBody.classList.add("terminal-body");

        let terminalText = document.createElement("pre"); // Simulating CLI output
        terminalText.setAttribute("id", "terminal-text");
        terminalText.innerHTML = `
Welcome to My Portfolio
---------------------------
> Ex warehouse professional, transitioning into tech.
> Passionate about programming, AI and personal development.
> Type 'help' for more information.
        `;

        // Create terminal input field
        let terminalInput = document.createElement("input");
        terminalInput.setAttribute("type", "text");
        terminalInput.setAttribute("id", "terminal-input");
        terminalInput.setAttribute("placeholder", "Type a command...");
        terminalInput.setAttribute("autocomplete", "off");

        // Append elements together
        terminalBody.appendChild(terminalText);
        terminal.appendChild(titleBar);
        terminal.appendChild(terminalBody);
        terminal.appendChild(terminalInput); // Ensure input is at the bottom

        hero.appendChild(terminal); // Append terminal to hero section

        // Attach event listener for handling terminal commands
        terminalInput.addEventListener("keydown", handleTerminalCommand);
        terminalInput.focus(); // Auto-focus input field

        console.log("Hero section terminal window - LOADED!");
    } else {
        // Create terminal window container for animations
        let terminal = document.createElement("div"); // Create a <div> for the terminal
        terminal.classList.add("terminal-window");

        // Create terminal title bar
        let titleBar = document.createElement("div");
        titleBar.classList.add("terminal-title");
        titleBar.innerHTML = `
            <span class="terminal-btn close"></span>
            <span class="terminal-btn minimize"></span>
            <span class="terminal-btn maximize"></span>
            <span class="terminal-title-text">~/portfolio</span>
        `;

        // Create terminal body for animations
        let terminalBody = document.createElement("div");
        terminalBody.classList.add("terminal-body");

        let animationContainer = document.createElement("div");
        animationContainer.classList.add("animation-container");

        if (currentPage === "projects.html") {
            let bouncingTriangleContainer = document.createElement("div");
            bouncingTriangleContainer.classList.add("bouncing-triangle-container");

            // Create bouncing triangles
            for (let i = 0; i < 100; i++) { // Adjust the number of triangles as needed
                let bouncingTriangle = document.createElement("div");
                bouncingTriangle.classList.add("bouncing-triangle");
                bouncingTriangleContainer.appendChild(bouncingTriangle);
            }

            animationContainer.appendChild(bouncingTriangleContainer);
        } else if (currentPage === "about.html") {
            let gridContainer = document.createElement("div");
            gridContainer.classList.add("grid-container");

            // Create grid squares
            for (let i = 0; i < 500; i++) { // Adjust the number of squares as needed
                let gridSquare = document.createElement("div");
                gridSquare.classList.add("grid-square");
                gridContainer.appendChild(gridSquare);
            }

            animationContainer.appendChild(gridContainer);
        } else if (currentPage === "contact.html") {
            addParticlesToSimulation(animationContainer, 5000); // Increase number of particles
        }

        terminalBody.appendChild(animationContainer);
        terminal.appendChild(titleBar);
        terminal.appendChild(terminalBody);

        // Append terminal to the body below the footer
        document.body.appendChild(terminal);

        console.log("Hero section animation - LOADED!");
    }

    // Insert hero section below nav
    let existingNav = document.querySelector("nav");
    if (existingNav) {
        existingNav.after(hero); // Place hero below nav bar
    } else {
        document.body.prepend(hero); // If no nav, add to top of body
    }

    console.log("Hero section - LOADED!");
}

// Subroutine for sanitizing user input

function sanitizeInput(input) {
    let sanitized = input.replace(/[<>]/g, ""); // Remove < and >
    sanitized = sanitized.replace(/(on\w+=["'].*?["'])/g, ""); // Remove event handlers
    sanitized = sanitized.replace(/javascript:/gi, ""); // Remove JavaScript protocol
    console.log("Original Input:", input);
    console.log("Sanitized Input:", sanitized);
    return sanitized;
}


// Subroutine for handling terminal commands
function handleTerminalCommand(event) {
    if (event.key === "Enter") {
        let inputField = event.target;
        let command = inputField.value.trim().toLowerCase(); // Get user input 
        let terminalText = document.getElementById("terminal-text");

        // Clear input field after submission
        inputField.value = "";

        // Limit command history to 5 lines
        let maxHistory = 5;
        let lines = terminalText.innerHTML.split("\n");
        if (lines.length > maxHistory) {
            lines = lines.slice(-maxHistory);
        }
        terminalText.innerHTML = lines.join("\n");

        // Append new command to terminal
        terminalText.innerHTML += `\n> ${command}`;

        // Handle different commands
        if (command === "help") {
            terminalText.innerHTML +=  `
            > Available commands:
            > help - Show available commands
            > about - Learn about me
            > clear - Clear terminal output
            `;
        } else if (command === "about") {
            terminalText.innerHTML +=  `
            > I am a tech enthusiast exploring programming, AI, and cybersecurity.
            > Currently transitioning into tech from warehousing.
            `;
        } else if (command === "clear") {
            terminalText.innerHTML = "Welcome to My Portfolio\n------------------------------";
        } else {
            terminalText.innerHTML += `
> Unknown command: "${command}". Type 'help' for a list of commands.
`;
        }

        // Ensure terminal scrolls to the latest output
        let terminalBody = document.getElementById("terminal-body");
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
}

// Subroutine for generating the main content of the page
function generateMainContent() {
    let main = document.createElement("main"); // Create <main> inside <body>
    main.setAttribute("id", "main-content"); // Set an ID for styling

    let content = document.createElement("section"); // Create a <section> for content

    // Identify the current page and generate content accordingly
    let currentPage = window.location.pathname.split("/").pop();

    let pageContent = {
        "index.html": `
            <h2>About Me</h2>
            <p>Welcome to my portfolio! I am passionate about tech, programming, and AI.</p>
        `,
        "projects.html": `
            <h2>My Projects</h2>
            <p>Here are some of my latest projects and coding experiments.</p>
        `,
        "about.html": `
            <h2>Who Am I?</h2>
            <p>A tech enthusiast exploring cybersecurity and game development.</p>
        `,
        "contact.html": `
            <h2>Contact Me</h2>
            <p>Feel free to reach out to me for collaborations or discussions.</p>
        `
    };

    content.innerHTML = pageContent[currentPage] || `
        <h2>Page Not Found</h2>
        <p>Oops! This page doesn't seem to exist.</p>
    `;

    main.appendChild(content); // Append content to <main>

    // Insert main content below the hero section
    let hero = document.querySelector("#hero");
    if (hero) {
        hero.after(main);
    } else {
        document.body.appendChild(main);
    }

    console.log("Main content - LOADED!");
}

// Subroutine for generating the footer dynamically
function generateFooter() {
    let footer = document.createElement("footer"); // Create <footer> element
    footer.setAttribute("id", "footer"); // Set ID for styling

    let footerContent = document.createElement("p"); // Create <p> element
    let year = new Date().getFullYear(); // Get the current year dynamically
    footerContent.innerHTML = `&copy; ${year} My Portfolio. All rights reserved.`; // Dynamic copyright year

    footer.appendChild(footerContent); // Append content to footer

    // Insert footer at the end of the body
    document.body.appendChild(footer);

    console.log("Footer - LOADED!");
}

// Function to create interactive fish
function createFish() {
    const fish = document.createElement('div');
    fish.classList.add('fish');
    fish.style.top = `${Math.random() * 100}vh`;
    fish.style.animationDuration = `${Math.random() * 5 + 5}s`;
    fish.addEventListener('mouseover', () => {
        fish.style.animationDirection = fish.style.animationDirection === 'reverse' ? 'normal' : 'reverse';
    });
    return fish;
}

// Add fish to the underwater scene
function addFishToScene(container, numFish) {
    for (let i = 0; i < numFish; i++) {
        const fish = createFish();
        container.appendChild(fish);
    }
}

// Function to create planets with trails
function createPlanetWithTrail(distance) {
    const planet = document.createElement('div');
    planet.classList.add('planet');
    planet.style.transformOrigin = `${distance}px`;
    return planet;
}

// Add planets with trails to the solar system
function addPlanetsToSystem(container, numPlanets) {
    const distances = [100, 150, 200, 250, 300, 350, 400, 450]; // Distances for each planet
    for (let i = 0; i < numPlanets; i++) {
        const distance = distances[i % distances.length]; // Use distances cyclically
        const planet = createPlanetWithTrail(distance);
        planet.style.animationDuration = `${Math.random() * 10 + 5}s`;
        container.appendChild(planet);
    }
}

// Function to create stars
function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    return star;
}

// Add stars to the solar system
function addStarsToSystem(container, numStars) {
    for (let i = 0; i < numStars; i++) {
        const star = createStar();
        container.appendChild(star);
    }
}

// Function to create multicolored particles
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle-dither');
    particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.animationDuration = `${Math.random() * 2 + 1}s`;
    return particle;
}

// Add particles to the particle simulation
function addParticlesToSimulation(container, numParticles) {
    for (let i = 0; i < numParticles; i++) {
        const particle = createParticle();
        container.appendChild(particle);
    }
}

// Ensure all HTML loads before running the subroutines
document.addEventListener("DOMContentLoaded", function () {
    try {
        generateHead();
        generateNav();
        generateHero();
        generateMainContent();
        generateFooter();
    } catch (error) {
        console.error("Error during initialization:", error);
    }
});

