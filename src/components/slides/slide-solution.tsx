
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Sparkles, Binary, FileText } from 'lucide-react';
import UploadDialog from '@/components/upload-dialog';

export default function SlideSolution() {
  return (
    <div className="w-full text-center space-y-8">
      <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
        Good Seeds Grow Quality Trees
      </h2>
      <p className="text-lg text-foreground/80 max-w-4xl mx-auto">
        An LLM assigns weights to information, prioritizing sources it deems most reliable. Crucially, your product's documentation is typically given significant weight, often more than external sources, even if those sources are accurate. This makes your documentation a vital "seed" an LLM uses to generate answers.
      </p>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <UploadDialog>
          <Image
            src="https://placehold.co/600x400.png"
            alt="A seed growing into a large tree"
            width={600}
            height={400}
            data-ai-hint="seed tree"
            className="rounded-lg shadow-xl cursor-pointer"
          />
        </UploadDialog>
        <div className="space-y-4 text-left">
          <Card className="bg-destructive/5">
            <CardHeader className="flex flex-row items-center gap-4">
              <FileText className="h-8 w-8 text-destructive" />
              <div>
                <CardTitle className="font-headline text-destructive text-xl">Poorly Crafted Doc</CardTitle>
                <p className="text-sm text-destructive/80">Produces a "tree" full of hallucinations.</p>
              </div>
            </CardHeader>
          </Card>
          <Card className="bg-primary/5">
            <CardHeader className="flex flex-row items-center gap-4">
               <Sparkles className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="font-headline text-primary text-xl">Quality Doc</CardTitle>
                <p className="text-sm text-primary/80">Yields an expansive "tree" of accurate information.</p>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
       <p className="text-lg text-foreground/80 max-w-4xl mx-auto pt-4">
        As skilled communicators, technical writers are uniquely positioned to create quality seeds that LLMs can use to generate hallucination-free, expansive responses.
      </p>
    </div>
  );
}
