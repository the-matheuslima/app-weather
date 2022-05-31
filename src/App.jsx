import { useEffect, useState } from 'react'
import moment from 'moment';
import axios from 'axios'

function App() {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState([])
  const [weath, setWeath] = useState([])


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(locationUser => {
      setLocation(locationUser.coords)
    })

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=São Paulo&appid=5f212681b8cfad130e0fe359772414c8&lang=pt-br&units=metric`)
      .then((response) => setWeath(response.data))
      .catch(err => console.log('err', err))
  }, [])

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=5f212681b8cfad130e0fe359772414c8&lang=pt-br&units=metric`)
      .then((response) => setWeath(response.data))
      .catch(err => console.log('err', err))
  }, [location])

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search ? search : 'São Paulo'}&appid=5f212681b8cfad130e0fe359772414c8&lang=pt-br&units=metric`)
        .then((response) => {
          setWeath(response.data)
          console.log(weath)
        })
      setSearch('')
    }
  }

  return (
    <div className="App">
      <div className='app__search'>
        <input type="text"
          value={search}
          onChange={event => setSearch(event.target.value)}
          onKeyPress={handleSearch}
        />
      </div>

      <section className='app__weather'>
        <div className='app__weather-info'>
          <h1>{weath.name}, <span>{weath.sys ? weath.sys.country : null}</span></h1>
          <i>{moment().format('LLL')}</i>
        </div>


        <div className='app__weather-temp'>
          <h1>{weath.main ? weath.main.temp.toFixed() : null}º C</h1>
          <img src={weath.weather ? weath.weather.map(ele => (
            "http://openweathermap.org/img/wn/" + ele.icon + ".png"
          ))
            : null} alt="icon" />
        </div>

        <h1>{weath.weather ? weath.weather[0].description : null}</h1>
      </section>
    </div>
  )
}

export default App
