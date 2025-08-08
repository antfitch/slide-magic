import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle, ThumbsDown, ThumbsUp } from 'lucide-react';

export default function SlideProblem() {
  return (
    <div className="w-full text-center space-y-8">
      <h2 className="font-headline text-4xl md:text-5xl font-bold text-destructive animate-pulse">
        Garbage In, Garbage Out
      </h2>
      <p className="text-2xl font-headline text-foreground/80 max-w-4xl mx-auto">
        Hallucinations, hallucinations, hallucinations.
      </p>
      <p className="text-lg text-foreground/80 max-w-4xl mx-auto">
        If your organization's software is complex enough to require product documentation, that documentation often becomes a critical component of an LLM's retrieval-augmented generation (RAG) system. This effectively makes your product documentation a primary source of information that the LLM uses to formulate its responses about your product.
      </p>
      <Card className="border-destructive/50 border-2 bg-destructive/5 text-left h-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <div className='text-left'>
              <CardTitle className="text-destructive font-headline">The Critical Flaw</CardTitle>
              <CardDescription className="text-destructive/80">If this primary source contains vague or inaccurate information, the LLM will likely produce incorrect or confusing guidance for your customers.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
