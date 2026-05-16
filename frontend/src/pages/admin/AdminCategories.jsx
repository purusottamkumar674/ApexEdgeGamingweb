import { useState, useEffect } from 'react'
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../utils/api'
import AdminSidebar from '../../components/AdminSidebar'
import toast from 'react-hot-toast'
import { 
  Plus, Edit, Trash2, X, Save, Tag, Palette, 
  BookOpen, FolderOpen, Layers, TrendingUp, 
  CheckCircle, AlertCircle, Sparkles, Zap
} from 'lucide-react'

const COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6']

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({ name: '', description: '', color: '#6366f1' })
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchCats = () => getCategories().then(res => setCategories(res.data.categories))
  useEffect(() => { fetchCats() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name) return
    setLoading(true)
    try {
      if (editing) {
        await updateCategory(editing, form)
        toast.success('Category updated successfully!', { icon: '🎉' })
        setEditing(null)
      } else {
        await createCategory(form)
        toast.success('Category created successfully!', { icon: '✨' })
      }
      setForm({ name: '', description: '', color: '#6366f1' })
      fetchCats()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (cat) => {
    setEditing(cat._id)
    setForm({ name: cat.name, description: cat.description || '', color: cat.color || '#6366f1' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return
    try {
      await deleteCategory(id)
      toast.success('Category deleted successfully!')
      fetchCats()
    } catch (err) {
      toast.error('Failed to delete category')
    }
  }

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cat.description && cat.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="flex bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <FolderOpen size={20} className="text-purple-600" />
            <span className="text-purple-600 text-sm font-semibold uppercase tracking-wide">Categories</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Manage ApexEdge Gaming Categories</h1>
          <p className="text-gray-500 text-sm mt-1">Organize your ApexEdge Gaming content with categories</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
              <div className="flex items-center gap-2">
                {editing ? (
                  <>
                    <Edit size={18} className="text-purple-600" />
                    <h2 className="font-semibold text-gray-900">Edit Category</h2>
                  </>
                ) : (
                  <>
                    <Plus size={18} className="text-purple-600" />
                    <h2 className="font-semibold text-gray-900">Add New Category</h2>
                  </>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {editing ? 'Update category information' : 'Create a new category for your blog posts'}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Tag size={14} className="text-gray-400" />
                  Category Name *
                </label>
                <input 
                  value={form.name} 
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., Technology, Lifestyle, Design"
                  required 
                />
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <BookOpen size={14} className="text-gray-400" />
                  Description
                </label>
                <input 
                  value={form.description} 
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Brief description of this category (optional)"
                />
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Palette size={14} className="text-gray-400" />
                  Category Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {COLORS.map(c => (
                    <button 
                      key={c} 
                      type="button" 
                      onClick={() => setForm({ ...form, color: c })}
                      className={`w-10 h-10 rounded-xl transition-all duration-300 shadow-md ${
                        form.color === c 
                          ? 'scale-125 ring-2 ring-offset-2 ring-purple-500 shadow-lg' 
                          : 'hover:scale-110 hover:shadow-lg'
                      }`}
                      style={{ backgroundColor: c }} 
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">Selected color will appear on category badges</p>
              </div>

              {/* Preview */}
              {(form.name || form.description) && (
                <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-2 font-medium">PREVIEW</p>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full shadow-sm" 
                      style={{ backgroundColor: form.color }} 
                    />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{form.name || 'Category Name'}</p>
                      {form.description && <p className="text-xs text-gray-400">{form.description}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{editing ? 'Updating...' : 'Creating...'}</span>
                    </>
                  ) : (
                    <>
                      {editing ? <Save size={16} /> : <Plus size={16} />}
                      <span>{editing ? 'Update Category' : 'Create Category'}</span>
                    </>
                  )}
                </button>
                
                {editing && (
                  <button 
                    type="button" 
                    onClick={() => { 
                      setEditing(null)
                      setForm({ name: '', description: '', color: '#6366f1' })
                    }} 
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300 flex items-center gap-2"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Layers size={18} className="text-purple-600" />
                    <h2 className="font-semibold text-gray-900">All Categories</h2>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Total {categories.length} category{categories.length !== 1 ? 's' : ''}
                  </p>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-48"
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {categories.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FolderOpen size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-400 font-medium">No categories yet</p>
                <p className="text-xs text-gray-400 mt-1">Create your first category to get started</p>
              </div>
            ) : filteredCategories.length === 0 ? (
              <div className="p-12 text-center">
                <AlertCircle size={32} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400">No matching categories found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                {filteredCategories.map((cat, idx) => (
                  <div 
                    key={cat._id} 
                    className="px-5 py-4 flex items-center justify-between hover:bg-purple-50/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="relative">
                        <div 
                          className="w-5 h-5 rounded-full shadow-sm" 
                          style={{ backgroundColor: cat.color }} 
                        />
                        {idx < 3 && (
                          <div className="absolute -top-1 -right-1">
                            <TrendingUp size={10} className="text-green-500" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm group-hover:text-purple-600 transition-colors">
                          {cat.name}
                        </p>
                        {cat.description && (
                          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{cat.description}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="hidden sm:flex items-center gap-3 mr-4">
                      <div className="flex items-center gap-1 text-gray-400">
                        <BookOpen size={12} />
                        <span className="text-xs">{cat.blogCount || 0} posts</span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEdit(cat)} 
                        className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(cat._id)} 
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Footer Stats */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-green-500" />
                  <span className="text-gray-500">{categories.length} total categories</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles size={12} className="text-purple-500" />
                  <span className="text-gray-500">
                    {categories.filter(c => c.blogCount > 0).length} active categories
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}