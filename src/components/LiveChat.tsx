import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hi! I am CH Sagar's AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Network response was not ok');
      }

      const data = await response.json();
      const aiReply = data.choices[0]?.message?.content || "I'm sorry, I couldn't process that.";
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiReply }]);
    } catch (error: any) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: error.message || "An error occurred. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-lg hover:scale-105 transition-transform ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden h-[500px] max-h-[80vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#080808]">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full border border-black/20 dark:border-white/20 overflow-hidden">
                  <img src="https://i.ibb.co/gZD34s8T/Untitled-design.png" alt="AI Agent" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-black dark:text-white">AI Assistant</h3>
                  <span className="text-[9px] text-green-500 uppercase tracking-widest">● Online</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-[#0a0a0a]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded p-3 text-sm leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-black dark:bg-white text-white dark:text-black' 
                    : 'bg-slate-100 dark:bg-[#111] text-black dark:text-white border border-black/5 dark:border-white/5'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 dark:bg-[#111] p-3 rounded border border-black/5 dark:border-white/5 flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-black/50 dark:text-white/50" />
                    <span className="text-xs text-black/50 dark:text-white/50">Typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#080808]">
              <div className="flex items-center space-x-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 p-3 pr-10 text-sm focus:outline-none focus:border-black/30 dark:focus:border-white/30 text-black dark:text-white"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-1.5 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-indigo-500" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
