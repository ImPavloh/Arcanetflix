'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Character {
  id: string
  name: string
  description: string
  thumbnail: string
}

const characters: Character[] = [
  {
    id: 'jinx',
    name: 'JINX',
    description:
      'Jinx tenía el alma dividida en dos identidades: la fuerte y poderosa hija que crió el mismísimo Silco, y la temerosa y debilucha hermana pequeña de Vi. Ahora, tras aceptar el monstruo que Vi ha creado, Jinx se ha convertido en un receptáculo vacío, la chica maldita que echa todo a perder.',
    thumbnail: '/characters/1.webp',
  },
  {
    id: 'vi',
    name: 'VI',
    description:
      'Tras aceptar que Powder ya no existe, Vi asume lo que debe hacer: encargarse del monstruo que ha creado, es decir, Jinx. A sabiendas de lo peligrosa que puede llegar a ser su hermana, Vi se alía con Caitlyn y accede a portar la insignia de agente.',
    thumbnail: '/characters/2.webp',
  },
  {
    id: 'caitlyn',
    name: 'CAITLYN',
    description:
      'Caitlyn es una agente de Piltover. Otrora, hizo uso de su pericia y dotes detectivescas para exponer la corrupción en Zaun y Piltover, pero, tras el ataque de Jinx al Consejo, ha abandonado toda esperanza de conseguir la paz.',
    thumbnail: '/characters/3.webp',
  },
  {
    id: 'ekko',
    name: 'EKKO',
    description:
      'Ekko da vida a los Firelights, un grupo de zaunitas que han construido un nuevo hogar que juran proteger. Para su sorpresa, ha encontrado un buen amigo en Heimerdinger, y ambos luchan por hacer de Zaun un lugar mejor.',
    thumbnail: '/characters/4.webp',
  },
  {
    id: 'heimerdinger',
    name: 'HEIMER',
    description:
      'Heimerdinger ya advirtió al Consejo de Piltover sobre los peligros de usar la magia sin precaución. Tras aprender de sus errores con Jayce, Heimerdinger anima a Ekko a seguir buscando una solución y trabaja con él para solucionar el problema en lugar de limitarse a ofrecerle consejo.',
    thumbnail: '/characters/5.webp',
  },
  {
    id: 'ambessa',
    name: 'AMBESSA',
    description:
      'Ambessa, guerrera noxiana y madre de Mel, jura proteger el legado de su familia..., aunque eso signifique ir en contra de los deseos de su hija.',
    thumbnail: '/characters/6.webp',
  },
  {
    id: 'jayce',
    name: 'JAYCE',
    description:
      'Tras una serie de acontecimientos, Jayce empieza a cuestionar el uso de la tecnología hextech para mejorar las vidas de los piltovanos. Mientras tanto, descubre con la ayuda de Heimerdinger y Ekko que el empleo de esta tecnología ha emponzoñado la Ciudad Subterránea. Su investigación continúa, hasta que se topan con algo más...',
    thumbnail: '/characters/7.webp',
  },
  {
    id: 'mel',
    name: 'MEL',
    description:
      'La prudente inversión de Mel en la tecnología hextech ha transformado Piltover en uno de los mayores focos comerciales de toda Runaterra, y a ella en una de las personas más influyentes de la ciudad. Tras el ataque de Jinx, Mel planta cara a su madre y al consejero Salo para proteger el sueño de Jayce.',
    thumbnail: '/characters/8.webp',
  },
  {
    id: 'sevika',
    name: 'SEVIKA',
    description:
      'Sevika ha vivido a la sombra de Piltover toda su vida. Mientras los barones químicos se declaran la guerra unos a otros para hacerse con el trono de Zaun, que ha quedado vacío tras la muerte de Silco, Sevika no pierde de vista al verdadero enemigo: los de arriba.',
    thumbnail: '/characters/9.webp',
  },
  {
    id: 'viktor',
    name: 'VIKTOR',
    description:
      'Pese a las advertencias sobre sus peligros, Viktor sobrepasa los límites de la tecnología hextech. Guiado por la culpa, se embarca en una cruzada por cumplir su sueño: poner la tecnología hextech al alcance de todos.',
    thumbnail: '/characters/10.webp',
  },
  {
    id: 'warwick',
    name: 'WARWICK',
    description:
      'Warwick es una bestia creada por Singed cuya furia primitiva se debate con los retazos de humanidad que aún alberga en su interior. ¿Quedará algo de Vander después de tanto sufrimiento?',
    thumbnail: '/characters/11.webp',
  },
]

export function CharacterShowcase() {
  const [currentCharacter, setCurrentCharacter] = useState(0)
  const [direction, setDirection] = useState(0)

  return (
    <div className="relative w-full text-white py-6 md:py-12 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 md:mb-16 text-center"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-2 text-arcane-light">
                Temporada 2 de Arcane
              </h2>
              <h1 className="text-5xl md:text-7xl tracking-tighter font-tungsten">
                PERSONAJES
              </h1>
            </motion.div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-4">
              {characters.map((character, index) => (
                <motion.button
                  key={character.id}
                  onClick={() => {
                    setDirection(index > currentCharacter ? 1 : -1)
                    setCurrentCharacter(index)
                  }}
                  className={cn(
                    'relative group',
                    'w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden',
                    'transition-all duration-300 ease-out',
                    currentCharacter === index
                      ? 'ring-2 ring-arcane-light ring-offset-2 ring-offset-[#0A1428]'
                      : 'opacity-50 hover:opacity-75',
                  )}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={character.thumbnail}
                    alt={character.name}
                    quality={75}
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    priority
                    fill
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-1 left-0 right-0 text-center text-xs font-medium ">
                    {character.name}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="relative h-[600px] md:h-[700px] lg:h-[800px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentCharacter}
                custom={direction}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col space-y-8"
              >
                <div className="relative w-full h-3/5 rounded-lg overflow-hidden hextech-border">
                  <Image
                    src={characters[currentCharacter].thumbnail}
                    alt={characters[currentCharacter].name}
                    className="object-cover"
                    priority
                    fill
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428] via-transparent to-transparent" />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-4xl md:text-5xl text-cyan-200 glow inline-block font-tungsten">
                    {characters[currentCharacter].name}
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed text-gray-300">
                    {characters[currentCharacter].description}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
