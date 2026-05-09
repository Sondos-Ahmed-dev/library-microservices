import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiFetch } from '../api'

export default function Register() {
    const [form, setForm] = useState({ username: '', password: '', confirm: '', role: 'USER' })
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (form.password !== form.confirm) { setError('Passwords do not match'); return }
        if (form.password.length < 3) { setError('Password is too short'); return }
        try {
            await apiFetch('/users/register', {
                method: 'POST',
                body: JSON.stringify({ username: form.username, password: form.password, role: form.role }),
            })
            navigate('/login')
        } catch (e) {
            setError(e.message || 'Registration failed')
        }
    }

    const inputStyle = { width: '100%', padding: '11px 14px', background: '#1c1c20', border: '1px solid #2a2a30', borderRadius: 8, color: '#f0ede6', fontSize: 14, outline: 'none', boxSizing: 'border-box' }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0d0f', padding: 24 }}>
            <div style={{ width: '100%', maxWidth: 480 }}>
                <h2 style={{ color: '#c9a84c', fontFamily: 'Georgia, serif', fontSize: 28, marginBottom: 8, textAlign: 'center' }}>⬡ Bibliotheca</h2>
                <h3 style={{ color: '#f0ede6', fontSize: 22, marginBottom: 28, textAlign: 'center', fontWeight: 400 }}>Create an Account</h3>

                <div style={{ background: '#141416', border: '1px solid #2a2a30', borderRadius: 12, padding: 32 }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                        <div>
                            <label style={{ display: 'block', fontSize: 13, color: '#888890', marginBottom: 6 }}>Username</label>
                            <input style={inputStyle} placeholder="username" value={form.username} onChange={set('username')} required />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            <div>
                                <label style={{ display: 'block', fontSize: 13, color: '#888890', marginBottom: 6 }}>Password</label>
                                <input style={inputStyle} type="password" placeholder="••••••••" value={form.password} onChange={set('password')} required />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: 13, color: '#888890', marginBottom: 6 }}>Confirm Password</label>
                                <input style={inputStyle} type="password" placeholder="••••••••" value={form.confirm} onChange={set('confirm')} required />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: 13, color: '#888890', marginBottom: 6 }}>Role</label>
                            <select style={inputStyle} value={form.role} onChange={set('role')}>
                                <option value="USER">User</option>
                                <option value="LIBRARIAN">Librarian</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                        {error && <p style={{ color: '#e05c5c', fontSize: 13 }}>{error}</p>}
                        <button type="submit" style={{ padding: 13, background: '#c9a84c', color: '#0d0d0f', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer', marginTop: 4 }}>
                            Create Account
                        </button>
                    </form>
                </div>

                <p style={{ textAlign: 'center', marginTop: 20, color: '#888890', fontSize: 14 }}>
                    Already have an account? <Link to="/login" style={{ color: '#c9a84c', textDecoration: 'none', fontWeight: 500 }}>Sign in</Link>
                </p>
            </div>
        </div>
    )
}