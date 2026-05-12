const express = require("express");
import fetch from 'node-fetch';
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;

  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/weatherapp")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Schema
const WeatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  humidity: Number,
  wind: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Model
const Weather = mongoose.model("Weather", WeatherSchema);

// API Route
app.get("/weather/:city", async (req, res) => {

  const city = req.params.city;

  try {

    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.VITE_APP_ID}&q=${city}&aqi=no`
    );

    const data = response.data;

    // Save data into MongoDB
    await Weather.create({
      city: data.location.name,
      temperature: data.current.temp_c,
      humidity: data.current.humidity,
      wind: data.current.wind_kph
    });

    // Send data to frontend
    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Error fetching weather data"
    });

  }

});

// Get Search History
app.get("/history", async (req, res) => {

  try {

    const history = await Weather.find().sort({ createdAt: -1 });

    res.json(history);

  } catch (error) {

    res.status(500).json({
      error: "Error fetching history"
    });

  }

});

// Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});