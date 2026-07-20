'use client';

import { useState } from 'react';
import { useRideStore } from '@/store/useRideStore';
import { X, Send, Mic, Image, MapPin, CheckCheck, Smile } from 'lucide-react';

interface Message {
  id: string;
  sender: 'you' | 'driver';
  text: string;
  time: string;
  type?: 'TEXT' | 'LOCATION' | 'VOICE';
}

export default function ChatDrawer() {
  const { isChatOpen, setIsChatOpen, selectedRide } = useRideStore();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'driver',
      text: 'Hello! I will be picking you up at Silk Board Flyover Junction gate 2 at 6:30 AM.',
      time: '06:10 AM',
      type: 'TEXT'
    },
    {
      id: 'm2',
      sender: 'you',
      text: 'Perfect! I will be carrying one medium backpack.',
      time: '06:12 AM',
      type: 'TEXT'
    },
    {
      id: 'm3',
      sender: 'driver',
      text: 'Sounds great. See you soon! AC will be set to 22°C.',
      time: '06:14 AM',
      type: 'TEXT'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');

  if (!isChatOpen || !selectedRide) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'you',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'TEXT'
    };

    setMessages([...messages, newMsg]);
    setInputMessage('');
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col transition-transform animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-3">
          <img src={selectedRide.driverAvatar} alt="" className="w-10 h-10 rounded-2xl object-cover" />
          <div>
            <h3 className="font-bold text-slate-900 text-sm">{selectedRide.driverName}</h3>
            <p className="text-[11px] text-brand-600 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              Online • Responds in 2 mins
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsChatOpen(false)}
          className="w-9 h-9 rounded-xl bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'you' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                msg.sender === 'you'
                  ? 'bg-brand-600 text-white rounded-br-none'
                  : 'bg-white text-slate-800 rounded-bl-none border border-slate-200'
              }`}
            >
              <p>{msg.text}</p>
              <div
                className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${
                  msg.sender === 'you' ? 'text-emerald-100' : 'text-slate-400'
                }`}
              >
                <span>{msg.time}</span>
                {msg.sender === 'you' && <CheckCheck className="w-3 h-3 text-emerald-200" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 p-3 bg-slate-100 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          <button
            type="submit"
            className="p-3 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl transition-transform active:scale-95 shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-around text-slate-400 pt-1">
          <button type="button" className="hover:text-brand-600 transition-colors p-1" title="Send Voice Note">
            <Mic className="w-4 h-4" />
          </button>
          <button type="button" className="hover:text-brand-600 transition-colors p-1" title="Share Photo">
            <Image className="w-4 h-4" />
          </button>
          <button type="button" className="hover:text-brand-600 transition-colors p-1" title="Share Current Location">
            <MapPin className="w-4 h-4" />
          </button>
        </div>
      </form>

    </div>
  );
}
