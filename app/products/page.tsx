"use client";

import { useState, useEffect } from "react";
import { Filter, Grid, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/services/useProduct";
import { getCategory } from "@/services/useCategory";
import { getTags } from "@/services/useTags";
import { Product } from "@/types/product";

const numberOfProductShow: number = 8;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    priceRange: [0, 5000000],
    colors: [] as string[],
    sizes: [] as string[],
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes, tagRes] = await Promise.all([
          getProducts(),
          getCategory(),
          getTags(),
        ]);

        setTotalProducts(productRes?.totalProducts || 0);
        setProducts(productRes?.products.length ? productRes?.products : []);
        setCategories(categoryRes.map((cat: any) => cat.name));
        setSizes(tagRes?.map((item) => item?.name));
      } catch (error) {
        console.error("Failed to fetch product data", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);
      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(product.brand);
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];
      const matchesColor =
        filters.colors.length === 0 ||
        filters.colors.some((color) => product.colors.includes(color));
      const matchesSize =
        filters.sizes.length === 0 ||
        filters.sizes.some((size) =>
          product.tags?.some((p) => p?.name === size)
        );

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesPrice &&
        matchesColor &&
        matchesSize
      );
    });

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
        break;
    }

    setFilteredProducts(filtered);
  }, [products, filters, sortBy, searchQuery]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts({
        page: currentPage,
        perPage: numberOfProductShow,
      });
      setProducts(products?.products.length ? products?.products : []);
    };
    fetchProducts;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const countPage = Math.ceil(totalProducts / numberOfProductShow);

  const handleFilterChange = (
    type: string,
    value: string,
    checked: boolean
  ) => {
    setFilters((prev) => ({
      ...prev,
      [type]: checked
        ? [...(prev[type as keyof typeof prev] as string[]), value]
        : (prev[type as keyof typeof prev] as string[]).filter(
            (item) => item !== value
          ),
    }));
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Danh mục</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) =>
                  handleFilterChange("categories", category, checked as boolean)
                }
              />
              <Label htmlFor={`category-${category}`} className="text-sm">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Thương hiệu</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onCheckedChange={(checked) =>
                  handleFilterChange("brands", brand, checked as boolean)
                }
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Khoảng giá</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Từ"
              value={filters.priceRange[0]}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  priceRange: [
                    parseInt(e.target.value) || 0,
                    prev.priceRange[1],
                  ],
                }))
              }
              className="text-sm"
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="Đến"
              value={filters.priceRange[1]}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  priceRange: [
                    prev.priceRange[0],
                    parseInt(e.target.value) || 5000000,
                  ],
                }))
              }
              className="text-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Màu sắc</h3>
        <div className="grid grid-cols-2 gap-2">
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={filters.colors.includes(color)}
                onCheckedChange={(checked) =>
                  handleFilterChange("colors", color, checked as boolean)
                }
              />
              <Label htmlFor={`color-${color}`} className="text-sm">
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Kích thước</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={filters.sizes.includes(size)}
                onCheckedChange={(checked) =>
                  handleFilterChange("sizes", size, checked as boolean)
                }
              />
              <Label htmlFor={`size-${size}`} className="text-sm">
                {size}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-4">Sản phẩm</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="font-semibold mb-4">Bộ lọc</h2>
              <FilterContent />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Mobile Filter */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden">
                        <Filter className="h-4 w-4 mr-2" />
                        Bộ lọc
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <SheetHeader>
                        <SheetTitle>Bộ lọc sản phẩm</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterContent />
                      </div>
                    </SheetContent>
                  </Sheet>

                  <span className="text-sm text-gray-600">
                    {filteredProducts.length} sản phẩm
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Mới nhất</SelectItem>
                      <SelectItem value="price-low">
                        Giá thấp đến cao
                      </SelectItem>
                      <SelectItem value="price-high">
                        Giá cao đến thấp
                      </SelectItem>
                      <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.categories.length > 0 ||
              filters.brands.length > 0 ||
              filters.colors.length > 0 ||
              filters.sizes.length > 0) && (
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex items-center space-x-2 flex-wrap gap-2">
                  <span className="text-sm font-medium">
                    Bộ lọc đang áp dụng:
                  </span>
                  {filters.categories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() =>
                        handleFilterChange("categories", category, false)
                      }
                    >
                      {category} ×
                    </Badge>
                  ))}
                  {filters.brands.map((brand) => (
                    <Badge
                      key={brand}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleFilterChange("brands", brand, false)}
                    >
                      {brand} ×
                    </Badge>
                  ))}
                  {filters.colors.map((color) => (
                    <Badge
                      key={color}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleFilterChange("colors", color, false)}
                    >
                      {color} ×
                    </Badge>
                  ))}
                  {filters.sizes.map((size) => (
                    <Badge
                      key={size}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleFilterChange("sizes", size, false)}
                    >
                      {size} ×
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Products Grid */}
            {loading ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse space-y-4 bg-white p-4 rounded-lg shadow-sm"
                  >
                    <div className="bg-gray-200 h-48 w-full rounded-md" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  Không tìm thấy sản phẩm nào
                </p>
                <Button
                  onClick={() => {
                    setFilters({
                      categories: [],
                      brands: [],
                      priceRange: [0, 5000000],
                      colors: [],
                      sizes: [],
                    });
                    setSearchQuery("");
                  }}
                >
                  Xóa bộ lọc
                </Button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => (
                  <div key={product._id} className="relative">
                    <ProductCard
                      product={product}
                      mode={viewMode === "grid" ? "vertical" : "horizontal"}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalProducts > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex space-x-2">
                  <Button variant="outline" disabled={currentPage === 1}>
                    Trước
                  </Button>
                  {Array.from({ length: countPage }, (_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button variant="outline" disabled={countPage === 1}>
                    Sau
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
