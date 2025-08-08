
"use client";

import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from '@/components/theme-toggle';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Colors } from '@/components/presentation';

interface AdminMenuProps {
  children: React.ReactNode;
  colors: Colors;
  onColorChange: (newColors: Colors) => void;
  font: string;
  onFontChange: (newFont: string) => void;
}

function hexToHsl(hex: string): string | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
}


function hslToHex(hsl: string): string {
    const [h, s, l] = hsl.split(' ').map((val, i) => parseInt(val, 10) / (i === 0 ? 360 : 100));

    if (s === 0) {
        const val = Math.round(l * 255);
        return `#${val.toString(16).padStart(2, '0').repeat(3)}`;
    }

    const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = hue2rgb(p, q, h + 1/3);
    const g = hue2rgb(p, q, h);
    const b = hue2rgb(p, q, h - 1/3);
    
    const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}


export function AdminMenu({ children, colors, onColorChange, font, onFontChange }: AdminMenuProps) {
    const [localColors, setLocalColors] = useState({
        primary: hslToHex(colors.primary),
        accent: hslToHex(colors.accent),
        background: hslToHex(colors.background),
    });

    useEffect(() => {
        setLocalColors({
            primary: hslToHex(colors.primary),
            accent: hslToHex(colors.accent),
            background: hslToHex(colors.background),
        });
    }, [colors]);

    const handleLocalColorChange = (name: keyof Colors, value: string) => {
        setLocalColors(prev => ({ ...prev, [name]: value }));
    };

    const handleApply = () => {
        const newHslColors = {
            primary: hexToHsl(localColors.primary) || colors.primary,
            accent: hexToHsl(localColors.accent) || colors.accent,
            background: hexToHsl(localColors.background) || colors.background,
        };
        onColorChange(newHslColors);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Admin Settings</SheetTitle>
                    <SheetDescription>
                        Customize the look and feel of your presentation.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 py-6">
                    <div className="space-y-2">
                        <Label className="font-semibold">Theme</Label>
                        <ThemeToggle />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <Label className="font-semibold">Fonts</Label>
                        <Select value={font} onValueChange={onFontChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a font pair" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="inter-space-grotesk">Sans Serif / Grotesk</SelectItem>
                                <SelectItem value="roboto-slab-roboto">Slab / Sans Serif</SelectItem>
                                <SelectItem value="lato-merriweather">Sans Serif / Serif</SelectItem>
                                <SelectItem value="source-sans-pro-playfair-display">Sans Serif / Serif</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <Label className="font-semibold">Colors</Label>
                        <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                            <Label htmlFor="primary">Primary</Label>
                            <Input
                                id="primary"
                                type="color"
                                value={localColors.primary}
                                onChange={(e) => handleLocalColorChange('primary', e.target.value)}
                                className="w-16 h-8 p-1"
                            />
                        </div>
                        <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                            <Label htmlFor="accent">Accent</Label>
                            <Input
                                id="accent"
                                type="color"
                                value={localColors.accent}
                                onChange={(e) => handleLocalColorChange('accent', e.target.value)}
                                className="w-16 h-8 p-1"
                            />
                        </div>
                         <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                            <Label htmlFor="background">Background</Label>
                            <Input
                                id="background"
                                type="color"
                                value={localColors.background}
                                onChange={(e) => handleLocalColorChange('background', e.target.value)}
                                className="w-16 h-8 p-1"
                            />
                        </div>
                        <Button onClick={handleApply} className="w-full">Apply Colors</Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
