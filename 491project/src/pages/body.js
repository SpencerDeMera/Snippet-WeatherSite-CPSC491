import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactLoading from 'react-loading';
import '../App.css';
import Conditions from './components/conditions';
import Locations from './components/locations';
import Activities from './components/activities';
import Details from './components/details';
import Forecasts from './components/forecasts';
import { getWeatherData, getAQIData } from './utils/ingest';
import { getLocation, setWeather, setAqi } from './utils/process';

export default function Body() {
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [aqiInfo, setAqiInfo] = useState(null);

    // ===== TESTING: Livermore Coordinates ===== 
    var coords = {'lat': 37.6819, 'lon': -121.7685};
    // ===== TESTING: Livermore Coordinates =====
    
    // Async load function for getting and setting weather data
    window.onload = async () => {
        const location = await getLocation();

        const weatherData = await getWeatherData(location);
        setWeatherInfo(weatherData);

        const aqiData = await getAQIData(location);
        setAqiInfo(aqiData);
    }

    if (weatherInfo && aqiInfo) {
        setWeather(weatherInfo);
        setAqi(aqiInfo);

        return (
            <div className="showcase">
                <div className="content">
                    <div className="main-body">
                        <div className="container-fluid mt-4">
                            <div className="row d-flex">
                                <div className="col-sm-6 mainBox">
                                    <Conditions />
                                </div>
                                <div className="col-sm-6">
                                    <Locations />
                                </div>
                                <div className="col-sm-12">
                                    <Activities />
                                </div>
                                <div className="col-sm-12">
                                    <Details />
                                </div>
                                <div className="col-sm-12">
                                    <Forecasts />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="showcase">
                <div className="content">
                    <div className="main-body">
                        <ReactLoading type={'spinningBubbles'} color={'#56BFB5'} height={200} width={200} />
                    </div>
                </div>
            </div>
        );
    }
}