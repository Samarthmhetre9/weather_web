const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 
//    MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Error:", err));

// /
//    Schema

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

const Weather = mongoose.model("Weather", WeatherSchema);

/* =========================
   Root Route
========================= */
app.get("/", (req, res) => {
  res.send("Weather API Running 🚀");
});

/* =========================
   Weather API Route
========================= */
app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;

  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=no`
    );
    
    const data = response.data;

    await Weather.create({
      city: data.location.name,
      temperature: data.current.temp_c,
      humidity: data.current.humidity,
      wind: data.current.wind_kph
    });



    res.json(response.data);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Weather API failed" });
  }
});

/* =========================
   Search History Route
========================= */
app.get("/history", async (req, res) => {
  try {
    const history = await Weather.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch history"
    });
  }
});

/* =========================
   Start Server
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});