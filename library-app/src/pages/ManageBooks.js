import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../api'

export default function ManageBooks() {
    const [books, setBooks] = useState([])
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const load = () =>
        apiFetch('/books')
            .then(data => setBooks(Array.isArray(data) ? data : []))
            .catch(() => setBooks([]))
    useEffect(() => { load() }, [])

    const filtered = books.filter(b =>
        b.title?.toLowerCase().includes(search.toLowerCase()) ||
        b.author?.toLowerCase().includes(search.toLowerCase())
    )

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this book?')) return
        try {
            await apiFetch(`/books/${id}`, { method: 'DELETE' })
            load()
        } catch (e) { alert(e.message) }
    }

    const tdStyle = { padding: '14px 16px', borderBottom: '1px solid #2a2a30' }

    return (
        <div style={{ background: '#0d0d0f', minHeight: '100vh' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 32, color: '#f0ede6' }}>Manage Books</h1>
                    <button onClick={() => navigate('/add-book')} style={{ padding: '10px 22px', background: '#c9a84c', color: '#0d0d0f', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                        + Add Book
                    </button>
                </div>
                <input style={{ width: '100%', maxWidth: 320, padding: '10px 14px', background: '#1c1c20', border: '1px solid #2a2a30', borderRadius: 8, color: '#f0ede6', fontSize: 14, outline: 'none', marginBottom: 20 }}
                       placeholder="Search books..." value={search} onChange={e => setSearch(e.target.value)} />
                <div style={{ background: '#141416', border: '1px solid #2a2a30', borderRadius: 12, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr>
                            {['Book', 'Author', 'Quantity', 'Pages', 'Available Copies', 'Actions'].map(h => (
                                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 12, color: '#888890', borderBottom: '1px solid #2a2a30' }}>{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {filtered.map(book => (
                            <tr key={book.id}>
                                <td style={{ ...tdStyle, color: '#f0ede6', fontWeight: 500 }}>{book.title}</td>
                                <td style={{ ...tdStyle, color: '#888890' }}>{book.author}</td>
                                <td style={{ ...tdStyle, color: '#f0ede6' }}>{book.quantity}</td>
                                <td style={{ ...tdStyle, color: '#f0ede6' }}>{book.pages}</td>
                                <td style={{ ...tdStyle, color: '#f0ede6' }}>{book.availableCopies}</td>
                                <td style={tdStyle}>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button onClick={() => navigate(`/edit-book/${book.id}`)} style={{ padding: '6px 14px', background: 'transparent', border: '1px solid #2a2a30', borderRadius: 8, color: '#f0ede6', cursor: 'pointer', fontSize: 13 }}>Edit</button>
                                        <button onClick={() => handleDelete(book.id)} style={{ padding: '6px 14px', background: 'rgba(224,92,92,.15)', border: 'none', borderRadius: 8, color: '#e05c5c', cursor: 'pointer', fontSize: 13 }}>Delete</button>
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