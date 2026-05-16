import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlog } from '../utils/api'
import { format } from 'date-fns'
import BlogCard from '../components/BlogCard'
// lucide icons (UI)
// lucide icons
import { 
  ArrowLeft, Calendar, Clock, Eye, Heart, Share2, 
  Bookmark, Link as LinkIcon,
  Tag, User, MessageCircle, TrendingUp, Sparkles,
  ChevronRight, Copy, Check, Printer, Download, Mail,
  Quote, Award, Shield, Zap, Globe, Coffee, 
  Menu, X, Search, Bell, Sun, Moon
} from 'lucide-react'

// react-icons (social icons)
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"

export default function BlogDetailPage() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setReadingProgress(progress)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setLoading(true)
    getBlog(slug)
      .then(res => {
        setBlog(res.data.blog)
        setRelated(res.data.related || [])
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePrint = () => {
    window.print()
  }

  // Loading State
  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50 transition-all duration-300" style={{ width: '0%' }}></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
        <div className="h-6 bg-gray-200 rounded-full w-32 mb-8" />
        <div className="h-12 bg-gray-200 rounded-2xl w-3/4 mb-4" />
        <div className="flex gap-4 mb-8">
          <div className="h-4 bg-gray-200 rounded-full w-24" />
          <div className="h-4 bg-gray-200 rounded-full w-32" />
        </div>
        <div className="aspect-video bg-gray-200 rounded-2xl mb-8" />
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded-full" style={{ width: `${Math.random() * 40 + 60}%` }} />
          ))}
        </div>
      </div>
    </div>
  )

  // Not Found State
  if (notFound) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
      <div className="text-center py-20 px-4">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-full mb-6">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">ApexEdgeGaming not found</h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">The article you're looking for doesn't exist or has been moved.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105">
          Back to ApexEdgeGaming
          <ArrowLeft size={18} />
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50 transition-all duration-300" style={{ width: `${readingProgress}%` }}></div>
      
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        
        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -right-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
          <div className="absolute bottom-0 -left-40 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-30 animate-pulse-slower"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-10 right-20 w-56 h-56 bg-yellow-500 rounded-full blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-10 left-20 w-56 h-56 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-float-delay"></div>
          
          {/* Noise Texture */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.03%22/%3E%3C/svg%3E')] opacity-50"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-100"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          
          {/* Back Button */}
          <div className="max-w-4xl mx-auto mb-8">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-purple-200 hover:text-white transition-all duration-300 group bg-white/10    backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/20"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to all articles</span>
            </Link>
          </div>

          {/* Main Content */}
          {/* 🔥 FULL HEADER SECTION */}
{/* 🔥 HERO SECTION */}
<div className="relative w-full min-h-[70vh] flex items-end overflow-hidden bg-black">

  {/* 🖼️ Background Image (optional) */}
  <img 
    src={blog.coverImage || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"} 
    alt="cover"
    className="absolute inset-0 w-full h-full object-cover opacity-40"
  />

  {/* 🌑 Dark Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

  {/* 🌈 Glow Effects */}
  <div className="absolute -top-20 left-10 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl"></div>
  <div className="absolute top-40 right-10 w-72 h-72 bg-pink-600/30 rounded-full blur-3xl"></div>

  {/* 📦 CONTENT */}
  <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-20">

    {/* CATEGORY */}
    {blog.category && (
      <div className="mb-6">
        <span 
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold backdrop-blur-md border border-white/20"
          style={{ backgroundColor: blog.category.color + '30', color: blog.category.color }}
        >
          <Sparkles size={14} />
          {blog.category.name}
        </span>
      </div>
    )}

    {/* 🧠 TITLE */}
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white mb-8 max-w-4xl">
      {blog.title}
    </h1>

    {/* ✍️ AUTHOR + META CARD */}
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-6 shadow-2xl max-w-4xl">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        {/* 👤 AUTHOR */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {blog.author?.name?.[0]}
            </div>
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          <div>
            <div className="text-white font-semibold">
              {blog.author?.name}
            </div>
            <div className="text-gray-300 text-sm">
              Senior Writer • 5+ years experience
            </div>
          </div>
        </div>

        {/* 📊 META */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-200">

          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
            <Calendar size={14} />
            {format(new Date(blog.createdAt), 'MMM d, yyyy')}
          </div>

          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
            <Clock size={14} />
            {blog.readTime} min read
          </div>

          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
            <Eye size={14} />
            {blog.views?.toLocaleString() || 0}
          </div>

        </div>

      </div>
    </div>

  </div>
</div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f8fafc" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Cover Image */}
        {blog.coverImage && (
          <div className="relative -mt-16 mb-12 z-10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl"></div>
            <img 
              src={blog.coverImage} 
              alt={blog.title} 
              className="w-full aspect-video object-cover rounded-2xl shadow-2xl" 
            />
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md rounded-full px-3 py-1 text-white text-xs">
              Featured Image
            </div>
          </div>
        )}

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                liked 
                  ? 'bg-red-50 text-red-600 shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Heart size={18} className={liked ? 'fill-red-600' : ''} />
              <span className="text-sm font-medium">{liked ? 'Liked' : 'Like'}</span>
            </button>
            
            <button 
              onClick={() => setSaved(!saved)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                saved 
                  ? 'bg-yellow-50 text-yellow-600 shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Bookmark size={18} className={saved ? 'fill-yellow-600' : ''} />
              <span className="text-sm font-medium">{saved ? 'Saved' : 'Save'}</span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowShare(!showShare)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
              >
                <Share2 size={18} />
                <span className="text-sm font-medium">Share</span>
              </button>
              
              {showShare && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-2 z-20 animate-fade-in-up min-w-[160px]">
                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg w-full transition">
                    <FaTwitter size={16} className="text-blue-400" />
                    <span className="text-sm">Twitter</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg w-full transition">
                    <FaFacebook size={16} className="text-blue-600" />
                    <span className="text-sm">Facebook</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg w-full transition">
                    <FaLinkedin size={16} className="text-blue-700" />
                    <span className="text-sm">LinkedIn</span>
                  </button>
                  <button onClick={handleCopyLink} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg w-full transition">
                    {copied ? <Check size={16} className="text-green-500" /> : <LinkIcon size={16} />}
                    <span className="text-sm">{copied ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
          >
            <Printer size={18} />
            <span className="text-sm font-medium">Print</span>
          </button>
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none 
          prose-headings:font-bold prose-headings:text-gray-900 
          prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
          prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-gray-800
          prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5
          prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline 
          prose-strong:text-gray-900 prose-strong:font-bold
          prose-li:text-gray-600 prose-li:mb-2
          prose-blockquote:border-l-4 prose-blockquote:border-l-purple-600 
          prose-blockquote:bg-purple-50 prose-blockquote:p-5 prose-blockquote:rounded-xl
          prose-blockquote:text-gray-700 prose-blockquote:italic
          prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
          prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-purple-600
          prose-pre:bg-gray-900 prose-pre:text-white prose-pre:p-5 prose-pre:rounded-xl prose-pre:overflow-x-auto">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {/* Tags Section */}
        {blog.tags?.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                <Tag size={16} className="text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Topics Covered</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {blog.tags.map(tag => (
                <Link 
                  key={tag} 
                  to={`/tag/${tag.toLowerCase()}`}
                  className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-purple-100 hover:text-purple-600 transition-all duration-300 transform hover:scale-105"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio Section */}
        {blog.author && (
          <div className="mt-12 p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl ring-4 ring-white">
                {blog.author.name?.[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-bold text-gray-900 text-xl">About {blog.author.name}</h4>
                  <Award size={18} className="text-purple-600" />
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">Verified Writer</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Passionate writer and expert in {blog.category?.name || 'technology'}. 
                  Sharing insights, knowledge, and experiences with the community for over 5 years.
                  Featured in leading publications and trusted by thousands of readers worldwide.
                </p>
                <div className="flex items-center gap-6">
                  <button className="text-purple-600 text-sm font-semibold hover:underline flex items-center gap-1">
                    View all posts →
                  </button>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Coffee size={12} />
                      <span>Writing since 2020</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award size={12} />
                      <span>Top Contributor</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-12 p-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border border-indigo-100 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 mb-5">
            <Mail size={14} className="text-purple-600" />
            <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Newsletter</span>
          </div>
          <h4 className="text-2xl font-bold text-gray-900 mb-3">Enjoyed this article?</h4>
          <p className="text-gray-600 text-base mb-6 max-w-md mx-auto">
            Get more insightful content delivered straight to your inbox. No spam, unsubscribe anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-5 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
            />
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              Subscribe Now
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4">Join 50,000+ subscribers • Free weekly newsletter</p>
        </div>
      </article>

      {/* Related Posts Section */}
      {related.length > 0 && (
        <section className="bg-gradient-to-br from-gray-50 to-white py-20 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
              <div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-2 mb-3">
                  <TrendingUp size={14} className="text-purple-600" />
                  <span className="text-purple-600 text-xs font-bold tracking-wider">Recommended Reading</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">You May Also Like</h3>
                <p className="text-gray-500 mt-2">Discover more articles you might enjoy reading</p>
              </div>
              <Link to="/blog" className="group mt-4 sm:mt-0 inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold text-lg">
                Browse All Articles
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((b, idx) => (
                <div key={b._id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <BlogCard blog={b} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3.5 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          title="Back to top"
        >
          <ChevronRight size={22} className="rotate-[-90deg] group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.15); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.2); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(15px); }
        }
        
        @keyframes float-delay {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-25px) translateX(-15px); }
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
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 10s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
          .animate-float, .animate-float-delay {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}