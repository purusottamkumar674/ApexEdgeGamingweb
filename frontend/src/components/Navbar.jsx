import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, Menu, X, BookOpen, ChevronDown, Sparkles, 
  Home, Library, Tag, Info, Phone, User, LogIn, 
  Zap, Globe, Compass, Star, Heart, Mail, MapPin
} from 'lucide-react';

import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const navLinks = [
  { label: 'Home', path: '/', icon: <Home size={16} /> },
  { label: 'Blog', path: '/blog', icon: <Library size={16} /> },
  // {
  //    label: 'Categories', 
  //   path: '/categories',
  //   icon: <Tag size={16} />,
  //   isDropdown: true,
  //   sub: [
      // { name: 'Technology', path: '/category/Technology', icon: '💻', count: 234 },
      // { name: 'Design', path: '/category/Design', icon: '🎨', count: 189 },
      // { name: 'Lifestyle', path: '/category/Lifestyle', icon: '🌟', count: 156 },
      // { name: 'Business', path: '/category/Business', icon: '📈', count: 98 },
      // { name: 'Travel', path: '/category/Travel', icon: '✈️', count: 76 },
      // { name: 'Health', path: '/category/Health', icon: '💪', count: 54 },
      // { name: 'AI', path: '/category/AI', icon: '🤖', count: 45 }
  //  ]
  // },
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
      setScrolled(window.scrollY > 50);
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
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Animated Background Gradient */}
      <div className="fixed top-0 left-0 right-0 h-24 bg-gradient-to-b from-purple-600/5 via-transparent to-transparent pointer-events-none z-40 opacity-0 transition-opacity duration-500" style={{ opacity: scrolled ? 0 : 1 }}></div>
      
      <nav className={`
        fixed top-0 left-0 right-0 z-50 flex justify-center
        transition-all duration-500 ease-out
      `}>
        <div className={`
          w-full max-w-6xl mx-4 sm:mx-6 lg:mx-8
          transition-all duration-500 ease-out
          ${scrolled 
            ? 'mt-2 bg-white/95 backdrop-blur-xl shadow-2xl shadow-purple-900/10 rounded-2xl border border-purple-100/50' 
            : 'mt-4 bg-white/80 backdrop-blur-md shadow-lg shadow-purple-500/5 rounded-2xl border border-white/40'
          }
        `}>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          <div className="relative px-3 sm:px-5 lg:px-6">
            <div className="flex items-center justify-between h-14 lg:h-16">
              {/* Logo Section */}
              <Link to="/" className="group relative flex items-center gap-2 shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse-slow opacity-75"></div>
                  {/* <div className={`
                    relative bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg 
                    flex items-center justify-center shadow-lg transition-all duration-500
                    ${scrolled ? 'w-7 h-7' : 'w-8 h-8'}
                    group-hover:scale-110 group-hover:rotate-12
                  `}>
                    <BookOpen size={scrolled ? 14 : 16} className="text-white transition-all duration-300" />
                  </div> */}
                </div>
                <div className="flex items-center">
                  <img
                    src="/logo.png"
                    alt="Blogy Logo"
                    className={`
                      transition-all duration-500 object-contain
                      ${scrolled ? 'h-10 w-auto' : 'h-14 w-auto'}
                    `}
                  />
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center justify-center gap-0.5">
                {navLinks.map((link) =>
                  link.isDropdown ? (
                    <div key={link.label} className="relative">
                      <button
                        onMouseEnter={() => setActiveDropdown(link.label)}
                        onMouseLeave={() => setActiveDropdown(null)}
                        className={`
                          group relative flex items-center gap-2 px-4 py-2 
                          text-sm font-medium rounded-xl 
                          transition-all duration-300
                          ${location.pathname.includes('/category') 
                            ? 'text-purple-600 bg-purple-50' 
                            : scrolled 
                              ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50/50'
                              : 'text-gray-700 hover:text-purple-600 hover:bg-white/60'
                          }
                          hover:scale-105
                        `}
                      >
                        <span className="transition-transform duration-300 group-hover:rotate-12">
                          {link.icon}
                        </span>
                        <span>{link.label}</span>
                        <ChevronDown size={14} className={`
                          transition-all duration-300
                          ${activeDropdown === link.label ? 'rotate-180 text-purple-600' : ''}
                        `} />
                      </button>
                      
                      {/* Premium Dropdown Menu */}
                      <div 
                        onMouseEnter={() => setActiveDropdown(link.label)}
                        onMouseLeave={() => setActiveDropdown(null)}
                        className={`
                          absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64
                          transition-all duration-300 transform
                          ${activeDropdown === link.label 
                            ? 'opacity-100 visible translate-y-0' 
                            : 'opacity-0 invisible -translate-y-2'}
                        `}
                      >
                        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100"></div>
                          <div className="p-2">
                            {link.sub.map((cat, idx) => (
                              <Link 
                                key={cat.name} 
                                to={cat.path} 
                                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 group"
                                onClick={() => setMenuOpen(false)}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">{cat.icon}</span>
                                  <div>
                                    <p className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                                      {cat.name}
                                    </p>
                                    <p className="text-xs text-gray-400">{cat.count} articles</p>
                                  </div>
                                </div>
                                <ChevronDown size={14} className="text-gray-300 rotate-[-90deg] group-hover:translate-x-1 transition-all" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link 
                      key={link.label} 
                      to={link.path} 
                      className={`
                        group relative flex items-center gap-2 px-4 py-2 
                        text-sm font-medium rounded-xl 
                        transition-all duration-300
                        ${isActive(link.path)
                          ? 'text-purple-600 bg-purple-50' 
                          : scrolled
                            ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50/50'
                            : 'text-gray-700 hover:text-purple-600 hover:bg-white/60'
                        }
                        hover:scale-105
                      `}
                    >
                      <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
                        {link.icon}
                      </span>
                      <span>{link.label}</span>
                      {isActive(link.path) && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></span>
                      )}
                    </Link>
                  )
                )}
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Premium Search Bar */}
                {searchOpen ? (
                  <form onSubmit={handleSearch} className="flex items-center gap-2 animate-slide-in-right">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input 
                        autoFocus 
                        type="text" 
                        value={query} 
                        onChange={e => setQuery(e.target.value)} 
                        placeholder="Search articles..." 
                        className="pl-9 pr-4 py-2 w-56 text-sm bg-white/90 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all"
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setSearchOpen(false)} 
                      className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all"
                    >
                      <X size={18} />
                    </button>
                  </form>
                ) : (
                  <button 
                    onClick={() => setSearchOpen(true)} 
                    className={`
                      group relative p-2 rounded-xl transition-all duration-300 overflow-hidden
                      ${scrolled 
                        ? 'text-gray-600 hover:text-purple-600' 
                        : 'text-gray-600 hover:text-purple-600'
                      }
                    `}
                  >
                    <div className="absolute inset-0 bg-purple-100 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    <Search size={18} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
                  </button>
                )}
                
                {/* Premium Subscribe Button */}
                <Link 
                  to="/subscribe" 
                  className={`
                    group relative overflow-hidden hidden sm:flex items-center gap-2 
                    bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full 
                    transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-200
                    ${scrolled ? 'text-xs px-3 py-1.5 gap-1' : 'text-sm px-4 py-2 gap-2'}
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                  <Sparkles size={scrolled ? 12 : 14} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10">Subscribe</span>
                </Link>
                
                {/* Premium Mobile Menu Button */}
                <button 
                  className={`
                    lg:hidden relative p-2 rounded-xl transition-all duration-300
                    ${menuOpen ? 'bg-purple-100 text-purple-600' : scrolled ? 'text-gray-600 hover:text-purple-600 hover:bg-purple-50' : 'text-gray-600 hover:text-purple-600 hover:bg-white/60'}
                  `} 
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <div className="absolute inset-0 rounded-xl scale-0 bg-purple-100 transition-transform duration-300 -z-10"></div>
                  {menuOpen ? <X size={20} className="relative" /> : <Menu size={20} className="relative" />}
                </button>
              </div>
            </div>
          </div>

          {/* Premium Mobile Menu */}
          <div className={`
            lg:hidden overflow-hidden transition-all duration-500 ease-in-out
            ${menuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
          `}>
            <div className="px-3 py-4 border-t border-gray-100 space-y-1">
              {navLinks.map(link => (
                <div key={link.label}>
                  <Link 
                    to={link.path} 
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200"
                    onClick={() => {
                      if (!link.isDropdown) setMenuOpen(false);
                    }}
                  >
                    <span className="text-purple-500">{link.icon}</span>
                    <span className="flex-1">{link.label}</span>
                    {link.isDropdown && <ChevronDown size={14} className="text-gray-400" />}
                  </Link>
                  {link.isDropdown && link.sub && (
                    <div className="ml-8 mt-1 space-y-1">
                      {link.sub.map(cat => (
                        <Link 
                          key={cat.name} 
                          to={cat.path} 
                          className="flex items-center justify-between px-4 py-2 text-sm text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200"
                          onClick={() => setMenuOpen(false)}
                        >
                          <div className="flex items-center gap-2">
                            <span>{cat.icon}</span>
                            <span>{cat.name}</span>
                          </div>
                          <span className="text-xs text-gray-400">{cat.count}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 mt-2 border-t border-gray-100">
                <Link 
                  to="/subscribe" 
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:shadow-lg transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  <Sparkles size={14} />
                  Subscribe Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Floating particles */}
      <div className="fixed top-0 left-0 right-0 pointer-events-none z-40">
        <div className="absolute top-24 left-[10%] w-1.5 h-1.5 bg-purple-400 rounded-full animate-float-1"></div>
        <div className="absolute top-32 right-[15%] w-2 h-2 bg-pink-400 rounded-full animate-float-2"></div>
        <div className="absolute top-40 left-[20%] w-1 h-1 bg-purple-300 rounded-full animate-float-3"></div>
        <div className="absolute top-28 right-[25%] w-1.5 h-1.5 bg-orange-400 rounded-full animate-float-1 delay-1000"></div>
        <div className="absolute top-20 left-[30%] w-1 h-1 bg-pink-300 rounded-full animate-float-2 delay-1500"></div>
      </div>
      
      {/* Spacer */}
      <div className="h-20 lg:h-24"></div>

      {/* Global Styles */}
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float1 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          25% { transform: translateY(-30px) translateX(10px); opacity: 0.6; }
          50% { transform: translateY(-15px) translateX(-5px); opacity: 0.3; }
          75% { transform: translateY(-25px) translateX(15px); opacity: 0.5; }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          25% { transform: translateY(-20px) translateX(-10px); opacity: 0.5; }
          50% { transform: translateY(-35px) translateX(5px); opacity: 0.7; }
          75% { transform: translateY(-15px) translateX(-15px); opacity: 0.4; }
        }
        
        @keyframes float3 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          25% { transform: translateY(-40px) translateX(15px); opacity: 0.4; }
          50% { transform: translateY(-20px) translateX(-10px); opacity: 0.6; }
          75% { transform: translateY(-30px) translateX(5px); opacity: 0.3; }
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out forwards;
        }
        
        .animate-float-1 {
          animation: float1 4s ease-in-out infinite;
        }
        
        .animate-float-2 {
          animation: float2 5s ease-in-out infinite;
        }
        
        .animate-float-3 {
          animation: float3 3.5s ease-in-out infinite;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-1500 {
          animation-delay: 1.5s;
        }
      `}</style>
    </>
  );
}