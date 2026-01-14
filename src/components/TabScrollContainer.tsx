import { useRef, useState, useEffect, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TabScrollContainerProps {
  children: ReactNode;
  className?: string;
}

export function TabScrollContainer({ children, className = '' }: TabScrollContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    // Múltiplos checks para garantir detecção
    const timer1 = setTimeout(() => checkScroll(), 50);
    const timer2 = setTimeout(() => checkScroll(), 150);
    const timer3 = setTimeout(() => checkScroll(), 300);
    
    window.addEventListener('resize', checkScroll);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('resize', checkScroll);
    };
  }, [children]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Versão Mobile - com setas */}
      <div className="relative md:hidden">
        {/* Seta esquerda */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 bg-gradient-to-r from-background to-transparent w-12 flex items-center justify-start pl-2"
            aria-label="Rolar para esquerda"
          >
            <div className="bg-primary text-primary-foreground rounded-full p-1 shadow-lg">
              <ChevronLeft className="w-4 h-4" />
            </div>
          </button>
        )}

        {/* Container de scroll mobile */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className={`overflow-x-auto scrollbar-hide ${className}`}
        >
          {children}
        </div>

        {/* Seta direita */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 bg-gradient-to-l from-background to-transparent w-12 flex items-center justify-end pr-2"
            aria-label="Rolar para direita"
          >
            <div className="bg-primary text-primary-foreground rounded-full p-1 shadow-lg">
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        )}
      </div>

      {/* Versão Desktop - sem setas, renderização normal */}
      <div className="hidden md:block">
        {children}
      </div>
    </>
  );
}