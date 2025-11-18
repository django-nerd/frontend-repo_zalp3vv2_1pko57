import { useEffect, useState } from 'react'

export default function ProfilePage({ backendUrl }){
  const [profile, setProfile] = useState(null)
  const [my, setMy] = useState([])
  const [error, setError] = useState('')

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token){ setError('Debes iniciar sesión'); return }
    async function load(){
      const res = await fetch(`${backendUrl}/me`, { headers:{ Authorization:`Bearer ${token}` } })
      if(res.ok){
        const p = await res.json(); setProfile(p)
        const r = await fetch(`${backendUrl}/reservations/mine`, { headers:{ Authorization:`Bearer ${token}` } })
        setMy(await r.json())
      }
    }
    load()
  },[])

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-6">Mi perfil</h1>
      {!profile ? (
        <div className="text-neutral-600">{error || 'Cargando...'}</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white border border-black/10 rounded-xl p-6">
            <h3 className="font-medium mb-2">Información</h3>
            <p className="text-sm text-neutral-700">{profile.name}</p>
            <p className="text-sm text-neutral-700">{profile.email}</p>
            <p className="text-xs text-neutral-500 mt-2">Rol: {profile.role}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-medium mb-3">Mis reservas</h3>
            <div className="space-y-3">
              {my.map(r=> (
                <div key={r.id} className="bg-white border border-black/10 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{r.service || 'Servicio'}</div>
                    <div className="text-sm text-neutral-600">{r.date} · {r.time}</div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full border ${r.status==='cancelada'?'border-red-300 text-red-700':'border-green-300 text-green-700'}`}>{r.status}</div>
                </div>
              ))}
              {my.length===0 && <div className="text-sm text-neutral-500">Aún no tienes reservas</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
