import { useEffect, useState } from 'react'
import { apiFetch } from '../api'

export default function MyBooks() {
    const [records, setRecords] = useState([])

    const load = () => {
        // apiFetch('/borrowing/me').then(setRecords).catch(() => setRecords([]))
           apiFetch('/borrow/me').then(setRecords).catch(() => setRecords([]))
    }

    useEffect(() => { load() }, [])

    const handleReturn = async (id) => {
        try {
            await apiFetch(`/borrow/return/${id}`, { method: 'PUT' })
            load()
        } catch (e) { alert(e.message) }
    }

    const active = records.filter(r => !r.returned)
    const history = records.filter(r => r.returned)
    const tdStyle = { padding: '14px 16px', borderBottom: '1px solid #2a2a30' }

    return (
        <div style={{ background: '#0d0d0f', minHeight: '100vh' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
                <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 32, color: '#f0ede6', marginBottom: 28 }}>My Borrowed Books</h1>
                <h2 style={{ fontSize: 13, color: '#888890', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.06em' }}>Currently Borrowed</h2>
                {active.length === 0 ? (
                    <div style={{ background: '#141416', border: '1px solid #2a2a30', borderRadius: 12, padding: 40, textAlign: 'center', color: '#888890', marginBottom: 32 }}>
                        <p>No active borrowings</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
                        {active.map(r => (
                            <div key={r.id} style={{ background: '#141416', border: '1px solid #2a2a30', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 20 }}>
                                <div style={{ fontSize: 32 }}>📖</div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, color: '#f0ede6', marginBottom: 4 }}>{r.book?.title}</h3>
                                    <p style={{ color: '#888890', fontSize: 13 }}>Borrowed: {r.borrowDate}  · Category: {r.book?.category?.name || '—'}  · Due: {r.dueDate}</p>
                                </div>
                                <button onClick={() => handleReturn(r.id)} style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #c9a84c', borderRadius: 8, color: '#c9a84c', cursor: 'pointer', fontSize: 13 }}>
                                    Return
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {history.length > 0 && (
                    <div>
                        <h2 style={{ fontSize: 13, color: '#888890', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.06em' }}>History</h2>
                        <div style={{ background: '#141416', border: '1px solid #2a2a30', borderRadius: 12, overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                <tr>
                                    {['Book', 'Borrow Date', 'Return Date'].map(h => (
                                        <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 12, color: '#888890', borderBottom: '1px solid #2a2a30' }}>{h}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {history.map(r => (
                                    <tr key={r.id}>
                                        <td style={{ ...tdStyle, color: '#f0ede6', fontWeight: 500 }}>{r.book?.title}</td>
                                        <td style={{ ...tdStyle, color: '#888890' }}>{r.borrowDate}</td>
                                        <td style={{ ...tdStyle, color: '#888890' }}>{r.returnDate}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}