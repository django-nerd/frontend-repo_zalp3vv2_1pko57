import { useEffect, useState } from 'react'

export default function AdminPage({ backendUrl }){
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('token')

  async function load(){
    setLoading(true)
    try{
      const [r1, r2] = await Promise.all([
        fetch(`${backendUrl}/admin/reservations`, { headers:{ Authorization:`Bearer ${token}` } }),
        fetch(`${backendUrl}/admin/users`, { headers:{ Authorization:`Bearer ${token}` } })
      ])
      if(!r1.ok || !r2.ok) throw new Error('No autorizado')
      setList(await r1.json())
      setUsers(await r2.json())
      setError('')
    }catch(e){ setError('Debes ser administrador') }
    setLoading(false)
  }

  useEffect(()=>{ load() },[])

  async function update(id, patch){
    await fetch(`${backendUrl}/admin/reservations/${id}`, { method:'PATCH', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify(patch) })
    load()
  }

  async function cancel(id){ await update(id, { status:'cancelada' }) }

  async function create(){
    const date = prompt('Fecha (YYYY-MM-DD)')
    const time = prompt('Hora (HH:MM)')
    const service = prompt('Servicio')
    if(!date||!time) return
    await fetch(`${backendUrl}/reservations`, { method:'POST', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify({ date, time: `${time}:00`, duration_minutes:30, service }) })
    load()
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-6">Panel de administrador</h1>
      {loading ? 'Cargando...' : error ? <div className="text-red-600">{error}</div> : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Reservas</h3>
              <button onClick={create} className="border border-black/10 px-3 py-2 rounded-full text-sm">Nueva reserva</button>
            </div>
            <div className="space-y-3">
              {list.map(r=> (
                <div key={r.id} className="bg-white border border-black/10 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{r.service || 'Servicio'}</div>
                    <div className="text-sm text-neutral-600">{r.date} · {r.time} · {r.status}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={()=>update(r.id, {status:'modificada'})} className="text-sm border border-black/10 px-3 py-1 rounded-full">Marcar modificada</button>
                    <button onClick={()=>cancel(r.id)} className="text-sm border border-black/10 px-3 py-1 rounded-full">Cancelar</button>
                  </div>
                </div>
              ))}
              {list.length===0 && <div className="text-sm text-neutral-500">Sin reservas</div>}
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-3">Clientes</h3>
            <div className="space-y-3">
              {users.map(u=> (
                <div key={u.id} className="bg-white border border-black/10 rounded-xl p-4">
                  <div className="font-medium">{u.name}</div>
                  <div className="text-sm text-neutral-600">{u.email}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
