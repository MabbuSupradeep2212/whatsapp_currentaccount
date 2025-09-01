import React, { useState } from 'react';
import { Plus, Smile, Mic, Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="bg-[#F0F0F0] px-4 py-3">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <button
          type="button"
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Plus size={20} />
        </button>
        
        <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center space-x-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 outline-none text-gray-800 placeholder-gray-500"
          />
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Smile size={20} />
          </button>
        </div>

        {message.trim() ? (
          <button
            type="submit"
            className="p-2 bg-[#25D366] text-white rounded-full hover:bg-[#20C157] transition-colors"
          >
            <Send size={18} />
          </button>
        ) : (
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Mic size={20} />
          </button>
        )}
      </form>
    </div>
  );
}