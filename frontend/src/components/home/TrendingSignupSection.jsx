import { Link } from 'react-router-dom'

export default function TrendingSignupSection() {
  
  // 1. UPAR WALI MARQUEE KI 8 ALAG IMAGES
  const topImages = [
    "game1.png",
    "game2.png",
    "game3.png",
    "game4.png",
    "game5.png",
    "game6.png",
    "game7.png",
    "game8.png",
    
  ];

  // 2. NICHE WALI MARQUEE KI 8 ALAG IMAGES
  const bottomImages = [
   "game9.png",
    "game12.png",
    "game13.png",
    "game14.png",
    "game15.png",
    "game16.png",
    "game10.png",
    "game11.png",
  ];

  return (
    <section className="w-full py-12 bg-transparent overflow-hidden flex flex-col gap-12">
      
      {/* 1. UPAR WALI MARQUEE (OPTIMIZED SIZE) */}
      <div className="w-full overflow-hidden whitespace-nowrap relative select-none">
        <div className="inline-block animate-marquee flex gap-6 w-max">
          {/* Size ko thoda kam kiya: w-[300px] md:w-[480px] */}
          {topImages.map((img, index) => (
            <img 
              key={`top-1-${index}`} 
              src={img} 
              alt="trending top" 
              className="w-[300px] h-40 md:w-[380px] md:h-60 object-cover rounded-xl border border-zinc-800/40 shadow-xl" 
            />
          ))}
          {/* Loop 2: Duplicate for seamless loop */}
          {topImages.map((img, index) => (
            <img 
              key={`top-2-${index}`} 
              src={img} 
              alt="trending top duplicate" 
              className="w-[300px] h-40 md:w-[480px] md:h-60 object-cover rounded-xl border border-zinc-800/40 shadow-xl" 
            />
          ))}
        </div>
      </div>

      {/* 2. NICHE WALI MARQUEE SECTION */}
      <div className="w-full relative px-4 md:px-12 min-h-[220px] md:min-h-[260px] flex items-center">
        
        {/* LEFT SIDE: FIXED TEXT AND BUTTON (Transparent Background) */}
        <div className="absolute left-4 md:left-12 z-10 max-w-xs md:max-w-md pointer-events-auto">
          <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase mb-1 drop-shadow-md">Featured</p>
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
            Explore More Content
          </h3>
          <p className="text-xs md:text-sm text-zinc-300 mb-5 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
            Discover thousands of community articles, gaming highlights, and upcoming tech events updated daily.
          </p>
          <Link
            to="/explore"
            className="inline-block bg-white text-black font-bold text-xs py-2.5 px-6 rounded-full hover:bg-zinc-200 transition-all uppercase tracking-wider shadow-xl hover:scale-105"
          >
            View All Topics
          </Link>
        </div>

        {/* RIGHT/FULL BACKGROUND SIDE: NICHE WALI MARQUEE ROW (OPTIMIZED SIZE) */}
        <div className="w-full overflow-hidden whitespace-nowrap select-none z-0">
          <div className="inline-block animate-marquee flex gap-6 w-max">
            {/* Loop 1: Niche ki unique images */}
            {bottomImages.map((img, index) => (
              <img 
                key={`bottom-1-${index}`} 
                src={img} 
                alt="trending bottom" 
                className="w-[300px] h-40 md:w-[480px] md:h-60 object-cover rounded-xl border border-zinc-800/40 shadow-xl" 
              />
            ))}
            {/* Loop 2: Duplicate */}
            {bottomImages.map((img, index) => (
              <img 
                key={`bottom-2-${index}`} 
                src={img} 
                alt="trending bottom duplicate" 
                className="w-[300px] h-40 md:w-[480px] md:h-60 object-cover rounded-xl border border-zinc-800/40 shadow-xl" 
              />
            ))}
          </div>
        </div>

      </div>

      {/* ULTRA SLOW ANIMATION LAYER */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          /* Speed abhi bhi 90s hai jisse animation kaafi premium aur slow dikhega */
          animation: marquee 90s linear infinite; 
        }
      `}</style>

    </section>
  )
}