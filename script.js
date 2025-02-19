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

    // Loop through all pages and create navigation links
    pages.forEach(page => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.textContent = page.name;
        a.href = page.file;

        // Highlight active page based on URL
        if (window.location.pathname.includes(page.file)) {
            a.classList.add("active");
        }

        li.appendChild(a);
        menu.appendChild(li);
    });

    nav.appendChild(menu); // Append <ul> to <nav>
    document.body.prepend(nav); // Add <nav> to the top of <body>

    console.log("Nav menu - LOADED!");
}

// Subroutine for generating the hero section dynamically
function generateHero() {
    let hero = document.createElement("section"); // Create a <section> for the hero
    hero.setAttribute("id", "hero"); // Set an ID for styling

// Create terminal window container
let terminal = document.createElement("div"); // Create a <div> for the terminal
terminal.setAttribute("id", "terminal"); // Set an ID for styling

// Create terminal title bar
let titleBar = document.createElement("div");
titleBar.setAttribute("id", "terminal-title"); 
titleBar.innerHTML = `
    <span class="terminal-btn close"></span>
    <span class="terminal-btn minimize"></span>
    <span class="terminal-btn maximize"></span>
    <span class="terminal-title-text">~/portfolio</span>
`;

// Create terminal body for welcome message
let terminalBody = document.createElement("div"); 
terminalBody.setAttribute("id", "terminal-body");

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
terminalBody.appendChild(terminalInput);

// Append elements together
terminalBody.appendChild(terminalText);
terminalBody.appendChild(terminalInput);
terminal.appendChild(titleBar);
terminal.appendChild(terminalBody);
hero.appendChild(terminal);


console.log("Hero section terminal window - LOADED!");

    // Insert hero section below the navigation
    let nav = document.querySelector("nav");
    if (nav) {
        nav.after(hero); // Place hero below nav bar
    } else { 
        document.body.prepend(hero); // If no nav, add to the top of body
    }

    terminalInput.addEventListener("keydown", handleTerminalCommand);

    console.log("Hero section - LOADED!");
}

// Subroutine for handling terminal commands
function handleTerminalCommand(event) {
    if (event.key === "Enter") {
        let inputField = event.target;
        let command = inputField.value.trim().toLowerCase(); // Get user input 
        let terminalText = document.getElementById("terminal-text");

        // Clear input field after submission
        inputField.value = "";

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

// Ensure all HTML loads before running the subroutines
document.addEventListener("DOMContentLoaded", function () {
    generateHead();
    generateNav();
    generateHero();
    generateMainContent();
    generateFooter();
});
