'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Send, Search, Paperclip, Phone, Video, MoreVertical } from 'lucide-react'

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(null)
  const [message, setMessage] = useState('')

  const conversations = [
    {
      id: 1,
      name: 'PT Digital Indonesia',
      avatar: 'DI',
      lastMessage: 'Bagaimana progress proyeknya?',
      time: '10:30',
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: 'Startup FinTech',
      avatar: 'SF',
      lastMessage: 'Terima kasih untuk design mockupnya!',
      time: 'Kemarin',
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: 'CV Media Online',
      avatar: 'CM',
      lastMessage: 'Apakah artikel sudah selesai?',
      time: '2 hari lalu',
      unread: 1,
      online: false,
    },
  ]

  const chatMessages = [
    {
      id: 1,
      sender: 'client',
      message: 'Halo, saya tertarik dengan proposal Anda untuk proyek redesign website.',
      time: '09:00',
    },
    {
      id: 2,
      sender: 'me',
      message: 'Terima kasih! Saya sangat tertarik mengerjakan proyek ini. Kapan kita bisa diskusi lebih detail?',
      time: '09:15',
    },
    {
      id: 3,
      sender: 'client',
      message: 'Bagaimana kalau hari ini jam 14:00? Kita bisa video call.',
      time: '09:20',
    },
    {
      id: 4,
      sender: 'me',
      message: 'Baik, saya siap. Link meeting akan saya tunggu.',
      time: '09:25',
    },
    {
      id: 5,
      sender: 'client',
      message: 'Bagaimana progress proyeknya?',
      time: '10:30',
    },
  ]

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    // TODO: Send message via API
    console.log('Sending:', message)
    setMessage('')
  }

  return (
    <DashboardLayout title="Pesan" subtitle="Komunikasi dengan klien Anda">
      <div className="h-[calc(100vh-200px)]">
        <Card padding="none" className="h-full">
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-80 border-r border-neutral-200 flex flex-col">
              {/* Search */}
              <div className="p-4 border-b border-neutral-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Cari konversasi..."
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedChat(conv.id)}
                    className={`w-full p-4 border-b border-neutral-200 hover:bg-neutral-50 transition-colors text-left ${
                      selectedChat === conv.id ? 'bg-primary-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {conv.avatar}
                        </div>
                        {conv.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-success-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-neutral-900 truncate">{conv.name}</h4>
                          <span className="text-xs text-neutral-500">{conv.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-neutral-600 truncate">{conv.lastMessage}</p>
                          {conv.unread > 0 && (
                            <span className="ml-2 bg-primary-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            {selectedChat ? (
              <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                      DI
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">PT Digital Indonesia</h3>
                      <p className="text-sm text-success-600">● Online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                      <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-neutral-50">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-md px-4 py-2 rounded-lg ${
                          msg.sender === 'me'
                            ? 'bg-primary-600 text-white'
                            : 'bg-white text-neutral-900 border border-neutral-200'
                        }`}
                      >
                        <p>{msg.message}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-primary-200' : 'text-neutral-500'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-neutral-200 bg-white">
                  <div className="flex items-end gap-2">
                    <button
                      type="button"
                      className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ketik pesan..."
                      rows={1}
                      className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage(e)
                        }
                      }}
                    />
                    <Button type="submit" disabled={!message.trim()}>
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                  <p className="text-xs text-neutral-500 mt-2">
                    Tekan Enter untuk mengirim, Shift+Enter untuk baris baru
                  </p>
                </form>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-neutral-500">
                <div className="text-center">
                  <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-10 h-10 text-neutral-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Pilih Konversasi</h3>
                  <p>Pilih konversasi dari daftar untuk mulai chat</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}

