import { useState, useCallback, useRef, useEffect } from 'react';
import { ApiService, BusinessApplicationResponse } from '../services/api';

interface MessageData {
  id: string;
  text: string;
  time: string;
  isOwn: boolean;
  isRead?: boolean;
  isDelivered?: boolean;
  hasAttachment?: boolean;
  attachmentType?: 'bank_statement' | 'itr_document';
  attachmentName?: string;
  apiResponse?: BusinessApplicationResponse;
  isError?: boolean;
}

export default function useChat() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messageIdRef = useRef(1);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const handleApiResponse = useCallback((response: BusinessApplicationResponse) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      let botResponse = "I understand. Let me help you with that.";
      let isError = false;
      
      if (response.success) {
        // Handle successful API response - prioritize 'response' field from backend
        if (response.response) {
          botResponse = response.response;
        } else if (response.message) {
          botResponse = response.message;
        } else if (response.data?.response) {
          botResponse = response.data.response;
        } else if (response.data?.message) {
          botResponse = response.data.message;
        } else {
          botResponse = "Thank you for your submission. I've received your information and will process it accordingly.";
        }
      } else if (response.error) {
        // Handle API error
        botResponse = `I'm sorry, there was an issue processing your request: ${response.error}`;
        isError = true;
      } else {
        botResponse = "I'm sorry, there was an unexpected issue. Please try again.";
        isError = true;
      }

      const newMessage: MessageData = {
        id: messageIdRef.current.toString(),
        text: botResponse,
        time: formatTime(new Date()),
        isOwn: false,
        apiResponse: response,
        isError,
      };

      setMessages(prev => [...prev, newMessage]);
      messageIdRef.current++;
    }, 1000 + Math.random() * 500);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
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

    // Simulate message delivery status
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

    // Send message to API
    try {
      const response = await ApiService.sendMessage(text);
      handleApiResponse(response);
    } catch (error) {
      console.error('Failed to send message:', error);
      handleApiResponse({
        success: false,
        error: 'Failed to send message. Please check your connection and try again.',
      });
    }
  }, [handleApiResponse]);

  const sendMessageWithFiles = useCallback(async (
    text: string, 
    bankStatement?: File, 
    itrDocument?: File
  ) => {
    const attachmentTypes: string[] = [];
    const attachmentNames: string[] = [];
    
    if (bankStatement) {
      attachmentTypes.push('bank_statement');
      attachmentNames.push(bankStatement.name);
    }
    if (itrDocument) {
      attachmentTypes.push('itr_document');
      attachmentNames.push(itrDocument.name);
    }

    const newMessage: MessageData = {
      id: messageIdRef.current.toString(),
      text: text || 'Sent files',
      time: formatTime(new Date()),
      isOwn: true,
      isDelivered: false,
      isRead: false,
      hasAttachment: attachmentTypes.length > 0,
      attachmentType: attachmentTypes[0] as 'bank_statement' | 'itr_document',
      attachmentName: attachmentNames.join(', '),
    };

    setMessages(prev => [...prev, newMessage]);
    messageIdRef.current++;

    // Simulate message delivery status
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

    // Send message with files to API
    try {
      const response = await ApiService.sendMessageWithFiles(text, bankStatement, itrDocument);
      handleApiResponse(response);
    } catch (error) {
      console.error('Failed to send message with files:', error);
      handleApiResponse({
        success: false,
        error: 'Failed to send files. Please check your connection and try again.',
      });
    }
  }, [handleApiResponse]);

  // Manual chat initialization
  const startChat = useCallback(async () => {
    if (!chatStarted) {
      setChatStarted(true);
      
      // Add user's "hi" message to chat history
      const userMessage: MessageData = {
        id: messageIdRef.current.toString(),
        text: 'Hi',
        time: formatTime(new Date()),
        isOwn: true,
        isDelivered: false,
        isRead: false,
      };

      setMessages(prev => [...prev, userMessage]);
      messageIdRef.current++;

      // Mark as delivered and read
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === userMessage.id 
              ? { ...msg, isDelivered: true }
              : msg
          )
        );
      }, 1000);

      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === userMessage.id 
              ? { ...msg, isRead: true }
              : msg
          )
        );
      }, 2000);

      // Send to API
      try {
        const response = await ApiService.sendMessage('hi');
        handleApiResponse(response);
      } catch (error) {
        console.error('Failed to start chat:', error);
        handleApiResponse({
          success: false,
          error: 'Failed to start chat. Please check your connection and try again.',
        });
      }
    }
  }, [chatStarted, handleApiResponse, formatTime]);

  // Reset chat function
  const resetChat = useCallback(async () => {
    setMessages([]);
    setChatStarted(false);
    messageIdRef.current = 1;
    
    // Send reset command to API
    try {
      const response = await ApiService.sendMessage('reset');
      // Don't handle the response here, let user manually start chat again
    } catch (error) {
      console.error('Failed to reset chat:', error);
    }
  }, []);

  return {
    messages,
    isTyping,
    chatStarted,
    sendMessage,
    sendMessageWithFiles,
    startChat,
    resetChat,
  };
}