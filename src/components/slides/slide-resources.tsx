import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lightbulb, AlertTriangle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SlideResources() {
  return (
    <div className="w-full max-w-4xl text-center space-y-8">
      <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
        Retrospective & Key Takeaways
      </h2>
      <p className="text-lg text-foreground/80 max-w-4xl mx-auto">
        The experiment revealed some weaknesses in the LLM data collection process but ultimately proved the core theory.
      </p>
      <div className="grid md:grid-cols-2 gap-6 text-left">
        <Card className="bg-destructive/5 border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-headline text-xl text-destructive">
              <AlertTriangle />
              Weaknesses Found
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-destructive/90">
            <p>The result did not include the 'case' signature, which I'd also documented.</p>
            <p>The results did not lean heavily on the open-source specification for the feature.</p>
            <p>The LLM did not lean heavily on the open-source code for the feature.</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-headline text-xl text-primary">
              <Lightbulb />
              The Big Picture
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-primary/90">
             <p>The quality of an LLM's response about a product hinges significantly on the quality of that product's documentation.</p>
             <p>As skilled communicators, technical writers are uniquely positioned to create the documentation that LLMs use to produce these high-quality responses.</p>
          </CardContent>
        </Card>
      </div>
       <div className="pt-6">
        <Card className="bg-background shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">
                    Better Docs <ArrowRight className="inline-block h-6 w-6" /> Better AI <ArrowRight className="inline-block h-6 w-6" /> Product-Led Growth
                </CardTitle>
                <CardDescription>
                    Accurate LLM guidance reduces friction, creates a positive feedback loop, and makes it more likely that users will invest more of their time in your product.
                </CardDescription>
            </CardHeader>
        </Card>
       </div>
    </div>
  );
}
