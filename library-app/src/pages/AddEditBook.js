import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apiFetch } from '../api'

export default function AddEditBook() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = !!id

    const [form, setForm] = useState({
        title: '',
        author: '',
        pages: 1,
        quantity: 1,
        categoryId: ''
    })

    const [categories, setCategories] = useState([])
    const [error, setError] = useState('')


    useEffect(() => {
        apiFetch('/categories')
            .then(data => setCategories(Array.isArray(data) ? data : []))
            .catch(() => setCategories([]))
        if (id) {
            apiFetch(`/books/${id}`).then(b => setForm({
                title: b.title,
                author: b.author,
                pages: b.pages,
                quantity: b.quantity, 
                categoryId: b.categoryId ? String(b.categoryId) : ''
            })).catch(() => {})
        }
    }, [id])

    const set = (k) => (e) =>
        setForm(f => ({ ...f, [k]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const body = {
            title: form.title,
            author: form.author,
            pages: Number(form.pages),
            quantity: Number(form.quantity),
            // category: form.categoryId ? { id: Number(form.categoryId) } : null,
            categoryId: form.categoryId ? Number(form.categoryId) : null,
        
        }

        try {
            if (id) {
                await apiFetch(`/books/${id}`,
                    { method: 'PUT',
                    body: JSON.stringify(body) })
            } else {
                await apiFetch('/books', {
                    method: 'POST',
                    body: JSON.stringify(body)
                })
            }
            navigate('/manage-books')
        } catch (e) {
            setError(e.message)
        }
    }

    const inputStyle = {
        width: '100%',
        padding: '11px 14px',
        background: '#1c1c20',
        border: '1px solid #2a2a30',
        borderRadius: 8,
        color: '#f0ede6',
        fontSize: 14,
        outline: 'none',
        boxSizing: 'border-box'
    }

    return (
        <div style={{ background: '#0d0d0f', minHeight: '100vh' }}>
            <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 24px' }}>

                <button
                    onClick={() => navigate(-1)}
                    style={{
                        padding: '8px 16px',
                        background: 'transparent',
                        border: '1px solid #2a2a30',
                        borderRadius: 8,
                        color: '#f0ede6',
                        cursor: 'pointer',
                        fontSize: 13,
                        marginBottom: 24
                    }}
                >
                    Back
                </button>

                <h1 style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 32,
                    color: '#f0ede6',
                    marginBottom: 28
                }}>
                    {isEdit ? 'Edit Book' : 'Add New Book'}
                </h1>

                <div style={{
                    background: '#141416',
                    border: '1px solid #2a2a30',
                    borderRadius: 12,
                    padding: 32
                }}>
                    <form onSubmit={handleSubmit} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 20
                    }}>

                        {/* Title */}
                        <div>
                            <label style={{ display: 'block', marginBottom: 6, color: '#f0ede6' }}>
                                Title
                            </label>
                            <input
                                style={inputStyle}
                                value={form.title}
                                onChange={set('title')}
                            />
                        </div>

                        {/* Author */}
                        <div>
                            <label style={{ display: 'block', marginBottom: 6, color: '#f0ede6' }}>
                                Author
                            </label>
                            <input
                                style={inputStyle}
                                value={form.author}
                                onChange={set('author')}
                            />
                        </div>

                        {/* Pages */}
                        <div>
                            <label style={{ display: 'block', marginBottom: 6, color: '#f0ede6' }}>
                                Pages
                            </label>
                            <input
                                type="number"
                                style={inputStyle}
                                value={form.pages}
                                onChange={set('pages')}
                            />
                        </div>

                        {/* Quantity */}
                        <div>
                            <label style={{ display: 'block', marginBottom: 6, color: '#f0ede6' }}>
                                Quantity
                            </label>
                            <input
                                type="number"
                                style={inputStyle}
                                value={form.quantity}
                                onChange={e => setForm({ ...form, quantity: e.target.value })} required
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label style={{ display: 'block', marginBottom: 6, color: '#f0ede6' }}>
                                Category
                            </label>
                            <select
                                style={inputStyle}
                                value={form.categoryId}
                                onChange={set('categoryId')}
                            >
                                <option value="">Select category</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)
                            }
                            </select>
                        </div>

                        {error && (
                            <div style={{ color: 'red' }}>{error}</div>
                        )}

                        <button
                            type="submit"
                            style={{
                                padding: '12px',
                                background: '#3a3a44',
                                border: 'none',
                                borderRadius: 8,
                                color: '#fff',
                                cursor: 'pointer'
                            }}
                        >
                            {isEdit ? 'Update Book' : 'Create Book'}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}