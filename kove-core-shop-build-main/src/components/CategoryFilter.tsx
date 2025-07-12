import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

interface FilterOptions {
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  categories: string[];
}

interface CategoryFilterProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  activeFiltersCount: number;
}

const availableColors = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Brown', value: '#8B4513' },
  { name: 'Navy', value: '#000080' },
  { name: 'Beige', value: '#F5F5DC' },
  { name: 'Gray', value: '#808080' },
];

const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const categories = [
  { id: 'all', label: 'All Items' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'bags', label: 'Bags' },
  { id: 'shoes', label: 'Shoes' },
];

export function CategoryFilter({ filters, onFiltersChange, activeFiltersCount }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [value[0], value[1]],
    });
  };

  const handleColorToggle = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    
    onFiltersChange({
      ...filters,
      colors: newColors,
    });
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    
    onFiltersChange({
      ...filters,
      sizes: newSizes,
    });
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFiltersChange({
      ...filters,
      categories: newCategories,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      priceRange: [0, 10000],
      colors: [],
      sizes: [],
      categories: [],
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge className="ml-2 bg-accent text-accent-foreground">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-full sm:max-w-md">
        <SheetHeader className="text-left">
          <div className="flex items-center justify-between">
            <SheetTitle>Filters</SheetTitle>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Price Range */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Price Range</h3>
            <div className="px-3">
              <Slider
                value={filters.priceRange}
                onValueChange={handlePriceChange}
                max={10000}
                min={0}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>${filters.priceRange[0].toLocaleString()}</span>
                <span>${filters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={filters.categories.includes(category.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryToggle(category.id)}
                  className="justify-start"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Colors */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Colors</h3>
            <div className="grid grid-cols-3 gap-3">
              {availableColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorToggle(color.name)}
                  className={`flex flex-col items-center gap-2 p-2 rounded-lg border transition-colors ${
                    filters.colors.includes(color.name)
                      ? 'border-accent bg-accent/10'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-full border-2 border-border"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-xs text-foreground">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Sizes */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Sizes</h3>
            <div className="grid grid-cols-3 gap-2">
              {availableSizes.map((size) => (
                <Button
                  key={size}
                  variant={filters.sizes.includes(size) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSizeToggle(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <Button
            onClick={() => setIsOpen(false)}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
            size="lg"
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}