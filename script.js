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
                setTimeout(typeWriter, 5); // Adjust speed here
            }
        }

        typeWriter();
    });

    function updateClock() {
        const clockElement = document.getElementById('clock');
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    function updateWeather() {
        fetch('https://api.weatherapi.com/v1/current.json?key=79f0f31877404356b52182440252502&q=London')
            .then(response => response.json())
            .then(data => {
                document.getElementById('weather').textContent = `Weather: ${data.current.temp_c}°C, ${data.current.condition.text}`;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                document.getElementById('weather').textContent = 'Weather: Unable to load';
            });
    }

    function updateNews() {
        fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=13ace44f343943fa915fce690ac42c3b')
            .then(response => response.json())
            .then(data => {
                document.getElementById('news').textContent = `News: ${data.articles[0].title}`;
            })
            .catch(error => {
                console.error('Error fetching news data:', error);
                document.getElementById('news').textContent = 'News: Unable to load';
            });
    }


    setInterval(updateClock, 1000);
    updateClock(); // initial call to display clock immediately
    updateWeather();
    updateNews();
});


document.addEventListener("DOMContentLoaded", function() {
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }

    if (isMobileDevice()) {
        // Load mobile-specific content or make changes for mobile devices
        document.getElementById('mobile-specific-content').style.display = 'block';
        document.getElementById('desktop-specific-content').style.display = 'none';
    } else {
        // Load desktop-specific content or make changes for desktop devices
        document.getElementById('mobile-specific-content').style.display = 'none';
        document.getElementById('desktop-specific-content').style.display = 'block';
    }
});

document.addEventListener("DOMContentLoaded", function() {
    function isMobileDevice() {
        return window.innerWidth <= 768;
    }

    if (isMobileDevice()) {
        document.getElementById('clock').style.display = 'none';
        document.getElementById('widgets').style.display = 'none';
    }
});

