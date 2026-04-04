const BASE = "http://localhost:8000"



export const authAPI = {
  register: (username, email, password, phone) =>
    fetch(`${BASE}/member`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, phone, create_at: new Date().toISOString().split('T')[0] })
    }).then(r => r.json()),

  login: (email, password) =>
    fetch(`${BASE}/member/login`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    }).then(r => r.json()),

  checkAuth: () =>
    fetch(`${BASE}/member/auth`, {
      credentials: 'include'
    }).then(r => r.json()),
}
;