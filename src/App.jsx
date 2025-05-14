import React, { useState } from 'react'

export function App() {
  //Estado que armazena o nome da cidade
  const [city, setCity] = useState('')
  //Estado que armazena a mensagem de erro
  const [error, setError] = useState('')
  //Estado que armazena os dados de clima da API
  const [weather, setWeather] = useState(null)
  //Chave da API
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

  //FUnção chamada quando o usuario clica no botão "Buscar"
  const getWeather = async () => {
    //Se o campo cidade estiver vazio, sai da função
    if (!city) return
    try {
      //Faz a requisição para a API de clima usando a cidade digitada
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
      )

      //Se a resposta for invalida , lança um erro
      if (!response.ok) throw new Error('Cidade não encontrada!')

      //Convertendo a resposta da API em JSON
      const data = await response.json()
      setWeather(data) //Aramzenamento dos dados recebidos
      setError('') //Limpa qualquer mensagem de error anterior
    } catch (err) {
      //SE acontecer um erro, limpa os dados anteriores
      setWeather(null)

      //Mostra a mensagem de erro
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
      {error && <p class='text-red-700'> {error} </p>}
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
