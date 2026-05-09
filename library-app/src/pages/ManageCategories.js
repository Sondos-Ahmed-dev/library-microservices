import { useEffect, useState } from 'react'
import { apiFetch } from '../api'

export default function ManageCategories() {
    const [cats, setCats] = useState([])
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')

    const load = () => apiFetch('/categories').then(setCats).catch(() => setCats([]))
    useEffect(() => { load() }, [])

    const handleAdd = async (e) => {
        e.preventDefault()
        try {
            await apiFetch('/categories', { method: 'POST', body: JSON.stringify({ name, description: desc }) })
            setName(''); setDesc(''); load()
        } catch (e) { alert(e.message) }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete category?')) return
        try { await apiFetch(`/categories/${id}`, { method: 'DELETE' }); load() }
        catch (e) { alert(e.message) }
    }

    const inputStyle = { padding: '10px 14px', background: '#1c1c20', border: '1px solid #2a2a30', borderRadius: 8, color: '#f0ede6', fontSize: 14, outline: 'none' }
    const tdStyle = { padding: '14px 16px', borderBottom: '1px solid #2a2a30' }

    return (
        <div style={{ background: '#0d0d0f', minHeight: '100vh' }}>
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
                <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 32, color: '#f0ede6', marginBottom: 28 }}>Manage Categories</h1>
                <form onSubmit={handleAdd} style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
                    <input style={{ ...inputStyle, flex: 1, minWidth: 200 }} placeholder="Category name" value={name} onChange={e => setName(e.target.value)} required />
                    <input style={{ ...inputStyle, flex: 1, minWidth: 200 }} placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
                    <button type="submit" style={{ padding: '10px 22px', background: '#c9a84c', color: '#0d0d0f', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>+ Add</button>
                </form>
                <div style={{ background: '#141416', border: '1px solid #2a2a30', borderRadius: 12, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr>
                            {['ID', 'Name', 'Description', 'Actions'].map(h => (
                                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 12, color: '#888890', borderBottom: '1px solid #2a2a30' }}>{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {cats.map(c => (
                            <tr key={c.id}>
                                <td style={{ ...tdStyle, color: '#888890' }}>{c.id}</td>
                                <td style={{ ...tdStyle, color: '#f0ede6', fontWeight: 500 }}>{c.name}</td>
                                <td style={{ ...tdStyle, color: '#888890' }}>{c.description}</td>
                                <td style={tdStyle}>
                                    <button onClick={() => handleDelete(c.id)} style={{ padding: '6px 14px', background: 'rgba(224,92,92,.15)', border: 'none', borderRadius: 8, color: '#e05c5c', cursor: 'pointer', fontSize: 13 }}>Delete</button>
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