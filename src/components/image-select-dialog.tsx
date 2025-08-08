
"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';

export default function ImageSelectDialog({ children, onImageSelect, mediaFiles }: { children: React.ReactNode, onImageSelect: (file: string, fileType: string) => void, mediaFiles: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleImageSelect = (file: string) => {
    // Assuming file type from extension, which is not ideal but works for this case.
    const fileType = `image/${file.split('.').pop()}`;
    onImageSelect(file, fileType);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Select an Image</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {mediaFiles.length > 0 ? (
                mediaFiles.map((file) => (
                    <div key={file} className="relative aspect-square cursor-pointer group" onClick={() => handleImageSelect(file)}>
                        <Image src={file} alt={file} layout="fill" objectFit="cover" className="rounded-md" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <p className="text-white font-bold">Select</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center col-span-full text-muted-foreground">No images found in public/media. Add images to the public/media directory to see them here.</p>
            )}
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
