'use client';

import { useState, useRef, useEffect } from 'react';
import { FaGlobeAmericas } from 'react-icons/fa';
import ChatMessage from '@/components/ChatMessage';
import InputForm from '@/components/InputForm';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (text) => {
    setMessages(prev => [...prev, { text, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      const data = await response.json();

      if (data.success) {
        setMessages(prev => [...prev, {
          marathi: data.marathi,
          hindi: data.hindi,
          isUser: false
        }]);
      } else {
        setMessages(prev => [...prev, {
          text: `Error: ${data.error}`,
          isUser: false
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        text: `Error: ${error.message}`,
        isUser: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center !p-4 md:!p-10">
      <div className="w-full max-w-5xl animate-in fade-in zoom-in-95 duration-700">
        {/* Header (Directly above the card) */}
        <div className="mb-6 pl-2">
          <div className="flex items-center gap-3 mb-1">
            <FaGlobeAmericas className="text-[#3b82f6] text-3xl md:text-3xl" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              AI Translator
            </h1>
          </div>
          <p className="text-sm md:text-base text-gray-500 font-medium">
            Direct English to Marathi & Hindi translation.
          </p>
        </div>

        {/* The Main Glass Container */}
        <div className="glass-card rounded-[32px] overflow-hidden flex flex-col h-[75vh] md:h-[70vh]">
          {/* Chat Messages Area */}
          <div className="flex-1 !p-6 md:!p-12 overflow-y-auto custom-scrollbar">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center opacity-30">
                <div className="text-center">
                  <div className="bg-slate-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-5xl">💬</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">No messages yet</h3>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {messages.map((msg, idx) => (
                  <ChatMessage
                    key={idx}
                    message={msg.isUser ? msg.text : msg}
                    isUser={msg.isUser}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area (Pinned to bottom of card) */}
          <div className="!p-6 md:!px-12 md:!pb-12 bg-white/30 backdrop-blur-sm border-t border-white/20">
            <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
