'use client'

import { useState, useEffect } from "react"
import { Filter, Grid, List, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  brand: string
  rating: number
  reviews: number
  colors: string[]
  sizes: string[]
  isNew?: boolean
  isSale?: boolean
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('newest')
  const [filters, setFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    priceRange: [0, 5000000],
    colors: [] as string[],
    sizes: [] as string[]
  })
  const [searchQuery, setSearchQuery] = useState('')

  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Áo sơ mi lụa cao cấp",
      price: 1200000,
      originalPrice: 1500000,
      image: "/placeholder.svg?height=400&width=300",
      category: "Áo sơ mi",
      brand: "Luxe Collection",
      rating: 4.8,
      reviews: 124,
      colors: ["Trắng", "Đen", "Xanh navy"],
      sizes: ["S", "M", "L", "XL"],
      isSale: true
    },
    {
      id: "2",
      name: "Váy dạ hội sang trọng",
      price: 2500000,
      image: "/placeholder.svg?height=400&width=300",
      category: "Váy",
      brand: "Elegant Line",
      rating: 4.9,
      reviews: 89,
      colors: ["Đen", "Đỏ burgundy", "Xanh navy"],
      sizes: ["XS", "S", "M", "L"],
      isNew: true
    },
    {
      id: "3",
      name: "Áo khoác blazer nữ",
      price: 1800000,
      originalPrice: 2200000,
      image: "/placeholder.svg?height=400&width=300",
      category: "Áo khoác",
      brand: "Professional",
      rating: 4.7,
      reviews: 156,
      colors: ["Đen", "Xám", "Camel"],
      sizes: ["S", "M", "L", "XL"],
      isSale: true
    },
    {
      id: "4",
      name: "Chân váy midi thanh lịch",
      price: 950000,
      image: "/placeholder.svg?height=400&width=300",
      category: "Váy",
      brand: "Classic Style",
      rating: 4.6,
      reviews: 78,
      colors: ["Đen", "Trắng", "Hồng pastel"],
      sizes: ["XS", "S", "M", "L"]
    },
    {
      id: "5",
      name: "Áo len cashmere",
      price: 3200000,
      image: "/placeholder.svg?height=400&width=300",
      category: "Áo len",
      brand: "Luxury Knits",
      rating: 4.9,
      reviews: 67,
      colors: ["Kem", "Xám", "Camel"],
      sizes: ["S", "M", "L"],
      isNew: true
    },
    {
      id: "6",
      name: "Quần tây công sở",
      price: 1100000,
      image: "/placeholder.svg?height=400&width=300",
      category: "Quần",
      brand: "Office Wear",
      rating: 4.5,
      reviews: 92,
      colors: ["Đen", "Xám", "Xanh navy"],
      sizes: ["S", "M", "L", "XL"]
    }
  ]

  const categories = ["Áo sơ mi", "Váy", "Áo khoác", "Áo len", "Quần", "Phụ kiện"]
  const brands = ["Luxe Collection", "Elegant Line", "Professional", "Classic Style", "Luxury Knits", "Office Wear"]
  const colors = ["Trắng", "Đen", "Xám", "Xanh navy", "Đỏ burgundy", "Hồng pastel", "Kem", "Camel"]
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

  useEffect(() => {
    setProducts(mockProducts)
    setFilteredProducts(mockProducts)
  }, [])

  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category)
      const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand)
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      const matchesColor = filters.colors.length === 0 || filters.colors.some(color => product.colors.includes(color))
      const matchesSize = filters.sizes.length === 0 || filters.sizes.some(size => product.sizes.includes(size))

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesColor && matchesSize
    })

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
      default:
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
    }

    setFilteredProducts(filtered)
  }, [products, filters, sortBy, searchQuery])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const handleFilterChange = (type: string, value: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      [type]: checked 
        ? [...prev[type as keyof typeof prev] as string[], value]
        : (prev[type as keyof typeof prev] as string[]).filter(item => item !== value)
    }))
  }

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Danh mục</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => 
                  handleFilterChange('categories', category, checked as boolean)
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
          {brands.map(brand => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onCheckedChange={(checked) => 
                  handleFilterChange('brands', brand, checked as boolean)
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
              onChange={(e) => setFilters(prev => ({
                ...prev,
                priceRange: [parseInt(e.target.value) || 0, prev.priceRange[1]]
              }))}
              className="text-sm"
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="Đến"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                priceRange: [prev.priceRange[0], parseInt(e.target.value) || 5000000]
              }))}
              className="text-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Màu sắc</h3>
        <div className="grid grid-cols-2 gap-2">
          {colors.map(color => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={filters.colors.includes(color)}
                onCheckedChange={(checked) => 
                  handleFilterChange('colors', color, checked as boolean)
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
          {sizes.map(size => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={filters.sizes.includes(size)}
                onCheckedChange={(checked) => 
                  handleFilterChange('sizes', size, checked as boolean)
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
  )

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
                      <SelectItem value="price-low">Giá thấp đến cao</SelectItem>
                      <SelectItem value="price-high">Giá cao đến thấp</SelectItem>
                      <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.categories.length > 0 || filters.brands.length > 0 || filters.colors.length > 0 || filters.sizes.length > 0) && (
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex items-center space-x-2 flex-wrap gap-2">
                  <span className="text-sm font-medium">Bộ lọc đang áp dụng:</span>
                  {filters.categories.map(category => (
                    <Badge key={category} variant="secondary" className="cursor-pointer"
                           onClick={() => handleFilterChange('categories', category, false)}>
                      {category} ×
                    </Badge>
                  ))}
                  {filters.brands.map(brand => (
                    <Badge key={brand} variant="secondary" className="cursor-pointer"
                           onClick={() => handleFilterChange('brands', brand, false)}>
                      {brand} ×
                    </Badge>
                  ))}
                  {filters.colors.map(color => (
                    <Badge key={color} variant="secondary" className="cursor-pointer"
                           onClick={() => handleFilterChange('colors', color, false)}>
                      {color} ×
                    </Badge>
                  ))}
                  {filters.sizes.map(size => (
                    <Badge key={size} variant="secondary" className="cursor-pointer"
                           onClick={() => handleFilterChange('sizes', size, false)}>
                      {size} ×
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Không tìm thấy sản phẩm nào</p>
                <Button onClick={() => {
                  setFilters({
                    categories: [],
                    brands: [],
                    priceRange: [0, 5000000],
                    colors: [],
                    sizes: []
                  })
                  setSearchQuery('')
                }}>
                  Xóa bộ lọc
                </Button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map(product => (
                  <div key={product.id} className="relative">
                    <ProductCard product={product} />
                    {product.isNew && (
                      <Badge className="absolute top-2 left-2 bg-green-600 text-white">
                        Mới
                      </Badge>
                    )}
                    {product.isSale && (
                      <Badge className="absolute top-2 right-12 bg-red-600 text-white">
                        Sale
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex space-x-2">
                  <Button variant="outline" disabled>Trước</Button>
                  <Button variant="default">1</Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <Button variant="outline">Sau</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
