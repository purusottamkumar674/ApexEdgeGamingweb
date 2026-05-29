import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import LazyImage from './LazyImage'

const FALLBACK_FEATURED = {
  category: 'APEXEDGE GAMING',
  title: 'ApexEdge Gaming: Your Ultimate Source for Gaming News, Reviews, Esports, and Industry Updates',
  date: new Date('2026-05-29'),
  slug: 'blog',
}

const FALLBACK_LIST = [
  {
    category: 'GAMING NEWS',
    title: 'Stay Updated with the Latest Game Releases, Updates, and Industry Announcements',
    date: new Date('2026-05-14'),
    slug: 'blog',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80',
  },
  {
    category: 'ESPORTS',
    title: 'Follow Major Esports Tournaments, Team Rankings, and Competitive Gaming Events',
    date: new Date('2026-05-08'),
    slug: 'blog',
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80',
  },
  {
    category: 'GAME REVIEWS',
    title: 'Discover Honest Reviews and Ratings for the Hottest Games Across All Platforms',
    date: new Date('2026-05-07'),
    slug: 'blog',
    coverImage: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&q=80',
  },
  {
    category: 'GAMING HARDWARE',
    title: 'Explore the Latest Gaming PCs, Consoles, Graphics Cards, and Accessories',
    date: new Date('2026-05-05'),
    slug: 'blog',
    coverImage: 'https://images.unsplash.com/photo-1552820728-8b83bb663b7d?w=400&q=80',
  },
]

export default function NewswireSection({ blogs = [], loading, resolveCoverUrl }) {
  const featured = blogs[0] || FALLBACK_FEATURED
  const listItems = blogs.length > 1 ? blogs.slice(1, 5) : FALLBACK_LIST

  const getCategory = (item) =>
    item.category?.name?.toUpperCase() || item.category || 'APEXEDGE GAMING'

  const getDate = (item) =>
    item.createdAt ? new Date(item.createdAt) : item.date || new Date()

  return (
    <section className="bg-black text-white py-12 lg:py-20 w-full overflow-hidden font-sans">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 flex flex-col w-full">
            <div className="flex justify-center lg:justify-start mb-12 lg:mb-20 lg:ps-20">
              <img
                src="/big.png"
                alt="ApexEdge Gaming"
                className="h-28 sm:h-36 lg:h-44 w-auto object-contain"
              />
            </div>

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

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            {(loading ? FALLBACK_LIST : listItems).map((item, idx) => (
              <Link
                key={item._id || idx}
                to={item.slug ? `/blog/${item.slug}` : '/blog'}
                className="flex items-center gap-4 sm:gap-6 group transition-all duration-200"
              >
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