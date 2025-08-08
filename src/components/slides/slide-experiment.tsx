
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Beaker } from 'lucide-react';
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

interface SlideExperimentProps {
  media: Media;
  onUploadComplete: (file: string, fileType: string) => void;
  onImageRemove: () => void;
  mediaFiles: string[];
}

export default function SlideExperiment({ media, onUploadComplete, onImageRemove, mediaFiles }: SlideExperimentProps) {
  return (
    <div className="w-full text-center space-y-8">
      <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
        The Experiment
      </h2>
      <p className="text-lg text-foreground/80 max-w-4xl mx-auto">
        Words are just words until they are backed up with data. I've conducted experiments to test the theory that Gemini tends to prioritize a product's vague documentation over other resources.
      </p>
      <div className="grid md:grid-cols-2 gap-8 items-start text-left">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-start gap-4">
                <Beaker className="h-8 w-8 text-primary mt-1" />
                <div>
                    <CardTitle className="font-headline">The Adventure Begins</CardTitle>
                    <CardDescription>
                        A new collection element (`null-aware`) was added to Dart. The existing `if` and `for` collection elements were under a section called 'Operators' and not well-defined.
                    </CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>An engineer noted the `if` element supported `else`, which wasn't documented.</p>
            <p>I prompted Gemini: <span className="font-mono bg-muted p-1 rounded-md text-sm">What does the signature for an 'if' conditional look like in a Dart collection?</span></p>
            <p>The response was disorganized and never included an `else` example.</p>
          </CardContent>
        </Card>
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
      </div>
    </div>
  );
}
