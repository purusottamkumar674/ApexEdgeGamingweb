export default function HomePageStyles() {
  return (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .mono-font { font-family: 'JetBrains Mono', monospace; }
        
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
        
        @keyframes float-slow { 0%, 100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-20px) scale(1.05); } }
        .animate-float { animation: float-slow 8s ease-in-out infinite; }
        
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
        
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .animate-pulse { animation: pulse 1.5s ease-in-out infinite; }
        
        .shimmer-text {
          background: linear-gradient(90deg, #7c3aed, #db2777, #10b981, #7c3aed);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-anim 6s linear infinite;
        }
        
        @keyframes shimmer-anim { 0% { background-position: 0% center; } 100% { background-position: 300% center; } }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .animate-bounce { animation: bounce 1s ease-in-out infinite; }
      `}</style>
  )
}
