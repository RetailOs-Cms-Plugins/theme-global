'use client'
import { gsap } from 'gsap'
import React, { useEffect, useRef, useState } from 'react'

const cards = [
  {
    type: 'video',
    alt: 'Video 1',
    rotation: 2,
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    type: 'video',
    alt: 'Video 2',
    rotation: -4,
    src: 'https://www.youtube.com/embed/tgbNymZ7vqY',
  },
  {
    type: 'video',
    alt: 'Video 3',
    rotation: 0,
    src: 'https://www.youtube.com/embed/3JZ_D3ELwOQ',
  },
  {
    type: 'image',
    alt: 'Gallery Image',
    rotation: -1,
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    type: 'video',
    alt: 'Video 4',
    rotation: 2,
    src: 'https://www.youtube.com/embed/tgbNymZ7vqY',
  },
  {
    type: 'video',
    alt: 'Video 5',
    rotation: -7,
    src: 'https://www.youtube.com/embed/tgbNymZ7vqY',
  },
]

const FunkyGallery: React.FC = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [playing, setPlaying] = useState(Array(cards.length).fill(false))

  useEffect(() => {
    cards.forEach((card, idx) => {
      const el = cardRefs.current[idx]
      if (el) {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            rotate: card.rotation,
            scale: 0.8,
            y: 80,
          },
          {
            delay: idx * 0.13,
            duration: 1.1,
            ease: 'elastic.out(1, 0.7)',
            opacity: 1,
            rotate: card.rotation,
            scale: 1,
            y: 0,
          },
        )
      }
    })
  }, [])

  const containerWidth = 1360
  const cardWidth = 240 // w-60 = 240px
  const gap = (containerWidth - cardWidth) / (cards.length - 1)

  const handlePlay = (idx: number) => {
    setPlaying((prev) => {
      const updated = [...prev]
      updated[idx] = true
      return updated
    })
  }

  return (
    <div className="w-full flex flex-col items-center py-10">
      <div className="relative mx-auto" style={{ height: '420px', width: `${containerWidth}px` }}>
        {cards.map((card, idx) => (
          <div
            className={
              'absolute bg-white rounded-xl border-4 border-white shadow-xl overflow-hidden w-60 h-96 transition-transform duration-300'
            }
            key={idx}
            ref={(el) => {
              cardRefs.current[idx] = el || null
            }}
            style={{
              left: `${idx * gap}px`,
              perspective: '1000px',
              rotate: `${card.rotation}deg`,
              zIndex: idx,
            }}
          >
            {card.type === 'video' ? (
              <>
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover"
                  frameBorder={0}
                  src={card.src}
                  title={card.alt}
                />
                {!playing[idx] && (
                  <button
                    aria-label="Play video"
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors duration-200"
                    style={{ zIndex: 2 }}
                    tabIndex={-1}
                    onClick={() => handlePlay(idx)}
                  >
                    <svg
                      fill="none"
                      height="32"
                      viewBox="0 0 33 32"
                      width="33"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="16.5849"
                        cy="15.7291"
                        fill="#F6F6F7"
                        r="15.0233"
                        transform="rotate(2.39691 16.5849 15.7291)"
                      />
                      <path
                        d="M21.9004 15.5095L13.0836 20.1195L13.4997 10.1789L21.9004 15.5095Z"
                        fill="#3B3B3B"
                      />
                    </svg>
                  </button>
                )}
                {/* Funky badge for video */}
                <div className="absolute left-4 bottom-4 bg-gradient-to-r from-cyan-200 via-white/70 to-violet-200 rounded-full px-4 py-1 text-xs font-bold text-slate-700 shadow-md">
                  Funky Video
                </div>
              </>
            ) : (
              <>
                <img
                  alt={card.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  src={card.src}
                />
                {/* Funky gradient overlay */}
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-zinc-300 via-white/70 to-transparent rounded-b-xl" />
                {/* Funky badge for image */}
                <div className="absolute left-4 bottom-4 bg-gradient-to-r from-violet-200 via-white/80 to-cyan-200 rounded-full px-4 py-1 text-xs font-bold text-slate-700 shadow-md">
                  Toyland
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FunkyGallery
