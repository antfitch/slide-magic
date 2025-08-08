import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

const resources = [
  {
    title: 'Google\'s Technical Writing Courses',
    url: 'https://developers.google.com/tech-writing',
    description: 'Free courses for engineers to improve their technical writing skills.'
  },
  {
    title: 'The Good Docs Project',
    url: 'https://thegooddocsproject.dev/',
    description: 'Templates and best practices for writing high-quality documentation.'
  },
  {
    title: 'Write the Docs Community',
    url: 'https://www.writethedocs.org/',
    description: 'A global community of people who care about documentation.'
  },
   {
    title: 'Stripe\'s Documentation',
    url: 'https://stripe.com/docs',
    description: 'A gold standard example of excellent, developer-friendly product documentation.'
  },
];

export default function SlideResources() {
  return (
    <div className="w-full max-w-4xl text-center space-y-8">
      <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
        Further Reading & Resources
      </h2>
      <p className="text-lg text-foreground/80 max-w-4xl mx-auto">
        Invest in your documentation. It's an investment in your product's future.
      </p>
      <div className="grid md:grid-cols-2 gap-6 text-left">
        {resources.map((resource) => (
          <Link href={resource.url} key={resource.title} target="_blank" rel="noopener noreferrer" className="group">
            <Card className="h-full transition-all group-hover:border-primary group-hover:shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl">
                        {resource.title}
                        <LinkIcon className="h-4 w-4 text-muted-foreground transition-transform group-hover:text-primary group-hover:rotate-[-45deg]" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{resource.description}</p>
                </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
