'use client';

import { motion } from 'framer-motion';

const SystemArchitecture = () => {
  return (
    <div className="w-full h-[400px] glass glow-card rounded-3xl relative overflow-hidden flex items-center justify-center p-8 bg-white/5 border border-white/10 shadow-2xl">
       <div className="absolute top-6 left-6 text-[10px] font-mono text-[color:var(--accent)] tracking-[0.3em] opacity-80 uppercase font-bold">
          <span className="inline-block w-2 h-2 bg-[color:var(--accent)] rounded-full animate-pulse mr-2"></span>
          System Architecture Core
       </div>
       
       <div className="relative w-full max-w-lg h-full">
            {/* Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.path 
                    d="M 25% 50% L 50% 50%" 
                    stroke="var(--accent)" 
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    opacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
                 <motion.path 
                    d="M 50% 50% L 80% 25%" 
                    stroke="var(--accent-secondary)" 
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    opacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                />
                 <motion.path 
                    d="M 50% 50% L 80% 75%" 
                    stroke="var(--accent-tertiary)" 
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    opacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                />
                
                {/* Animated Data Packets */}
                <motion.circle r="4" fill="var(--accent)" filter="drop-shadow(0 0 4px var(--accent))">
                    <animateMotion 
                        path="M 25% 50% L 50% 50%" 
                        dur="1.5s" 
                        repeatCount="indefinite"
                    />
                </motion.circle>
                <motion.circle r="4" fill="var(--accent-secondary)" filter="drop-shadow(0 0 4px var(--accent-secondary))">
                    <animateMotion 
                        path="M 50% 50% L 80% 25%" 
                        dur="2s" 
                        repeatCount="indefinite"
                        begin="0.5s"
                    />
                </motion.circle>
                 <motion.circle r="4" fill="var(--accent-tertiary)" filter="drop-shadow(0 0 4px var(--accent-tertiary))">
                    <animateMotion 
                        path="M 50% 50% L 80% 75%" 
                        dur="2s" 
                        repeatCount="indefinite"
                        begin="0.5s"
                    />
                </motion.circle>
            </svg>

            {/* Nodes */}
            {/* Frontend */}
            <motion.div 
                className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="w-16 h-16 rounded-2xl bg-[color:var(--accent)]/10 border border-[color:var(--accent)]/40 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(99,102,241,0.3)] group cursor-default transition-all hover:scale-110">
                    <span className="text-2xl group-hover:animate-bounce">💻</span>
                </div>
                <span className="text-[10px] font-mono text-[color:var(--accent)] uppercase font-extrabold tracking-widest">Frontend</span>
            </motion.div>

             {/* Backend */}
             <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
            >
                <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-[0_0_40px_rgba(255,255,255,0.1)] z-10 group cursor-default transition-all hover:scale-110">
                    <span className="text-3xl group-hover:rotate-180 transition-transform duration-700">⚙️</span>
                </div>
                <span className="text-[10px] font-mono text-white uppercase font-extrabold tracking-widest">Brain</span>
            </motion.div>

            {/* AI */}
            <motion.div 
                className="absolute top-[25%] right-[10%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
            >
                <div className="w-14 h-14 rounded-full bg-[color:var(--accent-secondary)]/10 border border-[color:var(--accent-secondary)]/40 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(236,72,153,0.3)] group cursor-default transition-all hover:scale-110">
                    <span className="text-xl group-hover:scale-125 transition-transform">🧠</span>
                </div>
                <span className="text-[10px] font-mono text-[color:var(--accent-secondary)] uppercase font-extrabold tracking-widest">AI Agent</span>
            </motion.div>

            {/* DB */}
            <motion.div 
                className="absolute bottom-[25%] right-[10%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
            >
                <div className="w-14 h-14 rounded-full bg-[color:var(--accent-tertiary)]/10 border border-[color:var(--accent-tertiary)]/40 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.3)] group cursor-default transition-all hover:scale-110">
                    <span className="text-xl group-hover:scale-125 transition-transform">🗄️</span>
                </div>
                <span className="text-[10px] font-mono text-[color:var(--accent-tertiary)] uppercase font-extrabold tracking-widest">Memory</span>
            </motion.div>

       </div>
    </div>
  );
};

export default SystemArchitecture;
