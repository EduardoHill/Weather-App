import React, { useState } from 'react'

export function App() {
  const [city, setCity] = useState('')
  const [error, setError] = useState('')
  const [weather, setWeather] = useState(null)
  const API_KEY = 'b673c8d516da5c13fa97d66f6764fa7b'

  const getWeather = async () => {
    if (!city) return
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
      )
      if (!response.ok) throw new Error('Cidade não encontrada!')
      const data = await response.json()
      setWeather(data) //Aramzenamento dos dados recebidos
      setError('')
    } catch (err) {
      setWeather(null)
      setError(err.message)
    }
  }

  return (
    <div className='  flex flex-col items-center justify-center h-screen gap-10'>
      <h1 className='text-4xl text-white'>App de Clima</h1>
      <input
        className='flex text-center bg-gray-700 text-white  rounded-2xl outline-0 p-2'
        type='text'
        placeholder='Digite a sua Cidade!'
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        className='bg-gray-950 text-white py-1 px-3 border rounded-2xl cursor-pointer hover:border-gray-600'
        onClick={getWeather}
      >
        Buscar
      </button>
      {error && <p> {error} </p>}
      {weather && (
        <div className='flex flex-col bg-gray-700 p-5 border border-gray-900 rounded-2xl'>
          <h2 className='text-white text-[20px]'>
            {weather.name},{weather.sys.country}{' '}
          </h2>
          <p className='text-white text-[20px]'>
            Temperatura: {weather.main.temp} C°
          </p>
          <p className='text-white text-[20px]'>
            Clima: {weather.weather[0].descripition}{' '}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt='ícone do clima'
          />
        </div>
      )}
    </div>
  )
}
