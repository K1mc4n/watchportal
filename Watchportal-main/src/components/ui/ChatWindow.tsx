// src/components/ui/ChatWindow.tsx
"use client";

import { X, Send, Bot, User, LoaderCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface ChatWindowProps {
  onClose: () => void;
}

export function ChatWindow({ onClose }: ChatWindowProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: "Hi! I'm Coin Sage. Ask me anything about crypto, Farcaster, or Web3." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get a response from the AI.');
      }

      const data = await response.json();
      const aiMessage: Message = { sender: 'ai', text: data.reply };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error(error);
      const errorMessage: Message = { sender: 'ai', text: "Sorry, I'm having trouble connecting right now. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-5 z-50 w-[350px] h-[500px] bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl flex flex-col animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-neutral-700">
        <h3 className="font-bold text-white">Chat with Coin Sage</h3>
        <button onClick={onClose} className="text-neutral-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-gold flex-shrink-0 flex items-center justify-center">
                <Bot size={20} className="text-black" />
              </div>
            )}
            <div className={`p-3 rounded-lg max-w-[80%] ${msg.sender === 'ai' ? 'bg-neutral-800 text-white' : 'bg-gold text-black'}`}>
              <p className="text-sm">{msg.text}</p>
            </div>
            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-neutral-700 flex-shrink-0 flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
            )}
          </div>
        ))}
         {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gold flex-shrink-0 flex items-center justify-center">
              <Bot size={20} className="text-black" />
            </div>
            <div className="p-3 rounded-lg bg-neutral-800 text-white">
              <LoaderCircle className="animate-spin" size={20} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-neutral-700">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 bg-neutral-800 border border-neutral-600 rounded-full px-4 py-2 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-gold"
            disabled={isLoading}
          />
          <button type="submit" className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-black" disabled={isLoading}>
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
              }
