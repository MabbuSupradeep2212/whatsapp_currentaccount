import React, { useState, useRef } from 'react';
import { Plus, Smile, Mic, Send, FileText, Receipt } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onSendMessageWithFiles?: (message: string, bankStatement?: File, itrDocument?: File) => void;
}

export default function ChatInput({ onSendMessage, onSendMessageWithFiles }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [bankStatement, setBankStatement] = useState<File | null>(null);
  const [itrDocument, setItrDocument] = useState<File | null>(null);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  
  const bankStatementRef = useRef<HTMLInputElement>(null);
  const itrDocumentRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() || bankStatement || itrDocument) {
      if ((bankStatement || itrDocument) && onSendMessageWithFiles) {
        onSendMessageWithFiles(message, bankStatement || undefined, itrDocument || undefined);
      } else {
        onSendMessage(message);
      }
      
      setMessage('');
      setBankStatement(null);
      setItrDocument(null);
      setShowAttachmentMenu(false);
    }
  };

  const handleBankStatementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBankStatement(file);
      setShowAttachmentMenu(false);
    }
  };

  const handleItrDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setItrDocument(file);
      setShowAttachmentMenu(false);
    }
  };

  const removeAttachment = (type: 'bank_statement' | 'itr_document') => {
    if (type === 'bank_statement') {
      setBankStatement(null);
      if (bankStatementRef.current) {
        bankStatementRef.current.value = '';
      }
    } else {
      setItrDocument(null);
      if (itrDocumentRef.current) {
        itrDocumentRef.current.value = '';
      }
    }
  };

  return (
    <div className="bg-[#F0F0F0] px-4 py-3">
      {/* File attachments preview */}
      {(bankStatement || itrDocument) && (
        <div className="mb-3 flex flex-wrap gap-2">
          {bankStatement && (
            <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              <Receipt size={16} className="mr-1" />
              <span className="truncate max-w-32">{bankStatement.name}</span>
              <button
                type="button"
                onClick={() => removeAttachment('bank_statement')}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </div>
          )}
          {itrDocument && (
            <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              <FileText size={16} className="mr-1" />
              <span className="truncate max-w-32">{itrDocument.name}</span>
              <button
                type="button"
                onClick={() => removeAttachment('itr_document')}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Plus size={20} />
          </button>
          
          {/* Attachment menu */}
          {showAttachmentMenu && (
            <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border p-2 min-w-48">
              <button
                type="button"
                onClick={() => bankStatementRef.current?.click()}
                className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-100 rounded-md"
              >
                <Receipt size={18} className="mr-3 text-blue-600" />
                <span className="text-sm">Bank Statement</span>
              </button>
              <button
                type="button"
                onClick={() => itrDocumentRef.current?.click()}
                className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-100 rounded-md"
              >
                <FileText size={18} className="mr-3 text-green-600" />
                <span className="text-sm">ITR Document</span>
              </button>
            </div>
          )}
        </div>
        
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

        {message.trim() || bankStatement || itrDocument ? (
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

      {/* Hidden file inputs */}
      <input
        ref={bankStatementRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        onChange={handleBankStatementChange}
        className="hidden"
      />
      <input
        ref={itrDocumentRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        onChange={handleItrDocumentChange}
        className="hidden"
      />
    </div>
  );
}