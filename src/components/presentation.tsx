
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
import { generateDocumentationExcerpt } from '@/ai/flows/generate-documentation-excerpt';

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

export type FontStyle = 'headline' | 'body';

export interface Fonts {
  headline: string;
  body: string;
}

const fontOptions = [
  { name: 'Inter', value: 'Inter' },
  { name: 'Space Grotesk', value: 'Space Grotesk' },
  { name: 'Roboto', value: 'Roboto' },
  { name: 'Roboto Slab', value: 'Roboto Slab' },
  { name: 'Lato', value: 'Lato' },
  { name: 'Merriweather', value: 'Merriweather' },
  { name: 'Source Sans Pro', value: 'Source Sans Pro' },
  { name: 'Playfair Display', value: 'Playfair Display' },
];

function getFontUrl(fonts: Fonts) {
  const uniqueFonts = [...new Set(Object.values(fonts))];
  const familyParams = uniqueFonts
    .map(font => `family=${font.replace(/ /g, '+')}:wght@400;500;600;700`)
    .join('&');
  return `https://fonts.googleapis.com/css2?${familyParams}&display=swap`;
}

interface PresentationProps {
    mediaFiles: string[];
}

export default function Presentation({ mediaFiles }: PresentationProps) {
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
    src: 'https://placehold.co/300x300.png',
    type: 'image/png',
    width: 300,
    height: 300,
    alt: 'Illustration comparing sick and healthy seeds growing into sick and healthy trees.',
    hint: 'seed tree',
  });
  const [colors, setColors] = useState<Colors>({
    primary: '243 82% 62%',
    accent: '26 100% 50%',
    background: '231 60% 94%',
  });
  const [fonts, setFonts] = useState<Fonts>({
    headline: 'Space Grotesk',
    body: 'Inter',
  });

  useEffect(() => {
    const savedColors = localStorage.getItem('customColors');
    if (savedColors) {
      const parsedColors = JSON.parse(savedColors);
      setColors(parsedColors);
      updateCssVariables(parsedColors);
    }
    const savedFonts = localStorage.getItem('customFonts');
    if (savedFonts) {
        const parsedFonts = JSON.parse(savedFonts);
        setFonts(parsedFonts);
        updateFontStyles(parsedFonts);
    }
    const savedIntroSrc = localStorage.getItem('introMediaSrc');
    if (savedIntroSrc) {
        setIntroMedia(prev => ({ ...prev, src: savedIntroSrc, type: `image/${savedIntroSrc.split('.').pop()}` }));
    }
    const savedSolutionSrc = localStorage.getItem('solutionMediaSrc');
    if (savedSolutionSrc) {
        setSolutionMedia(prev => ({ ...prev, src: savedSolutionSrc, type: `image/${savedSolutionSrc.split('.').pop()}` }));
    }
  }, []);

  const handleIntroUploadComplete = (file: string, fileType: string) => {
    setIntroMedia({ ...introMedia, src: file, type: fileType });
    localStorage.setItem('introMediaSrc', file);
  };

  const handleSolutionUploadComplete = (file: string, fileType: string) => {
    setSolutionMedia({ ...solutionMedia, src: file, type: fileType });
    localStorage.setItem('solutionMediaSrc', file);
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

  const updateFontStyles = (newFonts: Fonts) => {
    const fontLink = document.getElementById('font-link') as HTMLLinkElement;
    if (fontLink) {
        fontLink.href = getFontUrl(newFonts);
    }
    document.documentElement.style.setProperty('--font-headline', newFonts.headline);
    document.documentElement.style.setProperty('--font-body', newFonts.body);
  };

  const handleFontChange = (type: FontStyle, newFont: string) => {
    const newFonts = { ...fonts, [type]: newFont };
    setFonts(newFonts);
    localStorage.setItem('customFonts', JSON.stringify(newFonts));
    updateFontStyles(newFonts);
  };

  const slideComponents = {
    'title': <SlideTitle />,
    'intro': <SlideIntro media={introMedia} onUploadComplete={handleIntroUploadComplete} mediaFiles={mediaFiles} />,
    'problem': <SlideProblem />,
    'solution': <SlideSolution media={solutionMedia} onUploadComplete={handleSolutionUploadComplete} mediaFiles={mediaFiles} />,
    'experiment': <SlideExperiment />,
    'rewrite': <SlideRewriteDoc />,
    'demo': <SlideAiDemo onGenerate={generateDocumentationExcerpt} />,
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
    <div className={`flex flex-col h-full w-full bg-background items-center justify-center p-8 relative overflow-hidden`}>
      <style jsx global>{`
        :root {
          --font-headline: "${fonts.headline}", sans-serif;
          --font-body: "${fonts.body}", sans-serif;
        }
      `}</style>
      <header className="absolute top-0 left-0 right-0 p-4 md:p-8">
        <div className="flex items-center justify-end max-w-5xl mx-auto">
          <AdminMenu 
            colors={colors} 
            onColorChange={handleColorChange}
            fonts={fonts}
            onFontChange={handleFontChange}
            fontOptions={fontOptions}
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
