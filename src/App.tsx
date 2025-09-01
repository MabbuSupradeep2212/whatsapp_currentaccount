import React, { useEffect, useRef } from 'react';
import ChatHeader from './components/ChatHeader';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import useChat from './hooks/useChat';

function App() {
  const { messages, isTyping, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Status Bar */}
        <div className="bg-[#128C7E] h-6 flex items-center justify-between px-4 text-white text-xs">
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            </div>
            <span className="ml-2">Carrier</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>12:34</span>
            <div className="flex space-x-0.5">
              <div className="w-6 h-3 border border-white rounded-sm">
                <div className="w-4 h-1.5 bg-white rounded-sm m-0.5"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="h-[600px] flex flex-col">
          <ChatHeader 
            contactName="AI Assistant"
            status="last seen today at 10:30"
            isOnline={true}
          />
          
          <div className="flex-1 flex flex-col min-h-0">
            <ChatMessages messages={messages} isTyping={isTyping} />
            <div ref={messagesEndRef} />
          </div>
          
          <ChatInput onSendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;