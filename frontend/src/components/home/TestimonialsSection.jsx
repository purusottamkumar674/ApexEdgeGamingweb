import { Star, BadgeCheck } from 'lucide-react'

export default function TestimonialsSection({ testimonials }) {
  return (
    <section className="bg-black border-t border-zinc-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2">
            Community Reviews
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-white">
            What Gamers Say About ApexEdge Gaming
          </h2>

          <p className="text-zinc-500 mt-2">
            Trusted by gaming enthusiasts, esports fans, and players worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#1c1c1c] border border-zinc-800/80 p-6 sm:p-8 rounded-lg"
            >
              <div className="flex text-amber-400 gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} className="fill-current" />
                ))}
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <h5 className="text-sm font-bold text-white flex items-center gap-1">
                    {t.name}
                    <BadgeCheck size={14} className="text-zinc-400" />
                  </h5>

                  <p className="text-xs text-zinc-500 mt-0.5">
                    {t.role} at {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}