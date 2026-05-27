import { useState, useEffect } from 'react'
import { Image as ImageIcon } from 'lucide-react'

export default function LazyImage({ src, alt, className, resolveCoverUrl }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const imageUrl = resolveCoverUrl(src)

  useEffect(() => {
    if (!imageUrl) return
    
    setIsLoaded(false)
    setIsError(false)
    
    const img = new Image()
    
    img.onload = () => {
      setIsLoaded(true)
    }
    
    img.onerror = () => {
      setIsError(true)
      console.error('Failed to load image:', imageUrl)
    }
    
    img.src = imageUrl
    
    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [imageUrl])

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
      {!isLoaded && !isError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
          <ImageIcon size={32} className="text-slate-400" />
        </div>
      )}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={alt || 'Image'}
          className={`${className} w-full h-full object-cover transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
        />
      )}
    </div>
  )
}
