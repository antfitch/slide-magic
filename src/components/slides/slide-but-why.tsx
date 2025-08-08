
"use client";

import Image from 'next/image';
import ImageSelectDialog from '@/components/image-select-dialog';

interface Media {
  src: string;
  type: string;
  width: number;
  height: number;
  alt: string;
  hint: string;
}

interface SlideButWhyProps {
  media: Media;
  onUploadComplete: (file: string, fileType: string) => void;
  onImageRemove: () => void;
  mediaFiles: string[];
}


export default function SlideButWhy({ media, onUploadComplete, onImageRemove, mediaFiles }: SlideButWhyProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
       <div className="flex items-center justify-center">
        <ImageSelectDialog onImageSelect={onUploadComplete} onImageRemove={onImageRemove} mediaFiles={mediaFiles}>
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            data-ai-hint={media.hint}
            className="rounded-lg shadow-2xl cursor-pointer"
          />
        </ImageSelectDialog>
      </div>
      <div className="space-y-4 text-left">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          But why?
        </h2>
        <p className="text-lg text-foreground/90">
          To better understand the results, I asked Gemini to tell me more about how it ranked and used content. I did this multiple times with multiple instances of Gemini.
        </p>
        <p className="text-lg text-foreground/90">
          Each instance of Gemini had its own preferences (just like us), but there was a general pattern that I'll share with you now.
        </p>
      </div>
    </div>
  );
}
