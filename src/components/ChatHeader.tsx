import React from 'react';
import { ArrowLeft, Phone, Video, MoreVertical, RotateCcw } from 'lucide-react';

interface ChatHeaderProps {
  contactName: string;
  status: string;
  isOnline: boolean;
  onReset?: () => void;
  showReset?: boolean;
}

export default function ChatHeader({ contactName, status, isOnline, onReset, showReset = false }: ChatHeaderProps) {
  return (
    <div className="bg-[#128C7E] text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
            alt={contactName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-white">{contactName}</h3>
          <p className="text-xs text-gray-200">
            {isOnline ? 'online' : status}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {showReset && onReset && (
          <button 
            onClick={onReset}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            title="Reset Chat"
          >
            <RotateCcw size={20} />
          </button>
        )}
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Video size={20} />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Phone size={20} />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
}