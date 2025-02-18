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
    let title = document.createElement("title"); // Creating and setting the <title> element
    title.textContent = titles[currentPage] || "My Portfolio"; // Set default page title if not found
    head.appendChild(title); // Append <title> to <head>

    // Setting the meta tags
    let metaCharset = document.createElement("meta"); // Creating the <meta> tag.
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

    // Loop through all pages and create links
    pages.forEach(page => {
        let li = document.createElement("li"); // Creating <li> tags
        let a = document.createElement("a");   // Creating <a> tags
        a.textContent = page.name;             // Set the link text
        a.href = page.file;                    // Set the link URL

        // Highlight active page based on URL
        if (window.location.pathname.includes(page.file)) {
            a.classList.add("active");
        }

        li.appendChild(a);            // Append <a> to <li>
        menu.appendChild(li);         // Append <li> to <ul>
    });

    nav.appendChild(menu);            // Append <ul> to <nav>
    document.body.prepend(nav);       // Add <nav> to the top of <body>

    console.log("Nav menu - LOADED!");
}

// Subroutine for generating the hero section dynamically
function generateHero() {
    let hero = document.createElement("section"); // Create a <section> for the hero
    hero.setAttribute("id", "hero"); // Set an ID for styling later on

    let title = document.createElement("h1"); // Create the main title
    title.textContent = "Welcome to My Portfolio"; // Placeholder text

    let tagline = document.createElement("p"); // Create a tagline
    tagline.textContent = "Making an Entrance to Tech.";

    // Append elements to the hero section
    hero.appendChild(title);
    hero.appendChild(tagline);

    // Insert hero section right after the nav generation
    let nav = document.querySelector("nav"); // Find the <nav>
    if (nav) {
        nav.after(hero); // Place hero below nav bar
    } else { 
        document.body.prepend(hero); // If no nav, add to top of body
    }

    console.log("Hero section - LOADED!");
}

// Subroutine for generating the main content of the page
function generateMainContent() {
    let main = document.createElement("main"); // Create <main> inside <body>
    main.setAttribute("id", "main-content");   // Set an ID for styling later

    let content = document.createElement("section"); // Create a <section> for content

    // Identify the current page and generate content accordingly
    let currentPage = window.location.pathname.split("/").pop();

    if (currentPage === "index.html" || currentPage === "") {
        content.innerHTML = `
            <h2>About Me</h2>
            <p>Welcome to my portfolio! I am passionate about tech, programming and AI.</p>
        `;
    } else if (currentPage === "projects.html") {
        content.innerHTML = `
            <h2>My Projects</h2>
            <p>Here are some of my latest projects and coding experiments.</p>
        `;
    } else if (currentPage === "about.html") {
        content.innerHTML = `
            <h2>Who Am I?</h2>
            <p>A tech enthusiast exploring cybersecurity and game development.</p>
        `;
    } else if (currentPage === "contact.html") {
        content.innerHTML = `
            <h2>Contact Me</h2>
            <p>Feel free to reach out to me for collaborations or discussions.</p>
        `;
    } else {
        content.innerHTML = `
            <h2>Page Not Found</h2>
            <p>Oops! This page doesn't seem to exist.</p>
        `;
    }

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

// Ensure all HTML loads before the sub routines run.
document.addEventListener("DOMContentLoaded", function () {
    generateHead();
    generateNav();
    generateHero();
    generateMainContent(); 
});
