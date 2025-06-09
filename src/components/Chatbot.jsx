import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const predefinedResponses = {
  "hello": "Hello! How can I assist you with Nexpert Hub today?",
  "hi": "Hi there! What can I help you find on Nexpert Hub?",
  "how are you": "I'm doing great, ready to help you navigate Nexpert Hub!",
  "what is nexpert hub": "Nexpert Hub is a platform connecting users with skilled professionals for various services.",
  "services": "We offer a wide range of services including web development, digital marketing, graphic design, and more. You can browse all services on our homepage!",
  "how to find a service": "You can search for services on the homepage or browse through categories. What are you looking for?",
  "become a nexpert": "Interested in offering your skills? Click on 'Become a Nexpert' in the navigation bar to register as a service provider!",
  "pricing": "Pricing varies by service. Each service listing shows its price, either fixed or hourly.",
  "support": "If you need further assistance, you can contact our support team through the contact page (not yet implemented) or ask me more specific questions!",
  "bye": "Goodbye! Feel free to reach out if you have more questions."
};

const getBotResponse = async (message) => {
  const lowerMessage = message.toLowerCase();
  for (const keyword in predefinedResponses) {
    if (lowerMessage.includes(keyword)) {
      return predefinedResponses[keyword];
    }
  }
  
  // Simulate a more complex AI response with a delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("I'm still learning! For complex queries, please explore the site or contact support. Can I help with anything else specific, like finding services or becoming a Nexpert?");
    }, 1000);
  });
};

export function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to Nexpert Hub! How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const botResponseText = await getBotResponse(input);
    const botMessage = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
    
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="w-[350px] h-[500px] shadow-2xl rounded-xl bg-gradient-to-br from-gray-50 to-blue-100 border-purple-300 flex flex-col overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex flex-row items-center justify-between">
          <div className="flex items-center">
            <Bot className="w-6 h-6 mr-2" />
            <CardTitle className="text-lg font-semibold">Nexpert Assistant</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-grow p-0 overflow-hidden">
          <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex mb-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {message.sender === 'bot' && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center mr-2">
                        <Bot size={18} />
                      </div>
                    )}
                     {message.sender === 'user' && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center ml-2">
                        <User size={18} />
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white rounded-br-none'
                          : 'bg-white text-gray-700 border border-purple-200 rounded-bl-none shadow-md'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                className="flex justify-start mb-3 items-center"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center mr-2">
                  <Bot size={18} />
                </div>
                <div className="p-3 rounded-2xl bg-white text-gray-700 border border-purple-200 rounded-bl-none shadow-md">
                  <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
                </div>
              </motion.div>
            )}
          </ScrollArea>
        </CardContent>
        
        <CardFooter className="p-4 border-t border-purple-200 bg-white/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow border-purple-300 focus:border-purple-500"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" className="bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </motion.div>
  );
}