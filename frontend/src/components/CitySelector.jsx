import { useState } from 'react'

const cities = ['New York', 'London', 'Tokyo']

export default function CitySelector({ onSelect }) {
  const [city, setCity] = useState(cities[0])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSelect(city)
  }

  return (
    <form onSubmit={handleSubmit}>
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        {cities.map(c => <option key={c}>{c}</option>)}
      </select>
      <button type="submit">Get Forecast</button>
    </form>
  )
}