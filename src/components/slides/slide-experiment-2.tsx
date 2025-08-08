import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Beaker, BookOpen, Code, Search } from 'lucide-react';

export default function SlideExperiment2() {
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
        <Card className="h-full">
          <CardHeader>
             <div className="flex items-start gap-4">
                <Search className="h-8 w-8 text-accent mt-1" />
                <div>
                    <CardTitle className="font-headline">The Investigation</CardTitle>
                    <CardDescription>
                       Why did Gemini fail to mention `else`? I was confused.
                    </CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <BookOpen className="h-5 w-5 text-muted-foreground mt-1" />
              <p>The open-source specification for the feature documented the `else` case.</p>
            </div>
            <div className="flex gap-4">
              <Code className="h-5 w-5 text-muted-foreground mt-1" />
              <p>The code for the feature was also open source and should have been available to the LLM.</p>
            </div>
             <p className="font-semibold text-primary border-l-4 border-primary pl-4">The LLM applied heavy weight to our vague product documentation, ignoring other, more accurate sources.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}