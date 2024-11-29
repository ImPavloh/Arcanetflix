'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import { Link as ScrollLink, Events } from 'react-scroll'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { throttle } from 'lodash'
import { ChevronRight, CircleX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ScrollIndicatorItemProps {
  section: {
    id: string
    label: string
  }
  index: number
  isActive: boolean
}

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  }),
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
}

function ScrollIndicatorItem({
  section,
  index,
  isActive,
}: ScrollIndicatorItemProps) {
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    controls.start(isActive ? 'active' : 'inactive')
  }, [isActive, controls])

  return (
    <motion.li
      key={section.id}
      custom={index}
      variants={itemVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative"
    >
      <ScrollLink
        to={section.id}
        spy={true}
        smooth={true}
        duration={500}
        offset={-50}
        className={cn(
          'group hidden sm:flex items-center justify-end relative cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 rounded-full',
          'transition-transform hover:scale-105',
        )}
        aria-label={`Navigate to ${section.label} section`}
        aria-current={isActive ? 'true' : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-end relative">
          <motion.span
            className={cn(
              'bg-slate-900/80 backdrop-blur-md',
              'rounded-l-full py-2 px-4 hextech-border',
              'border border-cyan-500/30',
              'shadow-[0_0_15px_rgba(34,211,238,0.15)]',
              'absolute right-full mr-4 text-sm font-medium',
              'text-cyan-300/80',
              'pointer-events-none select-none',
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {section.label}
          </motion.span>

          <div className="relative w-14 h-14 flex items-center justify-center">
            <motion.div
              className={cn(
                'absolute inset-0 rounded-full',
                'bg-cyan-500/20 blur-md',
                isActive ? 'opacity-100' : 'opacity-0',
              )}
              animate={{
                scale: isActive ? [1, 1.2, 1] : 1,
                opacity: isActive ? [0.5, 0.8, 0.5] : 0,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <motion.div
              className="absolute inset-0"
              animate={controls}
              variants={{
                active: {
                  rotate: 360,
                  scale: 1.05,
                  opacity: 1,
                  transition: {
                    rotate: {
                      duration: 20,
                      ease: 'linear',
                      repeat: Infinity,
                    },
                    scale: {
                      duration: 0.5,
                      ease: 'easeOut',
                    },
                    opacity: {
                      duration: 0.5,
                      ease: 'easeOut',
                    },
                  },
                },
                inactive: {
                  rotate: [0, 45, 0],
                  scale: 1,
                  opacity: 0.7,
                  transition: {
                    rotate: {
                      duration: 10,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatType: 'reverse',
                    },
                    scale: {
                      duration: 0.5,
                      ease: 'easeOut',
                    },
                    opacity: {
                      duration: 0.5,
                      ease: 'easeOut',
                    },
                  },
                },
              }}
              whileHover={{
                opacity: 1,
                scale: 1.1,
                rotate: [null, 15, -15],
                transition: {
                  duration: 0.3,
                  rotate: {
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  },
                },
              }}
            >
              <Image
                src={`/hextech/hextech_stone${Math.floor(Math.random() * 3) + 1}.png`}
                alt="Hextech stone"
                width={48}
                height={48}
                className={cn(
                  'w-full h-full object-contain',
                  'drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]',
                  'transition-all duration-300',
                  isActive && 'drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]',
                )}
                priority={index === 0}
                onError={(e) => (e.currentTarget.src = '/hextech/hextech_stone1.png')}
              />
            </motion.div>
          </div>
        </div>
      </ScrollLink>
    </motion.li>
  )
}

const sections = [
  { id: 'hero', label: 'Inicio' },
  { id: 'characters', label: 'Personajes' },
  { id: 'clips', label: 'Clips' },
  { id: 'merch', label: 'Merch' },
  { id: 'gallery', label: 'Galería' },
]

export function ScrollIndicators() {
  const [activeSection, setActiveSection] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isIndicatorVisible, setIsIndicatorVisible] = useState(true)
  const intersectionObserver = useRef<IntersectionObserver | null>(null)

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    },
    [],
  )

  const handleScroll = useCallback(
    throttle(() => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      setIsVisible(scrollPosition > windowHeight * 0.3)
    }, 100),
    [],
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll()

    intersectionObserver.current = new IntersectionObserver(
      handleIntersection,
      {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: [0.2, 0.5, 0.8],
      },
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        intersectionObserver.current?.observe(element)
      }
    })

    Events.scrollEvent.register('begin', () => {})
    Events.scrollEvent.register('end', () => {})

    return () => {
      window.removeEventListener('scroll', handleScroll)
      handleScroll.cancel()
      intersectionObserver.current?.disconnect()
      Events.scrollEvent.remove('begin')
      Events.scrollEvent.remove('end')
    }
  }, [handleScroll, handleIntersection])

  return (
    <div
      className={cn(
        'fixed hidden sm:flex right-6 top-1/2 z-50 -translate-y-1/2',
        'flex-col items-end gap-4',
        '@container',
      )}
    >
      <AnimatePresence mode="wait">
        {isVisible && isIndicatorVisible && (
          <motion.nav
            className={cn(
              'relative bg-slate-900/40 backdrop-blur-md',
              'rounded-full py-8 px-4 hextech-border',
              'border border-cyan-500/30',
              'shadow-[0_0_15px_rgba(34,211,238,0.15)]',
              '',
            )}
            initial={{ opacity: 0, x: 50, rotate: -20 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: 50, rotate: 20 }}
            transition={{
              duration: 0.7,
              type: 'spring',
              stiffness: 100,
              damping: 15,
            }}
            aria-label="Page navigation"
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-transparent via-cyan-400/50 to-cyan-400/80" />

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-t from-transparent via-cyan-400/50 to-cyan-400/80" />

            <ul className="flex flex-col space-y-10">
              {sections.map((section, index) => (
                <ScrollIndicatorItem
                  key={section.id}
                  section={section}
                  index={index}
                  isActive={activeSection === section.id}
                />
              ))}
            </ul>
          </motion.nav>
        )}

        {isVisible && (
          <motion.div
            key="toggle-button"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 0.5,
              type: 'spring',
              stiffness: 200,
              damping: 20,
            }}
          >
            <Button
              onClick={() => setIsIndicatorVisible(!isIndicatorVisible)}
              className={cn(
                'relative bg-slate-900/40 backdrop-blur-md',
                'rounded-full p-3',
                'border border-cyan-500/30',
                'shadow-[0_0_15px_rgba(34,211,238,0.15)]',
                'hover:bg-cyan-400/10 hover:border-cyan-400/40',
                'transition-all duration-300 hover:scale-110',
                'focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-cyan-500/50 fixed right-6',
              )}
              aria-label={
                isIndicatorVisible
                  ? 'Hide scroll indicator'
                  : 'Show scroll indicator'
              }
            >
              <motion.div
                initial={false}
                animate={{
                  rotate: isIndicatorVisible ? 0 : 180,
                }}
                transition={{
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: isIndicatorVisible ? 15 : 225,
                }}
                whileTap={{ scale: 0.9 }}
              >
                {isIndicatorVisible ? (
                  <CircleX
                    className={cn(
                      'h-5 w-5 text-cyan-300',
                      'drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]',
                    )}
                  />
                ) : (
                  <ChevronRight
                    className={cn(
                      'h-5 w-5 text-cyan-300',
                      'drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]',
                    )}
                  />
                )}
              </motion.div>

              <div className="absolute inset-0 rounded-full bg-cyan-400/5 blur-md -z-10" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
