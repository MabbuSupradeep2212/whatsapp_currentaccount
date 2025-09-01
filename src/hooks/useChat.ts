import { useState, useCallback, useRef, useEffect } from 'react';

interface MessageData {
  id: string;
  text: string;
  time: string;
  isOwn: boolean;
  isRead?: boolean;
  isDelivered?: boolean;
}

export default function useChat() {
  const [messages, setMessages] = useState<MessageData[]>([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      time: '10:30',
      isOwn: false,
    },
    {
      id: '2',
      text: 'Hi there! I need some information about your services.',
      time: '10:32',
      isOwn: true,
      isDelivered: true,
      isRead: true,
    },
    {
      id: '3',
      text: "I'd be happy to help! What specific information are you looking for?",
      time: '10:33',
      isOwn: false,
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const messageIdRef = useRef(4);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const simulateBotResponse = useCallback((userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      // Simple bot responses based on keywords
      let botResponse = "I understand. Let me help you with that.";
      
      if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
        botResponse = "Hello! Nice to meet you. How can I assist you today?";
      } else if (userMessage.toLowerCase().includes('help')) {
        botResponse = "I'm here to help! You can ask me about our services, pricing, or any other questions you might have.";
      } else if (userMessage.toLowerCase().includes('price') || userMessage.toLowerCase().includes('cost')) {
        botResponse = "Our pricing varies depending on your needs. Would you like me to connect you with a sales representative for detailed pricing information?";
      } else if (userMessage.toLowerCase().includes('thank')) {
        botResponse = "You're very welcome! Is there anything else I can help you with?";
      } else if (userMessage.toLowerCase().includes('bye') || userMessage.toLowerCase().includes('goodbye')) {
        botResponse = "Goodbye! Feel free to reach out anytime if you need assistance. Have a great day!";
      }

      const newMessage: MessageData = {
        id: messageIdRef.current.toString(),
        text: botResponse,
        time: formatTime(new Date()),
        isOwn: false,
      };

      setMessages(prev => [...prev, newMessage]);
      messageIdRef.current++;
    }, 1500 + Math.random() * 1000);
  }, []);

  const sendMessage = useCallback((text: string) => {
    const newMessage: MessageData = {
      id: messageIdRef.current.toString(),
      text,
      time: formatTime(new Date()),
      isOwn: true,
      isDelivered: false,
      isRead: false,
    };

    setMessages(prev => [...prev, newMessage]);
    messageIdRef.current++;

    // Simulate message delivery and read status
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, isDelivered: true }
            : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, isRead: true }
            : msg
        )
      );
    }, 2000);

    // Trigger bot response
    simulateBotResponse(text);
  }, [simulateBotResponse]);

  return {
    messages,
    isTyping,
    sendMessage,
  };
}