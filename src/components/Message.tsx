import React from 'react';
import { Check, CheckCheck, FileText, Receipt, AlertCircle } from 'lucide-react';

interface MessageProps {
  text: string;
  time: string;
  isOwn: boolean;
  isRead?: boolean;
  isDelivered?: boolean;
  hasAttachment?: boolean;
  attachmentType?: 'bank_statement' | 'itr_document';
  attachmentName?: string;
  isError?: boolean;
}

export default function Message({ 
  text, 
  time, 
  isOwn, 
  isRead = false, 
  isDelivered = false, 
  hasAttachment = false, 
  attachmentType, 
  attachmentName,
  isError = false 
}: MessageProps) {
  return (
    <div className={`flex mb-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg relative ${
          isError 
            ? 'bg-red-100 text-red-800 border border-red-200 rounded-br-none'
            : isOwn
            ? 'bg-[#DCF8C6] text-gray-800 rounded-br-none'
            : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
        }`}
      >
        {/* Error indicator */}
        {isError && (
          <div className="flex items-center mb-2">
            <AlertCircle size={16} className="text-red-600 mr-2" />
            <span className="text-xs text-red-600 font-medium">Error</span>
          </div>
        )}

        {/* File attachment */}
        {hasAttachment && attachmentType && attachmentName && (
          <div className={`mb-2 p-2 rounded-md border ${
            attachmentType === 'bank_statement' 
              ? 'bg-blue-50 border-blue-200' 
              : 'bg-green-50 border-green-200'
          }`}>
            <div className="flex items-center">
              {attachmentType === 'bank_statement' ? (
                <Receipt size={16} className="text-blue-600 mr-2" />
              ) : (
                <FileText size={16} className="text-green-600 mr-2" />
              )}
              <span className={`text-xs font-medium ${
                attachmentType === 'bank_statement' ? 'text-blue-800' : 'text-green-800'
              }`}>
                {attachmentName}
              </span>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {attachmentType === 'bank_statement' ? 'Bank Statement' : 'ITR Document'}
            </div>
          </div>
        )}

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