'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github } from 'lucide-react'
import { Link as ScrollLink } from 'react-scroll'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'PERSONAJES', href: 'characters' },
  { label: 'CLIPS', href: 'clips' },
  { label: 'MERCH', href: 'merch' },
  { label: 'GALERÍA', href: 'gallery' },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A1428]/75 backdrop-blur-md shadow-lg'
            : 'bg-gradient-to-b from-[#0A1428]/80 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <NavLogo />
          <DesktopMenu />
          <MobileMenuButton setIsMobileMenuOpen={setIsMobileMenuOpen} />
        </div>
      </motion.nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}

function NavLogo() {
  return (
    <ScrollLink
      to="hero"
      spy={true}
      smooth={true}
      duration={500}
      className="cursor-pointer"
    >
      <img src="/svg/arcane.svg" alt="Arcane Logo" className="h-6 w-auto" />
    </ScrollLink>
  )
}

function DesktopMenu() {
  return (
    <div className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <NavLink key={item.label} {...item} />
      ))}
      <GithubLink />
      <NetflixButton />
    </div>
  )
}

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <ScrollLink
      to={href}
      spy={true}
      smooth={true}
      offset={-50}
      duration={500}
      className="text-[13px] font-medium text-[#A1A1A1] hover:text-white duration-200 tracking-widest cursor-pointer"
    >
      {label}
    </ScrollLink>
  )
}

function GithubLink() {
  return (
    <Link
      href="https://github.com/impavloh/arcanetflix"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Github"
    >
      <Github className="w-6 h-6 text-[#A1A1A1] hover:text-white duration-200" />
    </Link>
  )
}

function NetflixButton() {
  return (
    <Button
      asChild
      className="hidden md:flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#E50914] via-[#B81D24] to-[#D22F45] text-white text-sm font-semibold tracking-wide rounded-lg border border-[#B81D24] shadow-md hover:shadow-lg transition-transform transform hover:scale-105 active:scale-100 hover:bg-gradient-to-r hover:from-[#B81D24] hover:via-[#D22F45] hover:to-[#E50914] focus:outline-none duration-300 ease-in-out"
    >
      <Link
        href="https://www.netflix.com/es/title/81435684"
        target="_blank"
        rel="noopener noreferrer"
      >
        VER EN NETFLIX
      </Link>
    </Button>
  )
}

function MobileMenuButton({
  setIsMobileMenuOpen,
}: {
  setIsMobileMenuOpen: (open: boolean) => void
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden border border-white/20 text-slate-200/80 hover:bg-white/10 hover:text-white transition-transform"
      onClick={() => setIsMobileMenuOpen(true)}
      aria-label="Abrir menú móvil"
    >
      <Menu className="w-6 h-6" />
    </Button>
  )
}

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#0A1428]/95 backdrop-blur-md md:hidden"
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden border border-white/20 text-slate-200/80 hover:bg-white/10 hover:text-white transition-transform"
                onClick={onClose}
                aria-label="Cerrar menú móvil"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center flex-grow space-y-8">
              {navItems.map((item) => (
                <ScrollLink
                  key={item.label}
                  to={item.href}
                  spy={true}
                  smooth={true}
                  offset={-60}
                  duration={500}
                  className="text-xl font-medium text-[#A1A1A1] hover:text-white duration-200 tracking-widest cursor-pointer"
                  onClick={onClose}
                >
                  {item.label}
                </ScrollLink>
              ))}
              <GithubLink />
              <Button
                asChild
                className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#E50914] via-[#B81D24] to-[#D22F45] text-white text-base font-semibold tracking-wide rounded-lg border border-[#B81D24] shadow-md hover:shadow-lg transition-transform transform hover:scale-105 active:scale-100 hover:bg-gradient-to-r hover:from-[#B81D24] hover:via-[#D22F45] hover:to-[#E50914] focus:outline-none duration-300 ease-in-out"
              >
                <Link
                  href="https://www.netflix.com/es/title/81435684"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VER EN NETFLIX
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
