import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { apiFetch } from '../api'


export default function Books() {
    const [searchParams] = useSearchParams()
    const [search, setSearch] = useState(searchParams.get('search') || '')
    const [category, setCategory] = useState(searchParams.get('category') || 'All')
    const [books, setBooks] = useState([])
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        apiFetch('/books')
            .then(data => setBooks(Array.isArray(data) ? data : []))
            .catch(() => setBooks([]))
        apiFetch('/categories')
            .then(data => setCategories(Array.isArray(data) ? data : []))
            .catch(() => setCategories([]))
    }, [])

    const filtered = books.filter(b => {
        const matchSearch = b.title?.toLowerCase().includes(search.toLowerCase()) || b.author?.toLowerCase().includes(search.toLowerCase())
        const matchCat = category === 'All' || b.categoryDto?.name === category
        return matchSearch && matchCat
    })

    const inputStyle = { padding: '10px 14px', background: '#1c1c20', border: '1px solid #2a2a30', borderRadius: 8, color: '#f0ede6', fontSize: 14, outline: 'none' }

    return (
        <div style={{ background: '#0d0d0f', minHeight: '100vh' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
                <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 32, color: '#f0ede6', marginBottom: 28 }}>All Books</h1>
                <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
                    <input style={{ ...inputStyle, minWidth: 280 }} placeholder="Search by title or author..."
                           value={search} onChange={e => setSearch(e.target.value)} />
                    <select style={inputStyle} value={category} onChange={e => setCategory(e.target.value)}>
                        <option>All</option>
                        {categories.map(c => <option key={c.id}>{c.name}</option>)}
                    </select>
                    <span style={{ color: '#888890', fontSize: 13, alignSelf: 'center' }}>{filtered.length} books found</span>
                </div>

                {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: '#888890' }}>
                        <p>No books found</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
                        {filtered.map(book => (
                            <div key={book.id} onClick={() => navigate('/books/' + book.id)}
                                 style={{ background: '#141416', border: '1px solid #2a2a30', borderRadius: 12, padding: 20, cursor: 'pointer' }}>
                                <div style={{ fontSize: 36, textAlign: 'center', background: '#1c1c20', borderRadius: 8, padding: '14px 0', marginBottom: 14 }}>📘</div>
                                {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, background: '#1c1c20', color: '#888890' }}>{book.category?.name || '—'}</span>
                                    <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, background: book.available ? 'rgba(76,175,125,.15)' : 'rgba(224,92,92,.15)', color: book.available ? '#4caf7d' : '#e05c5c' }}>
                                        {book.available ? 'Available' : 'Out'}
                                    </span>
                                </div> */}

                                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: '#f0ede6', marginBottom: 4 }}>{book.title}</h3>
                                <p style={{ color: '#888890', fontSize: 13, marginBottom: 6 }}>Author: {book.author}</p>
                                <p style={{ color: '#888890', fontSize: 13, marginBottom: 6 }}>Quantity: {book.quantity}</p>
                                <p style={{ color: '#888890', fontSize: 13, marginBottom: 6 }}>Pages: {book.pages}</p>
                                <p style={{ color: '#888890', fontSize: 13, marginBottom: 14 }}>Available copies: {book.availableCopies}</p>
                                <button style={{ width: '100%', padding: '8px', background: 'transparent', border: '1px solid #c9a84c', borderRadius: 8, color: '#c9a84c', cursor: 'pointer', fontSize: 13 }}>
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}