
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import UploadDialog from '@/components/upload-dialog';

export default function SlideIntro() {
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
      <div className="space-y-4">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Hi, I'm Amanda.
        </h2>
        <p className="text-lg text-foreground/90">
          I'm a senior technical writer at Google who is fascinated with LLMs. For the last few years, I wasn't sure what the role of the technical writer would be in this new AI-powered world, but it's becoming more clear to me.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-primary/10">
            <CardContent className="p-4 text-center">
              <p className="font-medium text-primary">For those in the field:</p>
              <p className="text-2xl font-headline font-bold text-primary/80">Just Breathe</p>
            </CardContent>
          </Card>
          <Card className="bg-accent/10">
            <CardContent className="p-4 text-center">
              <p className="font-medium text-accent">For business leaders:</p>
              <p className="text-2xl font-headline font-bold text-accent/80">Take Note</p>
            </CardContent>
          </Card>
        </div>
        <p className="text-lg text-foreground/90 pt-4">
          In today's AI-driven world, large language models (LLMs) are transforming how we access information. The accuracy of their output, however, hinges entirely on the quality of the information they consume.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <UploadDialog>
          <Image 
            src="https://placehold.co/500x500.png"
            alt="A technical writer looking at a screen with code and documentation"
            width={500}
            height={500}
            data-ai-hint="writer code"
            className="rounded-lg shadow-2xl cursor-pointer"
          />
        </UploadDialog>
      </div>
    </div>
  );
}
