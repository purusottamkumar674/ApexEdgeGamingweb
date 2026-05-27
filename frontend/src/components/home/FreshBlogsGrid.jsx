import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { ArrowRight, BookOpen, Eye } from 'lucide-react'
import LazyImage from './LazyImage'

// 1. 100% EXACT STRUCTURE WALA FAKE DATA ARRAY (Website khulte hi ye dikhega)
const FAKE_RECENT_POSTS = [
  { _id: 'fake1', slug: 'gta-6-graphics-updates', title: 'Grand Theft Auto VI: Next-Gen Graphics and Engine Enhancements Revealed', excerpt: 'Dive into the technological marvel behind the upcoming Rockstar masterpiece and what it means for console players.', coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80', createdAt: new Date(), views: 1420, category: { name: 'GAMING' }, author: { name: 'ApexEdge Staff' } },
  { _id: 'fake2', slug: 'cyberpunk-dlc-review', title: 'Cyberpunk Universe Expands: New Narrative Expansions Rumored for Late 2026', excerpt: 'Leaks suggest CD Projekt Red is secretly working on an anime tie-in and additional quest lines.', coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80', createdAt: new Date(), views: 980, category: { name: 'NEWS' }, author: { name: 'Editor-in-Chief' } },
  { _id: 'fake3', slug: 'rtx-5090-benchmarks', title: 'NVIDIA RTX 5090 Benchmarks Leaked: A Massive Leap in Ray Tracing Performance', excerpt: 'Initial testing sheets showcase up to 60% performance gains in modern heavy-rendered titles.', coverImage: 'https://images.unsplash.com/photo-1552820728-8b83bb663b7d?w=500&q=80', createdAt: new Date(), views: 2450, category: { name: 'HARDWARE' }, author: { name: 'Tech Desk' } },
  { _id: 'fake4', slug: 'esports-championship-2026', title: 'The Ultimate Esports Championship 2026 Schedule & Team Rosters Announced', excerpt: 'Everything you need to know about the upcoming multi-million dollar tournament breaking records this summer.', coverImage: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500&q=80', createdAt: new Date(), views: 650, category: { name: 'ESPORTS' }, author: { name: 'Pro Arena' } },
  { _id: 'fake5', slug: 'indie-games-masterpieces', title: 'Top 5 Hidden Indie Games You Absolutely Cannot Miss on Steam Right Now', excerpt: 'Uncovering the best narrative-driven and highly-rated indie projects made by solo developers.', coverImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&q=80', createdAt: new Date(), views: 1120, category: { name: 'INDIE SPOTLIGHT' }, author: { name: 'Community Pick' } },
  { _id: 'fake6', slug: 'ai-npc-future-gaming', title: 'How Artificial Intelligence is Changing NPC Interactions in Open-World Games', excerpt: 'A deep dive into smart dialogues and dynamic behavior trees utilized by modern studios.', coverImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=500&q=80', createdAt: new Date(), views: 1890, category: { name: 'AI & SCI' }, author: { name: 'Dr. Nexus' } }
];

export default function FreshBlogsGrid({ loading, recentPosts = [], resolveCoverUrl }) {
  
  // 2. LOGIC LAYER: Agar backend ka array khali hai, toh Bina Time Liye Fake Data activate kar do.
  // Jaise hi recentPosts me data aayega, ye line automatically fake data ko swap kar degi.
  const displayPosts = recentPosts && recentPosts.length > 0 ? recentPosts : FAKE_RECENT_POSTS;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16 bg-black">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2">Latest</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">ApexEdge Gamming</h2>
        </div>
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold border border-zinc-700 hover:border-zinc-500 text-white px-4 py-2.5 rounded-full transition-all whitespace-nowrap">
          View All <ArrowRight size={14} />
        </Link>
      </div>

      {/* 3. SKELETON LOADING LOADER REMOVE KAR DIYA HAI TAAKI FLICKER YA BLINK NA HO */}
      {displayPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPosts.map((blog) => (
            <article key={blog._id} className="group bg-[#1c1c1c] rounded-lg overflow-hidden hover:bg-[#252525] transition-colors">
              <Link to={`/blog/${blog.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                <LazyImage
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full"
                  resolveCoverUrl={resolveCoverUrl}
                />
                {blog.category?.name && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-[10px] font-bold tracking-wider text-white uppercase bg-black/40 px-2 py-0.5 rounded-sm backdrop-blur-xs">
                      {blog.category.name}
                    </span>
                  </div>
                )}
              </Link>
              <div className="p-5">
                <Link to={`/blog/${blog.slug}`} className="block">
                  <p className="text-xs text-zinc-500 mb-2">{format(new Date(blog.createdAt), 'MMMM d, yyyy')}</p>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-zinc-300 transition-colors">{blog.title}</h3>
                  {blog.excerpt && (
                    <p className="text-sm text-zinc-400 line-clamp-2">{blog.excerpt}</p>
                  )}
                </Link>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800">
                  {blog.author?.name && (
                    <span className="text-xs font-medium text-zinc-400">{blog.author.name}</span>
                  )}
                  {blog.views > 0 && (
                    <div className="flex items-center gap-1 text-zinc-500">
                      <Eye size={14} />
                      <span className="text-xs">{blog.views}</span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#1c1c1c] rounded-lg border border-zinc-800">
          <BookOpen size={40} className="mx-auto text-zinc-600 mb-3" />
          <p className="text-zinc-500 font-medium">No articles found yet.</p>
        </div>
      )}

      {displayPosts.length > 0 && (
        <div className="text-center mt-12">
          <Link to="/blog" className="inline-flex items-center gap-2 bg-white text-black font-bold px-7 py-3 rounded-full hover:bg-zinc-200 transition-colors text-sm">
            Load More <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </section>
  )
}