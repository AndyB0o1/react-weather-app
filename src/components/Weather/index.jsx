import { useState } from "react";

export default function Weather() {

    const [city, setCity] = useState('');
    const [country, setCountry] = useState('UK');
    const [weather, setWeather] = useState(null);
    const [umbrella, setUmbrella] = useState('');

    function getWeather() {
        const apiKey = import.meta.env.VITE_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;
        fetch(url).then((response) => response.json())
            .then((data) => {

                let maxTemp = Math.round(data.main.temp);
                let feelsLike = Math.round(data.main.feels_like);
                let precipitation = data.weather[0].id;

                const currentWeather = {
                    location: `Current weather in ${data.name}`,
                    condition: `${data.weather[0].description}`,
                    temperature: `Temperature: ${maxTemp}`,
                    feels_like: `${feelsLike}`,
                    wind: `Wind speed: ${data.wind.speed} km/h`,
                    icon: data.weather[0].icon
                }
                setWeather(currentWeather);
                if (precipitation >= 200 && precipitation <= 622) {
                    setUmbrella("You're going to need an umbrella today!")
                }
                else {
                    setUmbrella("No umbrella needed today!")
                }
            })
    }
    return (
        <div className="p-2 w-4/5 mx-auto md:mx-none">
            <div className="p-2 rounded bg-cyan-900 text-white font-bold md:text-2xl">
                <h2>See what the weather's doing around you</h2>
            </div>
            <h1 className="p-2 md:text-2xl">Enter your closest city below to see the current weather conditions</h1>
            <input className="p-1.5 border rounded" type="text" placeholder="Enter closest city name" value={city} onChange={(e) => setCity(e.target.value)}></input>
            <input className="md:ml-2 p-1.5 border rounded" type="text" placeholder="UK" value={country} onChange={(e) => setCountry(e.target.value)}></input>
            <button className="ml-2 md:ml-4 p-2 bg-amber-500 font-bold text-white rounded" onClick={getWeather}>See weather</button>
            <div className="p-1.5">
                {weather && (
                    <div className="w-4/5 mx-auto md:mx-none">
                        <div className="weather p-2 max-w-96 border-2 md:border-4 border-amber-500 rounded-lg md:text-xl">
                            <h2 className="md:m-0.5 p-0.5 bg-amber-100 text-cyan-900 rounded ">{weather.location}</h2>
                            <div className="p-1.5 rounded">
                                <img className="p-1.5" src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={`${weather.condition}`}></img>
                            </div>
                            <p className="m-0.5 p-0.5 bg-amber-100 text-cyan-900 rounded ">Current conditions: {weather.condition}</p>
                            <p className="m-0.5 p-0.5 bg-amber-100 text-cyan-900 rounded ">{weather.temperature}&deg;C and feels like {weather.feels_like}&deg;C</p>
                            <p className="m-0.5 p-0.5 bg-amber-100 text-cyan-900 rounded ">{weather.wind}</p>
                        </div>
                        <p className="my-0.5 p-1.5 max-w-96 bg-amber-500 font-bold text-white rounded ">{umbrella}</p>
                    </div>)}
            </div>
        </div >
    )
}