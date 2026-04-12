import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

export default function ForecastChart({ data }) {
  const chartData = data.map(d => ({
    date: new Date(d.ds).toLocaleDateString(),
    temp: d.yhat,
    lower: d.yhat_lower,
    upper: d.yhat_upper
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Line type="monotone" dataKey="temp" stroke="#8884d8" name="Forecast" />
        <Line type="monotone" dataKey="upper" stroke="#82ca9d" strokeDasharray="5 5" name="Upper bound" />
        <Line type="monotone" dataKey="lower" stroke="#ffc658" strokeDasharray="5 5" name="Lower bound" />
      </LineChart>
    </ResponsiveContainer>
  )
}
