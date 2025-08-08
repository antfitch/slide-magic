
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
import SlideResults from '@/components/slides/slide-results';
import SlideAiDemo from '@/components/slides/slide-ai-demo';
import SlideButWhy from '@/components/slides/slide-but-why';
import SlideRanked from '@/components/slides/slide-ranked';
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
  { component: SlideResults, key: 'results', props: {} },
  { component: SlideButWhy, key: 'but-why', props: {} },
  { component: SlideRanked, key: 'ranked-1', props: {
      title: "1. Exact Prompts",
      description: "Gemini prefers to answer with the information that is the most direct answer to a user's prompt. It wants to be helpful and to the point. It will choose a poorly written but direct answer over a well-written but indirect answer.",
      rank: 1
    }
  },
  { component: SlideRanked, key: 'ranked-2', props: {
      title: "2. Product Documentation",
      description: "The information in your product's documentation is given a high rank. It's considered an authoritative source. Ensure this content is accurate and up-to-date.",
      rank: 2
    }
  },
  { component: SlideRanked, key: 'ranked-3', props: {
      title: "3. API Documentation",
      description: "API documentation is also highly valued. It provides concrete, actionable information that the LLM can use to construct its answers.",
      rank: 3
    }
  },
  { component: SlideRanked, key: 'ranked-4', props: {
      title: "4. Code",
      description: "The code itself is a source of truth, but it's often less accessible to the LLM than well-structured documentation. It's used to verify and supplement information from other sources.",
      rank: 4
    }
  },
  { component: SlideRanked, key: 'ranked-5', props: {
      title: "5. Blogs & Stack Overflow",
    }
  },
  { component: SlideAiDemo, key: 'demo', props: {} },
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
const initialButWhyMedia = {
  src: 'https://placehold.co/600x400.png',
  type: 'image/png',
  width: 600,
  height: 400,
  alt: 'An illustration of a brain with question marks.',
  hint: 'brain questions',
};
const initialRanked1Media = {
  src: 'https://placehold.co/600x400.png',
  type: 'image/png',
  width: 600,
  height: 400,
  alt: 'A target with an arrow in the bullseye.',
  hint: 'target bullseye',
};
const initialRanked2Media = {
  src: 'https://placehold.co/600x400.png',
  type: 'image/png',
  width: 600,
  height: 400,
  alt: 'A book with a product logo on it.',
  hint: 'product book',
};
const initialRanked3Media = {
  src: 'https://placehold.co/600x400.png',
  type: 'image/png',
  width: 600,
  height: 400,
  alt: 'A technical drawing of an API.',
  hint: 'api diagram',
};
const initialRanked4Media = {
  src: 'https://placehold.co/600x400.png',
  type: 'image/png',
  width: 600,
  height: 400,
  alt: 'A screen with lines of code.',
  hint: 'code screen',
};
const initialRanked5Media = {
  src: 'https://placehold.co/600x400.png',
  type: 'image/png',
  width: 600,
  height: 400,
  alt: 'A screen with lines of code.',
  hint: 'blogs stackoverflow',
};


export default function Presentation({ mediaFiles }: PresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [introMedia, setIntroMedia] = useState(initialIntroMedia);
  const [solutionMedia, setSolutionMedia] = useState(initialSolutionMedia);
  const [experimentMedia, setExperimentMedia] = useState(initialExperimentMedia);
  const [experiment2Media, setExperiment2Media] = useState(initialExperiment2Media);
  const [rewriteBeforeMedia, setRewriteBeforeMedia] = useState(initialRewriteBeforeMedia);
  const [rewriteAfterMedia, setRewriteAfterMedia] = useState(initialRewriteAfterMedia);
  const [butWhyMedia, setButWhyMedia] = useState(initialButWhyMedia);
  const [ranked1Media, setRanked1Media] = useState(initialRanked1Media);
  const [ranked2Media, setRanked2Media] = useState(initialRanked2Media);
  const [ranked3Media, setRanked3Media] = useState(initialRanked3Media);
  const [ranked4Media, setRanked4Media] = useState(initialRanked4Media);
  const [ranked5Media, setRanked5Media] = useState(initialRanked5Media);
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
    const savedButWhySrc = localStorage.getItem('butWhyMediaSrc');
    if (savedButWhySrc) {
      setButWhyMedia(prev => ({ ...prev, src: savedButWhySrc, type: `image/${savedButWhySrc.split('.').pop()}` }));
    }
    const savedRanked1Src = localStorage.getItem('ranked1MediaSrc');
    if (savedRanked1Src) {
      setRanked1Media(prev => ({ ...prev, src: savedRanked1Src, type: `image/${savedRanked1Src.split('.').pop()}` }));
    }
    const savedRanked2Src = localStorage.getItem('ranked2MediaSrc');
    if (savedRanked2Src) {
      setRanked2Media(prev => ({ ...prev, src: savedRanked2Src, type: `image/${savedRanked2Src.split('.').pop()}` }));
    }
    const savedRanked3Src = localStorage.getItem('ranked3MediaSrc');
    if (savedRanked3Src) {
      setRanked3Media(prev => ({ ...prev, src: savedRanked3Src, type: `image/${savedRanked3Src.split('.').pop()}` }));
    }
    const savedRanked4Src = localStorage.getItem('ranked4MediaSrc');
    if (savedRanked4Src) {
      setRanked4Media(prev => ({ ...prev, src: savedRanked4Src, type: `image/${savedRanked4Src.split('.').pop()}` }));
    }
    const savedRanked5Src = localStorage.getItem('ranked5MediaSrc');
    if (savedRanked5Src) {
      setRanked5Media(prev => ({ ...prev, src: savedRanked5Src, type: `image/${savedRanked5Src.split('.').pop()}` }));
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

  const handleButWhyUploadComplete = (file: string, fileType: string) => {
    setButWhyMedia({ ...butWhyMedia, src: file, type: fileType });
    localStorage.setItem('butWhyMediaSrc', file);
  };
  const handleButWhyImageRemove = () => {
    setButWhyMedia(initialButWhyMedia);
    localStorage.removeItem('butWhyMediaSrc');
  };

  const handleRanked1UploadComplete = (file: string, fileType: string) => {
    setRanked1Media({ ...ranked1Media, src: file, type: fileType });
    localStorage.setItem('ranked1MediaSrc', file);
  };
  const handleRanked1ImageRemove = () => {
    setRanked1Media(initialRanked1Media);
    localStorage.removeItem('ranked1MediaSrc');
  };

  const handleRanked2UploadComplete = (file: string, fileType: string) => {
    setRanked2Media({ ...ranked2Media, src: file, type: fileType });
    localStorage.setItem('ranked2MediaSrc', file);
  };
  const handleRanked2ImageRemove = () => {
    setRanked2Media(initialRanked2Media);
    localStorage.removeItem('ranked2MediaSrc');
  };

  const handleRanked3UploadComplete = (file: string, fileType: string) => {
    setRanked3Media({ ...ranked3Media, src: file, type: fileType });
    localStorage.setItem('ranked3MediaSrc', file);
  };
  const handleRanked3ImageRemove = () => {
    setRanked3Media(initialRanked3Media);
    localStorage.removeItem('ranked3MediaSrc');
  };

  const handleRanked4UploadComplete = (file: string, fileType: string) => {
    setRanked4Media({ ...ranked4Media, src: file, type: fileType });
    localStorage.setItem('ranked4MediaSrc', file);
  };
  const handleRanked4ImageRemove = () => {
    setRanked4Media(initialRanked4Media);
    localStorage.removeItem('ranked4MediaSrc');
  };

  const handleRanked5UploadComplete = (file: string, fileType: string) => {
    setRanked5Media({ ...ranked5Media, src: file, type: fileType });
    localStorage.setItem('ranked5MediaSrc', file);
  };
  const handleRanked5ImageRemove = () => {
    setRanked5Media(initialRanked5Media);
    localStorage.removeItem('ranked5MediaSrc');
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
    'but-why': { media: butWhyMedia, onUploadComplete: handleButWhyUploadComplete, onImageRemove: handleButWhyImageRemove, mediaFiles: mediaFiles },
    'ranked-1': { media: ranked1Media, onUploadComplete: handleRanked1UploadComplete, onImageRemove: handleRanked1ImageRemove, mediaFiles: mediaFiles },
    'ranked-2': { media: ranked2Media, onUploadComplete: handleRanked2UploadComplete, onImageRemove: handleRanked2ImageRemove, mediaFiles: mediaFiles },
    'ranked-3': { media: ranked3Media, onUploadComplete: handleRanked3UploadComplete, onImageRemove: handleRanked3ImageRemove, mediaFiles: mediaFiles },
    'ranked-4': { media: ranked4Media, onUploadComplete: handleRanked4UploadComplete, onImageRemove: handleRanked4ImageRemove, mediaFiles: mediaFiles },
    'ranked-5': { media: ranked5Media, onUploadComplete: handleRanked5UploadComplete, onImageRemove: handleRanked5ImageRemove, mediaFiles: mediaFiles },
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
