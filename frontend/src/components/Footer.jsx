import { Link } from 'react-router-dom';
import { useState } from 'react';

// lucide icons (UI icons)
import { 
  BookOpen, Heart, ArrowRight, Mail, MapPin, Phone, Clock,
  Shield, Zap, Crown
} from 'lucide-react';

// social icons (react-icons)
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaGithub, 
  FaYoutube, 
  FaLinkedin 
} from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-300 mt-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -right-64 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-10 animate-pulse-slow"></div>
        <div className="absolute bottom-0 -left-64 w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-10 animate-pulse-slower"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-5 animate-pulse"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-100'></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="group flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="text-white" size={20} />
              </div>
              {/* Logo Image Added Here */}
              <img 
                src="/logo.png" 
                alt="Blogy Logo" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  // Fallback text if logo not found
                  const parent = e.target.parentElement;
                  if (parent && !parent.querySelector('.logo-fallback')) {
                    const span = document.createElement('span');
                    span.className = 'logo-fallback font-playfair text-2xl font-bold text-white';
                    span.innerHTML = 'Blogy<span class="text-purple-400">.</span>';
                    parent.appendChild(span);
                  }
                }}
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
             ApexEdge Gaming is a next-generation esports and gaming platform built for passionate gamers, creators, and competitors. We bring together thrilling gameplay, competitive tournaments, and a vibrant community where every player can rise, connect, and dominate the game.
            </p>
            
            {/* Trust Badge */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/150?img=1" className="w-8 h-8 rounded-full ring-2 ring-gray-700" alt="User" />
                <img src="https://i.pravatar.cc/150?img=2" className="w-8 h-8 rounded-full ring-2 ring-gray-700" alt="User" />
                <img src="https://i.pravatar.cc/150?img=3" className="w-8 h-8 rounded-full ring-2 ring-gray-700" alt="User" />
                <img src="https://i.pravatar.cc/150?img=4" className="w-8 h-8 rounded-full ring-2 ring-gray-700" alt="User" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-xs">★★★★★</span>
                  <span className="text-xs text-gray-400">4.9/5</span>
                </div>
                <p className="text-xs text-gray-500">Trusted by 10,000+ readers</p>
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-2">
                <a href="#" className="group p-2 bg-gray-800 rounded-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-110">
                 <FaTwitter size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="group p-2 bg-gray-800 rounded-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-110">
                  <FaLinkedin size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="group p-2 bg-gray-800 rounded-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-110">
                  <FaInstagram size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="group p-2 bg-gray-800 rounded-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-110">
                  <FaFacebook size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="group p-2 bg-gray-800 rounded-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-110">
                  <FaYoutube size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 flex items-center gap-2">
              <Zap size={14} className="text-purple-400" />
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-1">Home <ArrowRight size={12} /></Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-1">Articles <ArrowRight size={12} /></Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-1">About Us <ArrowRight size={12} /></Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-1">Contact <ArrowRight size={12} /></Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-1">Privacy Policy <ArrowRight size={12} /></Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-5 flex items-center gap-2">
              <Crown size={14} className="text-purple-400" />
              Top Categories
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/category/Technology" className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-1">Technology <span className="text-gray-600 text-xs">(234)</span></Link></li>
              <li><Link to="/category/Design" className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-1">Design <span className="text-gray-600 text-xs">(189)</span></Link></li>
              <li><Link to="/category/Lifestyle" className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-1">Lifestyle <span className="text-gray-600 text-xs">(156)</span></Link></li>
              <li><Link to="/category/Business" className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-1">Business <span className="text-gray-600 text-xs">(98)</span></Link></li>
              <li><Link to="/category/Travel" className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-1">Travel <span className="text-gray-600 text-xs">(76)</span></Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-5 flex items-center gap-2">
              <Mail size={14} className="text-purple-400" />
              Stay Updated
            </h4>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-6">

  {/* Email */}
  <div className="flex items-start gap-3 text-sm text-gray-400">
    <Mail size={16} className="text-purple-400 mt-1 flex-shrink-0" />
    <span className="leading-relaxed break-words">
      apexedgegaming@gmail.com
    </span>
  </div>

  {/* Phone */}
  <div className="flex items-start gap-3 text-sm text-gray-400">
    <Phone size={16} className="text-purple-400 mt-1 flex-shrink-0" />
    <span className="leading-relaxed">
      +91 9031062295
    </span>
  </div>

  {/* Address */}
  <div className="flex items-start gap-3 text-sm text-gray-400">
    <MapPin size={16} className="text-purple-400 mt-1 flex-shrink-0" />
    <span className="leading-relaxed break-words">
      Kidwaipuri Krishna Park, Patna, Bihar, India
    </span>
  </div>

  {/* Time */}
  <div className="flex items-start gap-3 text-sm text-gray-400">
    <Clock size={16} className="text-purple-400 mt-1 flex-shrink-0" />
    <span className="leading-relaxed">
      Mon - Fri: 9 AM - 6 PM
    </span>
  </div>

</div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="mt-4">
              <p className="text-sm text-gray-400 mb-3">Get the best articles delivered to your inbox.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-gray-800 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200 placeholder-gray-500 border border-gray-700"
                  required
                />
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-1 group"
                >
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              {subscribed && (
                <p className="text-green-400 text-xs mt-2 animate-fade-in-up">
                  ✓ Subscribed successfully!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-xs text-gray-500">
                © {currentYear} ApexEdge Gaming. All rights reserved. Made with 
                <Heart size={10} className="inline mx-1 text-red-500 animate-pulse" /> 
                by the ApexEdge Gaming team
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-xs text-gray-500 hover:text-purple-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-xs text-gray-500 hover:text-purple-400 transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="text-xs text-gray-500 hover:text-purple-400 transition-colors">Cookie Policy</Link>
            </div>
            
            <div className="flex items-center gap-2">
              <Shield size={12} className="text-gray-500" />
              <span className="text-xs text-gray-500">Secure Connection</span>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.1); }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.08; transform: scale(1); }
          50% { opacity: 0.12; transform: scale(1.2); }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}