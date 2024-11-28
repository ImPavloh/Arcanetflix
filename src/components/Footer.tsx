'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Twitter, Instagram, Youtube, Facebook, Music } from 'lucide-react'

const TikTokIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

const SpotifyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14.5c2.5-1 5.5-1 8 0" />
    <path d="M6.5 12c3.5-1 7.5-1 11 0" />
    <path d="M8 9.5c2.5-1 5.5-1 8 0" />
  </svg>
)

const socialLinks = [
  {
    icon: TikTokIcon,
    href: 'https://www.tiktok.com/@leagueoflegends',
    label: 'TikTok de League of Legends',
  },
  {
    icon: Twitter,
    href: 'https://twitter.com/arcaneshow',
    label: 'Twitter de Arcane',
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/arcaneshow',
    label: 'Instagram de Arcane',
  },
  {
    icon: Facebook,
    href: 'https://facebook.com/arcaneshow',
    label: 'Facebook de Arcane',
  },
  {
    icon: Youtube,
    href: 'https://youtube.com/playlist?list=PLbAFXJC0J5GYRhFnNllP8ss1moTRwMRBg',
    label: 'YouTube de Arcane',
  },
  {
    icon: SpotifyIcon,
    href: 'https://open.spotify.com/album/3MdiH74FL8mhlbnR6DcqJd',
    label: 'Banda sonora de Arcane en Spotify',
  },
  {
    icon: Music,
    href: 'https://music.apple.com/es/album/1593944607',
    label: 'Banda sonora de Arcane en Apple Music',
  },
]

const footerLinks = [
  {
    title: 'Explorar',
    links: [
      {
        label: 'Ver en Netflix',
        href: 'https://www.netflix.com/title/81435684',
      },
      { label: 'Sitio oficial', href: 'https://www.arcane.com/es-es/' },
      { label: 'Noticias', href: 'https://www.arcane.com/es-es/news/' },
    ],
  },
  {
    title: 'Legal',
    links: [
      {
        label: 'Términos de Servicio',
        href: 'https://www.riotgames.com/es/terms-of-service-ES',
      },
      {
        label: 'Aviso de Privacidad',
        href: 'https://www.riotgames.com/es/privacy-notice-ES',
      },
      { label: 'Cookies', href: 'https://www.riotgames.com/es/cookie-policy' },
    ],
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-b from-[#0A1428] to-[#040a18] border-t border-[#1E2328]">
      <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-5 lg:gap-8">
          <div className="space-y-6 lg:col-span-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link href="/" className="inline-block">
                <Image
                  className="h-8 sm:h-10 w-auto"
                  src="/svg/arcane.svg"
                  alt="Logo de Arcane"
                  width={60}
                  height={60}
                />
                <span className="sr-only">Arcane</span>
              </Link>
              <p className="text-[#A1A1A1] text-xs sm:text-sm max-w-md leading-relaxed">
                Explora el mundo de Arcane, donde la magia y la tecnología
                colisionan en las ciudades de Piltover y Zaun. Una historia de
                conflicto, innovación y los lazos que nos unen y nos separan.
              </p>
            </div>
            <nav aria-label="Redes sociales">
              <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-[#C8AA6E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8AA6E] rounded-full p-1"
                      aria-label={link.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <link.icon
                        className="h-5 w-5 sm:h-6 sm:w-6"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:col-span-3">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs sm:text-sm font-bold text-[#C8AA6E] tracking-widest uppercase mb-4">
                  {section.title}
                </h3>
                <nav aria-label={section.title}>
                  <ul className="space-y-2 sm:space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-[#A1A1A1] hover:text-[#C8AA6E] transition-colors text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C8AA6E] rounded px-2 py-1 inline-block"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 sm:pt-8 border-t border-[#1E2328]">
          <p className="text-xs sm:text-sm text-[#A1A1A1] text-center">
            © {currentYear} Riot Games, Inc. Todos los derechos reservados. Esta
            es una fan page de Arcane creada por{' '}
            <a
              href="https://github.com/impavloh"
              className="text-[#C8AA6E] hover:underline focus:outline-none focus:ring-2 focus:ring-[#C8AA6E] rounded px-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pavloh
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
