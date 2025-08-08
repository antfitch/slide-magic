
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ImageSelectDialog from '@/components/image-select-dialog';

interface Media {
  src: string;
  type: string;
  width: number;
  height: number;
  alt: string;
  hint: string;
}

interface SlideRewriteDocProps {
  beforeMedia: Media;
  afterMedia: Media;
  onBeforeUploadComplete: (file: string, fileType: string) => void;
  onBeforeImageRemove: () => void;
  onAfterUploadComplete: (file: string, fileType: string) => void;
  onAfterImageRemove: () => void;
  mediaFiles: string[];
}

export default function SlideRewriteDoc({ 
  beforeMedia, 
  afterMedia,
  onBeforeUploadComplete,
  onBeforeImageRemove,
  onAfterUploadComplete,
  onAfterImageRemove,
  mediaFiles 
}: SlideRewriteDocProps) {

  return (
    <div className="w-full text-center space-y-8">
      <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
        Rewriting the Product Doc
      </h2>
      <p className="text-lg text-foreground/80 max-w-4xl mx-auto">
        I wanted to see what would happen to the LLM response if I rewrote the documentation for the 'if' element. Would the response get better? I worked with the engineer and rewrote the docs.
      </p>
      
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
        {/* Before */}
        <Card className="text-left flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <XCircle className="text-destructive" /> Before
            </CardTitle>
            <CardDescription>Vague and incomplete.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ScrollArea className="h-full max-h-[360px] w-full rounded-lg border shadow-inner">
                <ImageSelectDialog onImageSelect={onBeforeUploadComplete} onImageRemove={onBeforeImageRemove} mediaFiles={mediaFiles}>
                  <Image
                    src={beforeMedia.src}
                    alt={beforeMedia.alt}
                    width={beforeMedia.width}
                    height={beforeMedia.height}
                    data-ai-hint={beforeMedia.hint}
                    className="w-full h-auto cursor-pointer"
                  />
                </ImageSelectDialog>
              </ScrollArea>
          </CardContent>
        </Card>

        <div className="flex items-center justify-center">
          <ArrowRight className="h-12 w-12 text-primary hidden md:block" />
        </div>

        {/* After */}
        <Card className="text-left flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <CheckCircle className="text-primary" /> After
            </CardTitle>
            <CardDescription>Clear, with syntax and examples.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ScrollArea className="h-full max-h-[360px] w-full rounded-lg border shadow-inner">
                <ImageSelectDialog onImageSelect={onAfterUploadComplete} onImageRemove={onAfterImageRemove} mediaFiles={mediaFiles}>
                  <Image
                    src={afterMedia.src}
                    alt={afterMedia.alt}
                    width={afterMedia.width}
                    height={afterMedia.height}
                    data-ai-hint={afterMedia.hint}
                    className="w-full h-auto cursor-pointer"
                  />
                </ImageSelectDialog>
              </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    