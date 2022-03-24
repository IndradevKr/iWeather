import './style.css';
import React from 'react';

function App() {

  const [city, setCity] = React.useState()
  const [searchQuery, setSearchQuery] = React.useState("Kathmandu")

  React.useEffect( () => {
    let isMounted = true;
    const fetchAPI = async() => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=metric&appid=7efc987d11d07b37a86e166d40c3f359`
      const response = await fetch(url)
      const responseJSON = await response.json()
      if (isMounted) {
        setCity(responseJSON);
        console.log(responseJSON)
      }
      
      return () => {
        isMounted = false;
      }
    } 
    fetchAPI();
  }, [searchQuery])


  return (
    <React.Fragment>
      <div className="container">
        <div className="search__field">
          <input type="search" id="search__city" name="searchQuery" 
            placeholder="Enter city name..."
            onChange ={ (event) => setSearchQuery(event.target.value) }
            value= {searchQuery} 
            autoComplete="off"
          />
        </div>
      
        {city ? (
          <>
              <div className="location-details">
                <i className="fa-solid fa-location-dot"></i>
                <span className="city__name"> { city.name} {city.name && `,`} {city.sys?.country}</span> <br />
              </div>

              <div className="weather-details">
                <span className="temperature">
                  <i className="fa-solid fa-temperature-half"></i>
                  <span className="temperature-reading">{city.name && Math.round(city.main.temp)}&deg;C</span>
                </span>

                <span className="humidity-details">
                <i className="fa-solid fa-droplet"></i>
                <span className="humidity">{city.name && city.main.humidity}%</span> 
                </span>

                <span className="cloud-details">
                <i className="fa-solid fa-cloud-sun"></i>
                <span className="cloud"> {city.name && city.weather[0].description } </span>
                </span> 
              </div>

              <div className="weather-seems">

              <span className="temp-min">
                <i className="fa-solid fa-temperature-low"></i>
                <span className="min">
                  Minimum temperature :  &nbsp; {city.name && city.main.temp_min}&deg;C  
                </span>  <br/>
              </span>

              <span className="feels-like">
                <i className="fa-solid fa-temperature-quarter"></i>
                <span className="feels">Feels like :  &nbsp; { city.name && city.main.feels_like}&deg;C
                </span> <br/>
              </span>

              <span className="temp-max">
                <i className="fa-solid fa-temperature-high"></i>
                <span className="max">Maximum temperature: &nbsp; {city.name && city.main.temp_max}&deg;C </span> <br/>
              </span>


              </div>

              <div className="date-details">
              <i className="fa-regular fa-calendar-days"></i>
              <span className="date">{city.name && new Date().toDateString("en-US", {timezone : city.timezone})}</span>
              </div>

            
           </>
          ): (
            <>
            <p>No data available</p>
            </>
          )
        }
      </div>
    </React.Fragment>
  );
}

export default App;
