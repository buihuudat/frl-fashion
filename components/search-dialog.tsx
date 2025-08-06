'use client'

import { useState, useEffect } from "react"
import { Search, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface SearchResult {
  id: string
  name: string
  price: number
  image: string
  category: string
}

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const mockResults: SearchResult[] = [
    {
      id: "1",
      name: "Áo sơ mi lụa cao cấp",
      price: 1200000,
      image: "/placeholder.svg?height=80&width=80",
      category: "Áo sơ mi"
    },
    {
      id: "2",
      name: "Váy dạ hội sang trọng",
      price: 2500000,
      image: "/placeholder.svg?height=80&width=80",
      category: "Váy"
    },
    {
      id: "3",
      name: "Áo khoác blazer nữ",
      price: 1800000,
      image: "/placeholder.svg?height=80&width=80",
      category: "Áo khoác"
    }
  ]

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        const filtered = mockResults.filter(item =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        )
        setResults(filtered)
        setIsLoading(false)
      }, 500)

      return () => clearTimeout(timer)
    } else {
      setResults([])
    }
  }, [query])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tìm kiếm sản phẩm</DialogTitle>
        </DialogHeader>
        
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Nhập tên sản phẩm, danh mục..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>

        <div className="max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="text-center py-8 text-gray-500">
              Đang tìm kiếm...
            </div>
          )}

          {!isLoading && query.length > 2 && results.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Không tìm thấy sản phẩm nào
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-2">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={`/products/${result.id}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Image
                    src={result.image || "/placeholder.svg"}
                    alt={result.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{result.name}</h3>
                    <p className="text-sm text-gray-500">{result.category}</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatPrice(result.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {query.length > 2 && (
          <div className="border-t pt-4">
            <Link
              href={`/products?search=${encodeURIComponent(query)}`}
              onClick={() => onOpenChange(false)}
            >
              <Button className="w-full">
                Xem tất cả kết quả cho "{query}"
              </Button>
            </Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
