import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apiFetch } from '../api'

export default function BookDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [book, setBook] = useState(null)
    const [borrowed, setBorrowed] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        apiFetch(`/books/${id}`).then(setBook).catch(() => setBook(null))
    }, [id])

    if (!book) return <div style={{ color: '#888890', padding: 40 }}>Book not found</div>


const handleBorrow = async () => {
    try {
        await apiFetch('/borrow', { 
            method: 'POST',
            body: JSON.stringify({ bookId: book.id, userId: 1 })
        })
        setBorrowed(true)
        setTimeout(() => navigate('/my-books'), 1200)
    } catch (e) {
        setError(e.message)
    }
}

    return (
        <div style={{ background: '#0d0d0f', minHeight: '100vh' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
                <button onClick={() => navigate(-1)} style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #2a2a30', borderRadius: 8, color: '#f0ede6', cursor: 'pointer', fontSize: 13, marginBottom: 24 }}>
                    ← Back
                </button>
                <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 40 }}>
                    <div>
                        <div style={{ background: '#141416', border: '1px solid #2a2a30', borderRadius: 16, padding: '48px 0', textAlign: 'center', fontSize: 80, marginBottom: 16 }}>📘</div>
                        <div style={{ background: '#141416', border: '1px solid #2a2a30', borderRadius: 12, padding: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 10 }}>
                                <span style={{ color: '#888890' }}>Quantity</span>
                                <span style={{ color: '#f0ede6' }}>{book.quantity}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 10 }}>
                                <span style={{ color: '#888890' }}>Pages</span>
                                <span style={{ color: '#f0ede6' }}>{book.pages}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                <span style={{ color: '#888890' }}>Available copies</span>
                                <span style={{ color: book.availableCopies > 0 ? '#4caf7d' : '#e05c5c', fontWeight: 500 }}>{book.availableCopies}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 40, color: '#f0ede6', marginBottom: 8, lineHeight: 1.15 }}>{book.title}</h1>
                        <p style={{ color: '#888890', fontSize: 16, marginBottom: 28 }}>by {book.author}</p>
                        <hr style={{ border: 'none', borderTop: '1px solid #2a2a30', marginBottom: 28 }} />
                        {error && <p style={{ color: '#e05c5c', fontSize: 13, marginBottom: 16 }}>{error}</p>}
                        {borrowed ? (
                            <div style={{ background: 'rgba(76,175,125,.1)', border: '1px solid #4caf7d', borderRadius: 8, padding: '14px 20px', color: '#4caf7d', fontWeight: 500 }}>
                                Book borrowed successfully! Redirecting...
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: 12 }}>
                                {book.availableCopies > 0 ? (
                                    <button disabled={book.availableCopies <= 0} onClick={handleBorrow} style={{ padding: '12px 28px', background: '#c9a84c', color: '#0d0d0f', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                                        Borrow this Book
                                    </button>
                                ) : (
                                    <button disabled style={{ padding: '12px 28px', background: '#1c1c20', color: '#888890', border: '1px solid #2a2a30', borderRadius: 8, fontSize: 15, cursor: 'not-allowed' }}>
                                        Unavailable
                                    </button>
                                )}
                                <button onClick={() => navigate('/books')} style={{ padding: '12px 28px', background: 'transparent', color: '#f0ede6', border: '1px solid #2a2a30', borderRadius: 8, fontSize: 15, cursor: 'pointer' }}>
                                    Browse More
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}