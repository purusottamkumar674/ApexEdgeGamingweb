import { Link } from 'react-router-dom'
import {
  ArrowRight, Sparkles, Zap, Award, Users, BookOpen,
  Heart, Globe, Compass, Coffee, Target, Rocket,
  CheckCircle2, Mail, Phone, MapPin, Clock,
  Crown, Shield, Star, TrendingUp, Eye, MessageCircle,
  Quote, BadgeCheck, Infinity
} from 'lucide-react'

import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { useState, useEffect, useRef } from 'react'

export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [visibleSections, setVisibleSections] = useState({})

  const sliderImages = [
    "about2.png",
    "about1.png"
  ]

  const showcaseRows = [
    {
      id: 1,
      badge: "The Ultimate Gaming Hub",
      title: "ApexEdge Gaming Ecosystem",
      desc: "Welcome to the ultimate frontier of competitive media, granular performance mechanics, and underground gaming intelligence. We breakdown the barrier between hard-core frame analytics, esports statistics, and mainstream title news coverage.",
      subText: "Our platform processes live patch matrices and telemetry updates across all high-performance gaming ecosystems, keeping our competitive squad optimized.",
      img: "blog2.png",
      imageOnLeft: true
    },
    {
      id: 2,
      badge: "Esports Infrastructure Node",
      title: "Live Coverage & Match Analytics",
      desc: "Experience premier mechanical breakdowns of critical multi-tiered esports tournament brackets. We deploy live strategy frameworks, detailed map control indices, and performance streams to give you the ultimate edge in every encounter.",
      subText: "From localized open division trials to global major circuit championships, our analytical networks track game states frame-by-frame.",
      img: "blog1.png",
      imageOnLeft: false
    },
    {
      id: 3,
      badge: "Hardware Telemetry Labs",
      title: "Elite Optimization & Performance Labs",
      desc: "Our automated test-beds push the absolute limits of multi-threaded console processing, custom PC graphics rendering pipelines, and frame-pacing profiles. We benchmark structural assets so your system stays configured.",
      subText: "Unlock verified engine calibrations and drift-tuned controller mechanics engineered exclusively for next-generation gameplay execution pipelines.",
      img: "header2.png",
      imageOnLeft: true
    },
    {
      id: 4,
      badge: "The Tactical Archive",
      title: "Deep-Dive Strategy Databases",
      desc: "Assemble your competitive division alignment with complete data driven precision. Our metadata stores index complex mechanical utilities, execute tier calculations, and economic team tracking setups.",
      subText: "Leverage advanced hardware analytics to parse deep sandbox mechanics safely from distributed network server points.",
      img: "game1.png",
      imageOnLeft: false
    },
    {
      id: 5,
      badge: "Syndicate Alliance Network",
      title: "Global Creator Pipeline Integration",
      desc: "We coordinate a massive international ecosystem of competitive stream creators, structural mod developers, and broadcast analysts. Expand your digital presence using our tactical community nodes seamlessly.",
      subText: "Protect community distribution channels across validated server hubs to ensure uninterrupted asset transmission lines.",
      img: "game12.png",
      imageOnLeft: true
    },
    {
      id: 6,
      badge: "Alpha Meta Drops",
      title: "Secure Patch Drops & Analytical Intelligence",
      desc: "Dominate upcoming platform build updates by monitoring closed developer logs, balancing updates, and prototype weapon telemetry tables before they alter live tournament ecosystem metrics.",
      subText: "Optimize preparation sequences seamlessly to maintain high-priority performance values across global leaderboards.",
      img: "game13.png",
      imageOnLeft: false
    }
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [sliderImages.length])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [entry.target.dataset.section]: true }))
          }
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll('[data-section]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const stats = [
    { label: 'Active Gamers Reached', value: '50K+', icon: <Users size={22} />, color: '#a855f7', bg: 'rgba(168,85,247,0.12)', description: 'Monthly network active nodes' },
    { label: 'Tactical Intel Briefs', value: '1,200+', icon: <BookOpen size={22} />, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', description: 'Elite structural mechanics' },
    { label: 'Verified Meta Creators', value: '150+', icon: <Award size={22} />, color: '#ec4899', bg: 'rgba(236,72,153,0.12)', description: 'Pro broadcast tier partners' },
    { label: 'International Grid Nodes', value: '80+', icon: <Globe size={22} />, color: '#06b6d4', bg: 'rgba(6,182,212,0.12)', description: 'Global analytical scope' },
  ]

  const teamMembers = [
    { name: 'Aarav Sharma', role: 'Founder & Chief Commander', bio: 'Former esports analyst with 10+ years of gaming journalism depth. Passionate about structural narrative matrices.', avatar: 'aarav.png', social: { twitter: '#', linkedin: '#' } },
    { name: 'Rohan Verma', role: 'Head of Meta Intel', bio: 'Award-winning meta strategist. Specializes in multi-tiered competitive breakdowns and patch updates.', avatar: 'rohan.png', social: { twitter: '#', linkedin: '#' } },
    { name: 'Ananya Gupta', role: 'Creative Director', bio: 'Design enthusiast defining the raw cyberpunk aesthetic and interactive layout styles of ApexEdge.', avatar: 'ananya.png', social: { twitter: '#', linkedin: '#' } },
    { name: 'Karan Patel', role: 'Lead Engine Architect', bio: 'Tech wizard engineering real-time data pipelines and seamless network assets for our readers.', avatar: 'karan.png', social: { twitter: '#', linkedin: '#' } },
    { name: 'Priya Singh', role: 'Syndicate Operator', bio: 'Connecting millions of global players and building a thriving community network layer.', avatar: 'priya.png', social: { twitter: '#', linkedin: '#' } },
    { name: 'Vikram Yadav', role: 'Algorithmic Specialist', bio: 'Optimizing data infrastructure lines ensuring gaming analytics always hit the core target audience.', avatar: 'vikram.png', social: { twitter: '#', linkedin: '#' } },
  ]

  const values = [
    { title: 'Absolute Precision', icon: <Crown size={22} />, description: 'We never compromise on meta accuracy. Every frame and mechanic undergoes rigorous strategy review.', accent: '#f59e0b' },
    { title: 'Syndicate First', icon: <Users size={22} />, description: 'Our community shapes the platform. We scale alongside the world\'s most passionate gamers.', accent: '#a855f7' },
    { title: 'Next-Gen Innovation', icon: <Zap size={22} />, description: 'Always tracking upcoming frameworks, graphic pipelines, and mechanical breakthrough elements.', accent: '#ec4899' },
    { title: 'Uncompromising Truth', icon: <Shield size={22} />, description: 'Honest, completely un-biased reviews, and ethical coverage of industry developments.', accent: '#06b6d4' },
  ]

  const milestones = [
    { year: '2022', title: 'System Initialization', description: 'ApexEdge Gaming deployed its primary node to democratize premium meta analysis.' },
    { year: '2023', title: 'Tactical Expansion', description: 'Integrated our secondary databanks, hitting over 1,000 active monthly players.' },
    { year: '2024', title: 'Global Grid Established', description: 'Expanded the editorial squadron with elite content creators from around the world.' },
    { year: '2025', title: '100K Syndicate Inflow', description: 'Hit the massive milestone of 100,000 global server queries across 80+ active nations.' },
    { year: '2026', title: 'Premium Node Deployment', description: 'Launched closed-alpha access memberships containing secure strategic drafting modules.' },
  ]

  return (
    <div className="min-h-screen text-white font-sans overflow-hidden selection:bg-amber-500 selection:text-black" style={{ background: '#060608' }}>

      {/* ── HERO ── */}
      <div className="relative h-screen w-full overflow-hidden">
        {sliderImages.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-all duration-[1500ms] ease-in-out"
            style={{
              backgroundImage: `url('${img}')`,
              opacity: currentSlide === i ? 1 : 0,
              transform: currentSlide === i ? 'scale(1)' : 'scale(1.06)',
            }}
          />
        ))}

        {/* layered overlays */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(6,6,8,0.3) 0%, rgba(6,6,8,0.1) 40%, rgba(6,6,8,0.85) 80%, #060608 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(168,85,247,0.08) 0%, transparent 70%)' }} />

        {/* noise texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`, backgroundSize: '200px' }} />

        {/* scanning line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.015]">
          <div className="scanlines" />
        </div>

        {/* content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pb-24 px-4 z-10">
          <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-zinc-300 text-xs font-semibold tracking-[0.2em] uppercase">Established 2022 · Global HQ</span>
          </div>

          <h1 className="text-center text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.92] mb-6 uppercase">
            <span className="block text-white">The Supreme Node of</span>
            <span className="block" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 40%, #eab308 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Gaming Intel
            </span>
          </h1>

          <p className="text-center text-zinc-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10 font-medium">
            Deconstructing hardware telemetry, patch configurations, and strategic meta blueprints across international digital grids.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {sliderImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className="transition-all duration-500 rounded-full"
                  style={{
                    width: currentSlide === i ? '36px' : '8px',
                    height: '8px',
                    background: currentSlide === i ? '#f59e0b' : 'rgba(255,255,255,0.25)',
                  }}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-50">
          <span className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-zinc-500 to-transparent animate-pulse" />
        </div>

        <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#060608" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>

      {/* ── STATS ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 -mt-6 mb-24"
           data-section="stats"
           style={{ opacity: visibleSections['stats'] ? 1 : 0, transform: visibleSections['stats'] ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                transitionDelay: `${idx * 80}ms`,
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ background: `radial-gradient(circle at 30% 30%, ${stat.bg} 0%, transparent 70%)` }} />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: stat.bg, color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-black text-white mb-1 tracking-tight">{stat.value}</div>
                <div className="text-sm font-semibold text-zinc-300 mb-1">{stat.label}</div>
                <div className="text-xs text-zinc-600">{stat.description}</div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── SHOWCASE ROWS ── */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-28">
        {showcaseRows.map((row, idx) => (
          <div
            key={row.id}
            data-section={`row-${row.id}`}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            style={{
              opacity: visibleSections[`row-${row.id}`] ? 1 : 0,
              transform: visibleSections[`row-${row.id}`] ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {/* image */}
            <div className={`relative rounded-2xl overflow-hidden group ${row.imageOnLeft ? 'lg:order-1' : 'lg:order-2'}`}
                 style={{ aspectRatio: '16/10' }}>
              <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)' }} />
              <img
                src={row.img}
                alt={row.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* corner accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-500/60 z-20 rounded-tl-sm" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-500/60 z-20 rounded-br-sm" />
              {/* badge on image */}
              <div className="absolute bottom-5 left-5 z-20 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase"
                   style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(245,158,11,0.4)', color: '#f59e0b', backdropFilter: 'blur(8px)' }}>
                {row.badge}
              </div>
            </div>

            {/* text */}
            <div className={`space-y-5 ${row.imageOnLeft ? 'lg:order-2' : 'lg:order-1'}`}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-[2px]" style={{ background: 'linear-gradient(90deg, #f59e0b, transparent)' }} />
                <span className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase">{row.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
                {row.title}
              </h2>
              <p className="text-zinc-300 leading-relaxed text-base">{row.desc}</p>
              <p className="text-zinc-500 text-sm leading-relaxed border-l-2 border-zinc-800 pl-4">{row.subText}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── MISSION & VISION ── */}
      <section
        className="relative py-24 mt-16"
        data-section="mission"
        style={{
          background: 'linear-gradient(180deg, #060608 0%, rgba(15,10,25,0.8) 50%, #060608 100%)',
          opacity: visibleSections['mission'] ? 1 : 0,
          transform: visibleSections['mission'] ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease',
        }}
      >
        {/* divider line */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.3) 50%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.2) 50%, transparent 100%)' }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: <Target size={24} />, label: 'Our Mission', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', text: 'To empower individuals through knowledge by delivering high-quality, accessible, and engaging gaming content that inspires strategy and sparks tactical performance.' },
              { icon: <Rocket size={24} />, label: 'Our Vision', color: '#a855f7', bg: 'rgba(168,85,247,0.1)', text: 'To become the world\'s most trusted network platform for insightful analytics, connecting millions of competitive minds through data structures that matter.' },
            ].map((item, idx) => (
              <div key={idx} className="group relative rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1"
                   style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${item.color}80, ${item.color}20, transparent)` }} />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: item.bg, color: item.color }}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-white mb-3 tracking-tight">{item.label}</h3>
                <p className="text-zinc-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section
        className="relative py-24 max-w-6xl mx-auto px-4 sm:px-6"
        data-section="values"
        style={{
          opacity: visibleSections['values'] ? 1 : 0,
          transform: visibleSections['values'] ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease',
        }}
      >
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Star size={13} className="text-amber-500" />
            <span className="text-zinc-400 text-xs font-bold uppercase tracking-[0.2em]">Syndicate Directives</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">What We Stand For</h2>
          <p className="text-zinc-500 mt-3 max-w-lg mx-auto">Our guiding principles that shape every analytical post we publish</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl p-6 text-center overflow-hidden transition-all duration-500 hover:-translate-y-2"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', transitionDelay: `${idx * 70}ms` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 0%, ${v.accent}15 0%, transparent 60%)` }} />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: `linear-gradient(90deg, transparent, ${v.accent}, transparent)` }} />
              <div className="relative w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: `${v.accent}18`, color: v.accent }}>
                {v.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2 tracking-tight">{v.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section
        className="relative py-24"
        data-section="timeline"
        style={{
          background: 'rgba(255,255,255,0.015)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          opacity: visibleSections['timeline'] ? 1 : 0,
          transform: visibleSections['timeline'] ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Clock size={13} className="text-purple-400" />
              <span className="text-zinc-400 text-xs font-bold uppercase tracking-[0.2em]">Our Evolution Logs</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Milestones & Achievements</h2>
            <p className="text-zinc-500 mt-3">Key operational phases that shaped our platform architecture</p>
          </div>

          <div className="relative">
            {/* center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block" style={{ background: 'linear-gradient(180deg, transparent, rgba(168,85,247,0.4) 10%, rgba(168,85,247,0.4) 90%, transparent)' }} />

            <div className="space-y-10">
              {milestones.map((m, idx) => (
                <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-6 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                     style={{ opacity: visibleSections['timeline'] ? 1 : 0, transform: visibleSections['timeline'] ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.6s ease ${idx * 100 + 200}ms` }}>
                  <div className="flex-1">
                    <div className={`rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                         style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="text-3xl font-black mb-2" style={{ color: '#a855f7' }}>{m.year}</div>
                      <h3 className="text-lg font-bold text-white mb-1">{m.title}</h3>
                      <p className="text-zinc-500 text-sm leading-relaxed">{m.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.15)', border: '2px solid rgba(168,85,247,0.5)' }}>
                      <CheckCircle2 size={18} style={{ color: '#a855f7' }} />
                    </div>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section
        className="relative py-24 max-w-6xl mx-auto px-4 sm:px-6"
        data-section="team"
        style={{
          opacity: visibleSections['team'] ? 1 : 0,
          transform: visibleSections['team'] ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease',
        }}
      >
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Users size={13} className="text-amber-500" />
            <span className="text-zinc-400 text-xs font-bold uppercase tracking-[0.2em]">Command Syndicate</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">The Minds Behind ApexEdge Gaming</h2>
          <p className="text-zinc-500 mt-3">Passionate industry operatives dedicated to rendering absolute precision analytics</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                transitionDelay: `${idx * 60}ms`,
              }}
            >
              {/* image with overlay */}
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(6,6,8,0.95) 100%)' }} />
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {/* role pill on image */}
                <div className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase"
                     style={{ background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.4)', color: '#c084fc', backdropFilter: 'blur(8px)' }}>
                  {member.role}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <a href={member.social.twitter} className="text-zinc-600 hover:text-white transition-colors">
                      <FaTwitter size={15} />
                    </a>
                    <a href={member.social.linkedin} className="text-zinc-600 hover:text-white transition-colors">
                      <FaLinkedin size={15} />
                    </a>
                  </div>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed">{member.bio}</p>
              </div>

              {/* bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent)' }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section
        className="relative py-20 px-4 sm:px-6"
        data-section="newsletter"
        style={{
          opacity: visibleSections['newsletter'] ? 1 : 0,
          transform: visibleSections['newsletter'] ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease',
        }}
      >
        <div className="max-w-3xl mx-auto relative rounded-3xl overflow-hidden p-10 md:p-14 text-center"
             style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {/* glows */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)' }} />
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.5) 50%, transparent)' }} />

          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}>
              <Mail size={14} className="text-amber-400" />
              <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em]">Sync Updates Feed</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">Join the Syndicate Feed</h3>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto">Subscribe to our secure transmission matrix and never miss a tactical alpha analysis patch line.</p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter encrypted email coordinate"
                className="flex-1 px-5 py-3.5 rounded-full text-white text-sm placeholder-zinc-600 outline-none transition-all duration-300 focus:ring-2 focus:ring-amber-500/50"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
              <button className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                      style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)', color: '#000' }}>
                Initialize Sync
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 mt-6">
              {['Encrypted Transmission', 'Disconnect Anytime'].map((txt, i) => (
                <div key={i} className="flex items-center gap-1.5 text-zinc-600 text-xs">
                  <CheckCircle2 size={11} className="text-amber-500" />
                  <span>{txt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scroll { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(10px);opacity:0} }
        .scanlines {
          width: 100%; height: 100%;
          background: repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 3px);
        }
      `}</style>
    </div>
  )
}