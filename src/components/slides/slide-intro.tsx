import Image from 'next/image';

export default function SlideIntro() {
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
      <div className="space-y-4">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          The Challenge: <br /> AI Needs to Understand
        </h2>
        <p className="text-lg text-foreground/90">
          AI application builders, like Firebase Studio, are incredibly powerful. They can write code, build UIs, and automate complex tasks. But their effectiveness is directly tied to one critical thing:
        </p>
        <p className="text-xl font-medium text-primary">
          How well they can understand your product.
        </p>
        <p className="text-lg text-foreground/90">
          And how does an AI understand a product? Through its documentation.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <Image 
          src="https://placehold.co/500x500.png"
          alt="AI trying to read documentation"
          width={500}
          height={500}
          data-ai-hint="robot brain"
          className="rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
}
