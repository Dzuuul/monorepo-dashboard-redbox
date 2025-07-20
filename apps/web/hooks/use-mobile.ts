import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 768

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(mql.matches)
    }
    mql.addEventListener("change", onChange)
    onChange()
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}

// Hook untuk mencegah validasi yang terpicu saat perubahan theme
export function usePreventThemeValidation() {
  useEffect(() => {
    const preventValidation = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' && target.hasAttribute('required')) {
        // Prevent validation during theme changes
        const input = target as HTMLInputElement;
        if (!input.value && !input.matches(':focus')) {
          input.setCustomValidity('');
        }
      }
    };

    document.addEventListener('DOMSubtreeModified', preventValidation);
    return () => document.removeEventListener('DOMSubtreeModified', preventValidation);
  }, []);
}
