import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthPage({ backendUrl }){
  const [tab, setTab] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function requestToken(url, body) {
    const res = await fetch(url, body)
    if(!res.ok){
      const t = await res.text();
      throw new Error(t || 'Error')
    }
    return res.json()
  }

  async function handleLogin(e){
    e.preventDefault()
    setError('')
    try {
      const form = new URLSearchParams()
      form.set('username', email)
      form.set('password', password)
      const data = await requestToken(`${backendUrl}/auth/token`, { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body: form })
      localStorage.setItem('token', data.access_token)
      navigate('/perfil')
    } catch (err){ setError('Credenciales inválidas') }
  }

  async function handleRegister(e){
    e.preventDefault()
    setError('')
    try {
      const data = await requestToken(`${backendUrl}/auth/register`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, email, password }) })
      localStorage.setItem('token', data.access_token)
      navigate('/perfil')
    } catch (err){ setError('No se pudo registrar') }
  }

  // Simplified Google: email|name
  async function handleGoogle(){
    const token = prompt('Introduce "email|Nombre" para simular Google Login:')
    if(!token) return
    try {
      const data = await requestToken(`${backendUrl}/auth/google`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ token }) })
      localStorage.setItem('token', data.access_token)
      navigate('/perfil')
    } catch (err) { setError('Error con Google Login') }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-6">Acceder</h1>
      <div className="flex gap-4 mb-6 text-sm">
        <button onClick={()=>setTab('login')} className={`px-4 py-2 rounded-full border ${tab==='login'?'bg-black text-white border-black':'border-black/10'}`}>Iniciar sesión</button>
        <button onClick={()=>setTab('register')} className={`px-4 py-2 rounded-full border ${tab==='register'?'bg-black text-white border-black':'border-black/10'}`}>Crear cuenta</button>
      </div>
      {error && <div className="text-red-600 text-sm mb-3">{error}</div>}

      {tab==='login' ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="w-full border border-black/10 rounded-md px-4 py-3" placeholder="Email" required />
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full border border-black/10 rounded-md px-4 py-3" placeholder="Contraseña" required />
          <button className="w-full bg-black text-white px-5 py-3 rounded-full">Entrar</button>
          <button type="button" onClick={handleGoogle} className="w-full border border-black/10 px-5 py-3 rounded-full">Entrar con Google</button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="space-y-4">
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full border border-black/10 rounded-md px-4 py-3" placeholder="Nombre" required />
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="w-full border border-black/10 rounded-md px-4 py-3" placeholder="Email" required />
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full border border-black/10 rounded-md px-4 py-3" placeholder="Contraseña" required />
          <button className="w-full bg-black text-white px-5 py-3 rounded-full">Crear cuenta</button>
        </form>
      )}
    </div>
  )
}
