'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Play,
  Pause,
  ChevronDown,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
} from 'lucide-react'
import Link from 'next/link'
import { Link as ScrollLink } from 'react-scroll'

declare global {
  interface HTMLVideoElement {
    mozHasAudio?: boolean
    webkitAudioDecodedByteCount?: number
  }
}

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [hasAudio, setHasAudio] = useState(false)
  const [isVideoHidden, setIsVideoHidden] = useState(false)

  const togglePlayPause = useCallback(() => {
    if (videoRef.current && !isVideoHidden) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }, [isPlaying, isVideoHidden])

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }, [isMuted])

  const toggleVideoVisibility = useCallback(() => {
    setIsVideoHidden(!isVideoHidden)
    if (!isVideoHidden) {
      setIsPlaying(true)
    }
  }, [isVideoHidden])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setIsPlaying(false)
        })
      }

      const checkAudio = () => {
        if (video.mozHasAudio !== undefined) {
          setHasAudio(video.mozHasAudio)
        } else if (video.webkitAudioDecodedByteCount !== undefined) {
          setHasAudio(video.webkitAudioDecodedByteCount > 0)
        } else {
          video.muted = true
          const playPromise = video.play()
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setHasAudio(!video.paused)
                video.pause()
              })
              .catch(() => {
                setHasAudio(false)
              })
          }
        }
      }

      video.addEventListener('loadedmetadata', checkAudio)
      return () => {
        video.removeEventListener('loadedmetadata', checkAudio)
      }
    }
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      <div className="absolute inset-0">
        {isVideoHidden ? (
          <Image
            src="/jinxbg.webp"
            alt="Jinx background"
            fill
            className="opacity-70 object-cover"
            priority
          />
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            loop
            playsInline
            muted={isMuted}
            autoPlay
            aria-hidden="true"
          >
            <source
              src="https://cmsassets.rgpub.io/sanity/files/dsfx7636/news/8ca377434ec75445478d3d5d88acbd2aa5e8e86c.mp4"
              type="video/mp4"
            />
          </video>
        )}
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-4 left-4 z-10 flex space-x-2"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlayPause}
            aria-label={
              isPlaying && !isVideoHidden ? 'Pausar video' : 'Reproducir video'
            }
            className={`${
              isVideoHidden
                ? 'bg-gray-600/20 hover:bg-gray-700/20 border border-gray-800/50 cursor-default'
                : 'bg-[#B81D24]/10 hover:bg-[#B81D24]/20 border border-[#B81D24]/50'
            }`}
          >
            {isPlaying && !isVideoHidden ? (
              <Pause className="h-4 w-4 text-white" />
            ) : (
              <Play className="h-4 w-4 text-white" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleVideoVisibility}
            aria-label={isVideoHidden ? 'Mostrar video' : 'Ocultar video'}
            className="bg-[#B81D24]/10 hover:bg-[#B81D24]/20 border border-[#B81D24]/50"
          >
            {isVideoHidden ? (
              <Eye className="h-4 w-4 text-white" />
            ) : (
              <EyeOff className="h-4 w-4 text-white" />
            )}
          </Button>
          {hasAudio && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
              className="bg-[#B81D24]/10 hover:bg-[#B81D24]/20 border border-[#B81D24]/50"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-white" />
              ) : (
                <Volume2 className="h-4 w-4 text-white" />
              )}
            </Button>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="relative container mx-auto px-4 h-full flex flex-col py-8 justify-center">
        <div className="flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full max-w-3xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <Image
                src="/arcane.webp"
                alt="Arcane logo"
                width={500}
                height={125}
                className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-md mx-auto sm:mx-0"
              />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold mb-4 leading-tight font-tungsten text-center sm:text-left">
              SUMÉRGETE EN{' '}
              <motion.span
                className="text-cyan-200 glow inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                ARCANE
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mb-6 text-sm sm:text-base md:text-lg text-gray-300 text-center sm:text-left"
            >
              <p>
                Una serie original de Netflix basada en el universo de League of
                Legends
              </p>
              <p className="mt-2">
                <span className="text-yellow-400" aria-hidden="true">
                  ★★★★★
                </span>
                <span className="sr-only">5 estrellas</span> 9.0/10 IMDb
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start w-full">
                <Link
                  className="flex items-center justify-center bg-[#E50914] hover:bg-[#B81D24] text-white text-sm sm:text-base 
                  px-4 sm:px-6 py-2 sm:py-3 font-bold uppercase transition-colors duration-300 rounded-md w-full sm:w-auto"
                  href="https://www.netflix.com/title/81435684"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Play
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    aria-hidden="true"
                  />
                  Ver en Netflix
                </Link>
                <Link
                  className="flex items-center justify-center bg-[#B81D24]/10 hover:bg-[#B81D24]/20 text-white text-sm sm:text-base 
                  px-4 sm:px-6 py-2 sm:py-3 font-bold uppercase transition-colors duration-300 border border-[#B81D24]/50 rounded-md w-full sm:w-auto"
                  href="https://www.arcane.com/es-es/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Play
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    aria-hidden="true"
                  />
                  Web oficial
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <ScrollLink to="characters" smooth={true} duration={300} offset={-60}>
        <motion.div
          className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 2,
            duration: 1,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <ChevronDown className="w-6 h-6 text-white" aria-hidden="true" />
        </motion.div>
      </ScrollLink>
    </section>
  )
}
