'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useSwipeable } from 'react-swipeable'
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type GalleryImage = {
  id: string
  image: string
  alt: string
  aspectRatio: number
}

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    image: '/gallery/1.png',
    alt: 'Smeech',
    aspectRatio: 16 / 9,
  },
  {
    id: '2',
    image: '/gallery/2.png',
    alt: 'Viktor, Ekko y Heimer dentro del Hexcore',
    aspectRatio: 4 / 3,
  },
  { id: '3', image: '/gallery/3.png', alt: 'Jinx', aspectRatio: 1 },
  {
    id: '4',
    image: '/gallery/4.png',
    alt: 'Violet',
    aspectRatio: 3 / 2,
  },
  {
    id: '5',
    image: '/gallery/5.png',
    alt: 'Equipo de asalto de Caitlyn',
    aspectRatio: 16 / 9,
  },
  {
    id: '6',
    image: '/gallery/6.png',
    alt: 'Jayce',
    aspectRatio: 1,
  },
  { id: '7', image: '/gallery/7.png', alt: 'Jinx', aspectRatio: 1 },
  {
    id: '8',
    image: '/gallery/8.png',
    alt: 'Jinx vs Warwick Vander',
    aspectRatio: 1,
  },
  {
    id: '9',
    image: '/gallery/9.png',
    alt: 'Ambessa y Caitlyn',
    aspectRatio: 16 / 9,
  },
  {
    id: '10',
    image: '/gallery/10.png',
    alt: 'Viktor',
    aspectRatio: 4 / 3,
  },
  {
    id: '11',
    image: '/gallery/11.jpg',
    alt: 'Ambessa',
    aspectRatio: 1,
  },
  {
    id: '12',
    image: '/gallery/12.jpg',
    alt: 'Violet vs Warwick Vander',
    aspectRatio: 3 / 2,
  },
  {
    id: '13',
    image: '/gallery/13.jpg',
    alt: 'Viktor',
    aspectRatio: 16 / 9,
  },
  {
    id: '14',
    image: '/gallery/14.jpg',
    alt: 'Jinx',
    aspectRatio: 4 / 3,
  },
  {
    id: '15',
    image: '/gallery/15.jpg',
    alt: 'Vi',
    aspectRatio: 1,
  },
]

interface ImageGalleryProps {
  onImageViewChange: (isViewing: boolean) => void
}

export function ImageGallery({ onImageViewChange }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [zoom, setZoom] = useState(1)

  const openLightbox = useCallback(
    (image: GalleryImage, index: number) => {
      setSelectedImage(image)
      setCurrentIndex(index)
      setZoom(1)
      onImageViewChange(true)
    },
    [onImageViewChange],
  )

  const closeLightbox = useCallback(() => {
    setSelectedImage(null)
    setZoom(1)
    onImageViewChange(false)
  }, [onImageViewChange])

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length)
    setSelectedImage(galleryImages[(currentIndex + 1) % galleryImages.length])
    setZoom(1)
  }, [currentIndex])

  const prevImage = useCallback(() => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + galleryImages.length) % galleryImages.length,
    )
    setSelectedImage(
      galleryImages[
        (currentIndex - 1 + galleryImages.length) % galleryImages.length
      ],
    )
    setZoom(1)
  }, [currentIndex])

  const handleZoomIn = useCallback(() => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 1))
  }, [])

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    trackMouse: true,
  })

  useEffect(() => {
    return () => {
      onImageViewChange(false)
    }
  }, [onImageViewChange])

  return (
    <div className="relative w-full min-h-screen text-white py-6 md:py-12 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-arcane-light">
            Imágenes de la temporada 2 de Arcane
          </h2>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-white font-tungsten">
            FOTOGRAMAS DE LOS EPISODIOS
          </h1>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px] grid-flow-dense">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              className={`relative overflow-hidden rounded-lg cursor-pointer group ${
                image.aspectRatio > 1.3 ? 'col-span-2' : ''
              } ${image.aspectRatio < 0.8 ? 'row-span-2' : ''}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => openLightbox(image, index)}
            >
              <Image
                src={image.image}
                alt={image.alt}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 4}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-sm font-semibold truncate">{image.alt}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl"
              tabIndex={-1}
              {...handlers}
            >
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="relative w-full max-w-6xl mx-auto">
                  <motion.div
                    className="relative aspect-video rounded-lg overflow-hidden hextech-border"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                  >
                    <Image
                      src={selectedImage.image}
                      alt={selectedImage.alt}
                      quality={80}
                      className="object-contain transition-transform duration-300"
                      style={{ transform: `scale(${zoom})` }}
                      priority
                      fill
                    />
                  </motion.div>

                  <div className="absolute top-2 right-2 md:top-4 md:right-4 flex gap-1 md:gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-arcane-light/20"
                      onClick={handleZoomIn}
                      aria-label="Zoom in"
                    >
                      <ZoomIn className="w-4 h-4 md:w-5 md:h-5 text-arcane-light" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-arcane-light/20"
                      onClick={handleZoomOut}
                      aria-label="Zoom out"
                    >
                      <ZoomOut className="w-4 h-4 md:w-5 md:h-5 text-arcane-light" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-arcane-light/20"
                      onClick={prevImage}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-arcane-light" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-arcane-light/20"
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-arcane-light" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-arcane-light/20"
                      onClick={closeLightbox}
                      aria-label="Close lightbox"
                    >
                      <X className="w-4 h-4 md:w-5 md:h-5 text-arcane-light" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
