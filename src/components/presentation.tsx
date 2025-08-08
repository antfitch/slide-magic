
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
import SlideExperiment2 from '@/components/slides/slide-experiment-2';
import SlideRewriteDoc from '@/components/slides/slide-rewrite-doc';
import SlideAiDemo from '@/components/slides/slide-ai-demo';
import SlideResults from '@/components/slides/slide-results';
import SlideResources from '@/components/slides/slide-resources';
import { generateDocumentationExcerpt } from '@/ai/flows/generate-documentation-excerpt';

const slides = [
  { component: SlideTitle, key: 'title', props: {} },
  { component: SlideIntro, key: 'intro', props: {} },
  { component: SlideProblem, key: 'problem', props: {} },
  { component: SlideSolution, key: 'solution', props: {} },
  { component: SlideExperiment, key: 'experiment', props: { title: "A Problem is Found"} },
  { component: SlideExperiment2, key: 'experiment2', props: {} },
  { component: SlideRewriteDoc, key: 'rewrite', props: {} },
  { component: SlideExperiment, key: 'experiment_duplicate', props: { 
      title: "Three Weeks Later...",
      cardTitle: "The Adventure Continues",
      cardDescription: "Did Gemini pick up the changes? Would I finally see `if else` in Gemini's results?",
      cardContent: (
        <>
          <p>I prompted Gemini again with the same question I asked it before we made the change: <span className="font-mono bg-muted p-1 rounded-md text-sm">What does the signature for an 'if' conditional look like in a Dart collection?</span></p>
          <p>The response contained 'if else', new examples, and was even more detailed than our updated docs.</p>
        </>
      )
    } 
  },
  { component: SlideAiDemo, key: 'demo', props: {} },
  { component: SlideResults, key: 'results', props: {} },
  { component: SlideResources, key: 'resources', props: {} },
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

const initialIntroMedia = {
  src: 'https://placehold.co/500x500.png',
  type: 'image/png',
  width: 500,
  height: 500,
  alt: 'A technical writer looking at a screen with code and documentation',
  hint: 'writer code',
};
const initialSolutionMedia = {
  src: 'https://placehold.co/300x300.png',
  type: 'image/png',
  width: 300,
  height: 300,
  alt: 'Illustration comparing sick and healthy seeds growing into sick and healthy trees.',
  hint: 'seed tree',
};
const initialExperimentMedia = {
  src: 'https://placehold.co/500x500.png',
  type: 'image/png',
  width: 500,
  height: 500,
  alt: 'An image showing the investigation process',
  hint: 'investigation board',
};
const initialExperiment2Media = {
  src: 'https://placehold.co/500x500.png',
  type: 'image/png',
  width: 500,
  height: 500,
  alt: 'A different image showing the investigation process',
  hint: 'detective board',
};
const initialRewriteBeforeMedia = {
  src: 'https://placehold.co/400x500.png',
  type: 'image/png',
  width: 400,
  height: 500,
  alt: 'Vague and incomplete documentation example.',
  hint: 'code messy',
};
const initialRewriteAfterMedia = {
  src: 'https://placehold.co/400x500.png',
  type: 'image/png',
  width: 400,
  height: 500,
  alt: 'Clear documentation with syntax and examples.',
  hint: 'code clean',
};

export default function Presentation({ mediaFiles }: PresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [introMedia, setIntroMedia] = useState(initialIntroMedia);
  const [solutionMedia, setSolutionMedia] = useState(initialSolutionMedia);
  const [experimentMedia, setExperimentMedia] = useState(initialExperimentMedia);
  const [experiment2Media, setExperiment2Media] = useState(initialExperiment2Media);
  const [rewriteBeforeMedia, setRewriteBeforeMedia] = useState(initialRewriteBeforeMedia);
  const [rewriteAfterMedia, setRewriteAfterMedia] = useState(initialRewriteAfterMedia);
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
    const savedExperimentSrc = localStorage.getItem('experimentMediaSrc');
    if (savedExperimentSrc) {
        setExperimentMedia(prev => ({ ...prev, src: savedExperimentSrc, type: `image/${savedExperimentSrc.split('.').pop()}` }));
    }
    const savedExperiment2Src = localStorage.getItem('experiment2MediaSrc');
    if (savedExperiment2Src) {
        setExperiment2Media(prev => ({ ...prev, src: savedExperiment2Src, type: `image/${savedExperiment2Src.split('.').pop()}` }));
    }
    const savedRewriteBeforeSrc = localStorage.getItem('rewriteBeforeMediaSrc');
    if (savedRewriteBeforeSrc) {
      setRewriteBeforeMedia(prev => ({ ...prev, src: savedRewriteBeforeSrc, type: `image/${savedRewriteBeforeSrc.split('.').pop()}` }));
    }
    const savedRewriteAfterSrc = localStorage.getItem('rewriteAfterMediaSrc');
    if (savedRewriteAfterSrc) {
      setRewriteAfterMedia(prev => ({ ...prev, src: savedRewriteAfterSrc, type: `image/${savedRewriteAfterSrc.split('.').pop()}` }));
    }
  }, []);

  const handleIntroUploadComplete = (file: string, fileType: string) => {
    setIntroMedia({ ...introMedia, src: file, type: fileType });
    localStorage.setItem('introMediaSrc', file);
  };
  const handleIntroImageRemove = () => {
    setIntroMedia(initialIntroMedia);
    localStorage.removeItem('introMediaSrc');
  };

  const handleSolutionUploadComplete = (file: string, fileType: string) => {
    setSolutionMedia({ ...solutionMedia, src: file, type: fileType });
    localStorage.setItem('solutionMediaSrc', file);
  };
  const handleSolutionImageRemove = () => {
    setSolutionMedia(initialSolutionMedia);
    localStorage.removeItem('solutionMediaSrc');
  };
  
  const handleExperimentUploadComplete = (file: string, fileType: string) => {
    setExperimentMedia({ ...experimentMedia, src: file, type: fileType });
    localStorage.setItem('experimentMediaSrc', file);
  };
  const handleExperimentImageRemove = () => {
    setExperimentMedia(initialExperimentMedia);
    localStorage.removeItem('experimentMediaSrc');
  };

  const handleExperiment2UploadComplete = (file: string, fileType: string) => {
    setExperiment2Media({ ...experiment2Media, src: file, type: fileType });
    localStorage.setItem('experiment2MediaSrc', file);
  };
  const handleExperiment2ImageRemove = () => {
    setExperiment2Media(initialExperiment2Media);
    localStorage.removeItem('experiment2MediaSrc');
  };

  const handleRewriteBeforeUploadComplete = (file: string, fileType: string) => {
    setRewriteBeforeMedia({ ...rewriteBeforeMedia, src: file, type: fileType });
    localStorage.setItem('rewriteBeforeMediaSrc', file);
  };
  const handleRewriteBeforeImageRemove = () => {
    setRewriteBeforeMedia(initialRewriteBeforeMedia);
    localStorage.removeItem('rewriteBeforeMediaSrc');
  };

  const handleRewriteAfterUploadComplete = (file: string, fileType: string) => {
    setRewriteAfterMedia({ ...rewriteAfterMedia, src: file, type: fileType });
    localStorage.setItem('rewriteAfterMediaSrc', file);
  };
  const handleRewriteAfterImageRemove = () => {
    setRewriteAfterMedia(initialRewriteAfterMedia);
    localStorage.removeItem('rewriteAfterMediaSrc');
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

  const slideSpecificProps: { [key: string]: any } = {
    'intro': { media: introMedia, onUploadComplete: handleIntroUploadComplete, onImageRemove: handleIntroImageRemove, mediaFiles: mediaFiles },
    'solution': { media: solutionMedia, onUploadComplete: handleSolutionUploadComplete, onImageRemove: handleSolutionImageRemove, mediaFiles: mediaFiles },
    'experiment': { media: experimentMedia, onUploadComplete: handleExperimentUploadComplete, onImageRemove: handleExperimentImageRemove, mediaFiles: mediaFiles },
    'experiment_duplicate': { media: experimentMedia, onUploadComplete: handleExperimentUploadComplete, onImageRemove: handleExperimentImageRemove, mediaFiles: mediaFiles },
    'experiment2': { media: experiment2Media, onUploadComplete: handleExperiment2UploadComplete, onImageRemove: handleExperiment2ImageRemove, mediaFiles: mediaFiles },
    'rewrite': { 
      beforeMedia: rewriteBeforeMedia,
      afterMedia: rewriteAfterMedia,
      onBeforeUploadComplete: handleRewriteBeforeUploadComplete,
      onBeforeImageRemove: handleRewriteBeforeImageRemove,
      onAfterUploadComplete: handleRewriteAfterUploadComplete,
      onAfterImageRemove: handleRewriteAfterImageRemove,
      mediaFiles: mediaFiles
    },
    'demo': { onGenerate: generateDocumentationExcerpt },
  };

  const { component: CurrentSlideComponent, key: currentSlideKey, props: currentSlideGeneralProps } = slides[currentSlide];
  const currentSlideSpecificProps = slideSpecificProps[currentSlideKey] || {};
  const combinedProps = { ...currentSlideGeneralProps, ...currentSlideSpecificProps };

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
          <CurrentSlideComponent {...combinedProps} />
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
