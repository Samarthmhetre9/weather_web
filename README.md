# Weather App

A simple and responsive Weather Application built using React and Vite.  
This app fetches real-time weather data using the WeatherAPI.

## Features

- Search weather by city name
- Displays:
  - Temperature
  - Humidity
  - Wind Speed
  - Weather Condition Icons
- Dynamic weather icons based on weather conditions
- Responsive UI

## Technologies Used

- React.js
- Vite
- CSS
- WeatherAPI

## Project Structure

```bash
src/
│
├── assets/
│   ├── clear.png
│   ├── cloud.png
│   ├── drizzle.png
│   ├── rain.png
│   ├── snow.png
│   ├── humidity.png
│   ├── wind.png
│   └── search.png
│
├── components/
│   └── Weather.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

## Installation

Clone the repository:

```bash
git clone https://github.com/Samarthmhetre9/Weather_App.git
```

Go to project folder:

```bash
cd Weather_App
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the root folder and add:

```env
VITE_APP_ID=your_weatherapi_key
```

Get your API key from:

https://www.weatherapi.com/

## Screenshots

![kolhapur weather](<Screenshot 2026-05-08 095336.png>)
## Author

Samarth Mhetre

## License

This project is for educational purposes.