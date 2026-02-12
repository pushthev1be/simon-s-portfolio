
import React from 'react';
import { PERSONAL_INFO } from '../constants';

const AboutMe: React.FC = () => {
  return (
    <section className="relative py-20">
      <div className="hud-corner hud-tl border-green-900"></div>
      <div className="hud-corner hud-br border-green-900"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center p-10 bg-green-500/[0.02]">
        <div className="relative group">
          <div className="absolute inset-0 bg-green-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative border-4 border-green-900 p-2 grayscale group-hover:grayscale-0 transition-all duration-700">
            <img 
              src="profile.jpg" 
              alt="Subject Asset" 
              className="w-full aspect-[4/5] object-cover"
              onError={(e) => (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Asset&background=000&color=22c55e&size=512'}
            />
            <div className="absolute top-4 left-4 bg-green-500 text-black px-2 py-1 text-[10px] font-black uppercase">
              Asset Record #712
            </div>
          </div>
        </div>

        <div className="space-y-8 font-mono">
          <h3 className="text-4xl font-black text-green-500 uppercase tracking-tighter">
            Mission Philosophy
          </h3>
          <p className="text-lg text-green-800 leading-relaxed font-bold border-l-4 border-green-500 pl-6">
            I don't write code to sit in repos. I build systems for impact. Mission success is defined by operational stability, high performance, and scalable architecture.
          </p>
          <div className="space-y-4 text-sm opacity-70">
            <p>Subject excels in Backend Logic, System Orchestration, and Web3 Integration (Solana Spec).</p>
            <p>Clearance level allows for rapid deployment on AWS, Render, and Distributed Nodes.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-green-900 p-4">
              <div className="text-green-500 font-black text-xl">IMPACT</div>
              <div className="text-[10px] uppercase opacity-50">Real-world value generation</div>
            </div>
            <div className="border border-green-900 p-4">
              <div className="text-green-500 font-black text-xl">LOGIC</div>
              <div className="text-[10px] uppercase opacity-50">Systems over syntax</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
