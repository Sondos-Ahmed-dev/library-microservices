import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const isActive = (path) => location.pathname === path

    const handleLogout = () => { logout(); navigate('/login') }

    return (
        <nav style={{ background: '#141416', borderBottom: '1px solid #2a2a30', position: 'sticky', top: 0, zIndex: 100 }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: 64, gap: 32 }}>
                <Link to='/' style={{ fontSize: 20, color: '#c9a84c', textDecoration: 'none', fontWeight: 700 }}>
                    ⬡ Bibliotheca
                </Link>

                {user && (
                    <div style={{ display: 'flex', gap: 4, flex: 1 }}>
                        <Link to='/' style={{ padding: '6px 14px', borderRadius: 7, textDecoration: 'none', fontSize: 14, color: isActive('/') ? '#c9a84c' : '#888890' }}>Home</Link>
                        <Link to='/books' style={{ padding: '6px 14px', borderRadius: 7, textDecoration: 'none', fontSize: 14, color: isActive('/books') ? '#c9a84c' : '#888890' }}>Books</Link>
                        <Link to='/my-books' style={{ padding: '6px 14px', borderRadius: 7, textDecoration: 'none', fontSize: 14, color: isActive('/my-books') ? '#c9a84c' : '#888890' }}>My Books</Link>
                        {(user.role === 'LIBRARIAN' || user.role === 'ADMIN') && (
                            <>
                                <Link to='/manage-books' style={{ padding: '6px 14px', borderRadius: 7, textDecoration: 'none', fontSize: 14, color: isActive('/manage-books') ? '#c9a84c' : '#888890' }}>Manage Books</Link>
                                <Link to='/borrow-records' style={{ padding: '6px 14px', borderRadius: 7, textDecoration: 'none', fontSize: 14, color: isActive('/borrow-records') ? '#c9a84c' : '#888890' }}>Borrow Records</Link>
                            </>
                        )}
                        {user.role === 'ADMIN' && (
                            <>
                                <Link to='/dashboard' style={{ padding: '6px 14px', borderRadius: 7, textDecoration: 'none', fontSize: 14, color: isActive('/dashboard') ? '#c9a84c' : '#888890' }}>Dashboard</Link>
                                <Link to='/manage-users' style={{ padding: '6px 14px', borderRadius: 7, textDecoration: 'none', fontSize: 14, color: isActive('/manage-users') ? '#c9a84c' : '#888890' }}>Users</Link>
                                <Link to='/manage-categories' style={{ padding: '6px 14px', borderRadius: 7, textDecoration: 'none', fontSize: 14, color: isActive('/manage-categories') ? '#c9a84c' : '#888890' }}>Categories</Link>
                            </>
                        )}
                    </div>
                )}

                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
                    {user ? (
                        <>
              <span style={{ fontSize: 13, color: '#888890' }}>
                {user.username} · <span style={{ color: '#c9a84c' }}>{user.role}</span>
              </span>
                            <button onClick={handleLogout} style={{ padding: '6px 14px', borderRadius: 7, background: 'transparent', border: '1px solid #2a2a30', color: '#f0ede6', cursor: 'pointer', fontSize: 13 }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to='/login' style={{ padding: '6px 14px', borderRadius: 7, textDecoration: 'none', border: '1px solid #2a2a30', color: '#f0ede6', fontSize: 13 }}>Login</Link>
                            <Link to='/register' style={{ padding: '6px 14px', borderRadius: 7, textDecoration: 'none', background: '#c9a84c', color: '#0d0d0f', fontSize: 13, fontWeight: 600 }}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}