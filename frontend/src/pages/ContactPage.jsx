import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Clock, Globe, ArrowRight, Sparkles, Terminal } from 'lucide-react'; 
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    "contact2.png",
    "contact1.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      if (formData.email && formData.message) {
        setSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError('Please fill in all required fields');
      }
      setLoading(false);
    }, 1500);
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:apexedgegaming@gmail.com';
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+919031062295';
  };

  const handleLocationClick = () => {
    window.open('https://www.google.com/maps/place/Kidwaipuri,+Patna,+Bihar/', '_blank');
  };

  const contactInfo = [
    {
      icon: <Mail size={22} />,
      title: 'Email Us',
      details: 'apexedgegaming@gmail.com',
      subDetail: 'support@ApexEdgeGaming.com',
      bgColor: 'bg-zinc-900/40 border border-zinc-900 hover:border-purple-500/20',
      iconColor: 'text-purple-400 group-hover:text-purple-300',
      onClick: handleEmailClick,
      isClickable: true
    },
    {
      icon: <Phone size={22} />,
      title: 'Call Us',
      details: '090310 62295',
      subDetail: 'Mon-Fri, 9am - 6pm EST',
      bgColor: 'bg-zinc-900/40 border border-zinc-900 hover:border-pink-500/20',
      iconColor: 'text-pink-400 group-hover:text-pink-300',
      onClick: handleCallClick,
      isClickable: true
    },
    {
      icon: <MapPin size={22} />,
      title: 'Visit Us',
      details: 'Kidwaipuri krishna park, Patna New City',
      subDetail: 'Patna, Bihar',
      bgColor: 'bg-zinc-900/40 border border-zinc-900 hover:border-amber-500/20',
      iconColor: 'text-amber-400 group-hover:text-amber-300',
      onClick: handleLocationClick,
      isClickable: true
    }
  ];

  const faqs = [
    { question: 'How quickly do you respond?', answer: 'We typically respond within 24-48 hours during business days.' },
    { question: 'Do you accept guest posts?', answer: 'Yes! Please send your pitch to hello@ApexEdgeGaming.com with "Guest Post" in the subject line.' },
    { question: 'Can I advertise on Blogy?', answer: 'Absolutely! Contact our advertising team at ads@ApexEdgeGaming.com for rates and opportunities.' }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans overflow-hidden selection:bg-amber-500 selection:text-black antialiased">
      
      {/* Enhanced Hero Section - STRICT 110% SCREEN HEIGHT */}
      <div className="relative overflow-hidden h-[110vh] w-full bg-zinc-950 flex items-center border-b border-zinc-900">
        
        {/* Full Screen Image Layer Stretched Perfectly */}
        <div className="absolute inset-0 w-full h-full z-0">
          {sliderImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                currentSlide === index ? 'opacity-55 scale-100' : 'opacity-0 scale-105'
              } transition-transform duration-[4000ms]`}
              style={{ backgroundImage: `url('${img}')` }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950/70 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-zinc-950/80 z-10" />
        </div>
        
        {/* Subtle Neon Flares & Tech Grid lines */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-pink-500/5 rounded-full blur-[120px] animate-pulse-slower"></div>
          
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70" />
        </div>
        
        {/* Centralized Core Header Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 rounded-md px-3.5 py-1 backdrop-blur-md shadow-2xl">
            <Terminal size={12} className="text-amber-500 animate-pulse" />
            <span className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest font-black">Link Established</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-400">
            CONNECT WITH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-500 drop-shadow-[0_4px_15px_rgba(245,158,11,0.25)]">
              OUR INTEL CORE
            </span>
          </h1>
          
          <p className="max-w-xl mx-auto text-zinc-400 text-sm sm:text-base font-medium leading-relaxed">
            Initialize secure communication channels with the ApexEdge system operators for collaborations, server inquiries, or transmission support data.
          </p>
        </div>

        {/* Dynamic Slide Indicators Overlay */}
        <div className="absolute inset-x-0 bottom-16 z-20 flex flex-col items-center justify-end">
          <div className="flex gap-2 bg-zinc-900/40 backdrop-blur-md px-3 py-1.5 rounded-md border border-zinc-800/80">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-sm transition-all duration-500 ${currentSlide === index ? 'bg-amber-400 w-8 shadow-[0_0_8px_#fbbf24]' : 'bg-zinc-700 hover:bg-zinc-500'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Contact Info Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactInfo.map((info, idx) => (
            <div 
              key={idx} 
              onClick={info.onClick}
              className={`group rounded-xl p-6 text-center bg-zinc-900/40 backdrop-blur-xl shadow-3xl transition-all duration-500 hover:-translate-y-1 ${info.bgColor} ${info.isClickable ? 'cursor-pointer' : ''}`}
            >
              <div className="w-12 h-12 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-center mx-auto mb-4 shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className={info.iconColor}>{info.icon}</div>
              </div>
              <h3 className="text-xs font-black font-mono tracking-wider text-zinc-300 mb-2 uppercase">{info.title}</h3>
              <p className="text-white font-mono text-sm tracking-wide font-bold">{info.details}</p>
              <p className="text-xs text-zinc-500 mt-1.5 font-medium">{info.subDetail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Interactive Transmission Form Fields Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Interactive Secure Form Layout Block */}
          <div className="lg:col-span-7 bg-zinc-900/30 backdrop-blur-md rounded-2xl p-8 shadow-3xl border border-zinc-900/80">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-3.5 py-1 mb-4">
                <Send size={12} className="text-amber-500" />
                <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">SEND US A MESSAGE</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">We'd Love to Hear From You</h2>
              <p className="text-zinc-400 text-xs sm:text-sm font-medium mt-1">Fill out the form and we'll get back to you within 24 hours.</p>
            </div>

            {submitted && (
              <div className="mb-6 p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl flex items-center gap-3 animate-fade-in-up">
                <CheckCircle size={18} className="text-emerald-400" />
                <div>
                  <p className="text-emerald-400 font-black text-sm uppercase font-mono">Message Sent Successfully!</p>
                  <p className="text-emerald-500/80 text-xs mt-0.5">We'll get back to you soon.</p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-950/20 border border-red-500/30 rounded-xl flex items-center gap-3">
                <AlertCircle size={18} className="text-red-400" />
                <p className="text-red-400 font-mono text-xs uppercase tracking-wide">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-zinc-500 font-mono mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-900 focus:border-zinc-700 bg-zinc-950 text-white placeholder-zinc-700 text-sm font-medium outline-none transition-all"
                    placeholder="Aman"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-zinc-500 font-mono mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-900 focus:border-zinc-700 bg-zinc-950 text-white placeholder-zinc-700 text-sm font-medium outline-none transition-all"
                    placeholder="Kumar"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-500 font-mono mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-900 focus:border-zinc-700 bg-zinc-950 text-white placeholder-zinc-700 text-sm font-medium outline-none transition-all"
                  placeholder="apexedgegaming@gmail.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-500 font-mono mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-900 focus:border-zinc-700 bg-zinc-950 text-white placeholder-zinc-700 text-sm font-medium outline-none transition-all"
                  placeholder="How can we help?"
                />
              </div>
              
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-500 font-mono mb-2">Message *</label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-900 focus:border-zinc-700 bg-zinc-950 text-white placeholder-zinc-700 text-sm font-medium outline-none resize-none transition-all"
                  placeholder="Tell us what you're thinking..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-white text-black font-black uppercase tracking-wider text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 hover:scale-[1.005] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={13} className="stroke-[2.5]" />
                  </>
                )}
              </button>
              
              <p className="text-[11px] text-zinc-600 text-center mt-4 leading-relaxed font-medium">
                By submitting this form, you agree to our privacy policy. We'll never share your information.
              </p>
            </form>
          </div>

          {/* FAQ & Processing Timeline Logs Block */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-900/20 rounded-2xl p-6 border border-zinc-900/80">
              <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-3.5 py-1 mb-4">
                <Clock size={12} className="text-purple-400" />
                <span className="text-purple-400 text-[10px] font-black uppercase tracking-widest">RESPONSE TIME</span>
              </div>
              <h3 className="text-xl font-black text-zinc-100 uppercase mb-4 tracking-tight">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-zinc-900/30 border border-zinc-900/80 rounded-xl p-5 hover:border-zinc-800 transition-all duration-300">
                    <h4 className="font-bold text-sm text-zinc-200 mb-2 uppercase font-mono tracking-wide">{faq.question}</h4>
                    <p className="text-zinc-400 text-xs leading-relaxed font-medium">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shift Processing Uptime Block */}
            <div className="bg-zinc-900/10 rounded-xl p-5 border border-zinc-900/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800">
                  <Clock size={18} className="text-amber-500" />
                </div>
                <div>
                  <h4 className="font-black font-mono text-xs uppercase text-zinc-200 tracking-wide">Office Hours</h4>
                  <p className="text-[10px] tracking-widest font-bold text-zinc-600 font-mono">We're here to help</p>
                </div>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-2 border-b border-zinc-900/60 text-zinc-500">
                  <span>Monday - Friday</span>
                  <span className="font-bold text-zinc-300">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-900/60 text-zinc-500">
                  <span>Saturday</span>
                  <span className="font-bold text-zinc-300">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between py-2 text-zinc-500">
                  <span>Sunday</span>
                  <span className="font-black text-amber-500 uppercase tracking-widest">Closed</span>
                </div>
              </div>
            </div>

            {/* Social Coordinates Linking Grid */}
            <div className="bg-zinc-950 rounded-xl p-5 border border-zinc-900">
              <h4 className="font-black font-mono text-xs uppercase text-zinc-200 tracking-wider mb-4 flex items-center gap-2">
                <Globe size={14} className="text-purple-400" />
                Connect With Us
              </h4>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 bg-zinc-900 rounded-md flex items-center justify-center text-zinc-500 hover:text-white border border-zinc-900 hover:border-zinc-800 transition-all">
                  <FaTwitter size={15} />
                </a>
                <a href="#" className="w-9 h-9 bg-zinc-900 rounded-md flex items-center justify-center text-zinc-500 hover:text-white border border-zinc-900 hover:border-zinc-800 transition-all">
                  <FaFacebook size={15} />
                </a>
                <a href="#" className="w-9 h-9 bg-zinc-900 rounded-md flex items-center justify-center text-zinc-500 hover:text-white border border-zinc-900 hover:border-zinc-800 transition-all">
                  <FaInstagram size={15} />
                </a>
                <a href="#" className="w-9 h-9 bg-zinc-900 rounded-md flex items-center justify-center text-zinc-500 hover:text-white border border-zinc-900 hover:border-zinc-800 transition-all">
                  <FaLinkedin size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Mapping Interface Area */}
      <div className="bg-black py-16 border-t border-zinc-900/60 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-1">
            <h3 className="text-xl font-black text-white tracking-wide uppercase font-mono">Find Us Here</h3>
            <p className="text-zinc-500 text-xs font-medium">Visit our headquarters in the heart of Patna City</p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-3xl border border-zinc-900 bg-zinc-950">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.7158087309126!2d85.12559567606375!3d25.614358114676566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed584775be8627%3A0xce66161bbd79c88f!2sSuper%20City%20Builders%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1778916002770!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(110%) brightness(95%)' }} 
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ApexEdgeGaming Office Location"
            ></iframe>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.06; transform: scale(1); }
          50% { opacity: 0.12; transform: scale(1.03); }
        }
        
        @keyframes pulseSlower {
          0%, 100% { opacity: 0.06; transform: scale(1); }
          50% { opacity: 0.12; transform: scale(1.06); }
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulseSlower 9s ease-in-out infinite;
        }
        
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
        
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}