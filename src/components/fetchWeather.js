import React, {useState} from 'react';
const FetchWeather = (props)=>{
	const [weather, setWeather] = useState({});
	const [location, setLocation] = useState();
	const fetchWeather = async(city)=>{
		await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=API_KEY`)
			.then(res=> res.json())
			.then(data=> setWeather(data))
			.catch(err=> console.log(err))
	}

	const handleKeyPress = (e)=>{
		e.code === 'Enter' ? fetchWeather(location): console.log(e.code)
	}

	const handleOnChange = (e)=>{
		setLocation(e.target.value)
	}
	console.log(weather);
	return(
		<>
			<div className="flex-column">
				<input className="input" placeholder="location" type="text" onKeyPress={(e)=>handleKeyPress(e)} onChange = {(e)=> handleOnChange(e)} />
			</div>
			{'main' in weather &&
				<div className="weather flex-column">
					<div className='flex-column'>
						<img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}></img>
						<h1 className="bold">{weather != null ? weather.weather[0].description : 'null'}</h1>
					</div>
					<div className='flex-column'>
						<p>Feels like</p>
						<p className="bold">{weather != null ? weather.main.feels_like : ''}</p>
					</div>
					<div className="flex-row">
						<div className="flex-column">
							<p className='bold'>{weather != null ? weather.main.temp_max: ''}</p>
							<p>max temp</p>
						</div>
						<div className="flex-column">
							<p className="bold">{weather != null ? weather.main.temp_min : ''}</p>
							<p>min temp</p>
						</div>
					</div>


				</div>
			}
		</>
	)	
}
export {FetchWeather}