import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getBlogs, getCategories } from '../utils/api'
import BlogCard from '../components/BlogCard'
import { 
  Search, Filter, Grid3X3, List, TrendingUp, 
  BookOpen, X, ChevronLeft, ChevronRight, Mail, 
  CheckCircle2, ArrowRight, Menu
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
    window.addEventListener('scroll', handleScroll, { passive: true })
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

  // Auto-advance slider every 5 seconds for smooth cinematic transition
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
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
    <div className="min-h-screen bg-zinc-950 text-white font-sans overflow-hidden selection:bg-[#fcaf17] selection:text-black">
      
      {/* Hero Section - CINEMATIC IMMERSIVE SLIDER */}
      <div className="relative overflow-hidden h-[90vh] md:h-[100vh] w-full bg-black flex items-center justify-center transform-gpu">
        
        {/* Full Screen Image Slider Component */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          {sliderImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out will-change-transform ${
                currentSlide === index ? 'opacity-40 scale-100' : 'opacity-0 scale-110'
              }`}
              style={{ 
                backgroundImage: `url('${img}')`,
                transitionProperty: 'opacity, transform'
              }}
            />
          ))}
        </div>
        
        {/* Subtle Ambient Gradients & Grid */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-0 -right-40 w-96 h-96 bg-purple-600 rounded-full blur-[150px] opacity-20 animate-pulse-slow"></div>
          <div className="absolute bottom-0 -left-40 w-96 h-96 bg-amber-600 rounded-full blur-[150px] opacity-10 animate-pulse-slower"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-black/70"></div>
        </div>

        {/* Hero Content Overlays */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-16 animate-fade-in-up">
          <p className="text-[#fcaf17] text-xs font-black tracking-[0.4em] uppercase mb-4">
            ApexEdge Gaming Newsroom
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.95] mb-6 drop-shadow-2xl">
            Inside the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">Gaming Universe</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto font-medium leading-relaxed drop-shadow-md">
            Get exclusive patch notes, developer insights, pro strategies, and upcoming major updates drop.
          </p>
        </div>
        
        {/* Slider Navigation Dots Controls */}
        <div className="absolute inset-x-0 bottom-24 z-20 flex justify-center">
          <div className="flex gap-2.5 backdrop-blur-md bg-neutral-900/60 px-4 py-2 rounded-full border border-neutral-800 shadow-xl">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-500 ease-out cursor-pointer ${currentSlide === index ? 'bg-[#fcaf17] w-10 shadow-[0_0_10px_rgba(252,175,23,0.5)]' : 'bg-zinc-600 w-2.5 hover:bg-zinc-400'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Animated Mouse Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block z-30 opacity-60 animate-bounce">
          <div className="w-5 h-9 border-2 border-zinc-700 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-[#fcaf17] rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-30 -mt-12">
        
        {/* Search & Filters Sticky Container */}
        <div className={`bg-neutral-900/60 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-neutral-800/80 overflow-hidden mb-12 transition-all duration-300`} style={{ position: 'sticky', top: scrolled ? '85px' : '105px', zIndex: 40 }}>
          <div className="p-5sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Form */}
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 group-focus-within:text-[#fcaf17] transition-colors duration-300" size={16} />
                  <input 
                    name="search" 
                    defaultValue={search} 
                    placeholder="Search articles by title, tags or gameplay strategies..." 
                    className="w-full pl-11 pr-4 py-3.5 bg-black/40 border border-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl focus:outline-none focus:border-[#fcaf17] focus:ring-1 focus:ring-[#fcaf17]/30 transition-all duration-300 placeholder-zinc-600"
                  />
                </div>
              </form>
              
              {/* Grid / List View Toggle Switch */}
              <div className="flex items-center gap-1.5 bg-black/60 border border-neutral-800 rounded-xl p-1.5 shrink-0 self-end lg:self-auto">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-300 cursor-pointer ${viewMode === 'grid' ? 'bg-neutral-800 text-[#fcaf17] shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 cursor-pointer ${viewMode === 'list' ? 'bg-neutral-800 text-[#fcaf17] shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
            
            {/* Category Filters - Desktop Layout */}
            <div className="hidden md:block mt-5 pt-4 border-t border-neutral-800/60">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-4 bg-[#fcaf17] rounded-full"></div>
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.15em]">Browse Category</span>
                <div className="flex-1"></div>
                {category && (
                  <button 
                    onClick={() => setFilter('category', '')}
                    className="text-[10px] text-[#fcaf17] hover:text-amber-400 font-black uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    Clear Filter <X size={12} />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setFilter('category', '')} 
                  className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer ${
                    !category 
                      ? 'bg-white text-black font-black shadow-lg' 
                      : 'bg-black/50 border border-neutral-800 text-zinc-400 hover:bg-neutral-900 hover:text-white'
                  }`}
                >
                  All Hubs
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat._id} 
                    onClick={() => setFilter('category', cat._id)} 
                    className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer ${
                      category === cat._id 
                        ? 'text-white shadow-lg shadow-black/40' 
                        : 'bg-black/50 border border-neutral-800 text-zinc-400 hover:bg-neutral-900 hover:text-white'
                    }`}
                    style={category === cat._id ? { backgroundColor: cat.color || '#fcaf17', color: '#000000' } : {}}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Adaptive Dropdown Trigger */}
            <div className="md:hidden mt-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-black/40 border border-neutral-800 rounded-xl text-xs font-black uppercase tracking-wider text-zinc-300"
              >
                <span className="flex items-center gap-2">
                  <Filter size={14} className="text-[#fcaf17]" />
                  Categories Filters
                  {category && <span className="w-2 h-2 bg-[#fcaf17] rounded-full animate-pulse"></span>}
                </span>
                <span>{mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}</span>
              </button>
              
              {mobileMenuOpen && (
                <div className="mt-3 p-4 bg-neutral-950 border border-neutral-800 rounded-xl animate-fade-in-up">
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setFilter('category', '')} 
                      className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                        !category ? 'bg-white text-black' : 'bg-neutral-900 text-zinc-400 border border-neutral-800'
                      }`}
                    >
                      All Hubs
                    </button>
                    {categories.map(cat => (
                      <button 
                        key={cat._id} 
                        onClick={() => setFilter('category', cat._id)} 
                        className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                          category === cat._id ? 'text-black font-black' : 'bg-neutral-900 text-zinc-400 border border-neutral-800'
                        }`}
                        style={category === cat._id ? { backgroundColor: cat.color || '#fcaf17' } : {}}
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

        {/* Results Metadata Dashboard Info Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8 px-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-center">
              <TrendingUp size={15} className="text-[#fcaf17]" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-zinc-300">{blogs.length} Articles Unlocked</span>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">Page {pagination.page} / {pagination.pages || 1}</p>
            </div>
          </div>
          {search && (
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-full animate-fade-in-up">
              <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500">Query Target:</span>
              <span className="text-xs font-bold text-[#fcaf17]">"{search}"</span>
              <button 
                onClick={() => setSearchParams({})}
                className="text-zinc-500 hover:text-zinc-300 ml-1 text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Main Content Grid State Logic */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-neutral-900/40 border border-neutral-800/60 rounded-2xl overflow-hidden shadow-2xl animate-pulse">
                <div className="aspect-video bg-neutral-800" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-neutral-800 rounded w-3/4" />
                  <div className="h-4 bg-neutral-800 rounded w-1/2" />
                  <div className="h-12 bg-neutral-800 rounded" />
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
                >
                  <BlogCard blog={blog} viewMode={viewMode} />
                </div>
              ))}
            </div>

            {/* Premium Center-Aligned Pagination System */}
            {pagination.pages > 1 && (
              <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-900">
                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-lg">
                  Displaying {pagination.page} of {pagination.pages} Nodes
                </div>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => setSearchParams({ page: pagination.page - 1, ...(category && { category }), ...(search && { search }) })}
                    disabled={pagination.page === 1}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 border cursor-pointer ${
                      pagination.page === 1 
                        ? 'bg-neutral-900 text-zinc-700 border-neutral-800/60 cursor-not-allowed' 
                        : 'bg-neutral-900 text-zinc-300 border-neutral-800 hover:border-[#fcaf17] hover:text-[#fcaf17] transform hover:-translate-y-0.5'
                    }`}
                  >
                    <ChevronLeft size={16} />
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
                        className={`w-10 h-10 rounded-lg text-xs font-black transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer ${
                          pagination.page === pageNum 
                            ? 'bg-white text-black font-black shadow-lg shadow-white/5' 
                            : 'bg-neutral-900 text-zinc-400 border border-neutral-800 hover:border-[#fcaf17] hover:text-white'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                  
                  <button 
                    onClick={() => setSearchParams({ page: pagination.page + 1, ...(category && { category }), ...(search && { search }) })}
                    disabled={pagination.page === pagination.pages}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 border cursor-pointer ${
                      pagination.page === pagination.pages 
                        ? 'bg-neutral-900 text-zinc-700 border-neutral-800/60 cursor-not-allowed' 
                        : 'bg-neutral-900 text-zinc-300 border-neutral-800 hover:border-[#fcaf17] hover:text-[#fcaf17] transform hover:-translate-y-0.5'
                    }`}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Empty Search Fallback State Layout */
          <div className="text-center py-20 bg-[#0a0a0a] border border-neutral-900 rounded-3xl shadow-2xl animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-neutral-900/50 border border-neutral-800 rounded-full mb-6 shadow-inner">
              <BookOpen size={32} className="text-zinc-600" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-wide text-zinc-200 mb-2">No Intel Post Feed Found</h3>
            <p className="text-zinc-500 max-w-sm mx-auto text-xs font-medium leading-relaxed px-4">
              {search 
                ? `We couldn't find matches for "${search}". Verify spelling parameters or scan another hub.`
                : "This segment is currently clear. Re-route filter parameters to inspect alternative sectors."}
            </p>
            {(search || category) && (
              <button 
                onClick={() => setSearchParams({})}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#fcaf17] transition-all duration-300 cursor-pointer shadow-md"
              >
                Reset System Feed
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Newsletter Broadcast Section Overlay Segment */}
      <section className="bg-black py-16 mt-12 border-t border-neutral-950 transform-gpu">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#0d0d0d] border border-neutral-900 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            
            {/* Visual background image connection lock */}
            <div 
              className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-15 pointer-events-none scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url('/blog.png')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <div className="absolute top-0 -right-32 w-72 h-72 bg-[#fcaf17] rounded-full blur-[120px] opacity-10 animate-pulse" style={{ animationDuration: '6s' }}></div>
            <div className="absolute bottom-0 -left-32 w-72 h-72 bg-amber-600 rounded-full blur-[120px] opacity-5 animate-pulse" style={{ animationDuration: '9s' }}></div>
            
            <div className="relative p-8 sm:p-12 md:p-16 text-center z-10">
              <div className="inline-flex items-center gap-2 bg-neutral-900/80 border border-neutral-800 rounded-full px-5 py-2 mb-6 shadow-inner">
                <Mail size={14} className="text-[#fcaf17]" />
                <span className="text-zinc-300 text-[10px] font-black uppercase tracking-[0.2em]">Stay Updated</span>
              </div>
              
              <h3 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight max-w-2xl mx-auto leading-none">
                Don't Miss New Content Drop
              </h3>
              
              <p className="text-zinc-400 text-xs sm:text-sm md:text-base mb-8 max-w-md mx-auto font-medium leading-relaxed">
                Get the latest updates, patch notes, and exclusive insights delivered straight to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-3.5 rounded-xl text-white bg-black/60 border border-neutral-800 focus:outline-none focus:border-[#fcaf17] focus:ring-1 focus:ring-[#fcaf17]/40 outline-none placeholder-zinc-600 text-xs font-bold uppercase tracking-wider backdrop-blur-xs transition-all duration-300"
                />
                <button className="bg-[#fcaf17] hover:bg-amber-400 text-black px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 transform-gpu hover:-translate-y-0.5 active:translate-y-0 active:scale-98 flex items-center gap-2 justify-center group cursor-pointer shadow-lg shadow-amber-500/10">
                  Subscribe Now
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-8 pt-2 border-t border-neutral-900/60 max-w-lg mx-auto">
                <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-wider">
                  <CheckCircle2 size={12} className="text-[#fcaf17]" />
                  <span>Weekly digest</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-wider">
                  <CheckCircle2 size={12} className="text-[#fcaf17]" />
                  <span>Unsubscribe anytime</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-wider">
                  <CheckCircle2 size={12} className="text-[#fcaf17]" />
                  <span>Free forever</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Keyframe Styles CSS Layers Container */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.22; transform: scale(1.05); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.10; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.08); }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(8px); opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 9s ease-in-out infinite;
        }
        .animate-scroll {
          animation: scroll 1.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}