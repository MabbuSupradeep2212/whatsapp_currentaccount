import React from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

interface MessageData {
  id: string;
  text: string;
  time: string;
  isOwn: boolean;
  isRead?: boolean;
  isDelivered?: boolean;
}

interface ChatMessagesProps {
  messages: MessageData[];
  isTyping: boolean;
}

export default function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 bg-[#E5DDD5] bg-opacity-20">
      <div className="space-y-1">
        {messages.map((message) => (
          <Message
            key={message.id}
            text={message.text}
            time={message.time}
            isOwn={message.isOwn}
            isRead={message.isRead}
            isDelivered={message.isDelivered}
          />
        ))}
        {isTyping && <TypingIndicator />}
      </div>
    </div>
  );
}