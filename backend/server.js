const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());

const PORT = 5000;

app.get("/api/weather", async(req, res) => {
    const city = req.query.city;

    try {
        const response = await fetch (
            `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=no`
        )

        const data = await response.json();

        res.json(data);
    } catch(error) {
        console.error(error)
        res.status(500).json({
            error: "Unable to retrieve weather data"
        });
    };
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});