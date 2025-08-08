
"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud } from 'lucide-react';

export default function UploadDialog({ children, onUploadComplete }: { children: React.ReactNode, onUploadComplete: (file: string, fileType: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target?.result as string);
        setFileType(selectedFile.type);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setFile(null);
      setFileType(null);
    }
    setIsOpen(open);
  };

  const handleSubmit = () => {
    if (file && fileType) {
      onUploadComplete(file, fileType);
      handleOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {file ? (
            <div className="flex flex-col items-center gap-4">
              <img src={file} alt="Preview" className="max-h-80 rounded-lg" />
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => { setFile(null); setFileType(null); }}>Upload Another</Button>
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed rounded-lg">
                <UploadCloud className="h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">Drag & drop an image or click to upload</p>
                <Input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                <Button asChild>
                    <label htmlFor="file-upload">Browse File</label>
                </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
