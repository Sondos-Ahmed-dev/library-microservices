import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Books from './pages/Books'
import BookDetails from './pages/BookDetails'
import MyBooks from './pages/MyBooks'
import ManageBooks from './pages/ManageBooks'
import AddEditBook from './pages/AddEditBook'
import BorrowRecords from './pages/BorrowRecords'
import Dashboard from './pages/Dashboard'
import ManageUsers from './pages/ManageUsers'
import ManageCategories from './pages/ManageCategories'


function ProtectedRoute({ children, roles }) {
    const { user } = useAuth()
    if (!user) return <Navigate to="/login" />
    if (roles && !roles.includes(user.role)) return <Navigate to="/" />
    return children
}

function AppRoutes() {
    const { user } = useAuth()
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>} />
                <Route path="/books/:id" element={<ProtectedRoute><BookDetails /></ProtectedRoute>} />
                <Route path="/my-books" element={<ProtectedRoute><MyBooks /></ProtectedRoute>} />
                <Route path="/manage-books" element={<ProtectedRoute roles={['LIBRARIAN','ADMIN']}><ManageBooks /></ProtectedRoute>} />
                <Route path="/add-book" element={<ProtectedRoute roles={['LIBRARIAN','ADMIN']}><AddEditBook /></ProtectedRoute>} />
                <Route path="/edit-book/:id" element={<ProtectedRoute roles={['LIBRARIAN','ADMIN']}><AddEditBook /></ProtectedRoute>} />
                <Route path="/borrow-records" element={<ProtectedRoute roles={['LIBRARIAN','ADMIN']}><BorrowRecords /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute roles={['ADMIN']}><Dashboard /></ProtectedRoute>} />
                <Route path="/manage-users" element={<ProtectedRoute roles={['ADMIN']}><ManageUsers /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/manage-categories" element={<ProtectedRoute roles={['ADMIN']}><ManageCategories /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    )
}