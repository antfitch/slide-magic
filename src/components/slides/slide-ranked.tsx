
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Award } from 'lucide-react';
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

interface SlideRankedProps {
  media: Media;
  onUploadComplete: (file: string, fileType: string) => void;
  onImageRemove: () => void;
  mediaFiles: string[];
  title: string;
  description: string;
  rank: number;
}

export default function SlideRanked({ 
  media, 
  onUploadComplete, 
  onImageRemove, 
  mediaFiles,
  title,
  description,
  rank
}: SlideRankedProps) {
  return (
    <div className="w-full text-center space-y-8">
      <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
        How Gemini Ranks Content
      </h2>
      <div className="grid md:grid-cols-2 gap-8 items-start text-left">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-start gap-4">
                <div className="relative">
                    <Award className="h-10 w-10 text-amber-500 mt-1" />
                    <span className="absolute inset-0 flex items-center justify-center font-bold text-white text-sm mt-1">{rank}</span>
                </div>
                <div>
                    <CardTitle className="font-headline">{title}</CardTitle>
                    <CardDescription>
                        {description}
                    </CardDescription>
                </div>
            </div>
          </CardHeader>
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
