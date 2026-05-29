import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, Menu, X, Home, Library, Info, Phone
} from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/', icon: <Home size={15} /> },
  { label: 'Blog', path: '/blog', icon: <Library size={15} /> },
  { label: 'About', path: '/aboutpage', icon: <Info size={15} /> },
  { label: 'Contact', path: '/contactpage', icon: <Phone size={15} /> },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { 
    setMenuOpen(false); 
    setSearchOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) { 
      navigate(`/search?q=${encodeURIComponent(query)}`); 
      setSearchOpen(false); 
      setQuery(''); 
    }
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className={`
        fixed top-0 left-0 right-0 z-[9999] w-full transform-gpu
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${scrolled 
          ? 'bg-black/85 backdrop-blur-md border-b border-neutral-900/80 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-2' 
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent border-b border-transparent py-4'
        }
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* 1. BRAND LOGO */}
            <Link to="/" className="flex items-center shrink-0 group relative z-50">
              <img
                src="/logo.png"
                alt="ApexEdge Gaming"
                className={`
                  transition-all duration-500 ease-out object-contain group-hover:scale-105 will-change-transform
                  ${scrolled ? 'h-9 w-auto' : 'h-11 w-auto'}
                `}
              />
            </Link>

            {/* 2. DESKTOP NAVIGATION (Real Website Style Capsule) */}
            <div className="hidden lg:flex items-center justify-center bg-neutral-950/40 backdrop-blur-xs p-1 rounded-full border border-white/5 shadow-inner">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link 
                    key={link.label} 
                    to={link.path} 
                    className={`
                      group relative flex items-center gap-2 px-5 py-2.5
                      text-[11px] font-black tracking-[0.15em] uppercase rounded-full
                      transition-all duration-300 ease-out transform-gpu
                      ${active
                        ? 'text-white bg-neutral-800/60 shadow-[0_0_12px_rgba(252,175,23,0.15)]' 
                        : 'text-zinc-400 hover:text-white'
                      }
                    `}
                  >
                    {/* Icon Animation */}
                    <span className={`transition-all duration-300 transform-gpu group-hover:scale-110 ${active ? 'text-[#fcaf17]' : 'text-zinc-500 group-hover:text-zinc-200'}`}>
                      {link.icon}
                    </span>
                    
                    {/* Text */}
                    <span className="relative z-10">{link.label}</span>
                    
                    {/* Interaction Glow Pill Background */}
                    <span className={`absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10
                      ${active ? 'hidden' : ''}
                    `}></span>
                  </Link>
                );
              })}
            </div>

            {/* 3. RIGHT CONTROLS (Search & CTAs) */}
            <div className="flex items-center gap-2.5 sm:gap-4 shrink-0 relative z-50">
              
              {/* Sliding Search Container */}
              <div className="relative flex items-center">
                <form 
                  onSubmit={handleSearch} 
                  className={`
                    flex items-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu
                    ${searchOpen ? 'w-48 sm:w-64 opacity-100' : 'w-0 opacity-0 pointer-events-none'}
                  `}
                >
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                    <input 
                      autoFocus={searchOpen}
                      type="text" 
                      value={query} 
                      onChange={e => setQuery(e.target.value)} 
                      placeholder="Search gaming content..." 
                      className="pl-9 pr-4 py-2 w-full text-xs bg-neutral-900/90 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-[#fcaf17] focus:ring-1 focus:ring-[#fcaf17]/50 transition-all font-medium placeholder-zinc-500"
                    />
                  </div>
                </form>

                {/* Toggle / Close Search Button */}
                <button 
                  onClick={() => setSearchOpen(!searchOpen)} 
                  className="p-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-neutral-900/60 transition-all duration-200 cursor-pointer"
                  aria-label="Toggle Search"
                >
                  {searchOpen ? <X size={16} /> : <Search size={17} />}
                </button>
              </div>
              
              {/* Premium Launcher CTA Button */}
              <Link 
                to="/subscribe" 
                className="hidden sm:flex items-center justify-center bg-[#fcaf17] hover:bg-amber-400 text-black font-black text-[11px] uppercase tracking-[0.12em] px-5 py-2.5 rounded-lg shadow-lg shadow-amber-500/10 transition-all duration-300 ease-out transform-gpu hover:-translate-y-0.5 hover:shadow-amber-500/20 active:translate-y-0 active:scale-98"
              >
                <span>Get Launcher</span>
              </Link>
              
              {/* Mobile Menu Toggle Button */}
              <button 
                className={`
                  lg:hidden p-2.5 rounded-lg transition-all duration-200 cursor-pointer
                  ${menuOpen ? 'bg-neutral-900 text-white' : 'text-zinc-400 hover:text-white hover:bg-neutral-900/60'}
                `} 
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle Menu"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* 4. MOBILE DRAWER OVERLAY (Slick Dropdown) */}
        <div className={`
          lg:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-neutral-950/95 backdrop-blur-2xl transform-gpu border-b border-neutral-900/80
          ${menuOpen ? 'max-h-[380px] shadow-[0_20px_40px_rgba(0,0,0,0.9)] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}
        `}>
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-1.5">
            {navLinks.map(link => {
              const active = isActive(link.path);
              return (
                <Link 
                  key={link.label}
                  to={link.path} 
                  className={`flex items-center gap-3.5 px-4 py-3.5 text-xs font-black tracking-widest uppercase rounded-xl transition-all duration-200
                    ${active 
                      ? 'bg-neutral-900/80 text-white border-l-2 border-[#fcaf17]' 
                      : 'text-zinc-400 hover:text-white hover:bg-neutral-900/40'
                    }
                  `}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className={active ? 'text-[#fcaf17]' : 'text-zinc-500'}>{link.icon}</span>
                  <span className="flex-1">{link.label}</span>
                </Link>
              );
            })}
            
            {/* Mobile Call to Action */}
            <div className="pt-4 border-t border-neutral-900 mt-4">
              <Link 
                to="/subscribe" 
                className="flex items-center justify-center bg-[#fcaf17] text-black text-xs font-black uppercase tracking-widest py-3.5 rounded-xl shadow-md active:scale-98"
                onClick={() => setMenuOpen(false)}
              >
                Get Launcher
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}