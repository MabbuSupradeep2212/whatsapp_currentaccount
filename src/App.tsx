import React, { useEffect, useRef } from 'react';
import ChatHeader from './components/ChatHeader';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import useChat from './hooks/useChat';

function App() {
  const { messages, isTyping, chatStarted, sendMessage, sendMessageWithFiles, startChat, resetChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the chat? This will clear all messages and start over.')) {
      resetChat();
    }
  };

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
            contactName="Business Loan Assistant"
            status="Ready to help with your loan application"
            isOnline={true}
            onReset={handleReset}
            showReset={chatStarted}
          />
          
          <div className="flex-1 flex flex-col min-h-0">
            {!chatStarted ? (
              // Welcome screen with Start Chat button
              <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#E5DDD5] bg-opacity-20">
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Business Loan Assistant</h2>
                  <p className="text-gray-600 mb-6">Welcome! I'll help you apply for a business loan.<br />Click below to start your application.</p>
                  <button
                    onClick={startChat}
                    className="bg-[#25D366] text-white px-8 py-3 rounded-full font-medium hover:bg-[#20C157] transition-colors shadow-lg"
                  >
                    Start Chat
                  </button>
                </div>
              </div>
            ) : (
              <>
                <ChatMessages messages={messages} isTyping={isTyping} />
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          
          {chatStarted && (
            <ChatInput onSendMessage={sendMessage} onSendMessageWithFiles={sendMessageWithFiles} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;