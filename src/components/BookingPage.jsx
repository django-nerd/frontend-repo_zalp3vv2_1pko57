import { useEffect, useMemo, useState } from 'react'

export default function BookingPage({ backendUrl }){
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
  const [slots, setSlots] = useState([])
  const [time, setTime] = useState('')
  const [service, setService] = useState('Corte')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function loadSlots(d){
    const res = await fetch(`${backendUrl}/reservations/available?date_str=${d}`)
    const data = await res.json()
    setSlots(data.available || [])
  }

  useEffect(()=>{ loadSlots(date) }, [date])

  async function book(){
    setError(''); setMessage('')
    const token = localStorage.getItem('token')
    if(!token){ setError('Debes iniciar sesión'); return }
    try{
      const res = await fetch(`${backendUrl}/reservations`, {
        method:'POST',
        headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
        body: JSON.stringify({ date, time: `${time}:00`, duration_minutes: 30, service })
      })
      const data = await res.json()
      if(!res.ok) throw new Error(data.detail || 'Error al reservar')
      setMessage('Reserva confirmada')
      loadSlots(date)
    }catch(e){ setError(e.message) }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-6">Reservar cita</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="text-sm text-neutral-600">Fecha</label>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full border border-black/10 rounded-md px-4 py-3 mb-4" />

          <label className="text-sm text-neutral-600">Hora</label>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {slots.map(s=> (
              <button key={s} onClick={()=>setTime(s)} className={`px-3 py-2 rounded-md border text-sm ${time===s?'bg-black text-white border-black':'border-black/10 hover:bg-black/5'}`}>{s}</button>
            ))}
            {slots.length===0 && <div className="text-sm text-neutral-500">No hay disponibilidad</div>}
          </div>

          <label className="text-sm text-neutral-600">Servicio</label>
          <select value={service} onChange={e=>setService(e.target.value)} className="w-full border border-black/10 rounded-md px-4 py-3 mb-4">
            <option>Corte</option>
            <option>Coloración</option>
            <option>Peinado</option>
            <option>Barbería</option>
            <option>Tratamiento</option>
          </select>

          <button onClick={book} className="bg-black text-white px-5 py-3 rounded-full">Confirmar</button>
          {message && <div className="text-green-700 text-sm mt-3">{message}</div>}
          {error && <div className="text-red-600 text-sm mt-3">{error}</div>}
        </div>

        <div className="bg-neutral-50 border border-black/10 rounded-xl p-6">
          <h3 className="font-medium mb-3">Recordatorio</h3>
          <ul className="text-sm text-neutral-700 list-disc pl-4 space-y-1">
            <li>Citas de 30 minutos</li>
            <li>Horario: Lunes a Sábado, 10:00 a 20:00</li>
            <li>Evita reservas duplicadas eligiendo un horario disponible</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
