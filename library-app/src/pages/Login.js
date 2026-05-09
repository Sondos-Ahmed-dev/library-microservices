import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { apiFetch } from '../api'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const token = await apiFetch('/users/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
            })
            const payload = JSON.parse(atob(token.split('.')[1]))
            const role = payload.role || 'USER'
            login({ username, name: username, role }, token)
            if (role === 'ADMIN') navigate('/dashboard')
            else navigate('/')
        } catch (e) {
            setError(e.message || 'Login failed')
        }
    }
    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0d0f' }}>
            <div style={{ width: '100%', maxWidth: 400, padding: 24 }}>
                <h2 style={{ color: '#c9a84c', fontFamily: 'Georgia, serif', fontSize: 32, marginBottom: 8, textAlign: 'center' }}>⬡ Bibliotheca</h2>
                <h3 style={{ color: '#f0ede6', fontSize: 22, marginBottom: 28, textAlign: 'center', fontWeight: 400 }}>Welcome back</h3>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                        <label style={{ display: 'block', fontSize: 13, color: '#888890', marginBottom: 6 }}>Username</label>
                        <input style={{ width: '100%', padding: '11px 14px', background: '#1c1c20', border: '1px solid #2a2a30', borderRadius: 8, color: '#f0ede6', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                               type="text" placeholder="your username" value={username} onChange={e => setUsername(e.target.value)} required />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: 13, color: '#888890', marginBottom: 6 }}>Password</label>
                        <input style={{ width: '100%', padding: '11px 14px', background: '#1c1c20', border: '1px solid #2a2a30', borderRadius: 8, color: '#f0ede6', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                               type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    {error && <p style={{ color: '#e05c5c', fontSize: 13 }}>{error}</p>}
                    <button type="submit" style={{ padding: '13px', background: '#c9a84c', color: '#0d0d0f', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer', marginTop: 4 }}>
                        Sign In
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: 20, color: '#888890', fontSize: 14 }}>
                    Don't have an account? <Link to="/register" style={{ color: '#c9a84c', textDecoration: 'none', fontWeight: 500 }}>Register</Link>
                </p>
            </div>
        </div>
    )
}