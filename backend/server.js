const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("Weather API Running");
});

// Weather Route
app.get("/weather/:city", async (req, res) => {

  const city = req.params.city;

  try {

    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.VITE_APP_ID}&q=${city}&aqi=no`
    );

    res.json(response.data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Error fetching weather data"
    });

  }

});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});