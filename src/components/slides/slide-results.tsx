
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ListChecks, Map, Braces } from 'lucide-react';

export default function SlideResults() {
  return (
    <div className="w-full text-center space-y-8">
      <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
        The Results Were Good
      </h2>
      <p className="text-lg text-foreground/80 max-w-4xl mx-auto">
        In general, the answers produced by Gemini 2.0 were much better after it had a more exact product documentation seed to work with. The terminology Gemini used also reflected the new, more precise terminology from our product documentation.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 text-left">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-3 text-xl">
                    <ListChecks className="text-primary"/>
                    Included `else`
                </CardTitle>
                <CardDescription>Gemini updated its response to include the 'else' part from the documentation.</CardDescription>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-3 text-xl">
                    <Map className="text-primary"/>
                    Expanded Samples
                </CardTitle>
                <CardDescription>Gemini expanded to include samples for lists, sets, and maps.</CardDescription>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-3 text-xl">
                    <Braces className="text-primary"/>
                    Better Terminology
                </CardTitle>
                <CardDescription>The terminology used in the answer reflected the new, more precise terminology.</CardDescription>
            </CardHeader>
        </Card>
      </div>
    </div>
  );
}
