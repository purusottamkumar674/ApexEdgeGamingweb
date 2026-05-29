import { Link } from 'react-router-dom'

export default function CookieConsentBar({ showCookieConsent, setShowCookieConsent }) {
  if (!showCookieConsent) return null

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto max-w-sm bg-[#1c1c1c] backdrop-blur-xl border border-zinc-800 p-4 rounded-lg shadow-2xl z-[999] flex flex-col gap-3">
      <p className="text-xs text-zinc-400 leading-normal font-medium">
        ApexEdge Gaming uses cookies to enhance your gaming experience, personalize content, and improve site performance. Read our{' '}
        <Link to="/privacy" className="text-white font-bold hover:underline">
          Privacy Policy
        </Link>.
      </p>

      <div className="flex gap-2 justify-end">
        <button
          onClick={() => setShowCookieConsent(false)}
          className="px-3 py-1.5 text-[11px] font-bold text-zinc-500 hover:text-white transition-colors"
        >
          Decline
        </button>

        <button
          onClick={() => setShowCookieConsent(false)}
          className="bg-white text-black font-bold text-[11px] px-3.5 py-1.5 rounded-full hover:bg-zinc-200 transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  )
}