'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { X, AlertTriangle } from 'lucide-react'

export function SpoilerWarning() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  useEffect(() => {
    const spoilerAccepted = localStorage.getItem('spoilerWarningAccepted')
    if (spoilerAccepted) {
      setIsVisible(false)
    }
  }, [])

  const handleAccept = () => {
    setIsFadingOut(true)
    setTimeout(() => {
      setIsVisible(false)
      if (dontShowAgain) {
        localStorage.setItem('spoilerWarningAccepted', 'true')
      }
    }, 500)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-[#0a1128]/40 backdrop-blur-md flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              duration: 0.5,
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-r from-[#00a7b6]/30 to-[#00b4d8]/30 rounded-lg blur-xl"
            />
            <motion.div
              initial={{ background: 'rgba(5, 10, 25, 0.95)' }}
              whileHover={{ background: 'rgba(5, 10, 25, 0.98)' }}
              className="relative bg-arcane-dark/95 p-6 sm:p-8 md:p-10 rounded-lg border-arcane-light shadow-2xl overflow-hidden hextech-border"
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#023e8a] to-[#0077b6]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute top-2 right-2 sm:top-4 sm:right-4"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleAccept}
                  aria-label="Cerrar advertencia de spoilers"
                  className="hover:bg-arcane-light/10 transition-colors duration-200"
                >
                  <X className="h-4 w-4 sm:h-6 sm:w-6 text-arcane-light" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex items-center mb-6 sm:mb-8"
              >
                <AlertTriangle className="h-8 w-8 sm:h-10 sm:w-10 text-[#0077b6] mr-4" />
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="text-2xl sm:text-3xl font-bold tracking-wide glow"
                >
                  ADVERTENCIA DE SPOILERS
                </motion.h2>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="text-white text-lg sm:text-xl mb-8 sm:mb-10 leading-relaxed"
              >
                Esta página contiene spoilers de ambas temporadas de Arcane.
                Continúa solo si has visto la serie completa o no te importan
                los spoilers.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="flex items-center mb-6 sm:mb-8"
              >
                <Checkbox
                  id="dontShowAgain"
                  checked={dontShowAgain}
                  onCheckedChange={(checked) =>
                    setDontShowAgain(checked as boolean)
                  }
                  className="border-arcane-light text-arcane-light focus:ring-arcane-light"
                />
                <label
                  htmlFor="dontShowAgain"
                  className="text-arcane-light ml-3 text-sm sm:text-base cursor-pointer hover:text-[#0077b6] transition-colors duration-200"
                >
                  No mostrar esta advertencia de nuevo
                </label>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  onClick={handleAccept}
                  className="flex-1 hextech-button text-white py-4 sm:py-5 text-lg sm:text-xl font-medium transition-all duration-300 ease-in-out transform rounded-md"
                >
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                  >
                    Mostrar contenido
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
