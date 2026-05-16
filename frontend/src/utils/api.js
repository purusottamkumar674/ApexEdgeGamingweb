import axios from 'axios'

// ✅ Environment-based URL (best practice)
const BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const API = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true // ✅ cookies support (future use)
})

// ✅ Attach token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('blogy_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ✅ Handle errors globally
API.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status

    if (status === 401) {
      localStorage.removeItem('blogy_token')
      localStorage.removeItem('blogy_user')
      window.location.href = '/admin/login'
    }

    // 🔥 helpful debug
    console.error("API ERROR:", err.response?.data || err.message)

    return Promise.reject(err)
  }
)


// ================= AUTH =================
export const login = (data) => API.post('/auth/login', data)
export const getMe = () => API.get('/auth/me')
export const updatePassword = (data) =>
  API.put('/auth/update-password', data)


// ================= BLOGS =================
export const getBlogs = (params) =>
  API.get('/blogs', { params })

export const getFeaturedBlogs = () =>
  API.get('/blogs/featured')

export const getBlog = (slug) =>
  API.get(`/blogs/${slug}`)

export const getAdminBlogs = (params) =>
  API.get('/blogs/admin/all', { params })

export const getBlogStats = () =>
  API.get('/blogs/stats')

export const createBlog = (data) => {
  // 🔥 validation before send (frontend side)
  if (!data.title || !data.content) {
    throw new Error("Title and Content are required")
  }
  return API.post('/blogs', data)
}

export const updateBlog = (id, data) =>
  API.put(`/blogs/${id}`, data)

export const deleteBlog = (id) =>
  API.delete(`/blogs/${id}`)


// ================= CATEGORIES =================
export const getCategories = () =>
  API.get('/categories')

export const createCategory = (data) =>
  API.post('/categories', data)

export const updateCategory = (id, data) =>
  API.put(`/categories/${id}`, data)

export const deleteCategory = (id) =>
  API.delete(`/categories/${id}`)


// ================= UPLOAD =================
export const uploadImage = (formData) =>
  API.post('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

export default API