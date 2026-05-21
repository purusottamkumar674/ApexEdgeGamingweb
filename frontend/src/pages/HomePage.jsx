import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getBlogs, getFeaturedBlogs } from '../utils/api'
import { format, formatDistanceToNow } from 'date-fns'
import { 
  ArrowRight, TrendingUp, Sparkles, Zap, Award, 
  Users, BookOpen, Clock, ChevronRight, Flame, 
  Compass, Heart, Eye, Crown, Rocket, Target, 
  CheckCircle2, Play, Mail, Shield, Star,
  BadgeCheck, MoveRight, Image as ImageIcon, X
} from 'lucide-react'

export default function HomePage() {
  const [blogs, setBlogs] = useState([])
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCookieConsent, setShowCookieConsent] = useState(true)
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  const apiOrigin = (import.meta.env.VITE_API_URL || 'https://apexedgegamingweb.onrender.com/api').replace(/\/api\/?$/, '')

  const resolveCoverUrl = useCallback((url) => {
    if (!url) return ''
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    if (url.startsWith('/')) return `${apiOrigin}${url}`
    return `${apiOrigin}/${url}`
  }, [apiOrigin])

  // Optimized LazyImage component with memo
  const LazyImage = useCallback(({ src, alt, className }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isError, setIsError] = useState(false)
    const imageUrl = resolveCoverUrl(src)
    const imgRef = useRef(null)

    useEffect(() => {
      if (!imageUrl) return
      
      setIsLoaded(false)
      setIsError(false)
      
      const img = new Image()
      
      img.onload = () => {
        setIsLoaded(true)
      }
      
      img.onerror = () => {
        setIsError(true)
        console.error('Failed to load image:', imageUrl)
      }
      
      img.src = imageUrl
      
      return () => {
        img.onload = null
        img.onerror = null
      }
    }, [imageUrl])

    return (
      <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        {!isLoaded && !isError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {isError && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
            <ImageIcon size={32} className="text-slate-400" />
          </div>
        )}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={alt || 'Image'}
            className={`${className} w-full h-full object-cover transition-all duration-500 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsError(true)}
          />
        )}
      </div>
    )
  }, [resolveCoverUrl])

  // Interactive Hero Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setMousePosition({ x, y })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Black Friday Sale Countdown
  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 3)
    targetDate.setHours(23, 59, 59, 999)

    const interval = setInterval(() => {
      const difference = targetDate - new Date()
      if (difference <= 0) {
        clearInterval(interval)
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setCountdown({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Newsletter Trigger
  useEffect(() => {
    const timer = setTimeout(() => { setShowNewsletterPopup(true) }, 8000)
    return () => clearTimeout(timer)
  }, [])

  // Fetch API Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, featuredRes] = await Promise.all([
          getBlogs({ limit: 6, page: 1 }),
          getFeaturedBlogs()
        ])
        setBlogs(blogsRes.data.blogs || [])
        setFeatured(featuredRes.data.blogs || [])
      } catch (err) {
        console.error("Error fetching homepage data:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const heroPost = featured[0] || blogs[0]
  const recentPosts = blogs.slice(0, 6)
  const liveActivities = blogs.slice(0, 4).map((blog) => ({
    user: blog.author?.name || 'Author',
    action: 'published',
    article: blog.title,
    slug: blog.slug,
    time: formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true }),
    avatar: blog.author?.avatar,
  }))

  // Static Data Packages
  const stats = [
    { label: 'Active Readers', value: '50K+', icon: <Users size={20} />, color: 'from-violet-500 to-purple-600', trend: '+23%' },
    { label: 'Articles Published', value: '1,200+', icon: <BookOpen size={20} />, color: 'from-emerald-400 to-teal-600', trend: '+45' },
    { label: 'Expert Writers', value: '150+', icon: <Award size={20} />, color: 'from-amber-400 to-orange-500', trend: '+12' },
    { label: 'Daily Readers', value: '10K+', icon: <Eye size={20} />, color: 'from-rose-400 to-pink-600', trend: '+18%' },
  ]

  const categories = [
    { name: 'Technology', icon: '💻', count: 234, description: 'Latest tech trends' },
    { name: 'Lifestyle', icon: '🌿', count: 156, description: 'Wellness & living' },
    { name: 'Design', icon: '🎨', count: 98, description: 'Creative inspiration' },
    { name: 'Business', icon: '📊', count: 87, description: 'Entrepreneurship' },
    { name: 'Marketing', icon: '📈', count: 76, description: 'Growth strategies' },
  ]

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Senior Content Strategist', text: "The quality of content here is absolutely phenomenal. I've learned more in 3 months than 3 years elsewhere.", avatar: 'https://randomuser.me/api/portraits/women/1.jpg', company: 'Google' },
    { name: 'Michael Chen', role: 'Lead Developer', text: 'Best platform for discovering insightful articles. The community is incredibly supportive and knowledgeable.', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', company: 'Microsoft' },
    { name: 'Emma Davis', role: 'UX Director', text: "Love the community and the amazing content shared every day. It's become my daily go-to for inspiration.", avatar: 'https://randomuser.me/api/portraits/women/3.jpg', company: 'Apple' },
  ]

  const trendingTopics = [
    { name: 'Artificial Intelligence', posts: 234, trend: '+45%', icon: '🤖' },
    { name: 'Web Development', posts: 189, trend: '+32%', icon: '🌐' },
    { name: 'UI/UX Design', posts: 156, trend: '+28%', icon: '🎨' },
    { name: 'Startup Culture', posts: 98, trend: '+67%', icon: '🚀' },
    { name: 'Digital Marketing', posts: 76, trend: '+41%', icon: '📢' },
  ]

  const featuredBrands = [
    { name: 'Microsoft', logo: 'https://cdn-icons-png.flaticon.com/512/732/732221.png' },
    { name: 'Google', logo: 'https://cdn-icons-png.flaticon.com/512/732/732222.png' },
    { name: 'Amazon', logo: 'https://cdn-icons-png.flaticon.com/512/732/732224.png' },
    { name: 'Apple', logo: 'https://cdn-icons-png.flaticon.com/512/732/732233.png' },
    { name: 'Meta', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png' },
    { name: 'Netflix', logo: 'https://cdn-icons-png.flaticon.com/512/5977/5977590.png' },
  ]

  return (
    <div className="min-h-screen bg-white text-slate-900 select-none antialiased selection:bg-violet-500/10 selection:text-violet-900 font-sans">
      
      {/* Dynamic Keyframe Injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .mono-font { font-family: 'JetBrains Mono', monospace; }
        
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
        
        @keyframes float-slow { 0%, 100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-20px) scale(1.05); } }
        .animate-float { animation: float-slow 8s ease-in-out infinite; }
        
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
        
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .animate-pulse { animation: pulse 1.5s ease-in-out infinite; }
        
        .shimmer-text {
          background: linear-gradient(90deg, #7c3aed, #db2777, #10b981, #7c3aed);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-anim 6s linear infinite;
        }
        
        @keyframes shimmer-anim { 0% { background-position: 0% center; } 100% { background-position: 300% center; } }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .animate-bounce { animation: bounce 1s ease-in-out infinite; }
      `}</style>

      {/* ─── ANNOUNCEMENT BAR ─── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-700 via-pink-600 to-orange-600 text-white shadow-md">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 p-1 rounded-full text-xs animate-bounce">🔥</span>
            <p className="text-xs sm:text-sm font-bold tracking-wide">BLACK FRIDAY SALE — Up to 70% off + Elite Rewards</p>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex gap-1.5">
              {[['D', countdown.days], ['H', countdown.hours], ['M', countdown.minutes], ['S', countdown.seconds]].map(([label, val]) => (
                <div key={label} className="bg-white/15 border border-white/20 rounded-md px-2 py-0.5 min-w-[36px] text-center backdrop-blur-sm">
                  <div className="text-xs font-bold mono-font leading-tight">{String(val).padStart(2, '0')}</div>
                  <div className="text-[8px] tracking-wider opacity-70 font-semibold">{label}</div>
                </div>
              ))}
            </div>
            <button className="bg-white text-violet-700 hover:bg-violet-50 transition-all shadow-lg text-[11px] font-extrabold px-3.5 py-1.5 rounded-full tracking-wider transform hover:-translate-y-0.5 active:scale-95">
              CLAIM OFFER →
            </button>
          </div>
        </div>
      </div>

      {/* ─── HERO SECTION ─── */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-50/50 border-b border-slate-200/60 py-12 lg:py-0">
        {/* Interactive Smooth Blur Background Orbs */}
        <div className="absolute rounded-full pointer-events-none filter blur-[100px] transition-all duration-300 ease-out opacity-20 bg-gradient-to-br from-violet-600 to-indigo-600"
          style={{ width: '600px', height: '600px', left: `${mousePosition.x * 0.2 - 10}%`, top: `${mousePosition.y * 0.2 - 10}%` }} />
        <div className="absolute right-[-5%] bottom-[10%] w-[450px] h-[450px] rounded-full pointer-events-none filter blur-[120px] opacity-15 bg-pink-500 animate-float" />

        <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Content Left */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-3.5 py-1.5 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-700 text-xs font-bold tracking-wider uppercase">50,000+ Active Explorers</span>
              </div>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                ApexEdge <br />
                <span className="shimmer-text">Gaming Ecosystem</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Unlock top-tier strategies, developer updates, and immersive gaming tech stories. Managed and verified by global expert enthusiasts.
              </p>

              <div className="flex flex-wrap gap-3.5 justify-center lg:justify-start w-full sm:w-auto">
                <Link to="/blog" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold px-7 py-3.5 rounded-2xl shadow-xl shadow-violet-600/20 hover:shadow-violet-600/30 transition-all transform hover:-translate-y-0.5 active:scale-95">
                  Start Learning <MoveRight size={18} />
                </Link>
                <Link to="/about" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-medium px-6 py-3.5 rounded-2xl shadow-sm hover:bg-slate-50 transition-all hover:border-slate-300">
                  <Play size={16} className="text-violet-600 fill-violet-600" /> Watch Dashboard Tour
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-200/80 w-full justify-center lg:justify-start">
                <div className="flex -space-x-2.5">
                  {[1, 2, 3, 4].map((i) => (
                    <img key={i} className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 5}.jpg`} alt="User avatar" />
                  ))}
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-lg font-bold text-slate-950 flex items-center justify-center sm:justify-start gap-1">
                    <span>2,500+ Joining Weekly</span>
                    <div className="flex text-amber-400 ml-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-current" />)}
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 font-medium tracking-wide">Rated 4.9/5 by industry content engineers</div>
                </div>
              </div>
            </div>

            {/* Hero Main Card Right */}
            <div className="lg:col-span-5 w-full relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-600 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-25 transition-opacity duration-500" />
              <Link to={heroPost ? `/blog/${heroPost.slug}` : '/blog'} className="block relative bg-white border border-slate-200/80 rounded-[2rem] p-3 shadow-xl overflow-hidden hover:border-slate-300 transition-all duration-300 transform group-hover:scale-[1.01]">
                <div className="relative rounded-[1.6rem] overflow-hidden aspect-[4/3] sm:aspect-[16/10] lg:aspect-square xl:aspect-[4/3]">
                  <LazyImage
                    src={heroPost?.coverImage}
                    alt={heroPost?.title || 'Featured article'}
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    <span className="bg-violet-600 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">{heroPost?.category?.name || 'Featured'}</span>
                    <span className="bg-white/10 backdrop-blur-md text-amber-300 border border-white/10 font-bold text-[10px] px-3 py-1 rounded-full shadow-md flex items-center gap-1">👑 Editor's Choice</span>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-6 text-white z-10">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight line-clamp-2 mb-3 group-hover:text-violet-200 transition-colors">{heroPost?.title || 'Discover Top Gaming Insights'}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-300">
                      <img src={heroPost?.author?.avatar || 'https://randomuser.me/api/portraits/men/10.jpg'} alt="" className="w-7 h-7 rounded-full border border-white/20" />
                      <span className="font-medium text-white">{heroPost?.author?.name || 'ApexEdge Team'}</span>
                      {heroPost && (
                        <>
                          <span>•</span>
                          <span>{format(new Date(heroPost.createdAt), 'MMM d, yyyy')}</span>
                          <span>•</span>
                          <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] tracking-wide">{heroPost.readTime} Min Read</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ─── BRANDS LOGO SCROLLER ─── */}
      <div className="border-b border-slate-200/80 bg-slate-50/40 py-5 overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...featuredBrands, ...featuredBrands, ...featuredBrands].map((brand, idx) => (
            <div key={idx} className="inline-flex items-center gap-3 mx-8 opacity-40 hover:opacity-90 transition-opacity cursor-pointer group">
              <div className="w-8 h-8 bg-slate-900 rounded-lg p-1.5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain invert brightness-0" />
              </div>
              <span className="text-slate-800 font-bold tracking-wider text-sm group-hover:text-violet-600 transition-colors">{brand.name.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── LIVE METRICS & STREAM SECTION ─── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => (
            <div key={idx} className="group relative bg-white border border-slate-200/70 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-slate-300">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500 mt-1">{stat.label}</div>
              <div className="inline-flex items-center gap-1 mt-3 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5 text-[11px] font-bold text-emerald-600">
                <TrendingUp size={12} /> {stat.trend} <span className="opacity-60 font-normal">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Community Activity Board */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mt-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-violet-700">Live Infrastructure Activities</h4>
            </div>
            <span className="text-xs text-slate-400 tracking-wide font-medium mono-font">Refreshed real-time</span>
          </div>
          <div className="flex flex-col gap-2">
            {!loading && liveActivities.length > 0 ? liveActivities.map((act, idx) => (
              <Link key={idx} to={`/blog/${act.slug}`} className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors gap-2 group">
                <div className="flex items-center gap-3">
                  {act.avatar ? (
                    <img src={act.avatar} alt="" className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-violet-200 transition-all" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold ring-2 ring-slate-100">{act.user?.[0]}</div>
                  )}
                  <p className="text-sm text-slate-600">
                    <strong className="text-slate-900 font-semibold">{act.user}</strong> <span className="text-slate-400 font-medium">{act.action}</span> <span className="text-violet-600 font-medium">"{act.article}"</span>
                  </p>
                </div>
                <span className="text-xs text-slate-400 self-end sm:self-auto mono-font">{act.time}</span>
              </Link>
            )) : (
              <p className="text-sm text-slate-400 text-center py-4">No recent activity yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* ─── FRESH BLOGS GRID ─── */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-violet-50 border border-violet-100 rounded-full px-3 py-1 text-xs font-bold text-violet-700 mb-2">
              <Zap size={12} className="fill-current" /> LATEST INSIGHTS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">Fresh Production Matrix</h2>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-100 border border-slate-200/60 hover:bg-slate-200/60 text-slate-800 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap hover:gap-2">
            Browse Archive <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-[16/10] bg-slate-200" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-slate-200 rounded w-1/3" />
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((blog) => (
              <article key={blog._id} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-slate-300">
                <Link to={`/blog/${blog.slug}`} className="block relative aspect-[16/10] overflow-hidden cursor-pointer">
                  <LazyImage
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full"
                  />
                  {blog.category?.name && (
                    <div className="absolute top-3 left-3 z-10 pointer-events-none">
                      <span className="bg-violet-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">{blog.category.name}</span>
                    </div>
                  )}
                </Link>
                <div className="p-5">
                  <Link to={`/blog/${blog.slug}`} className="block">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <span>{format(new Date(blog.createdAt), 'MMM d, yyyy')}</span>
                      {blog.readTime && (
                        <>
                          <span>•</span>
                          <span>{blog.readTime} min read</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-violet-600 transition-colors">{blog.title}</h3>
                    {blog.excerpt && (
                      <p className="text-sm text-slate-500 line-clamp-2">{blog.excerpt}</p>
                    )}
                  </Link>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                    {blog.author?.name && (
                      <div className="flex items-center gap-2">
                        {blog.author?.avatar && (
                          <img src={blog.author.avatar} className="w-6 h-6 rounded-full object-cover" alt="" />
                        )}
                        <span className="text-xs font-medium text-slate-700">{blog.author.name}</span>
                      </div>
                    )}
                    {blog.views > 0 && (
                      <div className="flex items-center gap-1 text-slate-400">
                        <Eye size={14} />
                        <span className="text-xs">{blog.views}</span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 border border-slate-200 rounded-2xl">
            <BookOpen size={40} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 font-medium">No system articles found. Re-indexing soon!</p>
          </div>
        )}

        {recentPosts.length > 0 && (
          <div className="text-center mt-12">
            <Link to="/blog" className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95">
              Load More Articles <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </section>

      {/* ─── SYSTEM CATEGORIES ─── */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1 bg-pink-50 border border-pink-100 rounded-full px-3 py-1 text-xs font-bold text-pink-700 mb-2">
              <Compass size={12} /> TAXONOMY CHANNELS
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">Segmented Categorization</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat, idx) => (
              <Link key={cat.name} to={`/category/${cat.name.toLowerCase()}`} className="group bg-white border border-slate-200/70 p-6 rounded-2xl text-center shadow-sm hover:shadow-xl hover:border-violet-300 transition-all duration-300 transform hover:-translate-y-1.5">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">{cat.icon}</div>
                <h4 className="text-slate-900 font-bold text-base tracking-tight">{cat.name}</h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">{cat.description}</p>
                <span className="inline-block text-[10px] font-extrabold text-violet-600 bg-violet-50 border border-violet-100 rounded-full px-2.5 py-0.5 mt-4 group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600 transition-all duration-300">
                  {cat.count} Papers
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRENDING AND SIGNUP ARCHITECTURE ─── */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Trending Panel Left */}
          <div className="lg:col-span-7 w-full">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-red-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Flame size={18} className="fill-current" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">Trending Discussions</h3>
                <p className="text-xs text-slate-400 font-medium">Most indexed concepts today</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {trendingTopics.map((topic, idx) => (
                <Link key={idx} to={`/topic/${topic.name.toLowerCase()}`} className="group flex items-center justify-between p-4 bg-white border border-slate-200/70 rounded-xl shadow-sm hover:shadow-md hover:border-violet-300 transition-all duration-300 hover:-translate-x-1">
                  <div className="flex items-center gap-4">
                    <span className="mono-font text-xs font-bold text-slate-300 group-hover:text-violet-500 transition-colors w-6">0{idx + 1}</span>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">{topic.icon}</div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-950 group-hover:text-violet-600 transition-colors">{topic.name}</h5>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400 font-medium">
                        <span>{topic.posts} articles</span>
                        <span>•</span>
                        <span className="text-emerald-600 font-bold">↑ {topic.trend}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 group-hover:text-violet-600 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Premium Sign-up Sidebar Right */}
          <div className="lg:col-span-5 w-full lg:sticky lg:top-8">
            <div className="relative bg-white border border-slate-200 rounded-3xl p-6 shadow-xl overflow-hidden hover:shadow-2xl transition-all">
              <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full filter blur-3xl opacity-10 bg-violet-600" />
              <div className="absolute -left-12 -bottom-12 w-44 h-44 rounded-full filter blur-3xl opacity-10 bg-pink-600" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 text-white flex items-center justify-center shadow-lg shadow-violet-600/10">
                    <Target size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-950">Sync Collective Intel</h4>
                    <p className="text-xs font-bold text-emerald-600">1,200+ Nodes Interactive</p>
                  </div>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                  Join our premium open network cluster. Write papers, get algorithmic code optimization reviews, and receive peer feedbacks instantly.
                </p>

                {/* Progress Tracker */}
                <div className="mb-6 bg-slate-50 border border-slate-100 p-3.5 rounded-xl">
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-500">Core Network Cap</span>
                    <span className="text-violet-600 font-mono">78% Indexed</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-600 to-pink-600 rounded-full transition-all duration-1000" style={{ width: '78%' }} />
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:opacity-95 transition-all text-white text-xs font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-violet-600/15 tracking-wide uppercase hover:scale-[1.02] active:scale-95">
                  Establish Free Authorization →
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── NEWSLETTER SUBSCRIPTION CTA ─── */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white border border-slate-800 p-8 sm:p-12 lg:p-16 text-center shadow-2xl">
          <div className="absolute inset-0 bg-cover bg-center opacity-5 mix-blend-overlay" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=80)' }} />
          <div className="absolute right-[-10%] top-[-20%] w-[400px] h-[400px] bg-violet-600/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute left-[-5%] bottom-[-20%] w-[300px] h-[300px] bg-pink-600/20 rounded-full blur-[80px] animate-pulse delay-1000" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full px-3 py-1 text-[11px] font-bold tracking-widest uppercase text-pink-300">
              <Rocket size={12} /> ENTERPRISE CHANNEL
            </div>
            <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">Subscribe to Premium Pipeline</h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-md leading-relaxed">
              Get highly classified weekly insights, tech optimization logs, and priority community updates directly inside your inbox.
            </p>

            <form onSubmit={e => e.preventDefault()} className="w-full max-w-md flex flex-col sm:flex-row gap-2 mt-4">
              <input type="email" placeholder="Secure email vector address" className="bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 w-full placeholder:text-slate-500 font-medium transition-all" />
              <button className="bg-white text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-slate-100 transition-all whitespace-nowrap shadow-md hover:shadow-xl hover:scale-105 active:scale-95">
                Subscribe Vector
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 text-xs text-slate-400 font-medium">
              {['Zero Spam Policy', 'Revoke Anytime', '100% Free Ecosystem'].map(text => (
                <div key={text} className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-emerald-500" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ARCHITECTURE ─── */}
      <section className="bg-gradient-to-b from-slate-50 to-white border-t border-slate-200/80 py-20 px-4 relative overflow-hidden">
        <div className="absolute left-[-5%] top-[10%] w-96 h-96 bg-violet-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-[-5%] bottom-[10%] w-96 h-96 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 bg-pink-50 border border-pink-100 rounded-full px-3 py-1 text-xs font-bold text-pink-700 mb-2">
              <Heart size={12} className="fill-current" /> GLOBAL ECOSYSTEM REVIEWS
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">Peer Validation Metrics</h2>
            <p className="text-slate-500 mt-2">Trusted by industry leaders worldwide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-2xl shadow-md relative group hover:shadow-xl hover:border-slate-300 transition-all duration-300 hover:-translate-y-1">
                <span className="text-6xl text-slate-100 font-serif absolute top-4 right-6 pointer-events-none select-none group-hover:text-violet-100 transition-colors">“</span>
                <div className="flex text-amber-400 gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-current" />)}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed italic mb-6 relative z-10">"{t.text}"</p>
                
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-violet-200 transition-all" />
                  <div>
                    <h5 className="text-sm font-bold text-slate-950 flex items-center gap-1">
                      {t.name} <BadgeCheck size={14} className="text-blue-500 fill-blue-500/10" />
                    </h5>
                    <p className="text-xs font-semibold text-violet-600 mt-0.5">{t.role} <span className="text-slate-400 font-normal">at {t.company}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MODAL: INTERACTIVE NEWSLETTER POPUP ─── */}
      {showNewsletterPopup && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4 animate-fade-in">
          <div className="bg-white border border-slate-100 rounded-[2rem] max-w-md w-full p-6 sm:p-8 relative shadow-2xl transform scale-100 transition-transform animate-fade-in">
            <button onClick={() => setShowNewsletterPopup(false)} className="absolute top-4 right-4 w-7 h-7 bg-slate-100 hover:bg-slate-200 border border-slate-200/60 rounded-full text-slate-500 hover:text-slate-800 flex items-center justify-center font-bold text-xs transition-all hover:scale-110">
              <X size={14} />
            </button>
            
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-600 text-white flex items-center justify-center mx-auto mb-4 shadow-xl shadow-violet-600/20">
              <Mail size={24} />
            </div>

            <h4 className="text-xl font-black text-slate-950 text-center tracking-tight">Transmission Awaiting Sync</h4>
            <p className="text-xs text-slate-400 text-center mt-1 max-w-xs mx-auto leading-relaxed">
              Don't default out from the elite loop. Pull fresh verified gaming tech matrices directly into your node terminal.
            </p>

            <div className="mt-5 flex gap-2">
              <input type="email" placeholder="Your vector email address" className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 w-full placeholder:text-slate-400 font-medium transition-all" />
              <button onClick={() => setShowNewsletterPopup(false)} className="bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:from-violet-600 hover:to-pink-600 transition-all whitespace-nowrap shadow-md hover:shadow-lg">
                Initialize
              </button>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-4 font-medium">Join 50,000+ engineers worldwide. Immutable data architecture.</p>
          </div>
        </div>
      )}

      {/* ─── COOKIE AUTHORIZATION BAR ─── */}
      {showCookieConsent && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto max-w-sm bg-white/95 backdrop-blur-xl border border-slate-200/80 p-4 rounded-2xl shadow-2xl z-[999] flex flex-col gap-3 animate-fade-in">
          <div className="flex items-start gap-2.5">
            <Shield size={16} className="text-violet-600 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-500 leading-normal font-medium">
              We leverage analytical session caching vectors to streamline operational indexing. Read our secure <Link to="/privacy" className="text-violet-600 font-bold hover:underline">Privacy Manifest</Link>.
            </p>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setShowCookieConsent(false)} className="px-3 py-1.5 text-[11px] font-bold text-slate-500 hover:text-slate-800 transition-colors hover:bg-slate-100 rounded-lg">
              Config
            </button>
            <button onClick={() => setShowCookieConsent(false)} className="bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold text-[11px] px-3.5 py-1.5 rounded-xl hover:from-violet-600 hover:to-pink-600 transition-all shadow-sm hover:shadow-md">
              Accept Integrity
            </button>
          </div>
        </div>
      )}

    </div>
  )
}