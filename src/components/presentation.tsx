
"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ThemeToggle } from '@/components/theme-toggle';

import SlideTitle from '@/components/slides/slide-title';
import SlideIntro from '@/components/slides/slide-intro';
import SlideProblem from '@/components/slides/slide-problem';
import SlideSolution from '@/components/slides/slide-solution';
import SlideExperiment from '@/components/slides/slide-experiment';
import SlideRewriteDoc from '@/components/slides/slide-rewrite-doc';
import SlideAiDemo from '@/components/slides/slide-ai-demo';
import SlideResults from '@/components/slides/slide-results';
import SlideResources from '@/components/slides/slide-resources';

const slides = [
  { component: SlideTitle, key: 'title' },
  { component: SlideIntro, key: 'intro' },
  { component: SlideProblem, key: 'problem' },
  { component: SlideSolution, key: 'solution' },
  { component: SlideExperiment, key: 'experiment' },
  { component: SlideRewriteDoc, key: 'rewrite' },
  { component: SlideAiDemo, key: 'demo' },
  { component: SlideResults, key: 'results' },
  { component: SlideResources, key: 'resources' },
];

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [introMedia, setIntroMedia] = useState({
    src: 'https://placehold.co/500x500.png',
    type: 'image/png',
    width: 500,
    height: 500,
    alt: 'A technical writer looking at a screen with code and documentation',
    hint: 'writer code',
  });
  const [solutionMedia, setSolutionMedia] = useState({
    src: 'https://placehold.co/600x400.png',
    type: 'image/png',
    width: 600,
    height: 400,
    alt: 'A seed growing into a large tree',
    hint: 'seed tree',
  });

  useEffect(() => {
    const savedIntroMedia = localStorage.getItem('introMedia');
    if (savedIntroMedia) {
      setIntroMedia(JSON.parse(savedIntroMedia));
    }
    const savedSolutionMedia = localStorage.getItem('solutionMedia');
    if (savedSolutionMedia) {
      setSolutionMedia(JSON.parse(savedSolutionMedia));
    }
  }, []);

  const handleIntroUploadComplete = (file: string, fileType: string) => {
    const newMedia = { ...introMedia, src: file, type: fileType };
    setIntroMedia(newMedia);
    localStorage.setItem('introMedia', JSON.stringify(newMedia));
  };

  const handleSolutionUploadComplete = (file: string, fileType: string) => {
    const newMedia = { ...solutionMedia, src: file, type: fileType };
    setSolutionMedia(newMedia);
    localStorage.setItem('solutionMedia', JSON.stringify(newMedia));
  };
  
  const slideComponents = {
    'title': <SlideTitle />,
    'intro': <SlideIntro media={introMedia} onUploadComplete={handleIntroUploadComplete} />,
    'problem': <SlideProblem />,
    'solution': <SlideSolution media={solutionMedia} onUploadComplete={handleSolutionUploadComplete} />,
    'experiment': <SlideExperiment />,
    'rewrite': <SlideRewriteDoc />,
    'demo': <SlideAiDemo />,
    'results': <SlideResults />,
    'resources': <SlideResources />,
  };
  
  const CurrentSlideComponent = slideComponents[slides[currentSlide].key as keyof typeof slideComponents];

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
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <h1 className="text-2xl font-headline font-bold text-primary">DocuVision</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="w-full max-w-5xl flex-grow flex items-center justify-center">
        <div
          key={currentSlide}
          className="w-full h-full flex items-center justify-center animate-in fade-in-50 duration-500"
        >
          {CurrentSlideComponent}
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
