'use client'

import { Suspense, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'
import { SpoilerWarning } from '@/components/SpoilerWarning'
import { HeroSection } from '@/components/HeroSection'
import { MusicPlayer } from '@/components/MusicPlayer'

const ImageGallery = dynamic(
  () => import('@/components/ImageGallery').then((mod) => mod.ImageGallery),
  {
    loading: () => <LoadingSpinner />,
  },
)

const Merchandise = dynamic(
  () => import('@/components/Merchandise').then((mod) => mod.Merchandise),
  {
    loading: () => <LoadingSpinner />,
  },
)

const VideoCarousel = dynamic(
  () => import('@/components/VideoCarousel').then((mod) => mod.VideoCarousel),
  {
    loading: () => <LoadingSpinner />,
  },
)

const CharacterShowcase = dynamic(
  () =>
    import('@/components/CharacterShowcase').then(
      (mod) => mod.CharacterShowcase,
    ),
  {
    loading: () => <LoadingSpinner />,
  },
)

export default function ArcanePage() {
  const [isMediaPlaying, setIsMediaPlaying] = useState(false)

  const handleMediaPlayingChange = useCallback((isPlaying: boolean) => {
    setIsMediaPlaying(isPlaying)
  }, [])

  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-arcane-dark">
      <SpoilerWarning />
      <section id="hero">
        <HeroSection />
      </section>

      <main className="relative z-10 container mx-auto px-4 py-8">
        <MusicPlayer
          url="https://open.spotify.com/playlist/37i9dQZF1DX3KVUsNUmJc2"
          isMediaPlaying={isMediaPlaying}
        />

        <section id="characters" className="my-16">
          <Suspense fallback={<LoadingSpinner />}>
            <CharacterShowcase />
          </Suspense>
        </section>

        <section id="clips" className="my-16">
          <Suspense fallback={<LoadingSpinner />}>
            <VideoCarousel onVideoPlayingChange={handleMediaPlayingChange} />
          </Suspense>
        </section>

        <section id="merch" className="my-16">
          <Suspense fallback={<LoadingSpinner />}>
            <Merchandise />
          </Suspense>
        </section>

        <section id="gallery" className="my-16">
          <Suspense fallback={<LoadingSpinner />}>
            <ImageGallery onImageViewChange={handleMediaPlayingChange} />
          </Suspense>
        </section>
      </main>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-40">
      <Loader2 className="w-8 h-8 animate-spin text-arcane-light" />
    </div>
  )
}
