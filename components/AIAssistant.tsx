
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
        model: 'gemini-2.0-flash',
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
    <div className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[400px] h-[520px] bg-white border-2 border-gray-200 shadow-xl shadow-gray-200/50 flex flex-col overflow-hidden" style={{ animation: 'fadeIn 0.2s ease-out' }}>
      {/* Header */}
      <div className="p-4 border-b-2 border-gray-100 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 flex items-center justify-center">
            <i className="fas fa-robot text-white text-xs"></i>
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Simon's AI Assistant</h4>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] text-gray-400 font-mono">Gemini-powered</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} aria-label="Close assistant" className="text-gray-400 hover:text-slate-900 transition-colors w-8 h-8 flex items-center justify-center border border-gray-200 hover:border-gray-400">
          <i className="fas fa-times text-xs" aria-hidden="true"></i>
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-3 bg-white">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-green-500 text-white'
                : 'bg-gray-50 text-gray-700 border border-gray-200'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-50 border border-gray-200 p-3 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t-2 border-gray-100 bg-gray-50">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Simon's tech stack..."
            className="w-full bg-white border-2 border-gray-200 pl-4 pr-12 py-3 text-sm font-mono focus:outline-none focus:border-green-500 transition-colors text-slate-900"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-green-500 hover:bg-green-600 disabled:bg-gray-200 text-white flex items-center justify-center transition-all"
          >
            <i className="fas fa-arrow-up text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
