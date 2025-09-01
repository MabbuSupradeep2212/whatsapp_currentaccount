import React from 'react';
import { Check, CheckCheck } from 'lucide-react';

interface MessageProps {
  text: string;
  time: string;
  isOwn: boolean;
  isRead?: boolean;
  isDelivered?: boolean;
}

export default function Message({ text, time, isOwn, isRead = false, isDelivered = false }: MessageProps) {
  return (
    <div className={`flex mb-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg relative ${
          isOwn
            ? 'bg-[#DCF8C6] text-gray-800 rounded-br-none'
            : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
        }`}
      >
        <p className="text-sm leading-relaxed">{text}</p>
        <div className={`flex items-center justify-end mt-1 space-x-1 ${isOwn ? 'text-gray-500' : 'text-gray-400'}`}>
          <span className="text-xs">{time}</span>
          {isOwn && (
            <div className="flex items-center">
              {isRead ? (
                <CheckCheck size={14} className="text-[#25D366]" />
              ) : isDelivered ? (
                <CheckCheck size={14} className="text-gray-400" />
              ) : (
                <Check size={14} className="text-gray-400" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}