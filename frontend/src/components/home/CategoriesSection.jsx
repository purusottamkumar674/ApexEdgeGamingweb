export default function CategoriesSection() {
  // 5 Image Cards ka data
  const cards = [
    { title: "Battle Royale", count: "120 Articles", img: "/game17.png" },
    { title: "Action Games", count: "85 Articles", img: "game16.png" },
    { title: "Adventure Games", count: "45 Articles", img: "game15.png" },
    { title: "Racing Games", count: "60 Articles", img: "game14.png" },
    { title: "Strategy Games", count: "95 Articles", img: "game13.png" },
  ];

  return (
    /* Is container ko relative aur overflow-clip kiya hai taaki video sirf isi ek section ke andar locked rahe */
    <div className="relative w-full overflow-clip bg-zinc-950">
      
      {/* 1. VIDEO HEIGHT AREA (h-[50vh] rakha hai taaki video sirf upar ke hisse me limited rahe) */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        {/* Sticky container ab sirf isi section block ke andar fixed/sticky behave karega */}
        <div className="absolute inset-0 w-full h-full pointer-events-none sticky top-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            defaultMuted
            className="w-full h-full object-cover"
          >
            <source src="/game.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* 2. CARDS SECTION (bg-zinc-950 se solid background diya hai taaki video yahan se chup jaye) */}
      <section className="relative z-10 bg-zinc-950 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* CARDS GRID: Value kam karke 10% overlap (30px/40px) par set kar diya hai */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 -translate-y-[30px] md:-translate-y-[40px]">
            {cards.map((card, index) => (
              <div
                key={index}
                className="relative h-72 rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl group cursor-pointer transition-all transform hover:-translate-y-2 hover:border-zinc-500"
              >
                {/* Card Image */}
                <img 
                  src={card.img} 
                  alt={card.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Dark Gradient over card content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Card Text */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10 text-left">
                  <h4 className="text-white font-bold text-lg tracking-tight group-hover:text-zinc-200 transition-colors">
                    {card.title}
                  </h4>
                  <span className="inline-block text-[10px] font-medium text-zinc-400 mt-1 uppercase tracking-wider">
                    {card.count}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}