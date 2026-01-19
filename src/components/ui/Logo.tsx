import React from 'react';

interface LogoProps {
  onClick?: () => void;
}

const NexbuildLogo: React.FC<LogoProps> = ({ onClick }) => (
  <div className="relative flex flex-col items-start gap-3 group cursor-pointer" onClick={onClick}>
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out">
        <rect x="2" y="2" width="36" height="36" rx="10" stroke="url(#logo_grad_border)" strokeWidth="0.2" className="opacity-20" />
        <path d="M11 29V11L29 29V11" stroke="url(#logo_grad_main)" strokeWidth="2.5" strokeLinecap="round" className="drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]" />
        <path d="M29 11L11 29" stroke="white" strokeWidth="0.2" strokeOpacity="0.1" />
        <defs>
          <linearGradient id="logo_grad_main" x1="11" y1="11" x2="29" y2="29" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="0.6" stopColor="#A855F7" />
            <stop offset="1" stopColor="#6366F1" />
          </linearGradient>
          <linearGradient id="logo_grad_border" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.4" />
            <stop offset="1" stopColor="#A855F7" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 bg-purple-600/5 blur-[20px] rounded-full opacity-50" />
    </div>
    <div className="flex flex-col space-y-1 opacity-40 group-hover:opacity-100 transition-opacity duration-700 ml-1">
      <span className="text-[10px] font-black text-white tracking-[0.5em] uppercase font-mono leading-none">GENESIS</span>
      <span className="text-[7px] font-bold text-gray-500 tracking-[0.3em] uppercase font-mono leading-none">ELITE PROTOCOL</span>
    </div>
  </div>
);

export default NexbuildLogo;
