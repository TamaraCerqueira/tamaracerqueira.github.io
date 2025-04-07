const capitalize = s => s && s[0].toUpperCase() + s.slice(1);

async function populatetableRows() {
    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=dublin,ie&units=metric&APPID=bc425ac2188d406c884f4fdd88b339f0');

        if (!response.ok) {
            console.error('Error Status Code:', response.status);
            return;
        }

        const data = await response.json();

        const strTableRows = `
            <tr>
                <td><span>Summary</span></td>
                <td>${capitalize(data.weather[0].description)}</td>
            </tr>
            <tr>
                <td><span>Temperature</span></td>
                <td>${data.main.temp}°C</td>
            </tr>
            <tr>
                <td><span>Humidity</span></td>
                <td>${data.main.humidity} %</td>
            </tr>
            <tr>
                <td><span>Pressure</span></td>
                <td>${data.main.pressure} Pa</td>
            </tr>
        `;

        document.querySelector("#table-weather-dublin tbody").innerHTML = strTableRows;

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function change_background() {
    const hour = new Date().getHours();
    const isNight = hour < 7 || hour >= 20; // Adjust as needed for evening
    const imageUrl = isNight ? "url('assets/img/dublin-night.jpg')" : "url('assets/img/dublin-day.jpg')";
    document.querySelector(".theme-js").style.backgroundImage = imageUrl;
}

// Initialize
change_background();
populatetableRows(); // Call the weather function
