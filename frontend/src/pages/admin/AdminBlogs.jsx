import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAdminBlogs, deleteBlog } from '../../utils/api'
import AdminSidebar from '../../components/AdminSidebar'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { 
  Plus, Search, Filter, Eye, Clock, Calendar, 
  Edit, Trash2, MoreVertical, FileText, 
  TrendingUp, CheckCircle, XCircle, AlertCircle,
  ChevronLeft, ChevronRight, Zap, BookOpen
} from 'lucide-react'

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([])
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

  const fetchBlogs = () => {
    setLoading(true)
    getAdminBlogs({ page, limit: 10, status, search })
      .then(res => {
        setBlogs(res.data.blogs)
        setPagination(res.data.pagination)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchBlogs() }, [page, status, search])

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This action cannot be undone.`)) return
    try {
      await deleteBlog(id)
      toast.success('Blog deleted successfully!', { icon: '🗑️' })
      fetchBlogs()
    } catch (err) {
      toast.error('Failed to delete blog')
    }
  }

  const getStatusBadge = (status) => {
    if (status === 'published') {
      return { bg: 'bg-green-100', text: 'text-green-700', icon: <CheckCircle size={12} />, label: 'Published' }
    }
    return { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: <AlertCircle size={12} />, label: 'Draft' }
  }

  return (
    <div className="flex bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText size={20} className="text-purple-600" />
              <span className="text-purple-600 text-sm font-semibold uppercase tracking-wide">ApexEdge Gaming Management</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">All ApexEdge Gaming Posts</h1>
            <p className="text-gray-500 text-sm mt-1">
              {pagination.total || 0} total {pagination.total === 1 ? 'post' : 'posts'}
            </p>
          </div>
          <Link 
            to="/admin/blogs/new" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
          >
            <Plus size={18} />
            <span>New Post</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                placeholder="Search by title or content..." 
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select 
                value={status} 
                onChange={e => setStatus(e.target.value)} 
                className="pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer min-w-[160px]"
              >
                <option value="">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            {(search || status) && (
              <button 
                onClick={() => { setSearch(''); setStatus('') }}
                className="px-4 py-3 text-gray-500 hover:text-purple-600 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Stats Summary */}
        {!loading && blogs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-xs font-medium text-gray-500">PUBLISHED</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {blogs.filter(b => b.status === 'published').length}
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-yellow-600" />
                <span className="text-xs font-medium text-gray-500">DRAFTS</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {blogs.filter(b => b.status === 'draft').length}
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-purple-600" />
                <span className="text-xs font-medium text-gray-500">TOTAL VIEWS</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {blogs.reduce((sum, b) => sum + (b.views || 0), 0).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Post</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-4">Category</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-4">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-4">Views</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-4">Date</th>
                  <th className="px-4 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-32" />
                            <div className="h-3 bg-gray-200 rounded w-20" />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-20" /></td>
                      <td className="px-4 py-4"><div className="h-6 bg-gray-200 rounded-full w-16" /></td>
                      <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-12" /></td>
                      <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-24" /></td>
                      <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-16" /></td>
                    </tr>
                  ))
                ) : blogs.map((blog) => {
                  const statusBadge = getStatusBadge(blog.status)
                  return (
                    <tr key={blog._id} className="hover:bg-purple-50/30 transition-colors duration-300 group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {blog.coverImage ? (
                            <img src={blog.coverImage} alt="" className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                          ) : (
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                              <BookOpen size={20} className="text-purple-600" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-gray-900 text-sm line-clamp-1 group-hover:text-purple-600 transition-colors">
                              {blog.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock size={10} className="text-gray-400" />
                              <span className="text-xs text-gray-400">{blog.readTime} min read</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {blog.category?.name ? (
                          <span 
                            className="px-2 py-1 rounded-lg text-xs font-medium"
                            style={{ 
                              backgroundColor: `${blog.category.color}20`,
                              color: blog.category.color 
                            }}
                          >
                            {blog.category.name}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}>
                          {statusBadge.icon}
                          {statusBadge.label}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <Eye size={12} className="text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">{blog.views || 0}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} className="text-gray-400" />
                          <span className="text-sm text-gray-500">{format(new Date(blog.createdAt), 'MMM d, yyyy')}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Link 
                            to={`/admin/blogs/edit/${blog._id}`} 
                            className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(blog._id, blog.title)} 
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-all duration-300 sm:hidden lg:inline-flex">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {blogs.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-400 font-medium">No ApexEdge Gaming Posts found</p>
              <p className="text-sm text-gray-400 mt-1">
                {search || status ? 'Try adjusting your filters' : 'Create your first blog post to get started'}
              </p>
              {!search && !status && (
                <Link to="/admin/blogs/new" className="text-purple-600 hover:text-purple-700 text-sm font-medium mt-3 inline-flex items-center gap-1">
                  Create your first post →
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="text-sm text-gray-500">
              Showing page {pagination.page} of {pagination.pages}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setPage(pagination.page - 1)}
                disabled={pagination.page === 1}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  pagination.page === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-400 hover:text-purple-600 hover:shadow-sm'
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              
              {[...Array(pagination.pages)].slice(
                Math.max(0, pagination.page - 2),
                Math.min(pagination.pages, pagination.page + 1)
              ).map((_, i) => {
                const pageNum = Math.max(0, pagination.page - 2) + i + 1
                return (
                  <button 
                    key={i} 
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-300 ${
                      pagination.page === pageNum 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' 
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-400 hover:text-purple-600 hover:shadow-sm'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              
              <button 
                onClick={() => setPage(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  pagination.page === pagination.pages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-400 hover:text-purple-600 hover:shadow-sm'
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}