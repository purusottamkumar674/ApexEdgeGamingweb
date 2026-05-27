import { Rocket, CheckCircle2 } from 'lucide-react'

export default function NewsletterCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 pb-16">
      <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white border border-slate-800 p-8 sm:p-12 lg:p-16 text-center shadow-2xl">
        <div className="absolute inset-0 bg-cover bg-center opacity-5 mix-blend-overlay" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=80)' }} />
        <div className="absolute right-[-10%] top-[-20%] w-[400px] h-[400px] bg-violet-600/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute left-[-5%] bottom-[-20%] w-[300px] h-[300px] bg-pink-600/20 rounded-full blur-[80px] animate-pulse delay-1000" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full px-3 py-1 text-[11px] font-bold tracking-widest uppercase text-pink-300">
            <Rocket size={12} /> ENTERPRISE CHANNEL
          </div>
          <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">Subscribe to Premium Pipeline</h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-md leading-relaxed">
            Get highly classified weekly insights, tech optimization logs, and priority community updates directly inside your inbox.
          </p>

          <form onSubmit={e => e.preventDefault()} className="w-full max-w-md flex flex-col sm:flex-row gap-2 mt-4">
            <input type="email" placeholder="Secure email vector address" className="bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 w-full placeholder:text-slate-500 font-medium transition-all" />
            <button className="bg-white text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors whitespace-nowrap">
              Subscribe Vector
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 text-xs text-slate-400 font-medium">
            {['Zero Spam Policy', 'Revoke Anytime', '100% Free Ecosystem'].map(text => (
              <div key={text} className="flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-emerald-500" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
