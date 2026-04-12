import { useState } from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import SplineScene from './components/SplineScene'

const cities = ['New York', 'London', 'Tokyo']

// Use environment variable for backend URL, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function App() {
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [city, setCity] = useState(cities[0])

  const fetchForecast = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`${API_URL}/forecast`, { city, periods: 30 })
      setForecast(res.data.forecast)
    } catch (err) {
      console.error(err)
      alert('Forecast failed. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <SplineScene />

      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}>
        <div style={{
          maxWidth: '1000px',
          width: '90%',
          background: 'transparent',
          padding: '20px',
          color: 'white',
          pointerEvents: 'auto',
          fontFamily: "'Great Vibes', cursive",
          fontWeight: '400',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)'
        }}>
          <h1 style={{ 
            textAlign: 'center', 
            marginBottom: '20px', 
            fontSize: '3.5rem',
            fontWeight: '400',
            letterSpacing: '2px',
            background: 'linear-gradient(135deg, #fff, #facc15)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: 'none'
          }}>
            Prophet Weather
          </h1>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
            <select 
              value={city} 
              onChange={(e) => setCity(e.target.value)}
              style={{
                padding: '12px 20px',
                fontSize: '1rem',
                borderRadius: '40px',
                border: '1px solid rgba(255,255,255,0.5)',
                backgroundColor: 'rgba(0,0,0,0.4)',
                color: 'white',
                fontWeight: '600',
                fontFamily: 'Poppins, sans-serif',
                backdropFilter: 'blur(4px)',
                cursor: 'pointer'
              }}
            >
              {cities.map(c => <option key={c}>{c}</option>)}
            </select>
            <button 
              onClick={fetchForecast} 
              disabled={loading}
              style={{
                padding: '12px 28px',
                fontSize: '1rem',
                borderRadius: '40px',
                border: 'none',
                backgroundColor: '#facc15',
                color: '#000',
                fontWeight: '700',
                fontFamily: 'Poppins, sans-serif',
                cursor: 'pointer',
                transition: '0.2s',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#ffd700'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#facc15'}
            >
              {loading ? 'Loading...' : 'Get Forecast'}
            </button>
          </div>

          {forecast && (
            <div style={{ marginTop: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '24px', padding: '20px', backdropFilter: 'blur(8px)' }}>
              <h3 style={{ textAlign: 'center', fontWeight: '400', fontFamily: "'Great Vibes', cursive", fontSize: '2rem' }}>30-Day Temperature Forecast</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={forecast.map(d => ({ 
                  date: new Date(d.ds).toLocaleDateString(), 
                  temp: d.yhat 
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.3)" />
                  <XAxis dataKey="date" angle={-45} textAnchor="end" height={80} stroke="white" tick={{ fill: 'white', fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }} />
                  <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', fill: 'white', fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }} stroke="white" tick={{ fill: 'white', fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '12px', color: 'white', fontFamily: 'Poppins, sans-serif' }}
                    labelStyle={{ color: '#facc15', fontWeight: 'bold' }}
                  />
                  <Line type="monotone" dataKey="temp" stroke="#facc15" strokeWidth={3} dot={{ fill: '#facc15', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App