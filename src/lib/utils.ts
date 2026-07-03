import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  wait: number,
): T & { cancel: () => void } {
  let lastCall = 0
  let timeout: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null

  const invoke = (time: number) => {
    lastCall = time
    const args = lastArgs as Parameters<T>
    lastArgs = null
    fn(...args)
  }

  const throttled = (...args: Parameters<T>) => {
    const now = Date.now()
    const remaining = wait - (now - lastCall)
    lastArgs = args

    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      invoke(now)
    } else if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        invoke(Date.now())
      }, remaining)
    }
  }

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    lastArgs = null
    lastCall = 0
  }

  return throttled as T & { cancel: () => void }
}
