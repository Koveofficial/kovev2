import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-image.jpg';

interface HeroSectionProps {
  onShopNow: () => void;
}

export function HeroSection({ onShopNow }: HeroSectionProps) {
  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-background">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Kove luxury fashion collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              KOVE
              <span className="block text-3xl md:text-4xl font-light text-white/90 mt-2">
                Luxury Redefined
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              Discover our exclusive collection of premium fashion, crafted with 
              uncompromising attention to detail and timeless elegance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onShopNow}
                size="lg"
                className="bg-accent hover:bg-accent-hover text-accent-foreground font-semibold px-8 py-6 text-lg"
              >
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-6 text-lg"
              >
                New Arrivals
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}