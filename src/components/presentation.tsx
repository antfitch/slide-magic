
"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AdminMenu } from '@/components/admin-menu';

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

export interface Colors {
  primary: string;
  accent: string;
  background: string;
}

const fontMap = {
  'inter-space-grotesk': {
    name: 'Inter / Space Grotesk',
    body: 'font-inter',
    headline: 'font-space-grotesk',
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap'
  },
  'roboto-slab-roboto': {
    name: 'Roboto Slab / Roboto',
    body: 'font-roboto-slab',
    headline: 'font-roboto',
    url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@500;700&family=Roboto+Slab:wght@400;500;600;700&display=swap'
  },
  'lato-merriweather': {
    name: 'Lato / Merriweather',
    body: 'font-lato',
    headline: 'font-merriweather',
    url: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Merriweather:wght@400;700&display=swap'
  },
  'source-sans-pro-playfair-display': {
    name: 'Source Sans Pro / Playfair Display',
    body: 'font-source-sans-pro',
    headline: 'font-playfair-display',
    url: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&family=Playfair+Display:wght@500;700&display=swap'
  },
};
type FontKey = keyof typeof fontMap;

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
  const [colors, setColors] = useState<Colors>({
    primary: '243 82% 62%',
    accent: '26 100% 50%',
    background: '231 60% 94%',
  });
  const [font, setFont] = useState<FontKey>('inter-space-grotesk');

  useEffect(() => {
    const savedIntroMedia = localStorage.getItem('introMedia');
    if (savedIntroMedia) {
      setIntroMedia(JSON.parse(savedIntroMedia));
    }
    const savedSolutionMedia = localStorage.getItem('solutionMedia');
    if (savedSolutionMedia) {
      setSolutionMedia(JSON.parse(savedSolutionMedia));
    }
    const savedColors = localStorage.getItem('customColors');
    if (savedColors) {
      const parsedColors = JSON.parse(savedColors);
      setColors(parsedColors);
      updateCssVariables(parsedColors);
    }
    const savedFont = localStorage.getItem('customFont') as FontKey;
    if (savedFont && fontMap[savedFont]) {
      handleFontChange(savedFont);
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

  const updateCssVariables = (newColors: Colors) => {
    document.documentElement.style.setProperty('--primary', newColors.primary);
    document.documentElement.style.setProperty('--accent', newColors.accent);
    document.documentElement.style.setProperty('--background', newColors.background);
  };
  
  const handleColorChange = (newColors: Colors) => {
    setColors(newColors);
    localStorage.setItem('customColors', JSON.stringify(newColors));
    updateCssVariables(newColors);
  };

  const handleFontChange = (newFont: FontKey) => {
    setFont(newFont);
    localStorage.setItem('customFont', newFont);
    const fontData = fontMap[newFont];
    
    // Update font link
    const fontLink = document.getElementById('font-link') as HTMLLinkElement;
    if (fontLink) {
      fontLink.href = fontData.url;
    }

    // Update body and headline font classes on tailwind config
    document.body.style.setProperty('--font-body', fontData.name.split(' / ')[0]);
    document.body.style.setProperty('--font-headline', fontData.name.split(' / ')[1]);

    // This is a bit of a hack to get tailwind to re-evaluate the font families
    document.body.classList.forEach(className => {
        if (className.startsWith('font-')) {
            document.body.classList.remove(className);
        }
    });

    document.body.classList.add(fontData.body);
    // You might need a way to apply headline class to relevant elements
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
    <div className={`flex flex-col h-full w-full bg-background items-center justify-center p-8 relative overflow-hidden font-['var(--font-body)']`}>
      <header className="absolute top-0 left-0 right-0 p-4 md:p-8">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <h1 className="text-2xl font-headline font-bold text-primary">DocuVision</h1>
          <AdminMenu 
            colors={colors} 
            onColorChange={handleColorChange}
            font={font}
            onFontChange={(newFont) => handleFontChange(newFont as FontKey)}
          >
             <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
             </Button>
          </AdminMenu>
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
