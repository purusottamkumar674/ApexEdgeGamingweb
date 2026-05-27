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
  const [currentSlide, setCurrentSlide] = useState(0)

  // Array of images for the background header slider
  const sliderImages = [
    "blog2.png",
    "blog1.png"
  ];

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

  // Auto-advance slider every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      
      {/* Hero Section - STRICT 90% SCREEN HEIGHT (90vh) */}
      <div className="relative overflow-hidden h-[110vh] w-full bg-slate-900">
        
        {/* Full Screen Image Layer - Extended perfectly till the very bottom edge of wave line */}
        <div className="absolute inset-0 w-full h-full bottom-0 z-0">
          {sliderImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              } transition-transform duration-[4000ms]`}
              style={{ 
                backgroundImage: `url('${img}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
              }}
            />
          ))}
        </div>
        
        {/* Subtle dynamic background highlights overlay */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-0 -right-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
          <div className="absolute bottom-0 -left-40 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse-slower"></div>
          
          {/* Transparent Grid Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-100"></div>
        </div>
        
        {/* UI Controls Layer - Slider dots */}
        <div className="absolute inset-x-0 bottom-0 z-20 pb-28 flex flex-col items-center justify-end h-full bg-gradient-to-t from-black/30 via-transparent to-transparent">
          
          {/* Big & Bold Slider Indicators */}
          <div className="flex gap-3 backdrop-blur-md bg-black/10 px-4 py-2 rounded-full border border-white/10 shadow-lg">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-12 shadow-lg' : 'bg-white/30 hover:bg-white/60'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Scroll Indicator positioned accurately inside 90vh bounds */}
        <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block z-30">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/80 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
        
        {/* Smooth Transition Wave Divider Line */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto min-h-[40px]">
            <path fill="#f8fafc" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

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
          0%, 100% { opacity: 0.10; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.05); }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.10; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.08); }
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 7s ease-in-out infinite;
        }
        
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
        
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}