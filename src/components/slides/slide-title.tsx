import { FileText, BrainCircuit } from 'lucide-react';

export default function SlideTitle() {
  return (
    <div className="text-center flex flex-col items-center justify-center gap-6">
      <div className="flex items-center gap-4 text-primary">
        <div className="animate-in fade-in-0 slide-in-from-left-10 duration-1000 delay-200">
            <FileText className="h-16 w-16" />
        </div>
        <div className="animate-in fade-in-0 slide-in-from-right-10 duration-1000 delay-200">
            <BrainCircuit className="h-20 w-20" />
        </div>
      </div>
      <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter text-primary animate-in fade-in slide-in-from-bottom-12 duration-1000">
        DocuVision
      </h1>
      <p className="font-body text-xl md:text-2xl max-w-3xl text-foreground/80 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-200">
        From seeds to success: How quality docs influence product-led growth through LLMs.
      </p>
      <p className="text-muted-foreground animate-in fade-in duration-1000 delay-500">
        Use <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">←</kbd> and <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">→</kbd> keys to navigate
      </p>
    </div>
  );
}
