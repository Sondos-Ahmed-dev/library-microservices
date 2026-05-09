const API_URL = 'http://localhost:8080'


function getBaseUrl(path) {
    return API_URL
}

export async function apiFetch(path, options = {}) {
    const token = localStorage.getItem('token')
    const baseUrl = getBaseUrl(path)
    let res
    try {
        res = await fetch(`${baseUrl}${path}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...(options.headers || {}),
            },
        })
    } catch {
        throw new Error('Cannot connect to backend server')
    }
    const text = await res.text()
    if (!res.ok) throw new Error(text || `HTTP ${res.status}`)
    try { return JSON.parse(text) } catch { return text }
    
}