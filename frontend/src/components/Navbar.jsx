import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, Menu, X, BookOpen, ChevronDown, Sparkles, 
  Home, Library, Tag, Info, Phone, User, LogIn, 
  Zap, Globe, Compass, Star, Heart, Mail, MapPin
} from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/', icon: <Home size={16} /> },
  { label: 'Blog', path: '/blog', icon: <Library size={16} /> },
  { label: 'About', path: '/aboutpage', icon: <Info size={16} /> },
  { label: 'Contact', path: '/contactpage', icon: <Phone size={16} /> },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { 
    setMenuOpen(false); 
    setSearchOpen(false);
    setActiveDropdown(null);
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
        fixed top-0 left-0 right-0 z-[9999] w-full
        transition-all duration-350 ease-in-out
        ${scrolled 
          ? 'bg-black/70 backdrop-blur-md border-b border-white/10 shadow-lg py-2' 
          : 'bg-transparent border-b border-transparent py-4'
        }
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                src="/logo.png"
                alt="Logo"
                className={`
                  transition-all duration-300 object-contain
                  ${scrolled ? 'h-10 w-auto' : 'h-12 w-auto'}
                `}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center gap-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.label} 
                  to={link.path} 
                  className={`
                    group relative flex items-center gap-2 px-4 py-2 
                    text-sm font-bold tracking-wide rounded-xl 
                    transition-all duration-200
                    ${isActive(link.path)
                      ? 'text-white bg-white/10' 
                      : scrolled
                        ? 'text-slate-200 hover:text-white hover:bg-white/10'
                        : 'text-white hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-white rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Right Section (Search & Subscribe) */}
            <div className="flex items-center gap-3 shrink-0">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center gap-2 animate-slide-in-right">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      autoFocus 
                      type="text" 
                      value={query} 
                      onChange={e => setQuery(e.target.value)} 
                      placeholder="Search..." 
                      className="pl-9 pr-4 py-1.5 w-48 sm:w-56 text-sm bg-black/60 border border-white/20 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                    />
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setSearchOpen(false)} 
                    className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-all"
                  >
                    <X size={18} />
                  </button>
                </form>
              ) : (
                <button 
                  onClick={() => setSearchOpen(true)} 
                  className={`
                    p-2 rounded-xl transition-all duration-200
                    ${scrolled ? 'text-slate-200 hover:text-white hover:bg-white/10' : 'text-white hover:bg-white/10'}
                  `}
                >
                  <Search size={18} />
                </button>
              )}
              
              {/* Subscribe Button */}
              <Link 
                to="/subscribe" 
                className="hidden sm:flex items-center gap-2 border border-white/80 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider px-5 py-2 rounded-full transition-colors"
              >
                <span>Get Launcher</span>
              </Link>
              
              {/* Mobile Menu Button */}
              <button 
                className={`
                  lg:hidden p-2 rounded-xl transition-all duration-200
                  ${menuOpen ? 'bg-white/10 text-white' : scrolled ? 'text-slate-200 hover:text-white hover:bg-white/10' : 'text-white hover:bg-white/10'}
                `} 
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-black/85 backdrop-blur-xl
          ${menuOpen ? 'max-h-[400px] border-b border-white/10' : 'max-h-0'}
        `}>
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <Link 
                key={link.label}
                to={link.path} 
                className="flex items-center gap-3 px-4 py-3 text-sm font-bold tracking-wide text-slate-200 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-zinc-400">{link.icon}</span>
                <span className="flex-1">{link.label}</span>
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 mt-2">
              <Link 
                to="/subscribe" 
                className="flex items-center justify-center gap-2 border border-white/80 text-white text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-full"
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