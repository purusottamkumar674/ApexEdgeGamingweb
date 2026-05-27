import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Clock, Globe, ArrowRight, Sparkles } from 'lucide-react'; 
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

  // Array of images for the background contact header slider
  const sliderImages = [
    "contact2.png",
    "contact1.png"
  ];

  useEffect(() => {
    // Auto-advance slider every 4 seconds
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

  // Email click handler
  const handleEmailClick = () => {
    window.location.href = 'mailto:apexedgegaming@gmail.com';
  };

  // Phone/Call click handler
  const handleCallClick = () => {
    window.location.href = 'tel:+919031062295';
  };

  // Location/Map click handler
  const handleLocationClick = () => {
    window.open('https://www.google.com/maps/place/Kidwaipuri,+Patna,+Bihar/', '_blank');
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email Us',
      details: 'apexedgegaming@gmail.com',
      subDetail: 'support@ApexEdgeGaming.com',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      onClick: handleEmailClick,
      isClickable: true
    },
    {
      icon: <Phone size={24} />,
      title: 'Call Us',
      details: '090310 62295',
      subDetail: 'Mon-Fri, 9am - 6pm EST',
      bgColor: 'bg-pink-100',
      iconColor: 'text-pink-600',
      onClick: handleCallClick,
      isClickable: true
    },
    {
      icon: <MapPin size={24} />,
      title: 'Visit Us',
      details: 'Kidwaipuri krishna park, Patna New City',
      subDetail: 'Patna, Bihar',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      
      {/* Premium Hero Section - STRICT 90% SCREEN HEIGHT (90vh) */}
      <div className="relative overflow-hidden h-[110vh] w-full bg-slate-900">
        
        {/* Full Screen Image Layer Stretched Perfectly */}
        <div className="absolute inset-0 w-full h-full">
          {sliderImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              } transition-transform duration-[4000ms]`}
              style={{ backgroundImage: `url('${img}')` }}
            />
          ))}
        </div>
        
        {/* Subtle dynamic background highlights overlay */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-0 -right-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
          <div className="absolute bottom-0 -left-40 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse-slower"></div>
          
          {/* Transparent Grid Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-100"></div>
        </div>
        
        {/* UI Controls Layer - Text removed completely, only slider dots & scroll arrow remain */}
        <div className="absolute inset-x-0 bottom-0 z-20 pb-28 flex flex-col items-center justify-end h-full bg-gradient-to-t from-black/30 via-transparent to-transparent">
          
          {/* Big & Bold Slider Indicators */}
          <div className="flex gap-3 backdrop-blur-md bg-black/10 px-4 py-2 rounded-full border border-white/10 shadow-lg">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-12 shadow-lg' : 'bg-white/30 hover:bg-white/60'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Scroll Indicator positioned accurately inside 90vh bounds */}
        <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block z-30">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/80 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
        
        {/* Smooth Transition Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto min-h-[40px]">
            <path fill="#f8fafc" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((info, idx) => (
            <div 
              key={idx} 
              onClick={info.onClick}
              className={`group bg-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 ${info.isClickable ? 'cursor-pointer' : ''}`}
            >
              <div className={`w-16 h-16 ${info.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-all duration-300`}>
                <div className={info.iconColor}>{info.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
              <p className="text-gray-600 font-medium">{info.details}</p>
              <p className="text-sm text-gray-400 mt-1">{info.subDetail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Contact Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-100">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-1.5 mb-4">
                <Send size={14} className="text-purple-600" />
                <span className="text-purple-600 text-xs font-semibold uppercase tracking-wide">SEND US A MESSAGE</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">We'd Love to Hear From You</h2>
              <p className="text-gray-500">Fill out the form and we'll get back to you within 24 hours.</p>
            </div>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-fade-in-up">
                <CheckCircle size={20} className="text-green-500" />
                <div>
                  <p className="text-green-700 font-semibold">Message Sent Successfully!</p>
                  <p className="text-green-600 text-sm">We'll get back to you soon.</p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                <AlertCircle size={20} className="text-red-500" />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-gray-50 hover:bg-white"
                    placeholder="Aman"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-gray-50 hover:bg-white"
                    placeholder="Kumar"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-gray-50 hover:bg-white"
                  placeholder="apexedgegaming@gmail.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-gray-50 hover:bg-white"
                  placeholder="How can we help?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none bg-gray-50 hover:bg-white"
                  placeholder="Tell us what you're thinking..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              
              <p className="text-xs text-gray-400 text-center mt-4">
                By submitting this form, you agree to our privacy policy. We'll never share your information.
              </p>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
                <Clock size={14} className="text-purple-600" />
                <span className="text-purple-600 text-xs font-semibold uppercase tracking-wide">RESPONSE TIME</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-5 hover:shadow-md transition-all duration-300">
                    <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-gray-500 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Clock size={18} className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Office Hours</h4>
                  <p className="text-xs text-gray-500">We're here to help</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium text-gray-900">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium text-gray-900">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium text-gray-900">Closed</span>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe size={18} className="text-purple-600" />
                Connect With Us
              </h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 hover:scale-110">
                  <FaTwitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#1877F2] hover:text-white transition-all duration-300 hover:scale-110">
                  <FaFacebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#E4405F] hover:text-white transition-all duration-300 hover:scale-110">
                  <FaInstagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#0077B5] hover:text-white transition-all duration-300 hover:scale-110">
                  <FaLinkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-gray-900 py-16 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Find Us Here</h3>
            <p className="text-gray-400">Visit our headquarters in the heart of Patna City</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.7158087309126!2d85.12559567606375!3d25.614358114676566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed584775be8627%3A0xce66161bbd79c88f!2sSuper%20City%20Builders%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1778916002770!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
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
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.10; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.05); }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.10; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.08); }
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
          animation: fadeInUp 0.5s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 7s ease-in-out infinite;
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