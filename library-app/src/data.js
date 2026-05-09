export const BOOKS = [
    { id: 1, title: 'The Alchemist', author: 'Paulo Coelho', category: 'Fiction', quantity: 3, available: 2, description: 'A philosophical novel about a young Andalusian shepherd who dreams of finding treasure.', cover: '📘' },
    { id: 2, title: 'Clean Code', author: 'Robert C. Martin', category: 'Technology', quantity: 5, available: 4, description: 'A handbook of agile software craftsmanship.', cover: '💻' },
    { id: 3, title: '1984', author: 'George Orwell', category: 'Fiction', quantity: 2, available: 0, description: 'A dystopian novel set in a totalitarian society.', cover: '📕' },
    { id: 4, title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History', quantity: 4, available: 3, description: 'A brief history of humankind.', cover: '🌍' },
    { id: 5, title: 'Atomic Habits', author: 'James Clear', category: 'Self-Help', quantity: 6, available: 5, description: 'Tiny changes, remarkable results.', cover: '⚡' },
    { id: 6, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', quantity: 3, available: 1, description: 'A critique of the American Dream set in the Jazz Age.', cover: '🥂' },
    { id: 7, title: 'Design Patterns', author: 'Gang of Four', category: 'Technology', quantity: 3, available: 2, description: 'Elements of reusable object-oriented software.', cover: '🏗️' },
    { id: 8, title: 'Thinking Fast and Slow', author: 'Daniel Kahneman', category: 'Psychology', quantity: 4, available: 4, description: 'Explores the two systems that drive the way we think.', cover: '🧠' },
]

export const BORROWINGS = [
    { id: 1, userId: 1, bookId: 1, userName: 'Nour Mohsen', bookTitle: 'The Alchemist', borrowDate: '2025-03-01', dueDate: '2025-03-15', returnDate: null, status: 'BORROWED' },
    { id: 2, userId: 2, bookId: 5, userName: 'Mostafa Yasser', bookTitle: 'Atomic Habits', borrowDate: '2025-02-10', dueDate: '2025-02-24', returnDate: '2025-02-22', status: 'RETURNED' },
    { id: 3, userId: 3, bookId: 2, userName: 'Mohamed Mansour', bookTitle: 'Clean Code', borrowDate: '2025-03-05', dueDate: '2025-03-19', returnDate: null, status: 'BORROWED' },
    { id: 4, userId: 4, bookId: 4, userName: 'Aya Taha', bookTitle: 'Sapiens', borrowDate: '2025-01-20', dueDate: '2025-02-03', returnDate: null, status: 'OVERDUE' },
    { id: 5, userId: 5, bookId: 3, userName: 'Marawan Abdelfattah', bookTitle: '1984', borrowDate: '2025-02-15', dueDate: '2025-03-01', returnDate: '2025-02-28', status: 'RETURNED' },
    { id: 6, userId: 6, bookId: 6, userName: 'Ahmed Ali', bookTitle: 'The Great Gatsby', borrowDate: '2025-03-10', dueDate: '2025-03-24', returnDate: null, status: 'BORROWED' },
]

export const USERS = [
    { id: 1, name: 'Nour Mohsen', email: 'nour@lib.com', role: 'BORROWER', joined: '2024-09-01' },
    { id: 2, name: 'Mostafa Yasser', email: 'mostafa@lib.com', role: 'BORROWER', joined: '2024-10-15' },
    { id: 3, name: 'Mohamed Mansour', email: 'mohamed@lib.com', role: 'BORROWER', joined: '2024-11-20' },
    { id: 4, name: 'Aya Taha', email: 'aya@lib.com', role: 'BORROWER', joined: '2025-01-05' },
    { id: 5, name: 'Marawan Abdelfattah', email: 'marawan@lib.com', role: 'BORROWER', joined: '2025-02-01' },
    { id: 6, name: 'Ahmed Ali', email: 'ahmed@lib.com', role: 'BORROWER', joined: '2025-02-15' },
    { id: 7, name: 'Sara Karam', email: 'sara@lib.com', role: 'BORROWER', joined: '2025-03-01' },
    { id: 8, name: 'Sondos Ahmed', email: 'sondos@lib.com', role: 'LIBRARIAN', joined: '2024-01-15' },
    { id: 9, name: 'Radwa Meshref', email: 'radwa@lib.com', role: 'ADMIN', joined: '2023-06-01' },
]

export const CATEGORIES = ['All', 'Fiction', 'Technology', 'History', 'Self-Help', 'Psychology']