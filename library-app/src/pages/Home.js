import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { apiFetch } from '../api'

export default function Home() {
    const { user } = useAuth()
    const [search, setSearch] = useState('')
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

    const handleSearch = (e) => {
        e.preventDefault()
        navigate('/books?search=' + search)
    }

    return (
        <div style={{ background: '#0d0d0f', minHeight: '100vh' }}>
            <div style={{ background: '#141416', padding: '72px 24px', textAlign: 'center', borderBottom: '1px solid #2a2a30' }}>
                <p style={{ color: '#c9a84c', fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 16 }}>Welcome, {user?.username}</p>
                <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 52, lineHeight: 1.1, marginBottom: 20, color: '#f0ede6' }}>Explore Our Collection</h1>
                <p style={{ color: '#888890', fontSize: 17, maxWidth: 500, margin: '0 auto 36px' }}>Thousands of books waiting to be discovered</p>
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: 12, maxWidth: 520, margin: '0 auto' }}>
                    <input style={{ flex: 1, padding: '11px 14px', background: '#1c1c20', border: '1px solid #2a2a30', borderRadius: 8, color: '#f0ede6', fontSize: 15, outline: 'none' }}
                           placeholder="Search by title or author..." value={search} onChange={e => setSearch(e.target.value)} />
                    <button type="submit" style={{ padding: '11px 24px', background: '#c9a84c', color: '#0d0d0f', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Search</button>
                </form>
            </div>

            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 22, marginBottom: 16, color: '#f0ede6' }}>Categories</h2>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 48 }}>
                    {categories.map(cat => (
                        <button key={cat.id} onClick={() => navigate('/books?category=' + cat.name)}
                                style={{ padding: '8px 18px', background: 'transparent', border: '1px solid #2a2a30', borderRadius: 8, color: '#f0ede6', cursor: 'pointer', fontSize: 14 }}>
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#f0ede6' }}>Featured Books</h2>
                    <button onClick={() => navigate('/books')} style={{ padding: '8px 18px', background: 'transparent', border: '1px solid #c9a84c', borderRadius: 8, color: '#c9a84c', cursor: 'pointer', fontSize: 14 }}>
                        View All
                    </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
                    {books.slice(0, 4).map(book => (
                        <div key={book.id} onClick={() => navigate('/books/' + book.id)}
                             style={{ background: '#141416', border: '1px solid #2a2a30', borderRadius: 12, padding: 20, cursor: 'pointer' }}>
                            <div style={{ fontSize: 40, textAlign: 'center', background: '#1c1c20', borderRadius: 8, padding: '16px 0', marginBottom: 14 }}>📘</div>
                            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 16, marginTop: 10, marginBottom: 4, color: '#f0ede6' }}>{book.title}</h3>
                            <p style={{ color: '#888890', fontSize: 13, marginBottom: 4 }}>Author: {book.author}</p>
                            <p style={{ color: '#888890', fontSize: 13, marginBottom: 4 }}>Quantity: {book.quantity}</p>
                            <p style={{ color: '#888890', fontSize: 13, marginBottom: 4 }}>Pages: {book.pages}</p>
                            <p style={{ color: '#888890', fontSize: 13 }}>Available copies: {book.availableCopies}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}