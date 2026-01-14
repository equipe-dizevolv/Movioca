import { useState, ReactNode, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CardCarouselProps {
  cards: ReactNode[];
  /** Número de cards visíveis por vez no desktop */
  cardsPerView?: {
    mobile: number;
    desktop: number;
  };
}

export function CardCarousel({ 
  cards, 
  cardsPerView = { mobile: 1, desktop: 4 } 
}: CardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detectar se está em desktop ou mobile
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    const timer = setTimeout(checkDesktop, 100);
    checkDesktop();
    
    const resizeObserver = new ResizeObserver(checkDesktop);
    if (containerRef.current?.parentElement) {
      resizeObserver.observe(containerRef.current.parentElement);
    }
    
    window.addEventListener('resize', checkDesktop);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkDesktop);
      resizeObserver.disconnect();
    };
  }, []);

  // Se todos os cards cabem na tela, não precisa de navegação
  const cardsVisible = isDesktop ? Math.min(cards.length, cardsPerView.desktop) : cardsPerView.mobile;
  const maxIndex = Math.max(0, cards.length - cardsVisible);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  const goToPrevious = () => {
    const step = isDesktop ? 1 : cardsPerView.mobile;
    setCurrentIndex((prev) => Math.max(0, prev - step));
  };

  const goToNext = () => {
    const step = isDesktop ? 1 : cardsPerView.mobile;
    setCurrentIndex((prev) => Math.min(maxIndex, prev + step));
  };

  // Touch/Mouse drag handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    if (containerRef.current) {
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging || !containerRef.current) return;
    
    const walk = (startX - clientX) * 2;
    containerRef.current.scrollLeft = scrollLeft + walk;
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Snap to nearest card position
    if (containerRef.current && !isDesktop) {
      const walk = startX - containerRef.current.getBoundingClientRect().left;
      if (Math.abs(walk) > 50) { // Threshold para trocar de card
        if (walk > 0 && canGoNext) {
          goToNext();
        } else if (walk < 0 && canGoPrevious) {
          goToPrevious();
        }
      }
    }
  };

  // Mouse events (apenas para mobile/tablet)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isDesktop) return; // Desabilita drag no desktop
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDesktop) return;
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    if (isDesktop) return;
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDesktop || !isDragging) return;
    handleDragEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Cálculo do transform - cada card + gap
  const gapSize = 12; // gap-3 = 0.75rem = 12px
  const cardWidthPercentage = 100 / cardsVisible;
  const gapWidthPercentage = (gapSize / cardsVisible);
  
  // O transform move currentIndex vezes (largura do card + gap)
  const transformValue = currentIndex * (cardWidthPercentage + gapWidthPercentage);

  return (
    <div className="relative px-6 md:px-8 py-4 md:py-6 min-h-fit">
      {/* Container do carrossel */}
      <div 
        ref={containerRef}
        className={`overflow-x-hidden overflow-y-visible ${!isDesktop && (isDragging ? 'cursor-grabbing' : 'cursor-grab')}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex gap-3 transition-transform duration-300 ease-out min-h-fit"
          style={{ 
            transform: `translateX(calc(-${transformValue}% - ${currentIndex * gapSize}px))`,
          }}
        >
          {cards.map((card, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 h-auto"
              style={{ 
                width: isDesktop 
                  ? `calc((100% - ${(cardsVisible - 1) * gapSize}px) / ${cardsVisible})` 
                  : cardsPerView.mobile === 2 
                    ? 'calc((100% - 12px) / 2)' 
                    : '100%',
                minWidth: isDesktop ? '180px' : cardsPerView.mobile === 2 ? '160px' : '280px',
                minHeight: '120px',
              }}
            >
              {card}
            </div>
          ))}
        </div>
      </div>

      {/* Setas de navegação - apenas se houver cards suficientes */}
      {cards.length > cardsVisible && (
        <>
          {/* Seta esquerda */}
          <button
            onClick={goToPrevious}
            disabled={!canGoPrevious}
            className={`absolute left-0 top-1/2 -translate-y-1/2 ${isDesktop ? '-translate-x-4' : '-translate-x-3'} bg-primary text-primary-foreground rounded-full p-2 shadow-lg hover:bg-primary/90 transition-all z-10 ${
              !canGoPrevious ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            aria-label="Cards anteriores"
          >
            <ChevronLeft className={isDesktop ? 'w-4 h-4' : 'w-5 h-5'} />
          </button>

          {/* Seta direita */}
          <button
            onClick={goToNext}
            disabled={!canGoNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 ${isDesktop ? 'translate-x-4' : 'translate-x-3'} bg-primary text-primary-foreground rounded-full p-2 shadow-lg hover:bg-primary/90 transition-all z-10 ${
              !canGoNext ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            aria-label="Próximos cards"
          >
            <ChevronRight className={isDesktop ? 'w-4 h-4' : 'w-5 h-5'} />
          </button>
        </>
      )}

      {/* Indicadores de ponto - apenas no mobile */}
      {!isDesktop && cards.length > cardsPerView.mobile && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: Math.ceil(cards.length / cardsPerView.mobile) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * cardsPerView.mobile)}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.floor(currentIndex / cardsPerView.mobile) === index
                  ? 'bg-primary' 
                  : 'bg-muted-foreground/30'
              }`}
              aria-label={`Ir para página ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}