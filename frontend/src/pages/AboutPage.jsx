import { Link } from 'react-router-dom'
import {
  ArrowRight, Sparkles, Zap, Award, Users, BookOpen,
  Heart, Globe, Compass, Coffee, Target, Rocket,
  CheckCircle2, Mail, Phone, MapPin, Clock,
  Crown, Shield, Star, TrendingUp, Eye, MessageCircle,
  Quote, BadgeCheck, Infinity
} from 'lucide-react'

import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { useState, useEffect } from 'react'

export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Array of images for the background header slider
  const sliderImages = [
    "about2.png",
    "about1.png"
  ]

  // Balanced 6 structural alternating rows (1: Image Left, 2: Image Right, 3: Image Left...)
  const showcaseRows = [
    {
      id: 1,
      badge: "Welcome to Los Santos",
      title: "Grand Theft Auto V",
      desc: "When a young street hustler, a retired bank robber, and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the criminal underworld, the U.S. government, and the entertainment industry, they must pull off a series of dangerous heists to survive.",
      subText: "GTAV players on PC can migrate their Story Mode progress and GTA Online characters and progression to the newly upgraded version with a one-time migration matrix system.",
      img: "blog2.png", 
      imageOnLeft: true // Row 1: Image Left, Text Right
    },
    {
      id: 2,
      badge: "Ever-Evolving Universe",
      title: "Grand Theft Auto Online",
      desc: "Experience GTA Online, a dynamic and ever-evolving online universe for up to 30 players, where you can rise from street-level hustler to become a kingpin of your own massive criminal empire.",
      subText: "Enjoy new high-performance vehicle upgrades and improvements like the Career Builder as well as all GTA Online gameplay upgrades, expansions, and content released since launch.",
      img: "blog1.png",
      imageOnLeft: false // Row 2: Text Left, Image Right
    },
    {
      id: 3,
      badge: "Los Santos Car Meet",
      title: "Exclusive New Content",
      desc: "Step into Hao's Special Works at the Los Santos Car Meet, featuring elite new upgrades and exclusive modifications. Take these high-performance vehicles into HSW races, new time trials, and more.",
      subText: "Unlock premium performance calibrations and drift-tuned specifications engineered exclusively for next-generation framework execution pipelines.",
      img: "header2.png",
      imageOnLeft: true // Row 3: Image Left, Text Right
    },
    {
      id: 4,
      badge: "Heists & Dominance",
      title: "Master Strategic Operations",
      desc: "Assemble your crew and execute complex multi-tiered operational strikes. Coordinate across high-tech tactical hubs to target secure installations and decrypt global network nodes for ultimate rewards.",
      subText: "Leverage advanced hardware support networks to manage high-yield ventures from safe locations concealed throughout urban grid structures.",
      img: "game1.png",
      imageOnLeft: false // Row 4: Text Left, Image Right
    },
    {
      id: 5,
      badge: "Corporate Enterprise",
      title: "Executive Networks",
      desc: "Establish your corporate headquarters, customize trading vaults, and manage commercial infrastructure networks. Protect assets from competitive trade syndicates through robust security configurations.",
      subText: "Expand resource generation channels seamlessly by coordinating supply runs across multiple secure storage nodes distributed globally.",
      img: "game12.png",
      imageOnLeft: true // Row 5: Image Left, Text Right
    },
    {
      id: 6,
      badge: "Elite Underworld",
      title: "Nightlife & Underground Empires",
      desc: "Dominate the underground network lines by operating premier hubs, tracking freight chains, and managing automated inventory storage layers. Streamline operations to keep supply structures solid.",
      subText: "Optimize operational scaling to secure continuous high-priority data and capital flow generation without interruption.",
      img: "game13.png",
      imageOnLeft: false // Row 6: Text Left, Image Right
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-advance slider every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [sliderImages.length])

  const stats = [
    { label: 'Happy Readers', value: '50K+', icon: <Users size={24} />, color: 'from-purple-500 to-indigo-500', description: 'Active monthly readers' },
    { label: 'Articles Published', value: '1,200+', icon: <BookOpen size={24} />, color: 'from-amber-500 to-orange-500', description: 'Quality content' },
    { label: 'Expert Writers', value: '150+', icon: <Award size={24} />, color: 'from-pink-500 to-rose-500', description: 'From around the world' },
    { label: 'Countries Reached', value: '80+', icon: <Globe size={24} />, color: 'from-cyan-500 to-blue-500', description: 'Global community' },
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
    { title: 'Quality First', icon: <Crown size={24} />, description: 'We never compromise on content quality. Every article goes through rigorous review.', color: 'from-amber-500 to-orange-500' },
    { title: 'Community Driven', icon: <Users size={24} />, description: 'Our readers shape our content. We listen, adapt, and grow together.', color: 'from-purple-500 to-indigo-500' },
    { title: 'Innovation', icon: <Zap size={24} />, description: 'Always exploring new ways to deliver value and enhance user experience.', color: 'from-pink-500 to-rose-500' },
    { title: 'Integrity', icon: <Shield size={24} />, description: 'Honest, transparent, and ethical in everything we do.', color: 'from-cyan-500 to-blue-500' },
  ]

  const milestones = [
    { year: '2020', title: 'Founded', description: 'ApexEdge Gaming started with a mission to democratize quality content.' },
    { year: '2021', title: '1,000 Readers', description: 'Reached our first 1,000 monthly readers milestone.' },
    { year: '2022', title: '50+ Writers', description: 'Expanded our team with writers from around the world.' },
    { year: '2023', title: '100K+ Readers', description: 'Hit 100,000 monthly readers across 80+ countries.' },
    { year: '2024', title: 'Premium Launch', description: 'Launched premium membership with exclusive content.' },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans overflow-hidden selection:bg-amber-500 selection:text-black">
      
      {/* Hero Section - STRICT 110vh BACKGROUND */}
      <div className="relative overflow-hidden h-[110vh] w-full bg-slate-900">
        
        {/* Full Screen Image Layer Stretched Perfectly */}
        <div className="absolute inset-0 w-full h-full">
          {sliderImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              } transition-transform duration-[4000ms]`}
              style={{ backgroundImage: `url('${img}')` }}
            />
          ))}
        </div>
        
        {/* Subtle dynamic background highlights overlay */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-0 -right-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10 animate-pulse-slow"></div>
          <div className="absolute bottom-0 -left-40 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-10 animate-pulse-slower"></div>
          
          {/* Transparent Grid Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-100"></div>
        </div>
        
        {/* UI Controls Layer */}
        <div className="absolute inset-x-0 bottom-0 z-20 pb-28 flex flex-col items-center justify-end h-full bg-gradient-to-t from-zinc-950 via-transparent to-transparent">
          
          {/* Big & Bold Slider Indicators */}
          <div className="flex gap-3 backdrop-blur-md bg-black/10 px-4 py-2 rounded-full border border-white/10">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-12 shadow-lg' : 'bg-white/30 hover:bg-white/60'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white/80 rounded-full mt-2 animate-scroll"></div>
            </div>
          </div>
        </div>
        
        {/* Smooth Transition Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto min-h-[40px]">
            <path fill="#09090b" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Premium Content Body Wrapper - Smoky Background Image Overlay Layer */}
      <div className="relative w-full bg-zinc-950">
        
        {/* Dynamic Slow Motion Smoke Effect Layer */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10 bg-no-repeat bg-cover mix-blend-screen animate-smoke" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80')" }}></div>
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-5 bg-no-repeat bg-cover mix-blend-color-dodge animate-smoke-reverse" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&q=80')" }}></div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="group bg-zinc-900/60 backdrop-blur-md rounded-2xl p-6 text-center shadow-2xl border border-zinc-800/80 transition-all duration-500 hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-all duration-300`}>
                  <div className="text-white">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-white tracking-tight">{stat.value}</div>
                <div className="text-sm text-zinc-400 mt-1 font-medium">{stat.label}</div>
                <div className="text-xs text-zinc-500 mt-2">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 6 strictly alternating Left-Right Rockstar Style Image Showcases Grid Layout */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
          {showcaseRows.map((row) => (
            <div 
              key={row.id} 
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Media Block (Order changed strictly based on row layout boolean) */}
              <div className={`lg:col-span-5 relative w-full h-[400px] overflow-hidden rounded-2xl group border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm ${
                row.imageOnLeft ? 'lg:order-1' : 'lg:order-2'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-10 transition-opacity duration-300 group-hover:opacity-40"></div>
                <img 
                  src={row.img} 
                  alt={row.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Text Block (Fills empty side smoothly using standard order matrix tokens) */}
              <div className={`lg:col-span-7 space-y-6 ${
                row.imageOnLeft ? 'lg:order-2 lg:pl-8' : 'lg:order-1 lg:pr-8'
              }`}>
                <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 shadow-lg">
                  <Sparkles size={14} className="text-amber-500 animate-pulse" />
                  <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">{row.badge}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  {row.title}
                </h2>
                <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-medium">
                  {row.desc}
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {row.subText}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Mission & Vision */}
        <section className="relative z-10 bg-gradient-to-br from-zinc-950 via-zinc-900/30 to-zinc-950 py-24 border-t border-b border-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-zinc-900/40 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-zinc-800/80 transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-orange-500/10">
                  <Target size={28} className="text-black font-black" />
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight mb-3">Our Mission</h3>
                <p className="text-zinc-400 leading-relaxed font-medium">
                  To empower individuals through knowledge by delivering high-quality, 
                  accessible, and engaging content that inspires action and sparks curiosity.
                </p>
              </div>
              <div className="bg-zinc-900/40 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-zinc-800/80 transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-purple-500/10">
                  <Rocket size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight mb-3">Our Vision</h3>
                <p className="text-zinc-400 leading-relaxed font-medium">
                  To become the world's most trusted platform for insightful content, 
                  connecting millions of curious minds through stories that matter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 mb-4">
              <Star size={14} className="text-amber-500" />
              <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Core Values</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">What We Stand For</h2>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-medium">
              Our guiding principles that shape everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="group bg-zinc-900/20 rounded-2xl p-6 text-center border border-zinc-900 hover:border-zinc-800/80 transition-all duration-500 hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-all duration-300`}>
                  <div className="text-white">{value.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-zinc-100 mb-3">{value.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="relative z-10 bg-zinc-950 py-24 border-t border-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 mb-4">
                <Clock size={14} className="text-purple-400" />
                <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Our Journey</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">Milestones & Achievements</h2>
              <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-medium">
                Key moments that shaped our story
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-zinc-800 hidden md:block"></div>
              <div className="space-y-12">
                {milestones.map((milestone, idx) => (
                  <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-6 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="flex-1 md:text-right">
                      <div className="bg-zinc-900/40 backdrop-blur-md rounded-2xl p-6 border border-zinc-900 hover:border-zinc-800 transition-all duration-300 hover:-translate-y-1 shadow-2xl">
                        <div className="text-3xl font-black text-purple-400 mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold text-zinc-100 mb-2">{milestone.title}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle2 size={20} className="text-amber-500" />
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
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 mb-4">
              <Users size={14} className="text-amber-500" />
              <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Meet the Team</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">The Minds Behind ApexEdge Gaming</h2>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-medium">
              Passionate individuals dedicated to bringing you the best content
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="group bg-zinc-900/30 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-zinc-900 hover:border-zinc-800/80">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-zinc-100 mb-1">{member.name}</h3>
                  <p className="text-purple-400 text-sm font-semibold mb-3">{member.role}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex items-center justify-center gap-3">
                    <a href={member.social.twitter} className="text-zinc-500 hover:text-white transition-colors transform hover:scale-110">
                      <FaTwitter size={18} />
                    </a>
                    <a href={member.social.linkedin} className="text-zinc-500 hover:text-white transition-colors transform hover:scale-110">
                      <FaLinkedin size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="relative z-10 bg-zinc-950 py-24 border-t border-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-zinc-900/40 border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=80')] bg-cover bg-center mix-blend-overlay opacity-5"></div>
              <div className="absolute top-0 -right-32 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-5 animate-pulse-slow"></div>
              <div className="absolute bottom-0 -left-32 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-5 animate-pulse-slower"></div>
              
              <div className="relative p-12 md:p-16 text-center">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-6 py-2.5 mb-6">
                  <Mail size={16} className="text-amber-500" />
                  <span className="text-zinc-300 text-sm font-bold uppercase tracking-wider">Stay Connected</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">Join Our Community</h3>
                <p className="text-zinc-400 text-base md:text-lg mb-8 max-w-md mx-auto font-medium">
                  Subscribe to our newsletter and never miss an update from us.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-3.5 rounded-full text-white bg-zinc-950 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-500 outline-none placeholder-zinc-600 font-medium"
                  />
                  <button className="bg-white text-black px-8 py-3.5 rounded-full font-bold hover:bg-zinc-200 transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center group">
                    Subscribe Now
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold"><CheckCircle2 size={12} className="text-amber-500" /><span>No spam</span></div>
                  <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold"><CheckCircle2 size={12} className="text-amber-500" /><span>Unsubscribe anytime</span></div>
                  <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold"><CheckCircle2 size={12} className="text-amber-500" /><span>Free forever</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <style>{`
        @keyframes smokeMovement {
          0% { transform: scale(1) translate(0px, 0px) rotate(0deg); opacity: 0.08; }
          50% { transform: scale(1.08) translate(20px, -15px) rotate(3deg); opacity: 0.12; }
          100% { transform: scale(1) translate(0px, 0px) rotate(0deg); opacity: 0.08; }
        }
        @keyframes smokeMovementReverse {
          0% { transform: scale(1.05) translate(0px, 0px) rotate(0deg); opacity: 0.04; }
          50% { transform: scale(1) translate(-15px, 20px) rotate(-2deg); opacity: 0.07; }
          100% { transform: scale(1.05) translate(0px, 0px) rotate(0deg); opacity: 0.04; }
        }
        .animate-smoke {
          animation: smokeMovement 12s ease-in-out infinite;
        }
        .animate-smoke-reverse {
          animation: smokeMovementReverse 16s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.08; transform: scale(1); }
          50% { opacity: 0.12; transform: scale(1.03); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.08; transform: scale(1); }
          50% { opacity: 0.12; transform: scale(1.05); }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
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