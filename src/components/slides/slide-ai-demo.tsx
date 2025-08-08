
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SlideAiDemo() {
  const prompt = `What does the signature for an 'if' conditional look like in a Dart collection?`;
  const response = `if-case-element ::=
  'if'
  '('
  expression
  ')'
  element
  ('else'
  element)?`;

  return (
    <div className="w-full text-center space-y-8">
      <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
        Three Weeks Later...
      </h2>
      <p className="text-lg text-foreground/80 max-w-4xl mx-auto">
        I re-ran the same prompt to see if the answers improved with better documentation. The results were much better.
      </p>
      
      <div className="grid md:grid-cols-2 gap-4 items-stretch">
        <Card className="text-left">
          <CardHeader>
            <CardTitle className="font-headline">The Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="font-code text-sm bg-muted p-4 rounded-md whitespace-pre-wrap">{prompt}</pre>
          </CardContent>
        </Card>
        <Card className="text-left">
          <CardHeader>
            <CardTitle className="font-headline">The Response</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="font-code text-sm bg-muted p-4 rounded-md whitespace-pre-wrap">{response}</pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
