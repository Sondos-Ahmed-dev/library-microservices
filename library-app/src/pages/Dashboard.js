import { useEffect, useState } from 'react'
import { apiFetch } from '../api'

export default function Dashboard() {
    const [books, setBooks] = useState([])
    const [borrowings, setBorrowings] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        apiFetch('/books').then(data => setBooks(Array.isArray(data) ? data : [])).catch(() => setBooks([]))
        apiFetch('/borrow').then(data => setBorrowings(Array.isArray(data) ? data : [])).catch(() => setBorrowings([]))
        apiFetch('/users').then(data => setUsers(Array.isArray(data) ? data : [])).catch(() => setUsers([]))
    }, [])

    const activeBorrowings = borrowings.filter(b => !b.returned)
    const overdueCount = activeBorrowings.filter(b => new Date(b.dueDate) < new Date()).length
    const membersCount = users.filter(u => u.role === 'USER').length

    const stats = [
        { label: 'Total Books', value: books.length, icon: '📚', color: '#c9a84c' },
        { label: 'Members', value: membersCount, icon: '👤', color: '#7c8cf8' },
        { label: 'Active Borrowings', value: activeBorrowings.length, icon: '📖', color: '#4caf7d' },
        { label: 'Overdue', value: overdueCount, icon: '⚠️', color: '#e05c5c' },
    ]

    return (
        <div style={{ background: '#0d0d0f', minHeight: '100vh' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
                <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 32, color: '#f0ede6', marginBottom: 28 }}>Dashboard</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}>
                    {stats.map(s => (
                        <div key={s.label} style={{ background: '#141416', border: '1px solid #2a2a30', borderRadius: 12, padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ fontSize: 32, background: '#1c1c20', borderRadius: 10, width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
                            <div>
                                <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
                                <div style={{ color: '#888890', fontSize: 13 }}>{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <div>
                        <h2 style={{ fontSize: 13, color: '#888890', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '.06em' }}>Recent Borrowings</h2>
                        <div style={{ background: '#141416', border: '1px solid #2a2a30', borderRadius: 12, overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                <tr>
                                    {['User', 'Book', 'Status'].map(h => (
                                        <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 12, color: '#888890', borderBottom: '1px solid #2a2a30' }}>{h}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {borrowings.slice(0, 6).map(b => (
                                    <tr key={b.id}>
                                        <td style={{ padding: '14px 16px', fontSize: 13, color: '#f0ede6', borderBottom: '1px solid #2a2a30' }}>{b.username}</td>
                                        <td style={{ padding: '14px 16px', fontSize: 13, color: '#888890', borderBottom: '1px solid #2a2a30' }}>{b.book?.title}</td>
                                        <td style={{ padding: '14px 16px', borderBottom: '1px solid #2a2a30' }}>
                                            <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: b.returned ? 'rgba(76,175,125,.15)' : 'rgba(201,168,76,.15)', color: b.returned ? '#4caf7d' : '#c9a84c' }}>
                                                {b.returned ? 'Returned' : 'Active'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <h2 style={{ fontSize: 13, color: '#888890', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '.06em' }}>Books by Category</h2>
                        <div style={{ background: '#141416', border: '1px solid #2a2a30', borderRadius: 12, padding: 24 }}>
                            {Array.from(new Set(books.map(b => b.categoryDto?.name).filter(Boolean))).map(cat => {
                                const count = books.filter(b => b.categoryDto?.name === cat).length
                                const pct = books.length > 0 ? Math.round((count / books.length) * 100) : 0
                                return (
                                    <div key={cat} style={{ marginBottom: 16 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                                            <span style={{ color: '#f0ede6' }}>{cat}</span>
                                            <span style={{ color: '#888890' }}>{count} books</span>
                                        </div>
                                        <div style={{ height: 6, background: '#1c1c20', borderRadius: 3, overflow: 'hidden' }}>
                                            <div style={{ height: '100%', width: pct + '%', background: '#c9a84c', borderRadius: 3 }} />
                                        </div>
                                    </div>
                                )
                            })}
                            {books.length === 0 && <p style={{ color: '#888890', fontSize: 13 }}>No books available</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}