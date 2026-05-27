import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Play, Pause } from 'lucide-react'

const SLIDE_INTERVAL = 9000
const FADE_DURATION = 2000

const HERO_SLIDES = [
  {
    image: '/header3.png',
    label: 'APEXEDGE GAMING',
    title: 'Experience the Ultimate Gaming Ecosystem',
    primaryCta: { label: 'Watch Trailer', to: '/blog' },
    secondaryCta: { label: 'Learn More', to: '/about' },
  },
  {
    image: '/header1.png',
    label: 'LATEST INSIGHTS',
    title: 'Top-Tier Strategies & Developer Updates',
    primaryCta: { label: 'Explore Blog', to: '/blog' },
    secondaryCta: { label: 'Learn More', to: '/about' },
  },
  {
    image: '/header2.png',
    label: 'GAMING TECH',
    title: 'Immersive Stories from Global Expert Enthusiasts',
    primaryCta: { label: 'Start Reading', to: '/blog' },
    secondaryCta: { label: 'Contact Us', to: '/contactpage' },
  },
]

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const goToSlide = useCallback((index) => {
    setActiveIndex(index % HERO_SLIDES.length)
  }, [])

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length)
  }, [])

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(nextSlide, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [isPlaying, nextSlide])

  const slide = HERO_SLIDES[activeIndex]

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background slides */}
      <div className="absolute inset-0 w-full h-full">
        {HERO_SLIDES.map((item, index) => (
          <div
            key={index}
            className="absolute inset-0 w-full h-full transition-opacity ease-in-out"
            style={{
              opacity: activeIndex === index ? 1 : 0,
              transitionDuration: `${FADE_DURATION}ms`,
              zIndex: activeIndex === index ? 1 : 0,
            }}
          >
            <img
              src={item.image}
              alt=""
              className="w-full h-full object-cover object-center scale-100"
            />
          </div>
        ))}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col justify-end max-w-[100vw] px-4 sm:px-6 lg:px-12 pb-16 sm:pb-20 pt-24">
        <div className="max-w-2xl">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-white/80 uppercase mb-2 sm:mb-3">
            {slide.label}
          </p>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold text-white leading-tight tracking-tight mb-6 sm:mb-8">
            {slide.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              to={slide.primaryCta.to}
              className="inline-flex items-center justify-center gap-2 bg-[#c4a574] hover:bg-[#d4b584] text-black font-bold text-xs sm:text-sm px-5 sm:px-7 py-2.5 sm:py-3 rounded-full transition-colors"
            >
              <Play size={14} className="fill-black" />
              {slide.primaryCta.label}
            </Link>
            <Link
              to={slide.secondaryCta.to}
              className="inline-flex items-center justify-center border border-white/80 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm px-5 sm:px-7 py-2.5 sm:py-3 rounded-full transition-colors"
            >
              {slide.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Slider controls — bottom right */}
      <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-6 lg:right-12 z-20 flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => setIsPlaying((p) => !p)}
          className="text-white/90 hover:text-white transition-colors p-1"
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
        </button>

        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              className="h-[3px] rounded-full transition-all duration-500 bg-white/40 hover:bg-white/70"
              style={{
                width: activeIndex === index ? '32px' : '12px',
                backgroundColor: activeIndex === index ? '#fff' : undefined,
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}