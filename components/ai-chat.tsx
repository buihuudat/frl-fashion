'use client'

import { useState } from "react"
import { Send, Bot, User } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

interface AIChatProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AIChat({ open, onOpenChange }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Xin chào! Tôi là trợ lý AI của Luxe. Tôi có thể giúp bạn tìm kiếm sản phẩm, tư vấn thời trang, hoặc trả lời các câu hỏi về cửa hàng. Bạn cần hỗ trợ gì?',
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Mô phỏng phản hồi AI
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('sản phẩm') || input.includes('tìm')) {
      return 'Tôi có thể giúp bạn tìm kiếm sản phẩm theo danh mục, giá cả, hoặc phong cách. Bạn đang tìm loại sản phẩm nào? Ví dụ: áo sơ mi, váy dạ hội, hay áo khoác?'
    }
    
    if (input.includes('giá') || input.includes('khuyến mãi')) {
      return 'Hiện tại chúng tôi có nhiều chương trình khuyến mãi hấp dẫn! Giảm giá lên đến 30% cho bộ sưu tập mùa thu. Bạn có muốn xem các sản phẩm đang sale không?'
    }
    
    if (input.includes('size') || input.includes('kích thước')) {
      return 'Chúng tôi có đầy đủ các size từ XS đến XXL. Bạn có thể tham khảo bảng size chi tiết trên từng sản phẩm. Nếu cần tư vấn size cụ thể, hãy cho tôi biết số đo của bạn!'
    }
    
    if (input.includes('giao hàng') || input.includes('vận chuyển')) {
      return 'Chúng tôi có dịch vụ giao hàng toàn quốc. Miễn phí ship cho đơn hàng trên 1.500.000đ. Thời gian giao hàng: 2-3 ngày trong nội thành, 3-5 ngày ngoại thành.'
    }
    
    return 'Cảm ơn bạn đã liên hệ! Tôi sẽ cố gắng hỗ trợ bạn tốt nhất. Bạn có thể hỏi tôi về sản phẩm, giá cả, khuyến mãi, hoặc chính sách của cửa hàng.'
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span>Trợ lý AI Luxe</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <ScrollArea className="flex-1 py-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-2 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'ai' && (
                    <div className="bg-gray-100 p-2 rounded-full">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="bg-blue-500 p-2 rounded-full">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start space-x-2">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t pt-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Nhập tin nhắn..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
