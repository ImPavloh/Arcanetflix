'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronUp, ChevronDown, Play, Pause, X } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface MusicPlayerProps {
  url: string
  className?: string
  isMediaPlaying: boolean
}

export function MusicPlayer({
  url,
  className,
  isMediaPlaying,
}: MusicPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const embedUrl = url.replace('spotify.com/', 'spotify.com/embed/')
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const sendIframeMessage = useCallback((command: string) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ command }, '*')
    }
  }, [])

  const togglePlay = useCallback(() => {
    if (isReady) {
      const newPlayingState = !isPlaying
      setIsPlaying(newPlayingState)
      sendIframeMessage(newPlayingState ? 'play' : 'pause')
    }
  }, [isReady, isPlaying, sendIframeMessage])

  const toggleExpanded = useCallback(() => setIsExpanded((prev) => !prev), [])

  const toggleVisibility = useCallback(() => setIsVisible((prev) => !prev), [])

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100
      setIsScrolled(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'object') {
        if (event.data.type === 'playback_update' && event.data.data) {
          setIsPlaying(!event.data.data.isPaused)
        } else if (event.data.type === 'ready') {
          setIsReady(true)
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  useEffect(() => {
    if (isMediaPlaying) {
      setIsVisible(false)
      if (isPlaying) {
        sendIframeMessage('pause')
        setIsPlaying(false)
      }
    } else {
      setIsVisible(true)
    }
  }, [isMediaPlaying, isPlaying, sendIframeMessage])

  if (!isMounted) return null

  return (
    <div
      ref={playerRef}
      className={cn(
        'fixed z-50 transition-all duration-300 ease-in-out',
        'bottom-0',
        'sm:w-80 md:w-96 sm:bottom-4',
        {
          'translate-y-0': isVisible,
          'translate-y-full': !isVisible,
          'sm:right-1/2 sm:translate-x-1/2': isScrolled,
          'sm:right-4 sm:translate-x-0': !isScrolled,
        },
        className,
      )}
      role="region"
      aria-label="Media player"
    >
      <div
        onClick={toggleExpanded}
        className={cn(
          'w-full sm:w-auto bg-arcane-dark rounded-t-lg sm:rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out opacity-90 cursor-pointer',
          isExpanded ? 'opacity-100 h-[28rem]' : 'h-20 hover:opacity-100',
          isPlaying ? 'opacity-100' : '',
          isVisible ? 'hextech-border-anim' : '',
          'hextech-border px-2 pb-2',
        )}
      >
        <div className="flex items-center justify-between px-4 h-20">
          <div className="flex items-center space-x-3">
            <Image
              src="/playlist.webp"
              width={48}
              height={48}
              alt="Arcane Official Playlist"
              className="rounded-md"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                togglePlay()
              }}
              className="text-arcane-light hover:text-white hover:bg-arcane-accent/20"
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              disabled={!isReady}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
          </div>

          <div className="flex-1 mx-4">
            <h2 className="text-sm font-medium truncate text-arcane-light">
              {isPlaying ? 'Reproduciendo...' : 'Reproducir playlist'}
            </h2>
            <p className="text-xs text-arcane-light opacity-70 truncate">
              Arcane Official Playlist
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                toggleExpanded()
              }}
              className="text-arcane-light hover:text-white hover:bg-arcane-accent/20"
              aria-label={
                isExpanded ? 'Contraer reproductor' : 'Expandir reproductor'
              }
            >
              {isExpanded ? (
                <ChevronDown className="h-6 w-6" />
              ) : (
                <ChevronUp className="h-6 w-6" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                toggleVisibility()
              }}
              className="text-arcane-light hover:text-white hover:bg-arcane-accent/20"
              aria-label="Ocultar reproductor"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div
          className={cn(
            'w-full text-white transition-all duration-300 ease-in-out h-[calc(100%-5rem)]',
          )}
        >
          {isMounted && (
            <iframe
              title="Reproductor Spotify"
              ref={iframeRef}
              src={`${embedUrl}?utm_source=generator&theme=0`}
              width="100%"
              height="100%"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="border-0"
            />
          )}
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={toggleVisibility}
        className={cn(
          'absolute left-1/2 transform -translate-x-1/2 -top-8 border-b-0 bg-arcane-dark text-arcane-light hover:text-white hover:bg-arcane-accent/20 rounded-t-lg rounded-b-none px-4 py-2 hextech-border transition-all duration-300 ease-in-out',
          isVisible ? 'opacity-0' : 'opacity-100',
        )}
      >
        Mostrar reproductor
      </Button>
    </div>
  )
}
