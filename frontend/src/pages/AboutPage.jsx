import { Link } from 'react-router-dom'
import {
  ArrowRight, Sparkles, Zap, Award, Users, BookOpen,
  Heart, Globe, Compass, Coffee, Target, Rocket,
  CheckCircle2, Mail, Phone, MapPin, Clock,
  Crown, Shield, Star, TrendingUp, Eye, MessageCircle
} from 'lucide-react'

import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { useState, useEffect } from 'react'

export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const stats = [
    { label: 'Happy Readers', value: '50K+', icon: <Users size={24} />, color: 'from-blue-500 to-cyan-500', description: 'Active monthly readers' },
    { label: 'Articles Published', value: '1,200+', icon: <BookOpen size={24} />, color: 'from-green-500 to-emerald-500', description: 'Quality content' },
    { label: 'Expert Writers', value: '150+', icon: <Award size={24} />, color: 'from-purple-500 to-pink-500', description: 'From around the world' },
    { label: 'Countries Reached', value: '80+', icon: <Globe size={24} />, color: 'from-orange-500 to-red-500', description: 'Global community' },
  ]

 const teamMembers = [
  { name: 'Aarav Sharma', role: 'Founder & CEO', bio: 'Former tech journalist with 10+ years of experience. Passionate about storytelling.', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', social: { twitter: '#', linkedin: '#' } },
  { name: 'Rohan Verma', role: 'Head of Content', bio: 'Award-winning writer and editor. Loves creating engaging narratives.', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', social: { twitter: '#', linkedin: '#' } },
  { name: 'Ananya Gupta', role: 'Creative Director', bio: 'Design enthusiast who believes in the power of visual storytelling.', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', social: { twitter: '#', linkedin: '#' } },
  { name: 'Karan Patel', role: 'Lead Developer', bio: 'Tech wizard building amazing experiences for our readers.', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', social: { twitter: '#', linkedin: '#' } },
  { name: 'Priya Singh', role: 'Community Manager', bio: 'Connecting with readers and building a thriving community.', avatar: 'https://randomuser.me/api/portraits/women/5.jpg', social: { twitter: '#', linkedin: '#' } },
  { name: 'Vikram Yadav', role: 'SEO Specialist', bio: 'Making sure our content reaches the right audience.', avatar: 'https://randomuser.me/api/portraits/men/6.jpg', social: { twitter: '#', linkedin: '#' } },
];

  const values = [
    { title: 'Quality First', icon: <Crown size={24} />, description: 'We never compromise on content quality. Every article goes through rigorous review.', color: 'from-yellow-500 to-orange-500' },
    { title: 'Community Driven', icon: <Users size={24} />, description: 'Our readers shape our content. We listen, adapt, and grow together.', color: 'from-blue-500 to-cyan-500' },
    { title: 'Innovation', icon: <Zap size={24} />, description: 'Always exploring new ways to deliver value and enhance user experience.', color: 'from-purple-500 to-pink-500' },
    { title: 'Integrity', icon: <Shield size={24} />, description: 'Honest, transparent, and ethical in everything we do.', color: 'from-green-500 to-emerald-500' },
  ]

  const milestones = [
    { year: '2020', title: 'Founded', description: 'ApexEdge Gaming started with a mission to democratize quality content.' },
    { year: '2021', title: '1,000 Readers', description: 'Reached our first 1,000 monthly readers milestone.' },
    { year: '2022', title: '50+ Writers', description: 'Expanded our team with writers from around the world.' },
    { year: '2023', title: '100K+ Readers', description: 'Hit 100,000 monthly readers across 80+ countries.' },
    { year: '2024', title: 'Premium Launch', description: 'Launched premium membership with exclusive content.' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      
      {/* Hero Section - Premium About Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -right-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
          <div className="absolute bottom-0 -left-40 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-30 animate-pulse-slower"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 mb-6 border border-white/20">
              <Sparkles size={14} className="text-yellow-300" />
              <span className="text-sm font-medium text-white">About ApexEdge Gaming</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-2xl">
              Our Story &{' '}
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Mission
              </span>
            </h1>
            <p className="text-purple-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              We're on a mission to democratize knowledge and connect curious minds through high-quality, 
              insightful content that inspires, educates, and empowers.
            </p>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f8fafc" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="group bg-white rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-all duration-300`}>
                <div className="text-white">{stat.icon}</div>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              <div className="text-xs text-gray-400 mt-2">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-1.5">
              <Compass size={14} className="text-purple-600" />
              <span className="text-purple-600 text-sm font-semibold">Our Journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The Story Behind ApexEdge Gaming</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              ApexEdge Gaming was born from a simple idea: everyone deserves access to high-quality, 
              well-researched content that enriches their lives and expands their horizons.
            </p>
            <p className="text-gray-500 leading-relaxed">
              What started as a small ApexEdge Gaming in 2020 has grown into a global community of writers, 
              thinkers, and curious minds. Today, we're proud to reach over 50,000 readers monthly 
              with content that matters.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img key={i} src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i}.jpg`} alt="" className="w-12 h-12 rounded-full ring-3 ring-white shadow-md" />
                ))}
              </div>
              <div>
                <div className="font-bold text-gray-900">Join 50,000+</div>
                <div className="text-sm text-gray-500">Monthly readers worldwide</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-purple-200 rounded-full blur-2xl opacity-50"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pink-200 rounded-full blur-2xl opacity-50"></div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" 
              alt="Our team collaborating" 
              className="relative rounded-2xl shadow-2xl w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-5">
                <Target size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower individuals through knowledge by delivering high-quality, 
                accessible, and engaging content that inspires action and sparks curiosity.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-5">
                <Rocket size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become the world's most trusted platform for insightful content, 
                connecting millions of curious minds through stories that matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-1.5 mb-4">
            <Star size={14} className="text-purple-600" />
            <span className="text-purple-600 text-sm font-semibold">Core Values</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Stand For</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Our guiding principles that shape everything we do
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => (
            <div key={idx} className="group bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-all duration-300`}>
                <div className="text-white">{value.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-1.5 mb-4">
              <Clock size={14} className="text-purple-600" />
              <span className="text-purple-600 text-sm font-semibold">Our Journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Milestones & Achievements</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Key moments that shaped our story
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 hidden md:block"></div>
            <div className="space-y-8">
              {milestones.map((milestone, idx) => (
                <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-6 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-1 md:text-right">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="text-3xl font-bold text-purple-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-500">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle2 size={20} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-1.5 mb-4">
            <Users size={14} className="text-purple-600" />
            <span className="text-purple-600 text-sm font-semibold">Meet the Team</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Minds Behind ApexEdge Gaming</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Passionate individuals dedicated to bringing you the best content
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-purple-600 text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{member.bio}</p>
                <div className="flex items-center justify-center gap-3">
                  <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                    <FaTwitter size={18} />
                  </a>
                  <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                    <FaLinkedin size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=80')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
            <div className="absolute top-0 -right-32 w-64 h-64 bg-white rounded-full blur-3xl opacity-10 animate-pulse-slow"></div>
            <div className="absolute bottom-0 -left-32 w-64 h-64 bg-purple-300 rounded-full blur-3xl opacity-10 animate-pulse-slower"></div>
            
            <div className="relative p-10 md:p-12 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 mb-6">
                <Mail size={16} className="text-white" />
                <span className="text-white text-sm font-semibold">Stay Connected</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">Join Our Community</h3>
              <p className="text-purple-100 text-base md:text-lg mb-8 max-w-md mx-auto">
                Subscribe to our newsletter and never miss an update from us.
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
                <div className="flex items-center gap-2 text-purple-200 text-xs"><CheckCircle2 size={12} /><span>No spam</span></div>
                <div className="flex items-center gap-2 text-purple-200 text-xs"><CheckCircle2 size={12} /><span>Unsubscribe anytime</span></div>
                <div className="flex items-center gap-2 text-purple-200 text-xs"><CheckCircle2 size={12} /><span>Free forever</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
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
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}