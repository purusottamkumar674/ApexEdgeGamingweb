import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import LazyImage from './LazyImage'

const FALLBACK_FEATURED = {
  category: 'GRAND THEFT AUTO VI',
  title: 'Grand Theft Auto VI is Now Set to Launch November 19, 2026',
  date: new Date('2025-11-06'),
  slug: 'blog',
}

const FALLBACK_LIST = [
  { category: 'GTA ONLINE', title: 'Buckle Up for Two Weeks of Motor Madness in GTA Online', date: new Date('2026-05-14'), slug: 'blog', coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80' },
  { category: 'CIRCOLOCO RECORDS', title: 'Check Out Prospa\'s New Single Baby with Murda Beatz', date: new Date('2026-05-08'), slug: 'blog', coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80' },
  { category: 'GTA ONLINE', title: 'Claim a Free Übermacht Sentinel GTS with GTA+', date: new Date('2026-05-07'), slug: 'blog', coverImage: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&q=80' },
  { category: 'RED DEAD ONLINE', title: 'Conserve Frontier Wildlife as a Naturalist in Red Dead Online', date: new Date('2026-05-05'), slug: 'blog', coverImage: 'https://images.unsplash.com/photo-1552820728-8b83bb663b7d?w=400&q=80' },
]

export default function NewswireSection({ blogs = [], loading, resolveCoverUrl }) {
  const featured = blogs[0] || FALLBACK_FEATURED
  const listItems = blogs.length > 1 ? blogs.slice(1, 5) : FALLBACK_LIST

  const getCategory = (item) => item.category?.name?.toUpperCase() || item.category || 'APEXEDGE GAMING'
  const getDate = (item) => item.createdAt ? new Date(item.createdAt) : item.date || new Date()

  return (
    /* Background 100% Jet Black (#000000) as per image_14d090.jpg */
    <section className="bg-black text-white py-12 lg:py-20 w-full overflow-hidden font-sans">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Exact Grid matching the screenshot split ratio (7 cols left, 5 cols right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-7 flex flex-col w-full">
            
            {/* Grand Theft Auto VI Logo Container (Centered on mobile, left on desktop) */}
            <div className="flex justify-center lg:justify-start mb-12 lg:mb-20 lg:ps-20">
              <img 
                src="/big.png" 
                alt="GTA VI Logo" 
                className="h-28 sm:h-36 lg:h-44 w-auto object-contain" 
              />
            </div>

            {/* Featured Post Card - Plain Dark Gray Solid Box (#1e1e1e) with sharp styling */}
            <Link
              to={featured.slug ? `/blog/${featured.slug}` : '/blog'}
              className="block bg-[#1c1c1c] p-8 sm:p-10 lg:p-12 min-h-[320px] sm:min-h-[360px] flex flex-col justify-end group transition-all duration-300 rounded-md border border-zinc-900"
            >
              <p className="text-zinc-400 text-[10px] sm:text-xs font-bold tracking-[0.1em] uppercase mb-4">
                {getCategory(featured)}
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-[35px] font-black text-white tracking-tight leading-[1.2] mb-6 group-hover:text-zinc-300 transition-colors">
                {featured.title}
              </h2>
              <p className="text-xs text-zinc-500 font-medium">
                {format(getDate(featured), 'MMMM d, yyyy')}
              </p>
            </Link>
          </div>


          {/* ================= RIGHT COLUMN ================= */}
          {/* Flex stack layout for the list */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            {(loading ? FALLBACK_LIST : listItems).map((item, idx) => (
              <Link
                key={item._id || idx}
                to={item.slug ? `/blog/${item.slug}` : '/blog'}
                className="flex items-center gap-4 sm:gap-6 group transition-all duration-200"
              >
                
                {/* 100% FIXED: Thumbnail Image IS ON THE LEFT SIDE inside the item row */}
                <div className="shrink-0 w-[110px] h-[110px] sm:w-[135px] sm:h-[135px] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-900 shadow-lg">
                  {item.coverImage && resolveCoverUrl ? (
                    <LazyImage
                      src={item.coverImage}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      resolveCoverUrl={resolveCoverUrl}
                    />
                  ) : (
                    <img
                      src={item.coverImage || FALLBACK_LIST[idx % 4].coverImage}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  )}
                </div>

                {/* News Entry Text Content on the right side of the thumbnail */}
                <div className="flex flex-col justify-center min-w-0 flex-1">
                  <p className="text-[10px] font-bold tracking-[0.05em] text-zinc-400 uppercase mb-1">
                    {getCategory(item)}
                  </p>
                  <h3 className="text-sm sm:text-base font-black text-white tracking-tight leading-snug line-clamp-2 mb-1.5 group-hover:text-zinc-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-medium">
                    {format(getDate(item), 'MMMM d, yyyy')}
                  </p>
                </div>

              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}