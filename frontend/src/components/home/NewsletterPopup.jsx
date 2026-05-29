import { Mail, X } from 'lucide-react'

export default function NewsletterPopup({
  showNewsletterPopup,
  setShowNewsletterPopup,
}) {
  if (!showNewsletterPopup) return null

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4 animate-fade-in">
      <div className="bg-white border border-slate-100 rounded-[2rem] max-w-md w-full p-6 sm:p-8 relative shadow-2xl transform scale-100 transition-transform animate-fade-in">
        <button
          onClick={() => setShowNewsletterPopup(false)}
          className="absolute top-4 right-4 w-7 h-7 bg-slate-100 hover:bg-slate-200 border border-slate-200/60 rounded-full text-slate-500 hover:text-slate-800 flex items-center justify-center font-bold text-xs transition-all hover:scale-110"
        >
          <X size={14} />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-600 text-white flex items-center justify-center mx-auto mb-4 shadow-xl shadow-violet-600/20">
          <Mail size={24} />
        </div>

        <h4 className="text-xl font-black text-slate-950 text-center tracking-tight">
          Join the ApexEdge Gaming Community
        </h4>

        <p className="text-xs text-slate-400 text-center mt-1 max-w-xs mx-auto leading-relaxed">
          Stay ahead of the game with the latest gaming news, esports updates,
          game reviews, hardware insights, exclusive content, and community
          highlights from ApexEdge Gaming delivered directly to your inbox.
        </p>

        <div className="mt-5 flex gap-2">
          <input
            type="email"
            placeholder="Enter your email address"
            className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 w-full placeholder:text-slate-400 font-medium transition-all"
          />

          <button
            onClick={() => setShowNewsletterPopup(false)}
            className="bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:from-violet-600 hover:to-pink-600 transition-all whitespace-nowrap shadow-md hover:shadow-lg"
          >
            Subscribe Now
          </button>
        </div>

        <p className="text-[10px] text-slate-400 text-center mt-4 font-medium">
          Join thousands of gamers worldwide and never miss the latest gaming
          updates, esports tournaments, and exclusive ApexEdge Gaming content.
        </p>
      </div>
    </div>
  )
}