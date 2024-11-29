'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation, useInView } from 'framer-motion'
import { ChevronRight, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Product {
  id: string
  name: string
  image: string
  url: string
  partner: string
}

const products: Product[] = [
  {
    id: '1',
    name: 'Colección Uniqlo x Arcane',
    image: '/merch/1.png',
    url: 'https://www.uniqlo.com/es/es/spl/ut/arcane',
    partner: 'Uniqlo',
  },
  {
    id: '2',
    name: 'Colección BlackMilk Arcane',
    image: '/merch/2.png',
    url: 'https://blackmilkclothing.com/collections/arcane',
    partner: 'BlackMilk',
  },
  {
    id: '3',
    name: 'Edición Secretlab Arcane',
    image: '/merch/3.jpg',
    url: 'https://secretlab.eu/es/pages/arcane',
    partner: 'Secretlab',
  },
  {
    id: '4',
    name: 'Guantes de Boxeo Arcane',
    image: '/merch/4.png',
    url: 'https://www.hayabusafight.com/collections/arcane-boxing-gloves',
    partner: 'Hayabusa',
  },
  {
    id: '5',
    name: 'Fenty Beauty x Arcane',
    image: '/merch/5.png',
    url: 'https://fentybeauty.com/en-es/collections/arcane-collection',
    partner: 'Fenty Beauty',
  },
  {
    id: '6',
    name: 'Mercancía de Riot Games',
    image: '/merch/6.png',
    url: 'https://merch.riotgames.com/es-es/category/arcane/',
    partner: 'Riot Games',
  },
  {
    id: '7',
    name: 'Colección Arcane',
    image: '/merch/7.png',
    url: 'https://full.life/collections/arcane',
    partner: 'Fulllife',
  },
  {
    id: '8',
    name: 'Arcane Funko POP!',
    image: '/merch/8.jpg',
    url: 'https://merch.riotgames.com/category/arcane/',
    partner: 'Funko POP!',
  },
  {
    id: '9',
    name: 'Youtooz x Arcane',
    image: '/merch/9.jpg',
    url: 'https://youtooz.com/collections/arcane',
    partner: 'Youtooz',
  },
  {
    id: '10',
    name: 'Mono de cuerda de Powder',
    image: '/merch/10.jpg',
    url: 'https://merch.riotgames.com/es-es/product/arcane-powder-s-wind-up-monkey?utm_source=Client&utm_medium=Hub-T1&utm_campaign=&utm_content=Powders-Wind-Up-Monkey',
    partner: 'Riot Games',
  },
  {
    id: '11',
    name: 'Set coleccionista 1ª temporada',
    image: '/merch/11.jpg',
    url: 'https://store.gkids.com/pages/arcane',
    partner: 'GKIDS',
  },
  {
    id: '12',
    name: 'Edición artefacto InsightEditions',
    image: '/merch/12.jpg',
    url: 'https://insighteditions.com/products/the-art-and-making-of-arcane-artifact-edition',
    partner: 'InsightEditions',
  },
]

export function Merchandise() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <section
      ref={ref}
      className="relative w-full py-8 sm:py-12 md:py-16 overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: 'easeOut' },
            },
          }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-[#00B4D8]">
            Productos y colaboraciones
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white font-tungsten">
            MERCANCÍA OFICIAL DE ARCANE
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: 'easeOut',
                  },
                },
              }}
              className="relative group"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative aspect-video rounded-lg overflow-hidden hextech-border">
                <Image
                  src={product.image}
                  alt={product.name}
                  quality={80}
                  className="transition-transform duration-500 group-hover:scale-110 object-cover"
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div
                  className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    hoveredProduct === product.id ? 'backdrop-blur-sm' : ''
                  }`}
                >
                  <Link
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#00B4D8]/20 hover:bg-[#00B4D8]/30 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-full transition-colors duration-300 flex items-center text-sm sm:text-base"
                  >
                    Ver colección
                    <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </div>
              </div>
              <div className="mt-2 sm:mt-4 text-center">
                <h3 className="text-base sm:text-lg font-semibold text-[#00B4D8] mb-1">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400">
                  {product.partner}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                delay: 0.5,
                ease: 'easeOut',
              },
            },
          }}
          className="mt-8 sm:mt-12 text-center"
        >
          <Link
            href="https://merch.riotgames.com/es-es/category/arcane/"
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="bg-[#00B4D8]/10 hover:bg-[#00B4D8]/20 text-[#00B4D8] hover:text-[#00B4D8]/60 border-[#00B4D8]/50 hover:border-[#00B4D8] text-base sm:text-lg py-4 px-6 sm:py-6 sm:px-8"
            >
              Explorar todo el merchandising
              <ShoppingBag className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
