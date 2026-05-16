import React, { useState } from 'react';
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

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email Us',
      details: 'apexedgegaming@gmail.com',
      subDetail: 'support@ApexEdgeGaming.com',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      icon: <Phone size={24} />,
      title: 'Call Us',
      details: '090310 62295',
      subDetail: 'Mon-Fri, 9am - 6pm EST',
      bgColor: 'bg-pink-100',
      iconColor: 'text-pink-600',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Visit Us',
      details: 'Kidwaipuri krishna park, Patna New City',
      subDetail: 'Patna, Bihar',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
    }
  ];

  const faqs = [
    { question: 'How quickly do you respond?', answer: 'We typically respond within 24-48 hours during business days.' },
    { question: 'Do you accept guest posts?', answer: 'Yes! Please send your pitch to hello@ApexEdgeGaming.com with "Guest Post" in the subject line.' },
    { question: 'Can I advertise on Blogy?', answer: 'Absolutely! Contact our advertising team at ads@ApexEdgeGaming.com for rates and opportunities.' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -right-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
          <div className="absolute bottom-0 -left-40 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-30 animate-pulse-slower"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-20 right-20 w-40 h-40 bg-yellow-500 rounded-full blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-float-delay"></div>
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-100"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-4xl mx-auto">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 mb-6 border border-white/20 shadow-lg animate-float">
              <Sparkles size={14} className="text-yellow-300" />
              <span className="text-sm font-medium text-white">We're Here to Help</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-2xl leading-tight">
              Let's Start a{' '}
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Conversation
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-purple-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              Have a question or want to work together? We'd love to hear from you. 
              Our team is here to help and will get back to you as soon as possible.
            </p>
            
            {/* Quick Contact Links */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="mailto:[EMAIL_ADDRESS]" className="inline-flex items-center gap-2 text-purple-200 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <Mail size={14} />
                [EMAIL_ADDRESS]
              </a>
              <a href="tel:+15551234567" className="inline-flex items-center gap-2 text-purple-200 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <Phone size={14} />
                +1 (555) 123-4567
              </a>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f8fafc" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((info, idx) => (
            <div key={idx} className="group bg-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
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
                    placeholder="John"
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
                    placeholder="Doe"
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
                  placeholder="hello@example.com"
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
            <p className="text-gray-400">Visit our headquarters in the heart of New York City</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            {/* <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.712776179330206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bed2f1b%3A0x2b4b6e8b8b8b8b8b!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus" 
              width="100%" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="ApexEdgeGaming Office Location"
            ></iframe> */}




<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.7158087309126!2d85.12559567606375!3d25.614358114676566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed584775be8627%3A0xce66161bbd79c88f!2sSuper%20City%20Builders%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1778916002770!5m2!1sen!2sin"
  width="100%"
  height="450"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
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
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.15); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.2); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(15px); }
        }
        
        @keyframes float-delay {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-25px) translateX(-15px); }
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
        
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}