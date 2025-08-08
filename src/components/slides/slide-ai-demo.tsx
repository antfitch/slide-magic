
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import type { GenerateDocumentationExcerptInput, GenerateDocumentationExcerptOutput } from '@/ai/flows/generate-documentation-excerpt';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SlideAiDemoProps {
  onGenerate: (input: GenerateDocumentationExcerptInput) => Promise<GenerateDocumentationExcerptOutput>;
}

export default function SlideAiDemo({ onGenerate }: SlideAiDemoProps) {
  const [productDescription, setProductDescription] = useState('A new collection element (`null-aware`) was added to Dart. The existing `if` and `for` collection elements were under a section called \'Operators\' and not well-defined.');
  const [generatedExcerpt, setGeneratedExcerpt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedExcerpt('');
    try {
      const result = await onGenerate({ productDescription });
      setGeneratedExcerpt(result.documentationExcerpt);
    } catch (error) {
      console.error('Error generating documentation excerpt:', error);
      setGeneratedExcerpt('Sorry, something went wrong. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full text-center space-y-8">
      <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
        AI-Powered Documentation
      </h2>
      <p className="text-lg text-foreground/80 max-w-4xl mx-auto">
        Now, let's see how our documentation improvements can empower an AI to generate helpful content. Enter a product description below and see how the AI generates a documentation excerpt.
      </p>
      
      <div className="grid md:grid-cols-2 gap-4 items-stretch">
        <Card className="text-left flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline">Product Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow">
            <Textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Describe your product here..."
              className="min-h-[150px] font-code text-sm h-full"
            />
             <Button onClick={handleGenerate} disabled={isLoading}>
              {isLoading ? <Loader className="animate-spin mr-2" /> : null}
              {isLoading ? 'Generating...' : 'Generate Excerpt'}
            </Button>
          </CardContent>
        </Card>
        <Card className="text-left flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline">Generated Excerpt</CardTitle>
            <CardDescription>The AI will generate a sample documentation excerpt here.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ScrollArea className="h-full max-h-[360px] w-full rounded-lg border shadow-inner bg-muted p-4">
                <pre className="font-code text-sm whitespace-pre-wrap">
                  {isLoading ? <span className="text-muted-foreground">Generating...</span> : generatedExcerpt || 'Generated content will appear here...'}
                </pre>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
