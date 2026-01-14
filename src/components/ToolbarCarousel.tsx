import { useState, ReactNode, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface ToolbarCarouselProps {
  children: ReactNode;
}

export function ToolbarCarousel({ children }: ToolbarCarouselProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1
    );
  };

  useEffect(() => {
    // Check on mount and after a small delay to ensure content is rendered
    const timer = setTimeout(checkScroll, 100);
    
    checkScroll();
    window.addEventListener('resize', checkScroll);
    
    // Use ResizeObserver to detect content changes
    const resizeObserver = new ResizeObserver(checkScroll);
    if (scrollContainerRef.current) {
      resizeObserver.observe(scrollContainerRef.current);
    }
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScroll);
      resizeObserver.disconnect();
    };
  }, [children]);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 200;
    const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative flex items-center gap-2 overflow-hidden">
      {/* Seta esquerda */}
      {canScrollLeft && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 z-10 h-8 w-8 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Container com scroll */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex items-center gap-2 overflow-x-auto scroll-smooth w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{
          paddingLeft: canScrollLeft ? '40px' : '0',
          paddingRight: canScrollRight ? '40px' : '0',
        }}
      >
        {children}
      </div>

      {/* Seta direita */}
      {canScrollRight && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 z-10 h-8 w-8 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}