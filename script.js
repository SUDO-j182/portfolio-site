document.addEventListener("DOMContentLoaded", function () {
    const terminals = document.querySelectorAll(".terminal-body pre");

    terminals.forEach(terminal => {
        const textContent = terminal.textContent; // Keep the original text content
        terminal.innerHTML = ""; // Clear existing text
        let index = 0;

        function typeWriter() {
            if (index < textContent.length) {
                terminal.innerHTML += textContent.charAt(index);
                index++;
                setTimeout(typeWriter, 50); // Adjust speed here
            }
        }

        typeWriter();
    });
});
