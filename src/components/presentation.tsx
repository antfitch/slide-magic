"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

import SlideTitle from '@/components/slides/slide-title';
import SlideIntro from '@/components/slides/slide-intro';
import SlideProblem from '@/components/slides/slide-problem';
import SlideSolution from '@/components/slides/slide-solution';
import SlideExperiment from '@/components/slides/slide-experiment';
import SlideAiDemo from '@/components/slides/slide-ai-demo';
import SlideResources from '@/components/slides/slide-resources';

const slides = [
  { component: SlideTitle, key: 'title' },
  { component: SlideIntro, key: 'intro' },
  { component: SlideProblem, key: 'problem' },
  { component: SlideSolution, key: 'solution' },
  { component: SlideExperiment, key: 'experiment' },
  { component: SlideAiDemo, key: 'demo' },
  { component: SlideResources, key: 'resources' },
];

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const CurrentSlideComponent = slides[currentSlide].component;

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        goToNextSlide();
      } else if (event.key === 'ArrowLeft') {
        goToPrevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progressValue = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="flex flex-col h-full w-full bg-background items-center justify-center p-8 relative overflow-hidden">
      <header className="absolute top-0 left-0 right-0 p-4 md:p-8">
        <div className="flex items-center justify-center max-w-5xl mx-auto">
          <h1 className="text-2xl font-headline font-bold text-primary">DocuVision</h1>
        </div>
      </header>

      <main className="w-full max-w-5xl flex-grow flex items-center justify-center">
        <div
          key={currentSlide}
          className="w-full h-full flex items-center justify-center animate-in fade-in-50 duration-500"
        >
          <CurrentSlideComponent />
        </div>
      </main>

      <footer className="absolute bottom-0 left-0 right-0 p-4 md:p-8 w-full">
        <div className="flex items-center justify-between max-w-5xl mx-auto gap-4 md:gap-8">
          <div className="flex items-center gap-4 w-1/3">
            <p className="text-sm font-medium text-foreground/80">
              Slide {currentSlide + 1} of {slides.length}
            </p>
          </div>
          
          <div className="flex items-center gap-2 w-1/3 justify-center">
            <Button variant="outline" size="icon" onClick={goToPrevSlide} aria-label="Previous Slide">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={goToNextSlide} aria-label="Next Slide">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="w-1/3">
            <Progress value={progressValue} className="w-full" />
          </div>
        </div>
      </footer>
    </div>
  );
}
