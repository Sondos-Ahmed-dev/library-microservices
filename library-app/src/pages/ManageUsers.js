import { useEffect, useState } from 'react'
import { apiFetch } from '../api'

export default function ManageUsers() {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')

    const load = () => apiFetch('/users').then(setUsers).catch(() => setUsers([]))
    useEffect(() => { load() }, [])

    const filtered = users.filter(u =>
        u.username?.toLowerCase().includes(search.toLowerCase())
    )

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this user?')) return
        try { await apiFetch(`/users/${id}`, { method: 'DELETE' }); load() }
        catch (e) { alert(e.message) }
    }

    const handleRoleChange = async (id, newRole) => {
        try {
            await apiFetch(`/users/${id}/role`, {
                method: 'PUT',
                body: JSON.stringify({ role: newRole }),
            })
            load()
        } catch (e) { alert(e.message) }
    }

    const tdStyle = { padding: '14px 16px', borderBottom: '1px solid #2a2a30' }

    return (
        <div style={{ background: '#0d0d0f', minHeight: '100vh' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 32, color: '#f0ede6' }}>Manage Users</h1>
                    <span style={{ color: '#888890', fontSize: 14 }}>{users.length} users</span>
                </div>
                <input style={{ width: '100%', maxWidth: 320, padding: '10px 14px', background: '#1c1c20', border: '1px solid #2a2a30', borderRadius: 8, color: '#f0ede6', fontSize: 14, outline: 'none', marginBottom: 20 }}
                       placeholder="Search by username..." value={search} onChange={e => setSearch(e.target.value)} />
                <div style={{ background: '#141416', border: '1px solid #2a2a30', borderRadius: 12, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr>
                            {['ID', 'Username', 'Role', 'Actions'].map(h => (
                                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 12, color: '#888890', borderBottom: '1px solid #2a2a30' }}>{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {filtered.map(u => (
                            <tr key={u.id}>
                                <td style={{ ...tdStyle, color: '#888890' }}>{u.id}</td>
                                <td style={{ ...tdStyle, color: '#f0ede6', fontWeight: 500 }}>{u.username}</td>
                                <td style={tdStyle}>
                                    <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: u.role === 'ADMIN' ? 'rgba(224,92,92,.15)' : u.role === 'LIBRARIAN' ? 'rgba(201,168,76,.15)' : 'rgba(76,175,125,.15)', color: u.role === 'ADMIN' ? '#e05c5c' : u.role === 'LIBRARIAN' ? '#c9a84c' : '#4caf7d' }}>
                                        {u.role}
                                    </span>
                                </td>
                                <td style={tdStyle}>
                                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                        <select value={u.role} onChange={e => handleRoleChange(u.id, e.target.value)} style={{ padding: '5px 10px', background: '#1c1c20', border: '1px solid #2a2a30', borderRadius: 8, color: '#f0ede6', fontSize: 13, outline: 'none' }}>
                                            <option value="USER">USER</option>
                                            <option value="LIBRARIAN">LIBRARIAN</option>
                                            <option value="ADMIN">ADMIN</option>
                                        </select>
                                        <button onClick={() => handleDelete(u.id)} style={{ padding: '6px 14px', background: 'rgba(224,92,92,.15)', border: 'none', borderRadius: 8, color: '#e05c5c', cursor: 'pointer', fontSize: 13 }}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}