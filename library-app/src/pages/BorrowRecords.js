import { useEffect, useState } from 'react'
import { apiFetch } from '../api'

export default function BorrowRecords() {
    const [records, setRecords] = useState([])
    const [filter, setFilter] = useState('ALL')
    const tdStyle = { padding: '14px 16px', borderBottom: '1px solid #2a2a30' }

    useEffect(() => {
        apiFetch('/borrow').then(setRecords).catch(() => setRecords([]))
    }, [])

    const filtered = records.filter(r => {
        if (filter === 'ALL') return true
        if (filter === 'BORROWED') return !r.returned
        if (filter === 'RETURNED') return r.returned
        return true
    })

    return (
        <div style={{ background: '#0d0d0f', minHeight: '100vh' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
                <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 32, color: '#f0ede6', marginBottom: 28 }}>Borrow Records</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
                    {[['Total', records.length, '#f0ede6'], ['Active', records.filter(r => !r.returned).length, '#c9a84c'], ['Returned', records.filter(r => r.returned).length, '#4caf7d']].map(([label, count, color]) => (
                        <div key={label} style={{ background: '#141416', border: '1px solid #2a2a30', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                            <div style={{ fontFamily: 'Georgia, serif', fontSize: 32, color, fontWeight: 700 }}>{count}</div>
                            <div style={{ color: '#888890', fontSize: 13 }}>{label}</div>
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                    {[['ALL', 'All'], ['BORROWED', 'Active'], ['RETURNED', 'Returned']].map(([val, label]) => (
                        <button key={val} onClick={() => setFilter(val)} style={{ padding: '8px 16px', background: filter === val ? '#c9a84c' : 'transparent', color: filter === val ? '#0d0d0f' : '#f0ede6', border: '1px solid', borderColor: filter === val ? '#c9a84c' : '#2a2a30', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: filter === val ? 600 : 400 }}>
                            {label}
                        </button>
                    ))}
                </div>
                <div style={{ background: '#141416', border: '1px solid #2a2a30', borderRadius: 12, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr>
                            {['User', 'Book','Category', 'Borrow Date', 'Due Date', 'Return Date', 'Status'].map(h => (
                                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 12, color: '#888890', borderBottom: '1px solid #2a2a30' }}>{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {filtered.map(r => (
                            <tr key={r.id}>
                                <td style={{ ...tdStyle, color: '#f0ede6', fontWeight: 500 }}>{r.username}</td>
                                <td style={{ ...tdStyle, color: '#f0ede6' }}>{r.book?.title}</td>
                                <td style={{ ...tdStyle, color: '#f0ede6' }}>{r.book?.category?.name || '—'}</td>
                                <td style={{ ...tdStyle, color: '#888890' }}>{r.borrowDate}</td>
                                <td style={{ ...tdStyle, color: '#888890' }}>{r.dueDate}</td>
                                <td style={{ ...tdStyle, color: '#888890' }}>{r.returnDate || '—'}</td>
                                <td style={tdStyle}>
                                    <span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 20, background: r.returned ? 'rgba(76,175,125,.15)' : 'rgba(201,168,76,.15)', color: r.returned ? '#4caf7d' : '#c9a84c' }}>
                                        {r.returned ? 'Returned' : 'Active'}
                                    </span>
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