
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';

export default function SlideRewriteDoc() {
  const beforeDoc = `collectionElement:
  ifElement
  | forElement
  | ...`;

  const afterDoc = `An if-case element allows you to conditionally include a single element in a collection, with an optional else clause:

if (<condition>) <element> else <element>

if (<condition>) <element> else if (<condition>) <element>

if (isSummer) 'Slippers'

if (isSummer) ...?sandals`;

  return (
    <div className="w-full text-center space-y-8">
      <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
        Rewriting the Product Doc
      </h2>
      <p className="text-lg text-foreground/80 max-w-4xl mx-auto">
        I wanted to see what would happen to the LLM response if I rewrote the documentation for the 'if' element. Would the response get better? I worked with the engineer and rewrote the docs.
      </p>
      
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        {/* Before */}
        <Card className="text-left">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <XCircle className="text-destructive" /> Before
            </CardTitle>
            <CardDescription>Vague and incomplete.</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="font-code text-sm bg-muted p-4 rounded-md whitespace-pre-wrap">{beforeDoc}</pre>
          </CardContent>
        </Card>

        <ArrowRight className="h-12 w-12 text-primary hidden md:block" />

        {/* After */}
        <Card className="text-left">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <CheckCircle className="text-primary" /> After
            </CardTitle>
            <CardDescription>Clear, with syntax and examples.</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="font-code text-sm bg-muted p-4 rounded-md whitespace-pre-wrap">{afterDoc}</pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
