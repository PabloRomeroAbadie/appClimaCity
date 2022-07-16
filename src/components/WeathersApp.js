import React, { useEffect, useState } from 'react';
import WeatherForm from './WeatherForm';
import WeatherMainInfo from './WeatherMainInfo';
import styles from "./WeathersApp.module.css"

const WeathersApp = () => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        loadInfo();
    }, []);

    useEffect(() => {
        document.title = `weather | ${weather?.location.name ?? ""}`
    }, [weather]);

    async function loadInfo(city = "london") {
        console.log(
          `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`
        );  
        try {
          const request = await fetch(
            `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`
          );
          const json = await request.json();
          console.log(json);

          setWeather(json)
    
        } catch (e) {
          console.error(e);
        }
      }

    function handleChangeCity(city){
        setWeather(null);
        loadInfo(city);
    }
    return (
        <div className={styles.weatherContainer}>
          <h1 className={styles.h1}>App Clima</h1>
            <WeatherForm onChangeCity={handleChangeCity}/>
            <WeatherMainInfo weather={weather}></WeatherMainInfo>
        </div>
    );
};

export default WeathersApp;