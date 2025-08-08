import { Card, CardContent } from '@/components/ui/card';
import { Target, Code, BookOpen, Share2 } from 'lucide-react';

const points = [
  {
    icon: Target,
    title: 'Be Explicit',
    description: 'Clearly state what each function does, its parameters, and what it returns. Use type annotations (like JSDoc or TypeScript).',
  },
  {
    icon: Code,
    title: 'Provide Examples',
    description: 'Show, don\'t just tell. Include practical code snippets for common use cases. AI models learn best from examples.',
  },
  {
    icon: BookOpen,
    title: 'Keep it Structured',
    description: 'Use clear headings, lists, and formatting. A well-organized document is easier for both humans and AIs to parse.',
  },
   {
    icon: Share2,
    title: 'Describe the Big Picture',
    description: 'Explain the core concepts of your product and how different parts connect. This gives AI the context it needs.',
  },
];

export default function SlideSolution() {
  return (
    <div className="w-full text-center space-y-8">
      <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
        The Solution: AI-Ready Documentation
      </h2>
      <p className="text-lg text-foreground/80 max-w-4xl mx-auto">
        Writing for an AI audience is similar to writing for a junior developer: be clear, be precise, and assume nothing.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        {points.map((point, index) => (
          <Card key={index} className="bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <point.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-headline text-xl font-semibold text-foreground">{point.title}</h3>
                <p className="text-muted-foreground">{point.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
