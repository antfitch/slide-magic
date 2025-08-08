// The directive tells Next.js it's a server-only module.
'use server';

/**
 * @fileOverview Generates sample documentation excerpts based on a product description.
 *
 * - generateDocumentationExcerpt - A function that handles the generation of documentation excerpts.
 * - GenerateDocumentationExcerptInput - The input type for the generateDocumentationExcerpt function.
 * - GenerateDocumentationExcerptOutput - The return type for the generateDocumentationExcerpt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDocumentationExcerptInputSchema = z.object({
  productDescription: z.string().describe('The description of the product for which documentation excerpts should be generated.'),
});
export type GenerateDocumentationExcerptInput = z.infer<typeof GenerateDocumentationExcerptInputSchema>;

const GenerateDocumentationExcerptOutputSchema = z.object({
  documentationExcerpt: z.string().describe('A sample documentation excerpt for the described product.'),
});
export type GenerateDocumentationExcerptOutput = z.infer<typeof GenerateDocumentationExcerptOutputSchema>;

export async function generateDocumentationExcerpt(input: GenerateDocumentationExcerptInput): Promise<GenerateDocumentationExcerptOutput> {
  return generateDocumentationExcerptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDocumentationExcerptPrompt',
  input: {schema: GenerateDocumentationExcerptInputSchema},
  output: {schema: GenerateDocumentationExcerptOutputSchema},
  prompt: `You are an expert technical writer specializing in creating clear and concise product documentation.

  Based on the following product description, generate a sample documentation excerpt that explains how to use the product:

  Product Description: {{{productDescription}}}

  Documentation Excerpt:`,
});

const generateDocumentationExcerptFlow = ai.defineFlow(
  {
    name: 'generateDocumentationExcerptFlow',
    inputSchema: GenerateDocumentationExcerptInputSchema,
    outputSchema: GenerateDocumentationExcerptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
