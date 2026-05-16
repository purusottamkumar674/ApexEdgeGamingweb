import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Public Pages
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import BlogDetailPage from './pages/BlogDetailPage'
import AboutPage from './pages/AboutPage'
import CategoriesPage from './pages/CategoriesPage'
import CategoryPage from './pages/CategoryPage'
import ContactPage from './pages/ContactPage'
import SearchPage from './pages/SearchPage'
import SubscribePage from './pages/SubscribePage'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminBlogs from './pages/admin/AdminBlogs'
import AdminBlogEditor from './pages/admin/AdminBlogEditor'
import AdminCategories from './pages/admin/AdminCategories'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>
  return user?.role === 'admin' ? children : <Navigate to="/admin/login" replace />
}

const AdminLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">{children}</div>
)

const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
)

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
      <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />
      <Route path="/blog/:slug" element={<PublicLayout><BlogDetailPage /></PublicLayout>} />
      <Route path="/aboutpage" element={<PublicLayout><AboutPage /></PublicLayout>} />
      <Route path="/categories" element={<PublicLayout><CategoriesPage /></PublicLayout>} />
      <Route path="/category/:categoryName" element={<PublicLayout><CategoryPage /></PublicLayout>} />
      <Route path="/contactpage" element={<PublicLayout><ContactPage /></PublicLayout>} />
      <Route path="/search" element={<PublicLayout><SearchPage /></PublicLayout>} />
      <Route path="/subscribe" element={<PublicLayout><SubscribePage /></PublicLayout>} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/blogs" element={<ProtectedRoute><AdminLayout><AdminBlogs /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/blogs/new" element={<ProtectedRoute><AdminLayout><AdminBlogEditor /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/blogs/edit/:id" element={<ProtectedRoute><AdminLayout><AdminBlogEditor /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/categories" element={<ProtectedRoute><AdminLayout><AdminCategories /></AdminLayout></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
