import { useState, useMemo } from 'react';
import { Product } from '@/components/ProductCard';

export interface FilterOptions {
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  categories: string[];
}

export function useProductFilters(products: Product[]) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 10000],
    colors: [],
    sizes: [],
    categories: [],
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Color filter
      if (filters.colors.length > 0 && !filters.colors.some(color => product.colors?.includes(color))) {
        return false;
      }

      // Size filter
      if (filters.sizes.length > 0 && !filters.sizes.some(size => product.sizes?.includes(size))) {
        return false;
      }

      // Category filter from filter panel
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }

      return true;
    });
  }, [products, selectedCategory, searchQuery, filters]);

  const activeFiltersCount = filters.colors.length + filters.sizes.length + filters.categories.length;

  return {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredProducts,
    activeFiltersCount,
  };
}