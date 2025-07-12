import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProductCard } from '@/components/ProductCard';
import { ShoppingCart } from '@/components/ShoppingCart';
import { CategoryFilter } from '@/components/CategoryFilter';
import { sampleProducts } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { useProductFilters } from '@/hooks/useProductFilters';

const Index = () => {
  const {
    cartItems,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleCheckout,
    totalCartItems,
  } = useCart();

  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredProducts,
    activeFiltersCount,
  } = useProductFilters(sampleProducts);

  const handleShopNow = () => {
    // Scroll to products section
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        cartItemCount={totalCartItems}
        onSearchChange={setSearchQuery}
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      {/* Hero Section */}
      <HeroSection onShopNow={handleShopNow} />

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Luxury Collection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our curated selection of premium fashion pieces, crafted with 
              uncompromising attention to detail and timeless elegance.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <CategoryFilter
                filters={filters}
                onFiltersChange={setFilters}
                activeFiltersCount={activeFiltersCount}
              />
            </div>
            
            <div className="text-sm text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg font-medium text-foreground mb-2">No products found</p>
              <p className="text-muted-foreground">
                Try adjusting your filters or search terms
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Shopping Cart */}
      <ShoppingCart
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Index;
