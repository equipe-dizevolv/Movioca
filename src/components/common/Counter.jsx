import { useEffect, useRef } from 'react'
import { useCounter } from '../../hooks/useInteractions'

/**
 * Componente Counter
 * Renderiza um número que conta de 0 até o valor final quando entra na viewport
 */
function Counter({ end, duration = 2000 }) {
  const { count, startCounter } = useCounter(end, duration)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounter()
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [startCounter])

  return <span ref={ref} className="number">{count}</span>
}

export default Counter
