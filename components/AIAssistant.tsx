
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, PROJECTS, SKILLS, EXPERIENCE } from '../constants';
import { Message } from '../types';

interface AIAssistantProps {
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Simon's AI assistant. I can answer questions about his technical skills, projects, or background. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemPrompt = `
        You are an AI recruiter/assistant for Simon Abayomi Olawuyi.
        Here is his resume data:
        Summary: ${PERSONAL_INFO.summary}
        Skills: ${JSON.stringify(SKILLS)}
        Projects: ${JSON.stringify(PROJECTS)}
        Experience: ${JSON.stringify(EXPERIENCE)}
        
        Your tone: Professional, enthusiastic, helpful, and technically savvy.
        Guidelines:
        - Only answer questions related to Simon's professional profile.
        - If asked about contact info, provide ${PERSONAL_INFO.email}.
        - Keep answers concise but informative.
        - Highlight his experience with AI, Blockchain, and Full-Stack development.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, userMessage].map(m => m.content).join('\n'),
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      const aiText = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting right now. Please try again or email Simon directly at " + PERSONAL_INFO.email }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[400px] h-[500px] bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
      {/* Header */}
      <div className="p-4 bg-gray-950 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
            <i className="fas fa-robot text-green-500 text-xs"></i>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Simon's Assistant</h4>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              <span className="text-[10px] text-gray-500">Powered by Gemini</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-green-600 text-white rounded-tr-none' 
                : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700/50 shadow-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-gray-400 p-3 rounded-2xl rounded-tl-none border border-gray-700/50 shadow-sm flex items-center gap-1">
              <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"></span>
              <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-800 bg-gray-950/50">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Simon's tech stack..."
            className="w-full bg-gray-900 border border-gray-800 rounded-full pl-5 pr-12 py-3 text-sm focus:outline-none focus:border-green-500/50 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-green-600 hover:bg-green-500 disabled:bg-gray-800 text-white rounded-full flex items-center justify-center transition-all"
          >
            <i className="fas fa-arrow-up text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
