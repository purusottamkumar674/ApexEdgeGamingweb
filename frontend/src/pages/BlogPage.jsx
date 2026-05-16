import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getBlogs, getCategories } from '../utils/api'
import BlogCard from '../components/BlogCard'
import { 
  Search, Filter, Grid3X3, List, TrendingUp, 
  BookOpen, Sparkles, Zap, Crown, Flame, 
  ChevronLeft, ChevronRight, Calendar, Clock,
  Eye, Heart, MessageCircle, Share2, ArrowRight,
  Menu, X, Award, Users, BarChart3, Target, Globe,
  Compass, Coffee, Rocket, Mail, Shield, Star,
  CheckCircle2, Play, Gift, Quote
} from 'lucide-react'

export default function BlogPage() {
  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState([])
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid')
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)

  const page = parseInt(searchParams.get('page')) || 1
  const category = searchParams.get('category') || ''
  const search = searchParams.get('search') || ''

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    getCategories().then(res => setCategories(res.data.categories))
  }, [])

  useEffect(() => {
    setLoading(true)
    getBlogs({ page, limit: 9, category, search })
      .then(res => {
        setBlogs(res.data.blogs)
        setPagination(res.data.pagination)
      })
      .finally(() => setLoading(false))
  }, [page, category, search])

  const handleSearch = (e) => {
    e.preventDefault()
    const q = e.target.search.value
    setSearchParams(q ? { search: q } : {})
  }

  const setFilter = (key, val) => {
    const params = {}
    if (key === 'category' && val) params.category = val
    if (key !== 'category' && category) params.category = category
    setSearchParams(params)
    setMobileMenuOpen(false)
  }

  // Stats for header
  const stats = [
    { label: 'Total Articles', value: pagination.total || 0, icon: <BookOpen size={22} />, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', textColor: 'text-blue-600' },
    { label: 'Categories', value: categories.length, icon: <Grid3X3 size={22} />, color: 'from-green-500 to-emerald-500', bg: 'bg-green-50', textColor: 'text-green-600' },
    { label: 'Avg Read Time', value: '5 min', icon: <Clock size={22} />, color: 'from-orange-500 to-red-500', bg: 'bg-orange-50', textColor: 'text-orange-600' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      
      {/* Hero Section - Premium Redesigned Header */}
      <section className="relative overflow-hidden">
        {/* Premium Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80')] bg-cover bg-center opacity-10"></div>
        </div>
        
        {/* Animated Orbs */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-30 animate-pulse-slower"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-40 w-56 h-56 bg-yellow-500 rounded-full blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-40 left-40 w-56 h-56 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-float-delay"></div>
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-100"></div>
        
        {/* Hero Content - INCREASED SIZE */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge - Bigger */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-2.5 mb-8 border border-white/20 shadow-lg animate-float">
              <Sparkles size={16} className="text-yellow-300" />
              <span className="text-base font-medium text-white/90">Welcome to Our ApexEdge Gaming</span>
              <span className="w-1.5 h-1.5 bg-white/30 rounded-full"></span>
              <span className="text-base font-medium text-white/90">10,000+ Articles</span>
            </div>
            
            {/* Main Heading - Bigger */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight">
              <span className="text-white">Explore Our</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              ApexEdge Gaming Collection
              </span>
            </h1>
            
            {/* Description - Bigger */}
            <p className="text-purple-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              Dive into a world of knowledge. Discover insightful articles, expert opinions, and stories that matter from our diverse collection of ApexEdge Gaming.
            </p>
            
            {/* CTA Buttons - Bigger */}
            <div className="flex flex-wrap gap-5 justify-center mb-16">
              <button className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 text-base">
                Latest Articles
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 text-base">
                <Play size={18} />
                Watch Demo
              </button>
            </div>
            
            {/* Stats Cards - BIGGER and VISIBLE */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, idx) => (
                <div key={idx} className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">{stat.icon}</div>
                  </div>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Animated Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f8fafc" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Search & Filters Section - Premium Card */}
        <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8 transition-all duration-300 ${scrolled ? 'shadow-2xl' : ''}`} style={{ position: 'sticky', top: scrolled ? '80px' : '100px', zIndex: 20 }}>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Form */}
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" size={18} />
                  <input 
                    name="search" 
                    defaultValue={search} 
                    placeholder="Search articles by title, author, or topic..." 
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                  />
                </div>
              </form>
              
              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-white shadow-md text-purple-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'}`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-white shadow-md text-purple-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
            
            {/* Category Filters - Desktop */}
            <div className="hidden md:block mt-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Browse by Category</span>
                <div className="flex-1"></div>
                {category && (
                  <button 
                    onClick={() => setFilter('category', '')}
                    className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1 transition-colors"
                  >
                    Clear filter <X size={12} />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setFilter('category', '')} 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    !category 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md hover:shadow-lg' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  All Posts
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat._id} 
                    onClick={() => setFilter('category', cat._id)} 
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      category === cat._id 
                        ? 'text-white shadow-md hover:shadow-lg' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                    style={category === cat._id ? { backgroundColor: cat.color } : {}}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="md:hidden mt-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-300 transition-all duration-300"
              >
                <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Filter size={16} />
                  Filter by Category
                  {category && <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>}
                </span>
                <span className="text-gray-400">{mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}</span>
              </button>
              
              {mobileMenuOpen && (
                <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-200 animate-fade-in-up">
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setFilter('category', '')} 
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        !category ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-white text-gray-600 border border-gray-200'
                      }`}
                    >
                      All Posts
                    </button>
                    {categories.map(cat => (
                      <button 
                        key={cat._id} 
                        onClick={() => setFilter('category', cat._id)} 
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          category === cat._id ? 'text-white' : 'bg-white text-gray-600 border border-gray-200'
                        }`}
                        style={category === cat._id ? { backgroundColor: cat.color } : {}}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Info Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
              <TrendingUp size={16} className="text-purple-600" />
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-700">{blogs.length} articles found</span>
              <p className="text-xs text-gray-400">Page {pagination.page} of {pagination.pages || 1}</p>
            </div>
          </div>
          {search && (
            <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-full animate-fade-in-up">
              <span className="text-xs text-gray-600">Search results for:</span>
              <span className="text-xs font-medium text-purple-700">"{search}"</span>
              <button 
                onClick={() => setSearchParams({})}
                className="text-purple-400 hover:text-purple-600 transition-colors"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Blog Grid/List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-12 bg-gray-200 rounded" />
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-gray-200 rounded-full" />
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded w-24" />
                      <div className="h-2 bg-gray-200 rounded w-16 mt-1" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <>
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-5"
            }>
              {blogs.map((blog, idx) => (
                <div 
                  key={blog._id} 
                  className="animate-fade-in-up" 
                  style={{ animationDelay: `${idx * 0.05}s` }}
                  onMouseEnter={() => setHoveredCard(blog._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <BlogCard blog={blog} viewMode={viewMode} />
                </div>
              ))}
            </div>

            {/* Premium Pagination */}
            {pagination.pages > 1 && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                  Showing page {pagination.page} of {pagination.pages}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSearchParams({ page: pagination.page - 1, ...(category && { category }), ...(search && { search }) })}
                    disabled={pagination.page === 1}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      pagination.page === 1 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-400 hover:text-purple-600 hover:shadow-md hover:-translate-y-0.5'
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
                        onClick={() => setSearchParams({ page: pageNum, ...(category && { category }), ...(search && { search }) })}
                        className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                          pagination.page === pageNum 
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' 
                            : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-400 hover:text-purple-600 hover:shadow-md'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                  
                  <button 
                    onClick={() => setSearchParams({ page: pagination.page + 1, ...(category && { category }), ...(search && { search }) })}
                    disabled={pagination.page === pagination.pages}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      pagination.page === pagination.pages 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-400 hover:text-purple-600 hover:shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6">
              <BookOpen size={40} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">No ApexEdge Gaming posts found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {search 
                ? `No results found for "${search}". Try a different search term.`
                : category
                ? "No articles found in this category. Try another category."
                : "No blogs available yet. Check back soon!"}
            </p>
            {(search || category) && (
              <button 
                onClick={() => setSearchParams({})}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Clear all filters
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Newsletter Section - Premium */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=80')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
            <div className="absolute top-0 -right-32 w-64 h-64 bg-white rounded-full blur-3xl opacity-10 animate-pulse-slow"></div>
            <div className="absolute bottom-0 -left-32 w-64 h-64 bg-purple-300 rounded-full blur-3xl opacity-10 animate-pulse-slower"></div>
            
            <div className="relative p-10 md:p-12 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 mb-6">
                <Mail size={16} className="text-white" />
                <span className="text-white text-sm font-semibold">Stay Updated</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">Don't Miss New Posts</h3>
              <p className="text-purple-100 text-base md:text-lg mb-8 max-w-md mx-auto">
                Get the latest articles delivered straight to your inbox. No spam, ever.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-3.5 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-300"
                />
                <button className="bg-white text-purple-600 px-8 py-3.5 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center group">
                  Subscribe Now
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="flex items-center gap-2 text-purple-200 text-xs"><CheckCircle2 size={12} /><span>Weekly digest</span></div>
                <div className="flex items-center gap-2 text-purple-200 text-xs"><CheckCircle2 size={12} /><span>Unsubscribe anytime</span></div>
                <div className="flex items-center gap-2 text-purple-200 text-xs"><CheckCircle2 size={12} /><span>Free forever</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.15); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.2); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        
        @keyframes float-delay {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(-5px); }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}