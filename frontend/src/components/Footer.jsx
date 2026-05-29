import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { 
  FaInstagram, 
  FaTwitter, 
  FaYoutube, 
  FaFacebook, 
  FaTiktok, 
  FaDiscord, 
  FaTwitch 
} from "react-icons/fa";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    /* Footer layer viewport management */
    <footer className="relative bg-black text-white font-sans w-full overflow-hidden select-none min-h-[100vh] flex flex-col justify-between">
      
      {/* BACKGROUND COLLAGE IMAGE */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none transform scale-100 object-cover"
        style={{ 
          backgroundImage: `url('/rockstar.png')`,
          backgroundPosition: 'center 20%',
        }}
      />

      {/* 1. HERO/SUPPORT TOP SECTION (MAXIMUM DYNAMIC GRID RESPONSIVENESS) */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-32 sm:pt-40 lg:pt-48 pb-24 sm:pb-32 lg:pb-36 backdrop-brightness-95">
        
        {/* Rockstar Style Logo Icon — Responsive Font Sizes Added */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-5 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] px-2">
          <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter italic text-white selection:bg-amber-500 text-center sm:text-left">
            ApexEdge Gaming<span className="text-amber-500 font-sans not-italic font-normal text-2xl sm:text-3xl md:text-4xl ml-0.5">★</span>
          </span>
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-100">Support</span>
        </div>
        
        {/* Subtitle */}
        <p className="text-zinc-200 text-sm sm:text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-8 sm:mb-10 tracking-wide font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] px-4">
          Get help with issues, browse common solutions, view service status updates, and more.
        </p>

        {/* Big White Capsule Button */}
        <button className="bg-white text-black hover:bg-zinc-200 text-sm sm:text-[15px] font-bold py-3 sm:py-3.5 px-8 sm:px-10 rounded-full transition-all duration-200 tracking-wide shadow-2xl active:scale-98 cursor-pointer border border-transparent">
          Get Support
        </button>
      </div>

      {/* BOTTOM WRAPPER */}
      <div className="relative z-10 bg-black/85 backdrop-blur-md w-full pt-10 sm:pt-14 pb-8 sm:pb-10 border-t border-zinc-900/80">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          
          {/* 2. MIDDLE ROW: Main Navigation & Language Selector */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 sm:mb-12">
            
            {/* Quick Links with solid wrapping structure */}
            <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3 text-xs sm:text-[14px] font-bold tracking-wider uppercase text-zinc-100 w-full md:w-auto">
              <Link to="/contact" className="hover:text-zinc-400 transition-colors duration-150">Contact</Link>
              <Link to="/careers" className="hover:text-zinc-400 transition-colors duration-150">Careers</Link>
              <Link to="/community-resources" className="hover:text-zinc-400 transition-colors duration-150">Community Resources</Link>
              <Link to="/subscribe" className="hover:text-zinc-400 transition-colors duration-150">Subscribe</Link>
            </div>

            {/* Language Dropdown (Maintains stable grid tracking over layout switches) */}
            <div className="relative w-full sm:w-auto">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 border border-zinc-800 bg-black/60 hover:bg-zinc-900/90 px-4 py-2.5 rounded-md hover:border-zinc-500 transition-all duration-150 text-xs font-bold tracking-widest uppercase cursor-pointer w-full sm:min-w-[135px] justify-between"
              >
                <div className="flex items-center gap-2 text-zinc-300">
                  <Globe size={14} />
                  <span>Hindi</span>
                </div>
                <ChevronDown size={12} className={`text-zinc-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isOpen && (
                <div className="absolute left-0 sm:left-auto sm:right-0 bottom-full mb-2 w-full bg-zinc-950 border border-zinc-800 rounded-md shadow-2xl overflow-hidden z-50 text-xs font-semibold">
                  <div className="px-4 py-2.5 hover:bg-zinc-900 cursor-pointer text-zinc-400 hover:text-white">Hindi</div>
                  <div className="px-4 py-2.5 hover:bg-zinc-900 cursor-pointer text-zinc-400 hover:text-white">English</div>
                </div>
              )}
            </div>
          </div>

          {/* 3. LEGAL & SOCIAL ROW */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-8 mb-10 sm:mb-12 pt-2 w-full">
            
            {/* Legal Policy Links */}
            <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2.5 text-[11px] sm:text-xs font-bold text-zinc-400 tracking-wide w-full lg:max-w-4xl">
              <Link to="/corporate" className="hover:text-white transition-colors duration-150">Corporate</Link>
              <Link to="/privacy" className="hover:text-white transition-colors duration-150">Privacy</Link>
              <Link to="/cookie-settings" className="hover:text-white transition-colors duration-150">Cookie Settings</Link>
              <Link to="/cookie-policy" className="hover:text-white transition-colors duration-150">Cookie Policy</Link>
              <Link to="/legal" className="hover:text-white transition-colors duration-150">Legal</Link>
              <Link to="/do-not-sell" className="hover:text-white transition-colors duration-150">Do Not Sell or Share My Personal Information</Link>
            </div>

            {/* Social Media Links with wrapping rules */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-6 text-zinc-400 pt-2 lg:pt-0">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-150">
                <FaInstagram size={18} />
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-150">
                <FaTwitter size={16} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-150">
                <FaYoutube size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-150">
                <FaFacebook size={18} />
              </a>
            </div>
          </div>

          {/* 4. METADATA ROW: Studio & Roman Code */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] sm:text-[11px] font-bold text-zinc-600 tracking-widest uppercase border-t border-zinc-900/60 pt-6 w-full">
            <div className="text-zinc-500">
              ApexEdge Gaming
            </div>
            <div className="flex items-center gap-x-4 sm:gap-x-5 gap-y-1.5 flex-wrap font-medium text-zinc-500">
              <span>India</span>
              <span>Bihar</span>
              <span>Patna</span>
              <span>101 City Plaza, Kidwaipuri</span>
            </div>
            <div className="font-sans tracking-wider text-zinc-500 text-xs pt-1 sm:pt-0">
              <span className="font-bold text-zinc-600 uppercase tracking-widest mr-1">Email:</span>
              <a 
                href="mailto:apexedgegaming@gmail.com" 
                className="text-zinc-400 hover:text-white transition-colors duration-150 underline decoration-zinc-700 hover:decoration-white underline-offset-4"
              >
                apexedgegaming@gmail.com
              </a>
            </div>
          </div>

          {/* Hidden SEO/Data Address Container */}
          <div className="sr-only">
            <p>Kidwaipuri Krishna Park, Patna, Bihar, India</p>
            <p>+91 9031062295</p>
            <p>apexedgegaming@gmail.com</p>
          </div>

        </div>
      </div>
    </footer>
  );
}