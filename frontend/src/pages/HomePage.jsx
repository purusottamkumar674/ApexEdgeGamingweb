import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getBlogs, getFeaturedBlogs } from '../utils/api'
import BlogCard from '../components/BlogCard'
import { format } from 'date-fns'
import { 
  ArrowRight, TrendingUp, Sparkles, Zap, Award, 
  Users, BookOpen, Clock, ChevronRight, Flame, 
  Compass, Heart, Eye, Crown, Rocket, Target, 
  CheckCircle2, Play, Gift, Mail, Shield, Star,
  Calendar, MessageCircle, Share2, ThumbsUp,
  Coffee, Globe, Menu, X, ChevronDown, MoveRight,
  Quote, BadgeCheck, Infinity, Layers, BarChart3,
  Grid3X3, List, Filter, Download, Bell, Wallet
} from 'lucide-react'

export default function HomePage() {
  const [blogs, setBlogs] = useState([])
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCookieConsent, setShowCookieConsent] = useState(true)
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState('featured')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

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

  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 3)
    targetDate.setHours(23, 59, 59, 999)
    const interval = setInterval(() => {
      const now = new Date()
      const difference = targetDate - now
      if (difference <= 0) {
        clearInterval(interval)
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)
      setCountdown({ days, hours, minutes, seconds })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => { setShowNewsletterPopup(true) }, 8000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 50) }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, featuredRes] = await Promise.all([
          getBlogs({ limit: 6, page: 1 }),
          getFeaturedBlogs()
        ])
        setBlogs(blogsRes.data.blogs)
        setFeatured(featuredRes.data.blogs)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const heroPost = featured[0] || blogs[0]
  const recentPosts = blogs.slice(0, 6)

  const stats = [
    { label: 'Active Readers', value: '50K+', icon: <Users size={22} />, color: 'from-violet-500 to-purple-600', trend: '+23%', bg: 'bg-violet-50' },
    { label: 'Articles Published', value: '1,200+', icon: <BookOpen size={22} />, color: 'from-emerald-400 to-teal-600', trend: '+45', bg: 'bg-emerald-50' },
    { label: 'Expert Writers', value: '150+', icon: <Award size={22} />, color: 'from-amber-400 to-orange-500', trend: '+12', bg: 'bg-amber-50' },
    { label: 'Daily Readers', value: '10K+', icon: <Eye size={22} />, color: 'from-rose-400 to-pink-600', trend: '+18%', bg: 'bg-rose-50' },
  ]

  const categories = [
    { name: 'Technology', icon: '💻', color: 'from-violet-500 to-indigo-600', count: 234, description: 'Latest tech trends' },
    { name: 'Lifestyle', icon: '🌿', color: 'from-emerald-400 to-teal-500', count: 156, description: 'Wellness & living' },
    { name: 'Design', icon: '🎨', color: 'from-pink-400 to-rose-500', count: 98, description: 'Creative inspiration' },
    { name: 'Business', icon: '📊', color: 'from-amber-400 to-orange-500', count: 87, description: 'Entrepreneurship' },
    { name: 'Marketing', icon: '📈', color: 'from-cyan-400 to-blue-500', count: 76, description: 'Growth strategies' },
  ]

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Senior Content Strategist', text: 'The quality of content here is absolutely phenomenal. I\'ve learned more in 3 months than 3 years elsewhere.', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/1.jpg', date: '2 days ago', company: 'Google' },
    { name: 'Michael Chen', role: 'Lead Developer', text: 'Best platform for discovering insightful articles. The community is incredibly supportive and knowledgeable.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/2.jpg', date: '5 days ago', company: 'Microsoft' },
    { name: 'Emma Davis', role: 'UX Director', text: 'Love the community and the amazing content shared every day. It\'s become my daily go-to for inspiration.', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/3.jpg', date: '1 week ago', company: 'Apple' },
  ]

  const trendingTopics = [
    { name: 'Artificial Intelligence', posts: 234, trend: '+45%', icon: '🤖', color: 'from-violet-500 to-purple-600' },
    { name: 'Web Development', posts: 189, trend: '+32%', icon: '🌐', color: 'from-cyan-400 to-blue-500' },
    { name: 'UI/UX Design', posts: 156, trend: '+28%', icon: '🎨', color: 'from-pink-400 to-rose-500' },
    { name: 'Startup Culture', posts: 98, trend: '+67%', icon: '🚀', color: 'from-amber-400 to-orange-500' },
    { name: 'Digital Marketing', posts: 76, trend: '+41%', icon: '📢', color: 'from-emerald-400 to-teal-500' },
  ]

  const featuredBrands = [
    { name: 'Microsoft', logo: 'https://cdn-icons-png.flaticon.com/512/732/732221.png', color: 'from-blue-600 to-cyan-600' },
    { name: 'Google', logo: 'https://cdn-icons-png.flaticon.com/512/732/732222.png', color: 'from-red-500 to-yellow-500' },
    { name: 'Amazon', logo: 'https://cdn-icons-png.flaticon.com/512/732/732224.png', color: 'from-orange-500 to-yellow-500' },
    { name: 'Apple', logo: 'https://cdn-icons-png.flaticon.com/512/732/732233.png', color: 'from-gray-700 to-gray-900' },
    { name: 'Meta', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png', color: 'from-blue-700 to-indigo-700' },
    { name: 'Netflix', logo: 'https://cdn-icons-png.flaticon.com/512/5977/5977590.png', color: 'from-red-600 to-red-800' },
  ]

  const recentActivities = [
    { user: 'Rahul Sharma', action: 'published', article: 'The Future of AI in 2024', time: '2 min ago', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
    { user: 'Priya Verma', action: 'commented on', article: 'Web Development Trends', time: '15 min ago', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
    { user: 'Amit Kumar', action: 'liked', article: 'UX Design Principles', time: '1 hour ago', avatar: 'https://randomuser.me/api/portraits/men/13.jpg' },
    { user: 'Anamika Singh', action: 'shared', article: 'Startup Success Stories', time: '2 hours ago', avatar: 'https://randomuser.me/api/portraits/women/14.jpg' },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#ffffff', fontFamily: "'Sora', 'DM Sans', sans-serif" }}>

      {/* ─── Google Fonts ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=DM+Mono:wght@400;500&display=swap');

        :root {
          --accent: #7c3aed;
          --accent2: #db2777;
          --accent3: #10b981;
          --gold: #fbbf24;
          --bg: #ffffff;
          --bg2: #f8fafc;
          --bg3: #f1f5f9;
          --border: rgba(124,58,237,0.15);
          --text: #0f172a;
          --muted: #64748b;
        }

        * { box-sizing: border-box; }

        body { margin: 0; background: var(--bg); }

        ::selection { background: rgba(124,58,237,0.15); color: #4c1d95; }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

        /* ── Responsive Base ── */
        @media (max-width: 768px) {
          ::-webkit-scrollbar { width: 4px; }
        }

        /* ── Keyframes ── */
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glow { 0%,100% { opacity:.15; } 50% { opacity:.25; } }
        @keyframes orbit { from { transform: rotate(0deg) translateX(140px) rotate(0deg); } to { transform: rotate(360deg) translateX(140px) rotate(-360deg); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes floatY { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-18px); } }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
        @keyframes pulseRing { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(2.2);opacity:0} }
        @keyframes slideInLeft { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }
        @keyframes grain { 0%,100%{transform:translate(0,0)} 25%{transform:translate(-2%,-3%)} 50%{transform:translate(3%,2%)} 75%{transform:translate(-1%,3%)} }

        .anim-fade-up { animation: fadeUp .7s ease-out both; }
        .anim-fade-up-1 { animation: fadeUp .7s .1s ease-out both; }
        .anim-fade-up-2 { animation: fadeUp .7s .2s ease-out both; }
        .anim-fade-up-3 { animation: fadeUp .7s .3s ease-out both; }
        .anim-fade-up-4 { animation: fadeUp .7s .4s ease-out both; }
        .anim-float { animation: floatY 7s ease-in-out infinite; }
        .anim-float-delay { animation: floatY 9s 2s ease-in-out infinite; }

        /* ── Shimmer text ── */
        .shimmer-text {
          background: linear-gradient(90deg, #7c3aed 0%, #db2777 25%, #10b981 50%, #db2777 75%, #7c3aed 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        /* ── Glass card (light mode) ── */
        .glass {
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(124,58,237,0.12);
        }

        @media (max-width: 768px) {
          .glass { backdrop-filter: blur(10px); }
        }

        .glass-hover {
          transition: all .35s cubic-bezier(.22,1,.36,1);
        }
        .glass-hover:hover {
          background: rgba(124,58,237,0.04);
          border-color: rgba(124,58,237,0.25);
          transform: translateY(-6px);
          box-shadow: 0 24px 64px rgba(124,58,237,0.1);
        }

        /* ── Glow button ── */
        .btn-glow {
          position: relative;
          overflow: hidden;
          transition: all .3s ease;
          cursor: pointer;
        }
        .btn-glow::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,.2) 0%, transparent 60%);
          opacity: 0;
          transition: opacity .3s;
        }
        .btn-glow:hover::before { opacity: 1; }
        .btn-glow:hover { transform: translateY(-2px); box-shadow: 0 16px 48px rgba(124,58,237,0.25); }

        /* ── Noise overlay ── */
        .noise::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.02'/%3E%3C/svg%3E");
          opacity: .5;
          pointer-events: none;
          animation: grain 8s steps(10) infinite;
        }

        /* ── Stat card glow on hover ── */
        .stat-card:hover .stat-icon { box-shadow: 0 0 32px rgba(124,58,237,0.3); }

        /* ── Category card ── */
        .cat-card { transition: all .4s cubic-bezier(.22,1,.36,1); }
        .cat-card:hover { transform: translateY(-10px) scale(1.02); }
        .cat-card:hover .cat-emoji { transform: scale(1.2) rotate(-5deg); }
        .cat-emoji { transition: transform .4s cubic-bezier(.34,1.56,.64,1); display: inline-block; }

        @media (max-width: 640px) {
          .cat-card:hover { transform: translateY(-5px) scale(1.01); }
        }

        /* ── Blog card ── */
        .blog-card { transition: all .4s cubic-bezier(.22,1,.36,1); }
        .blog-card:hover { transform: translateY(-8px); }
        .blog-card:hover .blog-img { transform: scale(1.08); }
        .blog-img { transition: transform .6s cubic-bezier(.22,1,.36,1); }

        /* ── Testimonial ── */
        .testi-card:hover { border-color: rgba(124,58,237,0.3); box-shadow: 0 20px 60px rgba(124,58,237,0.08); }
        .testi-card { transition: all .35s ease; }

        /* ── Line clamp ── */
        .clamp-2 { display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }
        .clamp-3 { display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden; }

        /* ── Marquee ── */
        .marquee-track { animation: marquee 24s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }

        @media (max-width: 768px) {
          .marquee-track { animation-duration: 18s; }
        }

        /* ── Pill badge ── */
        .pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(124,58,237,0.08);
          border: 1px solid rgba(124,58,237,0.2);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 11px; font-weight: 700; letter-spacing: .08em;
          color: #7c3aed; text-transform: uppercase;
        }

        @media (max-width: 640px) {
          .pill { padding: 4px 12px; font-size: 9px; gap: 4px; }
        }

        /* ── Section heading ── */
        .section-title {
          font-size: clamp(1.75rem, 5vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -.03em;
          color: #0f172a;
          line-height: 1.2;
        }

        /* ── Countdown box ── */
        .cd-box {
          display: flex; flex-direction: column; align-items: center;
          background: rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 12px;
          padding: 8px 14px;
          min-width: 56px;
        }
        .cd-num { font-family: 'DM Mono', monospace; font-size: 22px; font-weight: 500; color: #0f172a; line-height: 1; }
        .cd-label { font-size: 9px; letter-spacing: .1em; color: #64748b; text-transform: uppercase; margin-top: 3px; }

        @media (max-width: 768px) {
          .cd-box { padding: 5px 8px; min-width: 42px; }
          .cd-num { font-size: 16px; }
          .cd-label { font-size: 7px; }
        }

        @media (max-width: 640px) {
          .cd-box { padding: 3px 6px; min-width: 36px; }
          .cd-num { font-size: 12px; }
        }

        /* ── Live dot ── */
        .live-dot { position: relative; width: 10px; height: 10px; }
        .live-dot::before { content:''; position:absolute;inset:0; background:#10b981; border-radius:50%; z-index:1; }
        .live-dot::after { content:''; position:absolute;inset:0; background:#10b981; border-radius:50%; animation: pulseRing 1.6s ease-out infinite; }

        /* ── Trending rank ── */
        .rank-num {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          color: #94a3b8;
          font-weight: 500;
          min-width: 24px;
        }

        /* ── Input focus ── */
        .neo-input {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #0f172a;
          border-radius: 14px;
          padding: 14px 20px;
          outline: none;
          font-size: 15px;
          transition: border-color .25s, box-shadow .25s;
          width: 100%;
          font-family: inherit;
        }
        .neo-input::placeholder { color: #94a3b8; }
        .neo-input:focus { border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); }

        @media (max-width: 768px) {
          .neo-input { padding: 10px 16px; font-size: 14px; }
        }

        /* ── Scroll caret ── */
        @keyframes caretBounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
        .scroll-caret { animation: caretBounce 2s ease-in-out infinite; }

        @media (max-width: 768px) {
          .scroll-caret { bottom: 16px; }
        }

        /* ── Cookie ── */
        @keyframes slideUp { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }
        .cookie-bar { animation: slideUp .5s cubic-bezier(.22,1,.36,1); }

        @media (max-width: 640px) {
          .cookie-bar { left: 16px; right: 16px; bottom: 16px; max-width: none; }
        }

        /* ── Popup ── */
        @keyframes popIn { from{opacity:0;transform:scale(.88)} to{opacity:1;transform:scale(1)} }
        .popup-box { animation: popIn .4s cubic-bezier(.34,1.56,.64,1); }

        @media (max-width: 640px) {
          .popup-box { margin: 16px; padding: 24px; }
        }

        /* ── Hero gradient orb ── */
        .orb {
          position: absolute; border-radius: 50%;
          filter: blur(100px); pointer-events: none;
        }

        @media (max-width: 768px) {
          .orb { filter: blur(60px); }
        }

        /* ── Brand strip ── */
        .brand-strip {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════
          ANNOUNCEMENT BAR - RESPONSIVE
      ═══════════════════════════════════════════════════════ */}
      <div style={{ background: 'linear-gradient(90deg, #6d28d9 0%, #db2777 50%, #ea580c 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='.04'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div style={{ maxWidth: '100%', margin: '0 auto', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ background: 'rgba(255,255,255,.2)', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🔥</span>
            <span style={{ color: '#fff', fontSize: 'clamp(11px, 3vw, 13px)', fontWeight: 700, textAlign: 'center' }}>BLACK FRIDAY SALE — Up to 70% off + Free updates</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
              {[['days', countdown.days], ['hrs', countdown.hours], ['min', countdown.minutes], ['sec', countdown.seconds]].map(([l, v]) => (
                <div key={l} className="cd-box" style={{ background: 'rgba(255,255,255,.15)', borderColor: 'rgba(255,255,255,.2)' }}>
                  <span className="cd-num" style={{ color: '#fff' }}>{String(v).padStart(2, '0')}</span>
                  <span className="cd-label" style={{ color: 'rgba(255,255,255,.7)' }}>{l}</span>
                </div>
              ))}
            </div>
            <button className="btn-glow" style={{ background: '#fff', color: '#6d28d9', border: 'none', borderRadius: 100, padding: '6px 16px', fontWeight: 800, fontSize: 'clamp(10px, 3vw, 12px)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              CLAIM →
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION - RESPONSIVE
      ═══════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="noise" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#f8fafc' }}>

        <div className="orb" style={{ width: 'min(700px, 80vw)', height: 'min(700px, 80vw)', background: 'radial-gradient(circle, rgba(124,58,237,.15), transparent 70%)', left: `${mousePosition.x * 0.3 - 10}%`, top: `${mousePosition.y * 0.3 - 10}%`, transition: 'left .1s, top .1s' }} />
        <div className="orb anim-float" style={{ width: 'min(400px, 60vw)', height: 'min(400px, 60vw)', background: 'radial-gradient(circle, rgba(219,39,119,.1), transparent 70%)', right: '-5%', bottom: '10%' }} />
        <div className="orb anim-float-delay" style={{ width: 'min(300px, 50vw)', height: 'min(300px, 50vw)', background: 'radial-gradient(circle, rgba(16,185,129,.08), transparent 70%)', left: '5%', bottom: '20%' }} />

        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(124,58,237,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,.03) 1px, transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(60px, 10vw, 120px) 20px clamp(40px, 8vw, 80px)', position: 'relative', zIndex: 10, width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: window.innerWidth < 1024 ? 'column' : 'row', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>

            {/* ── Left ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 4vw, 32px)', flex: 1 }}>
              <div className="anim-fade-up">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,.1)', border: '1px solid rgba(16,185,129,.25)', borderRadius: 100, padding: '6px 14px' }}>
                  <div className="live-dot" />
                  <span style={{ color: '#10b981', fontSize: 'clamp(9px, 3vw, 11px)', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>50,000+ Active Members</span>
                </div>
              </div>

              <div className="anim-fade-up-1">
                <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-.04em', margin: 0, color: '#0f172a', textAlign: window.innerWidth < 1024 ? 'center' : 'left' }}>
                  ApexEdge<br />
                  <span className="shimmer-text">Gaming</span>
                </h1>
              </div>

              <p className="anim-fade-up-2" style={{ color: '#475569', fontSize: 'clamp(1rem, 4vw, 1.125rem)', lineHeight: 1.6, margin: 0, maxWidth: 500, textAlign: window.innerWidth < 1024 ? 'center' : 'left', marginLeft: 'auto', marginRight: 'auto' }}>
                Fresh insights, ideas, and stories — updated daily by our team of expert writers.
                Join a community of 50,000+ curious minds.
              </p>

              <div className="anim-fade-up-3" style={{ display: 'flex', gap: 12, justifyContent: window.innerWidth < 1024 ? 'center' : 'flex-start', flexWrap: 'wrap' }}>
                <Link to="/blog" className="btn-glow" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: '#fff', padding: 'clamp(10px, 3vw, 16px) clamp(20px, 5vw, 32px)', borderRadius: 16, fontWeight: 700, fontSize: 'clamp(13px, 4vw, 16px)', textDecoration: 'none' }}>
                  Start Reading <MoveRight size={16} />
                </Link>
                <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,.04)', border: '1px solid #e2e8f0', color: '#1e293b', padding: 'clamp(10px, 3vw, 16px) clamp(20px, 5vw, 28px)', borderRadius: 16, fontWeight: 600, fontSize: 'clamp(13px, 4vw, 15px)', textDecoration: 'none' }}>
                  <Play size={14} /> Watch Demo
                </Link>
              </div>

              <div className="anim-fade-up-4" style={{ display: 'flex', alignItems: 'center', justifyContent: window.innerWidth < 1024 ? 'center' : 'flex-start', gap: 'clamp(16px, 4vw, 24px)', flexWrap: 'wrap', paddingTop: 8 }}>
                <div style={{ display: 'flex' }}>
                  {[1, 2, 3, 4].map((i) => (
                    <img key={i} src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i}.jpg`} alt="" style={{ width: 'clamp(36px, 8vw, 44px)', height: 'clamp(36px, 8vw, 44px)', borderRadius: '50%', border: '2px solid rgba(124,58,237,.2)', marginLeft: i === 1 ? 0 : -10, objectFit: 'cover' }} />
                  ))}
                </div>
                <div style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: 'clamp(12px, 3vw, 20px)' }}>
                  <div style={{ color: '#0f172a', fontWeight: 800, fontSize: 'clamp(18px, 5vw, 22px)' }}>2,500+</div>
                  <div style={{ color: '#64748b', fontSize: 'clamp(10px, 3vw, 13px)' }}>New readers this week</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={window.innerWidth < 640 ? 10 : 14} style={{ fill: '#fbbf24', color: '#fbbf24' }} />)}
                  <span style={{ color: '#0f172a', fontWeight: 700, marginLeft: 4, fontSize: 'clamp(12px, 4vw, 14px)' }}>4.9</span>
                </div>
              </div>
            </div>

            {/* ── Right — Hero post card ── */}
            {heroPost && (
              <div style={{ flex: 1, maxWidth: window.innerWidth < 1024 ? '100%' : '50%' }}>
                <Link to={`/blog/${heroPost.slug}`} style={{ position: 'relative', display: 'block', textDecoration: 'none' }}>
                  <div style={{ position: 'absolute', inset: -1, background: 'linear-gradient(135deg, rgba(124,58,237,.3), rgba(219,39,119,.2))', borderRadius: 28, filter: 'blur(20px)', opacity: .4, zIndex: -1 }} />
                  <div style={{ borderRadius: 28, overflow: 'hidden', position: 'relative', background: '#fff', border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'transform .5s cubic-bezier(.22,1,.36,1)' }}
                    onMouseEnter={e => e.currentTarget.style.transform = window.innerWidth > 768 ? 'scale(1.02) rotateY(-3deg)' : 'scale(1.01)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotateY(0deg)'}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.4) 50%, transparent 100%)', zIndex: 1 }} />
                    <img src={heroPost.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80'} alt={heroPost.title} style={{ width: '100%', height: 'clamp(280px, 50vw, 480px)', objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', top: 'clamp(12px, 3vw, 20px)', left: 'clamp(12px, 3vw, 20px)', zIndex: 2, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 'clamp(9px, 3vw, 11px)', fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg,#7c3aed,#db2777)', padding: '4px 12px', borderRadius: 100 }}>{heroPost.category?.name || 'Featured'}</span>
                      <span style={{ fontSize: 'clamp(9px, 3vw, 11px)', fontWeight: 600, color: '#fbbf24', background: 'rgba(251,191,36,.15)', border: '1px solid rgba(251,191,36,.3)', padding: '4px 12px', borderRadius: 100 }}>👑 Editor's Pick</span>
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(16px, 4vw, 28px)', zIndex: 2 }}>
                      <h3 style={{ color: '#fff', fontSize: 'clamp(1rem, 4vw, 1.375rem)', fontWeight: 800, margin: '0 0 8px', lineHeight: 1.3 }} className="clamp-2">{heroPost.title}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,.7)', fontSize: 'clamp(10px, 3vw, 13px)', flexWrap: 'wrap' }}>
                        <img src={heroPost.author?.avatar || 'https://randomuser.me/api/portraits/men/10.jpg'} alt="" style={{ width: 'clamp(20px, 5vw, 28px)', height: 'clamp(20px, 5vw, 28px)', borderRadius: '50%', border: '2px solid rgba(255,255,255,.3)' }} />
                        <span>{heroPost.author?.name}</span>
                        <span style={{ opacity: .5 }}>·</span>
                        <span>{format(new Date(heroPost.createdAt), 'MMM d, yyyy')}</span>
                        <span style={{ opacity: .5 }}>·</span>
                        <span>{heroPost.readTime} min read</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating badge */}
                  <div style={{ position: 'absolute', top: -12, right: -12, background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', borderRadius: 100, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 4, boxShadow: '0 8px 32px rgba(251,191,36,.3)', zIndex: 10 }}>
                    <Crown size={11} style={{ color: '#fff' }} />
                    <span style={{ color: '#fff', fontSize: 'clamp(9px, 3vw, 11px)', fontWeight: 800, letterSpacing: '.06em' }}>FEATURED</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Scroll caret - Responsive */}
        <div className="scroll-caret" style={{ position: 'absolute', bottom: 'clamp(16px, 4vw, 32px)', left: '50%', zIndex: 10, transform: 'translateX(-50%)' }}>
          <div style={{ width: 'clamp(28px, 6vw, 36px)', height: 'clamp(42px, 8vw, 56px)', border: '2px solid #cbd5e1', borderRadius: 100, display: 'flex', justifyContent: 'center', paddingTop: 'clamp(8px, 2vw, 10px)' }}>
            <div style={{ width: 3, height: 'clamp(8px, 2vw, 12px)', background: '#7c3aed', borderRadius: 4, animation: 'scaleIn 2s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BRAND MARQUEE - RESPONSIVE
      ═══════════════════════════════════════════════════════ */}
      <div className="brand-strip" style={{ padding: 'clamp(12px, 3vw, 20px) 0', overflow: 'hidden' }}>
        <div className="marquee-track" style={{ display: 'flex', gap: 'clamp(30px, 5vw, 60px)', width: 'max-content' }}>
          {[...featuredBrands, ...featuredBrands].map((brand, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: .6, transition: 'opacity .3s', cursor: 'default', whiteSpace: 'nowrap' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '.6'}>
              <div style={{ width: 'clamp(24px, 5vw, 32px)', height: 'clamp(24px, 5vw, 32px)', background: `linear-gradient(135deg, #7c3aed, #db2777)`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                <img src={brand.logo} alt={brand.name} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
              </div>
              <span style={{ color: '#475569', fontWeight: 600, fontSize: 'clamp(11px, 3vw, 14px)' }}>{brand.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          STATS SECTION - RESPONSIVE GRID
      ═══════════════════════════════════════════════════════ */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(40px, 8vw, 80px) 20px clamp(20px, 5vw, 40px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 'clamp(16px, 3vw, 20px)' }}>
          {stats.map((stat, idx) => (
            <div key={idx} className="glass glass-hover stat-card" style={{ borderRadius: 24, padding: 'clamp(20px, 4vw, 28px)', position: 'relative', overflow: 'hidden', background: '#fff' }}>
              <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: `linear-gradient(135deg, ${stat.color.replace('from-', '').split(' ')[0]}, transparent)`, opacity: .06, filter: 'blur(20px)' }} />
              <div className="stat-icon" style={{ width: 'clamp(44px, 8vw, 52px)', height: 'clamp(44px, 8vw, 52px)', borderRadius: 16, background: `linear-gradient(135deg, ${stat.color.replace('from-', '#').replace(' to-', ', #').replace(/-\d+/g, '')})`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <div style={{ color: '#fff' }}>{stat.icon}</div>
              </div>
              <div style={{ fontSize: 'clamp(1.75rem, 6vw, 2.375rem)', fontWeight: 900, color: '#0f172a', letterSpacing: '-.03em', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ color: '#64748b', fontSize: 'clamp(11px, 3vw, 13px)', fontWeight: 500, marginTop: 4 }}>{stat.label}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 12, background: 'rgba(16,185,129,.08)', border: '1px solid rgba(16,185,129,.2)', borderRadius: 100, padding: '3px 8px' }}>
                <TrendingUp size={10} style={{ color: '#10b981' }} />
                <span style={{ color: '#10b981', fontSize: 10, fontWeight: 700 }}>{stat.trend}</span>
                <span style={{ color: '#10b981', fontSize: 9, opacity: .7, display: 'inline-block' }}>vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Activity Feed - Responsive */}
        <div className="glass" style={{ borderRadius: 'clamp(20px, 4vw, 24px)', padding: 'clamp(16px, 4vw, 28px)', marginTop: 'clamp(16px, 4vw, 24px)', background: '#fff', border: '1px solid rgba(124,58,237,.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #e2e8f0', flexWrap: 'wrap' }}>
            <div className="live-dot" />
            <span style={{ color: '#7c3aed', fontSize: 'clamp(9px, 3vw, 11px)', fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase' }}>Live Community Feed</span>
            <span style={{ color: '#64748b', fontSize: 'clamp(10px, 3vw, 12px)', marginLeft: 'auto' }}>Real-time</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {recentActivities.map((activity, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 3vw, 12px)', padding: '8px 12px', borderRadius: 14, flexWrap: 'wrap' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <img src={activity.avatar} alt="" style={{ width: 'clamp(32px, 6vw, 38px)', height: 'clamp(32px, 6vw, 38px)', borderRadius: '50%', border: '2px solid rgba(124,58,237,.2)', objectFit: 'cover' }} />
                <div style={{ flex: 1, fontSize: 'clamp(11px, 3vw, 13px)' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{activity.user}</span>
                  <span style={{ color: '#64748b', margin: '0 4px' }}>{activity.action}</span>
                  <span style={{ color: '#7c3aed', fontWeight: 600 }}>"{activity.article}"</span>
                </div>
                <span style={{ color: '#64748b', fontSize: 'clamp(9px, 2.5vw, 11px)' }}>{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          RECENT BLOGS - RESPONSIVE GRID
      ═══════════════════════════════════════════════════════ */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(40px, 6vw, 60px) 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'clamp(32px, 6vw, 48px)', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="pill" style={{ marginBottom: 12 }}>
              <Zap size={12} /> Latest Articles
            </div>
            <h2 className="section-title">Fresh from ApexEdgeGaming</h2>
            <p style={{ color: '#64748b', fontSize: 'clamp(13px, 4vw, 16px)', marginTop: 8 }}>Discover our newest stories and expert insights</p>
          </div>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#7c3aed', fontWeight: 700, fontSize: 'clamp(13px, 4vw, 15px)', textDecoration: 'none', background: 'rgba(124,58,237,.08)', border: '1px solid rgba(124,58,237,.2)', borderRadius: 12, padding: '10px 18px', whiteSpace: 'nowrap' }}>
            Browse All <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 'clamp(20px, 4vw, 24px)' }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass" style={{ borderRadius: 24, overflow: 'hidden', height: 360, background: '#fff' }}>
                <div style={{ height: 200, background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)', animation: 'glow 2s ease-in-out infinite' }} />
                <div style={{ padding: 20 }}>
                  <div style={{ height: 16, borderRadius: 8, background: '#e2e8f0', width: '75%', marginBottom: 12 }} />
                  <div style={{ height: 12, borderRadius: 8, background: '#f1f5f9', width: '50%', marginBottom: 8 }} />
                  <div style={{ height: 40, borderRadius: 8, background: '#f1f5f9' }} />
                </div>
              </div>
            ))}
          </div>
        ) : recentPosts.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 'clamp(20px, 4vw, 24px)' }}>
            {recentPosts.map(blog => <BlogCard key={blog._id} blog={blog} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
            <BookOpen size={48} style={{ opacity: .2, margin: '0 auto 16px', display: 'block' }} />
            <p>No ApexEdgeGaming articles yet. Check back soon!</p>
          </div>
        )}

        {recentPosts.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: 'clamp(32px, 6vw, 48px)' }}>
            <Link to="/blog" className="btn-glow" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: '#fff', padding: 'clamp(12px, 3vw, 16px) clamp(28px, 6vw, 36px)', borderRadius: 16, fontWeight: 700, fontSize: 'clamp(13px, 4vw, 16px)', textDecoration: 'none' }}>
              Load More Articles <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════
          CATEGORIES - RESPONSIVE GRID
      ═══════════════════════════════════════════════════════ */}
      <section style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: 'clamp(40px, 8vw, 80px) 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 6vw, 52px)' }}>
            <div className="pill" style={{ marginBottom: 16 }}>
              <Compass size={12} /> Explore Categories
            </div>
            <h2 className="section-title">Browse by Topic</h2>
            <p style={{ color: '#64748b', fontSize: 'clamp(14px, 4vw, 17px)', marginTop: 12, maxWidth: 480, margin: '12px auto 0' }}>Find articles that match your interests</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: 'clamp(16px, 3vw, 18px)' }}>
            {categories.map((cat, idx) => (
              <Link key={cat.name} to={`/category/${cat.name.toLowerCase()}`} className="glass cat-card" style={{ borderRadius: 24, padding: 'clamp(24px, 5vw, 36px) 16px', textAlign: 'center', textDecoration: 'none', display: 'block', position: 'relative', overflow: 'hidden', background: '#fff' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0, background: 'linear-gradient(135deg, rgba(124,58,237,.04), rgba(219,39,119,.02))', transition: 'opacity .4s' }} />
                <div style={{ fontSize: 'clamp(32px, 8vw, 44px)', marginBottom: 12 }} className="cat-emoji">{cat.icon}</div>
                <div style={{ color: '#0f172a', fontWeight: 800, fontSize: 'clamp(15px, 4vw, 17px)', marginBottom: 4 }}>{cat.name}</div>
                <div style={{ color: '#64748b', fontSize: 'clamp(10px, 3vw, 12px)', marginBottom: 6 }}>{cat.description}</div>
                <div style={{ color: '#7c3aed', fontSize: 'clamp(10px, 3vw, 11px)', fontWeight: 700, background: 'rgba(124,58,237,.08)', borderRadius: 100, padding: '3px 10px', display: 'inline-block' }}>{cat.count} Articles</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TRENDING + COMMUNITY - RESPONSIVE STACK
      ═══════════════════════════════════════════════════════ */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(40px, 8vw, 80px) 20px' }}>
        <div style={{ display: 'flex', flexDirection: window.innerWidth < 1024 ? 'column' : 'row', gap: 'clamp(32px, 5vw, 48px)', alignItems: 'start' }}>

          {/* Trending */}
          <div style={{ flex: window.innerWidth < 1024 ? 'auto' : 1, width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 14px)', marginBottom: 'clamp(28px, 5vw, 36px)', flexWrap: 'wrap' }}>
              <div style={{ width: 'clamp(40px, 8vw, 48px)', height: 'clamp(40px, 8vw, 48px)', borderRadius: 16, background: 'linear-gradient(135deg, #f59e0b, #ef4444)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Flame size={window.innerWidth < 640 ? 16 : 20} style={{ color: '#fff' }} />
              </div>
              <div>
                <h2 style={{ color: '#0f172a', fontSize: 'clamp(1.25rem, 5vw, 1.625rem)', fontWeight: 800, margin: 0 }}>Trending Topics</h2>
                <p style={{ color: '#64748b', fontSize: 'clamp(11px, 3vw, 13px)', margin: 0 }}>Most popular discussions right now</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {trendingTopics.map((topic, idx) => (
                <Link key={idx} to={`/topic/${topic.name.toLowerCase()}`} className="glass glass-hover" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 16px)', padding: 'clamp(12px, 3vw, 18px) clamp(16px, 4vw, 22px)', borderRadius: 18, textDecoration: 'none', background: '#fff', flexWrap: 'wrap' }}>
                  <span className="rank-num">0{idx + 1}</span>
                  <div style={{ width: 'clamp(40px, 8vw, 48px)', height: 'clamp(40px, 8vw, 48px)', borderRadius: 14, background: 'rgba(124,58,237,.05)', border: '1px solid rgba(124,58,237,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(20px, 5vw, 24px)' }}>
                    {topic.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#0f172a', fontWeight: 700, fontSize: 'clamp(13px, 4vw, 15px)', marginBottom: 4 }}>{topic.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <span style={{ color: '#64748b', fontSize: 'clamp(10px, 3vw, 12px)' }}>{topic.posts} articles</span>
                      <div style={{ width: 3, height: 3, background: '#cbd5e1', borderRadius: '50%' }} />
                      <span style={{ color: '#10b981', fontSize: 'clamp(10px, 3vw, 12px)', fontWeight: 700 }}>↑ {topic.trend}</span>
                    </div>
                  </div>
                  <ChevronRight size={14} style={{ color: '#94a3b8' }} />
                </Link>
              ))}
            </div>
          </div>

          {/* Community card */}
          <div style={{ width: window.innerWidth < 1024 ? '100%' : '380px', flexShrink: 0 }}>
            <div className="glass" style={{ borderRadius: 28, padding: 'clamp(24px, 5vw, 32px)', border: '1px solid rgba(124,58,237,.15)', position: 'sticky', top: 100, overflow: 'hidden', background: '#fff' }}>
              <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, background: 'radial-gradient(circle, rgba(124,58,237,.08), transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 14px)', marginBottom: 20 }}>
                  <div style={{ width: 'clamp(44px, 8vw, 52px)', height: 'clamp(44px, 8vw, 52px)', borderRadius: 18, background: 'linear-gradient(135deg, #7c3aed, #db2777)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Target size={window.innerWidth < 640 ? 18 : 22} style={{ color: '#fff' }} />
                  </div>
                  <div>
                    <div style={{ color: '#0f172a', fontWeight: 800, fontSize: 'clamp(1rem, 4vw, 1.125rem)' }}>Join the Community</div>
                    <div style={{ color: '#10b981', fontSize: 'clamp(10px, 3vw, 12px)', fontWeight: 600 }}>1,200+ members online</div>
                  </div>
                </div>

                <p style={{ color: '#64748b', fontSize: 'clamp(13px, 3.5vw, 14px)', lineHeight: 1.6, marginBottom: 22 }}>Connect with like-minded writers and readers. Share your ideas, get feedback, and grow together.</p>

                {/* Avatars */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex' }}>
                    {[1, 2, 3, 4].map((i) => (
                      <img key={i} src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg`} alt="" style={{ width: 'clamp(32px, 6vw, 38px)', height: 'clamp(32px, 6vw, 38px)', borderRadius: '50%', border: '2px solid rgba(124,58,237,.2)', marginLeft: i === 1 ? 0 : -8, objectFit: 'cover' }} />
                    ))}
                    <div style={{ width: 'clamp(32px, 6vw, 38px)', height: 'clamp(32px, 6vw, 38px)', borderRadius: '50%', background: 'rgba(124,58,237,.1)', border: '2px solid rgba(124,58,237,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: -8 }}>
                      <span style={{ color: '#7c3aed', fontSize: 'clamp(8px, 2.5vw, 10px)', fontWeight: 800 }}>+2k</span>
                    </div>
                  </div>
                  <span style={{ color: '#64748b', fontSize: 'clamp(10px, 3vw, 12px)' }}>and many more...</span>
                </div>

                {/* Progress bar */}
                <div style={{ marginBottom: 22 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 6 }}>
                    <span style={{ color: '#64748b', fontSize: 'clamp(10px, 3vw, 12px)' }}>Community goal</span>
                    <span style={{ color: '#7c3aed', fontSize: 'clamp(10px, 3vw, 12px)', fontWeight: 700 }}>78% full</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 100, background: '#e2e8f0' }}>
                    <div style={{ height: '100%', width: '78%', borderRadius: 100, background: 'linear-gradient(90deg, #7c3aed, #db2777)', boxShadow: '0 0 12px rgba(124,58,237,.3)' }} />
                  </div>
                </div>

                <button className="btn-glow" style={{ width: '100%', background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: '#fff', border: 'none', borderRadius: 16, padding: 'clamp(12px, 3vw, 16px)', fontWeight: 800, fontSize: 'clamp(13px, 4vw, 15px)', cursor: 'pointer' }}>
                  Join Now — It's Free →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          NEWSLETTER CTA - RESPONSIVE
      ═══════════════════════════════════════════════════════ */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px clamp(40px, 8vw, 80px)' }}>
        <div style={{ position: 'relative', borderRadius: 'clamp(24px, 5vw, 32px)', overflow: 'hidden', background: 'linear-gradient(135deg, #ede9fe 0%, #fce7f3 40%, #fed7aa 100%)', border: '1px solid rgba(124,58,237,.2)' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: .05 }} />
          <div className="orb" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(124,58,237,.2), transparent 70%)', right: '-10%', top: '-30%' }} />
          <div className="orb" style={{ width: 300, height: 300, background: 'radial-gradient(circle, rgba(219,39,119,.15), transparent 70%)', left: '-5%', bottom: '-20%' }} />

          <div style={{ position: 'relative', padding: 'clamp(40px, 6vw, 72px) clamp(20px, 5vw, 48px)', textAlign: 'center' }}>
            <div className="pill" style={{ marginBottom: 'clamp(16px, 4vw, 24px)', background: 'rgba(124,58,237,.1)', borderColor: 'rgba(124,58,237,.25)' }}>
              <Rocket size={12} /> Limited Time Offer
            </div>
            <h3 style={{ fontSize: 'clamp(1.5rem, 6vw, 3rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-.04em' }}>Join Our Premium Newsletter</h3>
            <p style={{ color: '#475569', fontSize: 'clamp(14px, 4vw, 17px)', maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.6 }}>Get exclusive content, early access to articles, and special benefits.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', maxWidth: 480, margin: '0 auto 24px', flexWrap: 'wrap' }}>
              <input type="email" placeholder="Enter your email address" className="neo-input" style={{ flex: 1, minWidth: 200 }} />
              <button className="btn-glow" style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: '#fff', border: 'none', borderRadius: 14, padding: 'clamp(10px, 3vw, 14px) clamp(20px, 5vw, 28px)', fontWeight: 700, fontSize: 'clamp(13px, 4vw, 15px)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Subscribe Free <ArrowRight size={14} />
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 'clamp(16px, 4vw, 24px)' }}>
              {['No spam, ever', 'Unsubscribe anytime', '100% free forever'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', fontSize: 'clamp(11px, 3vw, 13px)' }}>
                  <CheckCircle2 size={12} style={{ color: '#10b981' }} />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TESTIMONIALS - RESPONSIVE GRID
      ═══════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', padding: 'clamp(40px, 8vw, 80px) 20px', overflow: 'hidden', background: '#f8fafc' }}>
        <div className="orb" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(124,58,237,.08), transparent 70%)', left: '-5%', top: '10%' }} />
        <div className="orb" style={{ width: 300, height: 300, background: 'radial-gradient(circle, rgba(219,39,119,.06), transparent 70%)', right: '-5%', bottom: '10%' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 5 }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 56px)' }}>
            <div className="pill" style={{ marginBottom: 16, background: 'rgba(219,39,119,.08)', borderColor: 'rgba(219,39,119,.2)', color: '#db2777' }}>
              <Heart size={12} /> Testimonials
            </div>
            <h2 className="section-title">What Our Readers Say</h2>
            <p style={{ color: '#64748b', fontSize: 'clamp(14px, 4vw, 17px)', marginTop: 12 }}>Join thousands of satisfied readers who love ApexEdgeGaming</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(20px, 4vw, 24px)' }}>
            {testimonials.map((t, idx) => (
              <div key={idx} className="glass testi-card" style={{ borderRadius: 24, padding: 'clamp(20px, 5vw, 32px)', position: 'relative', overflow: 'hidden', background: '#fff' }}>
                <div style={{ fontSize: 'clamp(60px, 10vw, 80px)', lineHeight: 1, color: 'rgba(124,58,237,.06)', fontFamily: 'Georgia, serif', position: 'absolute', top: 10, right: 20, userSelect: 'none' }}>"</div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} style={{ fill: '#fbbf24', color: '#fbbf24' }} />)}
                </div>
                <p style={{ color: '#334155', fontSize: 'clamp(13px, 4vw, 15px)', lineHeight: 1.65, marginBottom: 20, fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid #e2e8f0', paddingTop: 16 }}>
                  <img src={t.avatar} alt={t.name} style={{ width: 'clamp(40px, 8vw, 48px)', height: 'clamp(40px, 8vw, 48px)', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(124,58,237,.2)' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <span style={{ color: '#0f172a', fontWeight: 700, fontSize: 'clamp(13px, 4vw, 15px)' }}>{t.name}</span>
                      <BadgeCheck size={13} style={{ color: '#3b82f6' }} />
                    </div>
                    <div style={{ color: '#7c3aed', fontSize: 'clamp(10px, 3vw, 12px)', opacity: .8 }}>{t.role} at {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust strip - Responsive */}
          <div style={{ marginTop: 'clamp(40px, 6vw, 56px)', textAlign: 'center' }}>
            <div className="glass" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 'clamp(16px, 4vw, 32px)', padding: 'clamp(16px, 4vw, 18px) clamp(24px, 5vw, 36px)', borderRadius: 100, background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ display: 'flex' }}>
                  {[5, 6, 7, 8].map((i) => (
                    <img key={i} src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 10}.jpg`} alt="" style={{ width: 'clamp(28px, 6vw, 36px)', height: 'clamp(28px, 6vw, 36px)', borderRadius: '50%', border: '2px solid rgba(124,58,237,.2)', marginLeft: i === 5 ? 0 : -8, objectFit: 'cover' }} />
                  ))}
                </div>
                <span style={{ color: '#0f172a', fontWeight: 600, fontSize: 'clamp(12px, 3.5vw, 14px)' }}>Join 10,000+ happy readers</span>
              </div>
              <div style={{ width: 1, height: 28, background: '#e2e8f0', display: window.innerWidth < 640 ? 'none' : 'block' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={14} style={{ fill: '#fbbf24', color: '#fbbf24' }} />)}
                <span style={{ color: '#0f172a', fontWeight: 800, fontSize: 'clamp(16px, 5vw, 18px)', marginLeft: 4 }}>4.9</span>
                <span style={{ color: '#64748b', fontSize: 'clamp(11px, 3vw, 13px)' }}>(2,500+ reviews)</span>
              </div>
              <div style={{ width: 1, height: 28, background: '#e2e8f0', display: window.innerWidth < 640 ? 'none' : 'block' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Shield size={13} style={{ color: '#10b981' }} />
                <span style={{ color: '#475569', fontSize: 'clamp(11px, 3vw, 13px)' }}>Verified Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          NEWSLETTER POPUP - RESPONSIVE
      ═══════════════════════════════════════════════════════ */}
      {showNewsletterPopup && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: 16 }}>
          <div className="popup-box" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 'clamp(24px, 5vw, 32px)', maxWidth: 440, width: '100%', padding: 'clamp(24px, 6vw, 40px)', position: 'relative', textAlign: 'center', boxShadow: '0 40px 100px rgba(0,0,0,.15)' }}>
            <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,.2), transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />
            <button onClick={() => setShowNewsletterPopup(false)} style={{ position: 'absolute', top: -12, right: -12, width: 28, height: 28, borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, zIndex: 10 }}>✕</button>

            <div style={{ width: 'clamp(60px, 12vw, 80px)', height: 'clamp(60px, 12vw, 80px)', borderRadius: 'clamp(20px, 4vw, 24px)', background: 'linear-gradient(135deg, #7c3aed, #db2777)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Mail size={window.innerWidth < 640 ? 28 : 34} style={{ color: '#fff' }} />
            </div>
            <h3 style={{ color: '#0f172a', fontSize: 'clamp(1.25rem, 5vw, 1.5rem)', fontWeight: 800, margin: '0 0 8px' }}>Don't Miss Out!</h3>
            <p style={{ color: '#64748b', fontSize: 'clamp(12px, 4vw, 14px)', margin: '0 0 20px', lineHeight: 1.6 }}>Get the latest articles straight to your inbox</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <input type="email" placeholder="Enter your email" className="neo-input" style={{ flex: 1, minWidth: 180 }} />
              <button className="btn-glow" style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: '#fff', border: 'none', borderRadius: 14, padding: 'clamp(10px, 3vw, 14px) clamp(16px, 4vw, 20px)', fontWeight: 700, cursor: 'pointer', fontSize: 'clamp(12px, 4vw, 14px)' }}>Go →</button>
            </div>
            <p style={{ color: '#64748b', fontSize: 'clamp(10px, 3vw, 11px)', marginTop: 14 }}>No spam, unsubscribe anytime. Join 50,000+ subscribers!</p>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          COOKIE CONSENT - RESPONSIVE
      ═══════════════════════════════════════════════════════ */}
      {showCookieConsent && (
        <div className="cookie-bar" style={{ position: 'fixed', bottom: 'clamp(16px, 4vw, 24px)', left: window.innerWidth < 640 ? 16 : 'auto', right: window.innerWidth < 640 ? 16 : 24, maxWidth: window.innerWidth < 640 ? 'calc(100% - 32px)' : 400, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20, zIndex: 50, boxShadow: '0 24px 64px rgba(0,0,0,.08)', backdropFilter: 'blur(20px)' }}>
          <div style={{ padding: 'clamp(16px, 4vw, 22px)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
              <Shield size={16} style={{ color: '#7c3aed', flexShrink: 0 }} />
              <p style={{ color: '#475569', fontSize: 'clamp(11px, 3.5vw, 13px)', lineHeight: 1.5, margin: 0 }}>We use cookies to enhance your experience. By continuing, you agree to our <Link to="/privacy" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</Link>.</p>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button style={{ border: '1px solid #e2e8f0', background: 'transparent', borderRadius: 12, padding: '6px 14px', fontSize: 'clamp(11px, 3vw, 13px)', fontWeight: 600, cursor: 'pointer' }}>Settings</button>
              <button onClick={() => setShowCookieConsent(false)} className="btn-glow" style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: '#fff', border: 'none', borderRadius: 12, padding: '6px 16px', fontSize: 'clamp(11px, 3vw, 13px)', fontWeight: 600, cursor: 'pointer' }}>Accept All</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

// Star component
const StarIcon = ({ className, size, style }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
)