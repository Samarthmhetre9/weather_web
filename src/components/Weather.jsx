import React, { useEffect, useState, useRef } from 'react'
import './Weather.css'
import searchi from '../Assets/search.png'
import cloud from '../Assets/cloud.png'
import rain from '../assets/rain.png'
import drizzle from '../assets/drizzle.png'
import snow from '../assets/snow.png'
import humidity from '../assets/humidity.png'
import wind from '../assets/wind.png'
import clear from '../assets/clear.png'
const Weather = () => {
    const inputref= useRef()

    const[weatherData,setWeatherdata]= useState(false);
    // const allIcons={
    //   "1000":clear,
    //   "1003":cloud,
    //   "1006":cloud,
    //   "308":rain,
    //   "1183":rain,
    //   "1180":rain,
    //   "1189":rain,
    //   "1195":rain
    //   "293":drizzle,
    //   "1125":snow, 
    //   "1125":snow, 

//const icon = "https:" + data.current.condition.icon;
    // }
    const allIcons = {
  //  Clear / Sunny
  "1000": clear,
    "1003": clear,


  //  Cloudy / Overcast / Mist / Fog
  
  "1006": cloud,
  "1009": cloud,
  "1030": cloud,
  "1135": cloud,
  "1147": cloud,

  // 🌦 Drizzle / Light rain
  "1063": drizzle,
  "1150": drizzle,
  "1153": drizzle,

  // 🌧 Rain (all normal + heavy rain types)
  "1180": rain,
  "1183": rain,
  "1186": rain,
  "1189": rain,
  "1192": rain,
  "1195": rain,
  "1240": rain,
  "1243": rain,
  "1246": rain,
  "1273": rain,
  "1276": rain,

  // ❄️ Snow / Blizzard / Ice / Sleet
  "1066": snow,
  "1069": snow,
  "1072": snow,
  "1114": snow,
  "1117": snow,
  "1168": snow,
  "1171": snow,
  "1198": snow,
  "1201": snow,
  "1204": snow,
  "1207": snow,
  "1210": snow,
  "1213": snow,
  "1216": snow,
  "1219": snow,
  "1222": snow,
  "1225": snow,
  "1237": snow,
  "1249": snow,
  "1252": snow,
  "1255": snow,
  "1258": snow,
  "1261": snow,
  "1264": snow,
  "1279": snow,
  "1282": snow
};

     const search= async(city)=>{
        if(city ==="")
        {
          alert("Please enter a city name");
          return;
        }
      try {
         
        const url=`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_ID}&q=${city}&aqi=no`;
        console.log(url);
        const response = await fetch(url);
         const data= await response.json();
        if(!response.ok)
        {  
          alert(data.error.message);
          return;
        }


         console.log(data);
         const icon= allIcons[data.current.condition.code] ; 
         setWeatherdata({
          humidity:data.current.humidity,
          windSpeed:data.current.wind_kph,
          temprature:Math.floor(data.current.temp_c),
          location:data.location.name,
          icon:icon

         })
      } catch (error) {
        setWeatherdata(false);
        console.error("Error fetching weather data:");
     
        
        
      }
     }
     useEffect(()=>{
      search("pune");
     },[])
  return (
    <div className='weather'>
      <div className='serach-bar'>
        <input ref={inputref} type="text" placeholder='Enter city name' />
        <img src={searchi} alt="search" onClick={()=>search(inputref.current.value)}/>
      </div>
      {weatherData? <>
       <img src={weatherData.icon} alt="weather" className='weather-icon' />
        <p className='temprature'>{weatherData.temprature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className='weather-data'>
          <div className='col'>
            <img src={humidity} alt="humidity"/>
            <div className='humidity'>
              <p>{weatherData.humidity}%</p>
              <span>Humididty</span>
            </div>
          </div>
        
          <div className='col'>
              <img src={wind} alt="wind"/>
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </> :<> No data available </>
        }
     
    </div>
  )
}

export default Weather
