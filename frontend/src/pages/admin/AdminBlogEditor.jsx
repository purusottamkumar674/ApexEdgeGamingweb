import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { createBlog, updateBlog, getAdminBlogs, getCategories, uploadImage } from '../../utils/api'
import AdminSidebar from '../../components/AdminSidebar'
import toast from 'react-hot-toast'

// Simple Rich Text area (no dependency)
const RichEditor = ({ value, onChange }) => (
  <textarea
    value={value}
    onChange={e => onChange(e.target.value)}
    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
    rows={20}
    placeholder="Write your blog content here... (HTML supported)"
  />
)

export default function AdminBlogEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const [form, setForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    coverImage: '',
    category: '',
    tags: '',
    status: 'published',
    featured: false,
    readTime: 5
  })
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [fetchingBlog, setFetchingBlog] = useState(isEdit)

  // Fetch categories
  useEffect(() => {
    getCategories()
      .then(res => setCategories(res.data.categories))
      .catch(err => console.error('Error fetching categories:', err))
  }, [])

  // Fetch blog data if editing
  useEffect(() => {
    if (!isEdit) return

    const fetchBlogData = async () => {
      try {
        const token = localStorage.getItem('blogy_token')
        
        // First, get all blogs to find the specific blog
        const response = await fetch(`/api/blogs/admin/all?limit=200`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await response.json()
        const blog = data.blogs?.find(b => b._id === id)
        
        if (blog) {
          // Set form data from found blog
          setForm({
            title: blog.title || '',
            content: blog.content || '',
            excerpt: blog.excerpt || '',
            coverImage: blog.coverImage || '',
            category: blog.category?._id || blog.category || '',
            tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
            status: blog.status || 'published',
            featured: blog.featured || false,
            readTime: blog.readTime || 5
          })
        }
      } catch (error) {
        console.error('Error fetching blog:', error)
        toast.error('Failed to load blog data')
      } finally {
        setFetchingBlog(false)
      }
    }

    fetchBlogData()
  }, [id, isEdit])

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('image', file)
      const res = await uploadImage(fd)
      setForm(prev => ({ ...prev, coverImage: res.data.url }))
      toast.success('Image uploaded successfully!')
    } catch (err) {
      console.error('Upload error:', err)
      toast.error('Upload failed. Please check your Cloudinary settings.')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!form.title || !form.title.trim()) {
      toast.error('Title is required')
      return
    }
    if (!form.content || !form.content.trim()) {
      toast.error('Content is required')
      return
    }
    
    setLoading(true)
    
    try {
      // Prepare payload - CLEAN THE DATA
      const payload = {
        title: form.title.trim(),
        content: form.content,
        excerpt: form.excerpt?.trim() || '',
        coverImage: form.coverImage || '',
        // IMPORTANT: Only include category if it has a valid value
        category: (form.category && form.category !== '') ? form.category : undefined,
        // Process tags
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        status: form.status,
        featured: form.featured,
        readTime: form.readTime || 5
      }
      
      // Remove undefined values to avoid sending empty fields
      Object.keys(payload).forEach(key => {
        if (payload[key] === undefined) {
          delete payload[key]
        }
      })
      
      if (isEdit) {
        await updateBlog(id, payload)
        toast.success('Blog updated successfully!')
      } else {
        await createBlog(payload)
        toast.success('Blog created successfully!')
      }
      
      navigate('/admin/blogs')
    } catch (err) {
      console.error('Submit error:', err)
      const errorMessage = err.response?.data?.message || 'Something went wrong. Please try again.'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (fetchingBlog) {
    return (
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading ApexEdge Gaming data...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/admin/blogs" className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors mb-4 group">
            <span className="text-lg">←</span>
            <span className="text-sm">Back to ApexEdge Gaming</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? 'Edit ApexEdge Gaming' : 'Create New ApexEdge Gaming'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {isEdit ? 'Update your ApexEdge Gaming content and settings' : 'Write something amazing for your readers'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-5">
                {/* Title Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ApexEdge Gaming Title <span className="text-red-500">*</span>
                  </label>
                  <input 
                    value={form.title} 
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-semibold"
                    placeholder="Enter an engaging title..."
                    required 
                  />
                  <p className="text-xs text-gray-400 mt-1">Make it catchy and SEO-friendly</p>
                </div>

                {/* Excerpt Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Excerpt / Subtitle
                  </label>
                  <textarea 
                    value={form.excerpt} 
                    onChange={e => setForm({ ...form, excerpt: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3} 
                    placeholder="A short summary of your blog post (optional)"
                  />
                  <p className="text-xs text-gray-400 mt-1">This will appear in ApexEdge Gaming listings and SEO meta tags</p>
                </div>

                {/* Content Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ApexEdge Gaming Content <span className="text-red-500">*</span>
                  </label>
                  <RichEditor 
                    value={form.content} 
                    onChange={val => setForm({ ...form, content: val })} 
                  />
                  <p className="text-xs text-gray-400 mt-2">Supports HTML formatting. Use images, headings, lists, etc.</p>
                </div>
              </div>
            </div>

            {/* Sidebar - Right Side */}
            <div className="space-y-6">
              {/* Publish Settings */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📤</span>
                  Publish Settings
                </h3>
                
                <div className="space-y-4">
                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select 
                      value={form.status} 
                      onChange={e => setForm({ ...form, status: e.target.value })} 
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="published">✅ Published - Live on website</option>
                      <option value="draft">📝 Draft - Save for later</option>
                    </select>
                  </div>

                  {/* Featured Post */}
                  <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={form.featured} 
                      onChange={e => setForm({ ...form, featured: e.target.checked })} 
                      className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">⭐ Featured Post</span>
                      <p className="text-xs text-gray-400">Featured posts appear at the top of listings</p>
                    </div>
                  </label>

                  {/* Read Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Read Time (minutes)</label>
                    <input 
                      type="number"
                      value={form.readTime} 
                      onChange={e => setForm({ ...form, readTime: parseInt(e.target.value) || 5 })} 
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      min="1"
                      max="60"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      {isEdit ? '✏️ Update Blog' : '📝 Publish Blog'}
                    </>
                  )}
                </button>
              </div>

              {/* Cover Image */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🖼️</span>
                  Cover Image
                </h3>
                
                {form.coverImage && (
                  <div className="relative mb-4 group">
                    <img 
                      src={form.coverImage} 
                      alt="Cover" 
                      className="w-full aspect-video object-cover rounded-xl shadow-md" 
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, coverImage: '' })}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                )}
                
                {/* Upload Button */}
                <label className="block w-full cursor-pointer mb-3">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-purple-400 hover:bg-purple-50 transition-all duration-300">
                    <div className="text-2xl mb-1">📸</div>
                    <p className="text-sm text-gray-600">{uploading ? 'Uploading...' : 'Click to upload image'}</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="hidden" 
                    disabled={uploading} 
                  />
                </label>
                
                {/* Or paste URL */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Or paste image URL</label>
                  <input 
                    value={form.coverImage} 
                    onChange={e => setForm({ ...form, coverImage: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {/* Category & Tags */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🏷️</span>
                  Organization
                </h3>
                
                <div className="space-y-4">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category (Optional)</label>
                    <select 
                      value={form.category || ''} 
                      onChange={e => setForm({ ...form, category: e.target.value || '' })} 
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">-- Select a category --</option>
                      {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-400 mt-1">Categorize your post for better discovery</p>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags (Optional)</label>
                    <input 
                      value={form.tags} 
                      onChange={e => setForm({ ...form, tags: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="technology, webdev, react"
                    />
                    <p className="text-xs text-gray-400 mt-1">Comma-separated tags help readers find your content</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}