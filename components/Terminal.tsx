
import React, { useState, useRef, useEffect } from 'react';
import { PROJECTS, SKILLS, PERSONAL_INFO, EXPERIENCE } from '../constants';

interface TerminalProps {
  onExit: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ onExit }) => {
  const [history, setHistory] = useState<string[]>([
    "Welcome to SimonOS v1.0.0 (tty1)",
    "Type 'help' to see available commands.",
    ""
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let response: string[] = [];

    switch (cleanCmd) {
      case 'help':
        response = [
          "Available commands:",
          "  about    - Show Simon's summary",
          "  projects - List production-deployed projects",
          "  skills   - Display technical stack",
          "  exp      - Professional experience",
          "  clear    - Clear terminal screen",
          "  exit     - Return to graphical interface",
          "  whoami   - Display contact details"
        ];
        break;
      case 'about':
        response = [PERSONAL_INFO.summary];
        break;
      case 'projects':
        response = PROJECTS.flatMap(p => [
          `> ${p.title.toUpperCase()}`,
          `  ${p.description}`,
          `  Stack: ${p.tags.join(', ')}`,
          p.link ? `  URL: ${p.link}` : "",
          ""
        ]);
        break;
      case 'skills':
        response = SKILLS.flatMap(s => [
          `${s.category}:`,
          `  ${s.items.join(', ')}`,
          ""
        ]);
        break;
      case 'exp':
        response = EXPERIENCE.flatMap(e => [
          `${e.role} @ ${e.company} (${e.period})`,
          ...e.bullets.map(b => `  - ${b}`),
          ""
        ]);
        break;
      case 'whoami':
        response = [
          `Name: ${PERSONAL_INFO.name}`,
          `Role: ${PERSONAL_INFO.title}`,
          `Email: ${PERSONAL_INFO.email}`,
          `Loc: ${PERSONAL_INFO.location}`
        ];
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        onExit();
        return;
      case '':
        break;
      default:
        response = [`Command not found: ${cleanCmd}. Type 'help' for options.`];
    }

    setHistory(prev => [...prev, `simon@portfolio:~$ ${cmd}`, ...response, ""]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#030712] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[80vh] bg-black rounded-lg border border-gray-800 shadow-2xl flex flex-col overflow-hidden relative">
        <div className="scanline"></div>

        {/* Header */}
        <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-800">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Terminal Session — Simon Olawuyi</span>
          <button onClick={onExit} className="text-gray-500 hover:text-white transition-colors">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Terminal Body */}
        <div
          ref={scrollRef}
          className="flex-grow p-6 font-mono text-sm text-green-500 overflow-y-auto overflow-x-hidden selection:bg-green-500/20"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, i) => (
            <div key={i} className="mb-1 whitespace-pre-wrap">
              {line}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex mt-2">
            <span className="mr-2 opacity-80">simon@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow bg-transparent outline-none border-none caret-green-500"
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
