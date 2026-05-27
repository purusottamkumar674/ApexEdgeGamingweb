import { useState, useEffect, useCallback } from 'react'
import { getBlogs } from '../utils/api'
import HomePageStyles from '../components/home/HomePageStyles'
import HeroSection from '../components/home/HeroSection'
import NewswireSection from '../components/home/NewswireSection'
import VideoFeatureSection from '../components/home/VideoFeatureSection'
import FreshBlogsGrid from '../components/home/FreshBlogsGrid'
import CategoriesSection from '../components/home/CategoriesSection'
import TrendingSignupSection from '../components/home/TrendingSignupSection'
import NewsletterCTA from '../components/home/NewsletterCTA'
import TestimonialsSection from '../components/home/TestimonialsSection'
import CookieConsentBar from '../components/home/CookieConsentBar'

export default function HomePage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCookieConsent, setShowCookieConsent] = useState(true)

  const apiOrigin = (import.meta.env.VITE_API_URL || 'https://apexedgegamingweb.onrender.com/api').replace(/\/api\/?$/, '')

  const resolveCoverUrl = useCallback((url) => {
    if (!url) return ''
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    if (url.startsWith('/')) return `${apiOrigin}${url}`
    return `${apiOrigin}/${url}`
  }, [apiOrigin])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsRes = await getBlogs({ limit: 6, page: 1 })
        setBlogs(blogsRes.data.blogs || [])
      } catch (err) {
        console.error("Error fetching homepage data:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const recentPosts = blogs.slice(0, 6)
  const newswirePosts = blogs.slice(0, 5)

  const categories = [
    { name: 'Technology', icon: '💻', count: 234, description: 'Latest tech trends' },
    { name: 'Lifestyle', icon: '🌿', count: 156, description: 'Wellness & living' },
    { name: 'Design', icon: '🎨', count: 98, description: 'Creative inspiration' },
    { name: 'Business', icon: '📊', count: 87, description: 'Entrepreneurship' },
    { name: 'Marketing', icon: '📈', count: 76, description: 'Growth strategies' },
  ]

  const testimonials = [
    { 
      name: 'Aarav Sharma', 
      role: 'Lead Esports Analyst', 
      text: "Bhai sach bataun toh is platform ke walkthroughs aur strategies ekdam next-level hain. GTA 6 ke specs updates sabse pehle yahi milte hain.", 
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg', 
      company: 'GodLike Esports' 
    },
    { 
      name: 'Rohan Verma', 
      role: 'Pro IGL (In-Game Leader)', 
      text: 'Esports tournaments ki aisi depth coverage poore India me kahin nahi hai. Is community ki madad se hamari team ki kaafi growth hui hai.', 
      avatar: 'boy.png', 
      company: 'Team Soul Matrix' 
    },
    { 
      name: 'Ananya Iyer', 
      role: 'Gaming Content Creator', 
      text: "Mera toh ye daily go-to platform ban chuka hai. Naye game mechanics aur walkthroughs ke liye isse behtar aur authentic jagah koi nahi hai.", 
      avatar: 'girls.png', 
      company: 'ApexEdge Streams' 
    }
  ]
  
  const trendingTopics = [
    { name: 'Esports Tournaments', posts: 234, trend: '+45%', icon: '🏆' },
    { name: 'PC & Console Hardware', posts: 189, trend: '+32%', icon: '🎮' },
    { name: 'Game Design & Mechanics', posts: 156, trend: '+28%', icon: '🕹️' },
    { name: 'Streaming Culture', posts: 98, trend: '+67%', icon: '🎥' },
    { name: 'Gaming Communities', posts: 76, trend: '+41%', icon: '👥' }
  ]

  return (
    <div className="min-h-screen bg-black text-white select-none antialiased font-sans">
      <HomePageStyles />

      <HeroSection />

      <NewswireSection
        blogs={newswirePosts}
        loading={loading}
        resolveCoverUrl={resolveCoverUrl}
      />

      <VideoFeatureSection />

      <FreshBlogsGrid
        loading={loading}
        recentPosts={recentPosts}
        resolveCoverUrl={resolveCoverUrl}
      />

      <CategoriesSection categories={categories} />

      <TrendingSignupSection trendingTopics={trendingTopics} />

      <NewsletterCTA />

      <TestimonialsSection testimonials={testimonials} />

      <CookieConsentBar
        showCookieConsent={showCookieConsent}
        setShowCookieConsent={setShowCookieConsent}
      />
    </div>
  )
}
