"use client";

import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { generateDocumentationExcerpt } from '@/ai/flows/generate-documentation-excerpt';

const FormSchema = z.object({
  productDescription: z.string().min(20, {
    message: "Please provide a more detailed product description (at least 20 characters)."
  }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function SlideAiDemo() {
  const [generatedDoc, setGeneratedDoc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      productDescription: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setGeneratedDoc('');
    try {
      const result = await generateDocumentationExcerpt({ productDescription: data.productDescription });
      setGeneratedDoc(result.documentationExcerpt);
    } catch (error) {
      console.error("Error generating documentation:", error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to generate documentation. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        See It In Action
      </h2>
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Sparkles className="text-accent" />
            AI Documentation Generator
          </CardTitle>
          <CardDescription>
            Enter a short description of a product or feature, and our AI will generate a sample documentation excerpt. Notice how a clear description yields better results.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="productDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., A JavaScript library that creates interactive charts from JSON data. It supports bar, line, and pie charts."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Excerpt
              </Button>
            </form>
          </Form>

          {(isLoading || generatedDoc) && (
            <div className="mt-8">
                <h3 className="font-headline text-lg font-semibold mb-2">Generated Excerpt:</h3>
                <Card className="bg-muted/50 p-4 min-h-[150px]">
                    {isLoading ? (
                         <div className="flex items-center justify-center h-full text-muted-foreground">
                            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                            <p>Generating...</p>
                        </div>
                    ) : (
                        <pre className="font-code text-sm whitespace-pre-wrap text-foreground">
                            {generatedDoc}
                        </pre>
                    )}
                </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
