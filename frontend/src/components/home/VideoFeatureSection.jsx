import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'

const VIDEO_SRC = '/back.mp4'

const FEATURE_CARDS = [
  {
    image: 'game12.png',
    title: 'The premium hub for ApexEdge Gaming players.',
    cta: 'Learn More',
    to: '/blog',
    btnClass: 'bg-[#fcaf17] hover:bg-amber-500 text-black',
  },
  {
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&q=80&auto=format&fit=crop',
    title: 'Create your own personalized gaming profiles.',
    cta: 'Create Now',
    to: '/about',
    btnClass: 'bg-black/80 hover:bg-neutral-900 text-white border border-white/10',
  },
  {
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80&auto=format&fit=crop',
    title: 'A SAFEHOUSE IN THE HILLS — New exclusive content drop.',
    cta: 'Watch Trailer',
    to: '/blog',
    btnClass: 'bg-white text-black hover:bg-[#fcaf17]',
  },
  {
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80&auto=format&fit=crop',
    title: "See all the challenges you've completed in your gaming career.",
    cta: 'View Progress',
    to: '/blog',
    btnClass: 'bg-black/80 hover:bg-neutral-900 text-white border border-white/10',
  },
]

export default function VideoFeatureSection() {
  const sectionRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      
      // यह ट्रैक करता है कि यह सेक्शन स्क्रीन के टॉप से कितना ऊपर स्क्रॉल हुआ है
      const scrolled = Math.max(0, -rect.top)
      
      // प्रोग्रेस रेट को और धीमा और स्मूथ (vh * 1.2) किया गया है ताकि ब्लैक इफेक्ट अचानक न आए
      const progress = Math.min(1, scrolled / (vh * 1.2))
      setScrollProgress(progress)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // वीडियो स्क्रॉल होने पर हल्का सा ही धीमा होगा (1 से 0.4 तक ही जाएगा, पूरी तरह गायब नहीं होगा)
  const videoOpacity = 1 - scrollProgress * 0.6
  
  // शुरुआत में यह बिल्कुल 0 (पारदर्शी) रहेगा, जैसे-जैसे स्क्रॉल करेंगे यह धीरे-धीरे 0.85 (ब्लैक) तक बढ़ेगा
  const overlayDark = scrollProgress * 0.85 
  
  // टेक्स्ट स्क्रॉल के साथ बहुत ही स्मूथली फेड होगा
  const textOpacity = 1 - scrollProgress * 1.8

  return (
    <section ref={sectionRef} className="relative w-full bg-black">
      
      {/* Structural Styles */}
      <style>{`
        .rockstar-title-font {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.03em;
        }
      `}</style>

      {/* Sticky video window */}
      <div className="sticky top-0 z-0 h-screen w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full min-w-full min-h-full object-cover object-center"
          style={{ 
            opacity: videoOpacity, 
            transform: `scale(${1 + scrollProgress * 0.02})` 
          }}
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
        />
        
        {/* Dynamic Soft Fade-to-Black Layer Overlay */}
        <div
          className="absolute inset-0 bg-black transition-opacity duration-300 ease-out pointer-events-none"
          style={{ opacity: overlayDark }}
        />

        {/* Hero Text Content */}
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center transition-all duration-300"
          style={{ 
            opacity: Math.max(0, textOpacity),
            transform: `translateY(-${scrollProgress * 20}px)` // स्क्रॉल पर हल्का सा ऊपर की तरफ तैरता हुआ इफ़ेक्ट
          }}
        >
          <p className="text-[#fcaf17] text-xs font-black tracking-[0.3em] uppercase mb-3">
            ApexEdge Gaming
          </p>
          <h2 className="rockstar-title-font text-4xl sm:text-6xl lg:text-7xl text-white max-w-4xl leading-[0.95] mb-8 drop-shadow-2xl">
            Jump Into the <br />Ultimate Gaming World
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              to="/blog"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black font-black text-xs uppercase tracking-widest px-8 py-4 rounded hover:bg-[#fcaf17] transition-all"
            >
              <Play size={14} className="fill-black" />
              Watch Trailer
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-white text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded hover:bg-white hover:text-black transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Cards Sub-Section — वीडियो के ऊपर मक्खन की तरह स्क्रॉल होकर आएगी */}
      <div className="relative z-10 bg-[#0a0a0a] w-full border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h3 className="rockstar-title-font text-2xl text-white mb-10 tracking-tight">
            Jump Into ApexEdge Gaming
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURE_CARDS.map((card, idx) => (
              <div
                key={idx}
                className="relative flex flex-col justify-end overflow-hidden border border-neutral-900 bg-[#121212] min-h-[400px] group transition-all duration-300 hover:border-[#fcaf17]"
              >
                <img
                  src={card.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />

                <div className="relative z-20 flex flex-col items-center text-center px-5 pb-6 pt-24">
                  <p className="text-white text-sm font-bold leading-snug mb-5 max-w-[220px] tracking-wide drop-shadow-md">
                    {card.title}
                  </p>
                  <Link
                    to={card.to}
                    className={`inline-flex items-center justify-center w-full max-w-[180px] font-black text-xs uppercase tracking-widest py-3.5 rounded transition-all ${card.btnClass}`}
                  >
                    {card.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}