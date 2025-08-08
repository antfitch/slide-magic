
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, Code, Search } from 'lucide-react';
import ImageSelectDialog from '@/components/image-select-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Media {
  src: string;
  type: string;
  width: number;
  height: number;
  alt: string;
  hint: string;
}

interface SlideExperiment2Props {
  media: Media;
  onUploadComplete: (file: string, fileType: string) => void;
  onImageRemove: () => void;
  mediaFiles: string[];
}

export default function SlideExperiment2({ media, onUploadComplete, onImageRemove, mediaFiles }: SlideExperiment2Props) {
  return (
    <div className="w-full text-center space-y-8">
      <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
        The Experiment
      </h2>
      <p className="text-lg text-foreground/80 max-w-4xl mx-auto">
        Words are just words until they are backed up with data. I've conducted experiments to test the theory that Gemini tends to prioritize a product's vague documentation over other resources.
      </p>
      <div className="grid md:grid-cols-2 gap-8 items-start text-left">
        <div className="flex items-center justify-center h-full">
          <ScrollArea className="h-full max-h-[360px] w-full rounded-lg border shadow-2xl">
            <ImageSelectDialog onImageSelect={onUploadComplete} onImageRemove={onImageRemove} mediaFiles={mediaFiles}>
              <Image
                src={media.src}
                alt={media.alt}
                width={media.width}
                height={media.height}
                data-ai-hint={media.hint}
                className="w-full h-auto cursor-pointer"
              />
            </ImageSelectDialog>
          </ScrollArea>
        </div>
        <Card className="h-full">
          <CardHeader>
             <div className="flex items-start gap-4">
                <Search className="h-8 w-8 text-accent mt-1" />
                <div>
                    <CardTitle className="font-headline">The Investigation</CardTitle>
                    <CardDescription>
                       Why did Gemini fail to mention `else`? I was confused.
                    </CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <BookOpen className="h-5 w-5 text-muted-foreground mt-1" />
              <p>The open-source specification for the feature documented the `else` case.</p>
            </div>
            <div className="flex gap-4">
              <Code className="h-5 w-5 text-muted-foreground mt-1" />
              <p>The code for the feature was also open source and should have been available to the LLM.</p>
            </div>
             <p className="font-semibold text-primary border-l-4 border-primary pl-4">The LLM applied heavy weight to our vague product documentation, ignoring other, more accurate sources.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
