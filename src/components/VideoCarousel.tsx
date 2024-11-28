'use client'

import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useInView } from 'react-intersection-observer'

interface Video {
  id: number
  title: string
  thumbnail: string
  videoSrc: string
}

const videos: Video[] = [
  {
    id: 1,
    title: 'THE LINE | VIDEOCLIP',
    thumbnail: '/thumbnails/1.jpg',
    videoSrc: 'https://www.youtube.com/embed/E2Rj2gQAyPA',
  },
  {
    id: 2,
    title: 'PAINT THE TOWN BLUE',
    thumbnail: '/thumbnails/2.png',
    videoSrc: 'https://www.youtube.com/embed/pl2K9rvsS74',
  },
  {
    id: 3,
    title: 'COME PLAY',
    thumbnail: '/thumbnails/3.jpg',
    videoSrc: 'https://www.youtube.com/embed/3jf6xOg6e7Y',
  },
  {
    id: 4,
    title: 'ARCANE: TEMPORADA 2 | TRÁILER OFICIAL',
    thumbnail: '/thumbnails/4.jpg',
    videoSrc: 'https://www.youtube.com/embed/hsffPST-x1k',
  },
  {
    id: 5,
    title: 'ARCANE: TRÁILER "COME PLAY"',
    thumbnail: '/thumbnails/5.jpg',
    videoSrc: 'https://www.youtube.com/embed/5Hy6M3Lk08c',
  },
  {
    id: 6,
    title: 'AVANCE DE ARCANE EN LOS JUEGOS: COME PLAY',
    thumbnail: '/thumbnails/6.jpg',
    videoSrc: 'https://www.youtube.com/embed/rR5vyzjGwmk',
  },
]

interface VideoCarouselProps {
  onVideoPlayingChange: (isPlaying: boolean) => void
}

export function VideoCarousel({ onVideoPlayingChange }: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  const openModal = useCallback(
    (video: Video) => {
      setSelectedVideo(video)
      setIsModalOpen(true)
      onVideoPlayingChange(true)
    },
    [onVideoPlayingChange],
  )

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedVideo(null)
    onVideoPlayingChange(false)
  }, [onVideoPlayingChange])

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % videos.length)
  }, [])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal()
      } else if (e.key === 'ArrowLeft' && !isModalOpen) {
        prev()
      } else if (e.key === 'ArrowRight' && !isModalOpen) {
        next()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, closeModal, prev, next])

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isModalOpen])

  useEffect(() => {
    if (inView) {
      const timer = setInterval(next, 5000)
      return () => clearInterval(timer)
    }
  }, [inView, next])

  const memoizedCarouselContent = useMemo(
    () => (
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ x: `${-currentIndex * 100}%` }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="flex h-full">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="relative w-full flex-shrink-0"
              aria-hidden={currentIndex !== index}
            >
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-8">
                <h3 className="text-lg sm:text-2xl font-bold mb-2 text-arcane-light neon-text">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    ),
    [currentIndex],
  )

  const memoizedThumbnails = useMemo(
    () => (
      <div className="flex overflow-x-auto px-1 py-4 scrollbar-hide justify-start sm:justify-center gap-2 sm:gap-4">
        {videos.map((video, index) => (
          <button
            key={video.id}
            onClick={() => setCurrentIndex(index)}
            className={`relative flex-shrink-0 w-24 sm:w-40 aspect-video rounded-lg overflow-hidden group 
              ${
                currentIndex === index
                  ? 'ring-2 ring-arcane-light'
                  : 'opacity-60 hover:opacity-100'
              }`}
            aria-label={`Select ${video.title}`}
            aria-current={currentIndex === index}
          >
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    ),
    [currentIndex],
  )

  return (
    <div
      className="relative w-full py-6 md:py-12 overflow-hidden flex flex-col items-center px-4 sm:px-0"
      ref={inViewRef}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-arcane-light">
          Vídeos de la temporada 2
        </h2>
        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-white font-tungsten pb-4 sm:pb-8">
          CLIPS
        </h1>
      </motion.div>
      <div
        ref={carouselRef}
        className="relative aspect-video rounded-lg overflow-hidden group hextech-border w-full sm:w-[80%]"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onTouchStart={() => setShowControls(true)}
        onTouchEnd={() => setShowControls(false)}
        role="region"
        aria-roledescription="carousel"
        aria-label="Video carousel"
      >
        {memoizedCarouselContent}

        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-between p-2 sm:p-4"
            >
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-arcane-light/20 backdrop-blur-sm transition-colors"
                onClick={prev}
                aria-label="Previous video"
              >
                <Image
                  src="/svg/arrow-left.svg"
                  alt="Previous"
                  width={16}
                  height={16}
                  className="sm:w-6 sm:h-6"
                />
              </Button>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-arcane-light/20 hover:bg-arcane-light/30 transition-colors backdrop-blur-sm"
                  onClick={() => openModal(videos[currentIndex])}
                  aria-label={`Play ${videos[currentIndex].title}`}
                >
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-arcane-light" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-arcane-light/20 backdrop-blur-sm transition-colors"
                onClick={next}
                aria-label="Next video"
              >
                <Image
                  src="/svg/arrow-right.svg"
                  alt="Next"
                  width={16}
                  height={16}
                  className="sm:w-6 sm:h-6"
                />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {memoizedThumbnails}

      <AnimatePresence>
        {isModalOpen && selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="relative w-full max-w-6xl mx-auto">
              <h2 id="modal-title" className="sr-only">
                {selectedVideo.title}
              </h2>
              <div className="relative aspect-video rounded-lg overflow-hidden hextech-border">
                <iframe
                  src={`${selectedVideo.videoSrc}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              <div className="absolute top-2 sm:top-4 sm:right-4 flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-arcane-light/20"
                  onClick={() => window.open(selectedVideo.videoSrc, '_blank')}
                  aria-label="Open video in new tab"
                >
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-arcane-light" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-arcane-light/20"
                  onClick={closeModal}
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-arcane-light" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
