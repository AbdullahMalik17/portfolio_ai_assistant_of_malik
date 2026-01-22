'use client';

import { motion } from 'framer-motion';

const SystemArchitecture = () => {
  return (
    <div className="w-full h-[300px] glass rounded-2xl relative overflow-hidden flex items-center justify-center p-8 bg-black/5 dark:bg-black/20 border border-white/10 shadow-inner">
       <div className="absolute top-4 left-4 text-[10px] font-mono text-gray-400 tracking-widest opacity-50 uppercase">
          System Architecture View
       </div>
       
       <div className="relative w-full max-w-lg h-full">
            {/* Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.path 
                    d="M 25% 50% L 50% 50%" 
                    stroke="rgba(59, 130, 246, 0.2)" 
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
                 <motion.path 
                    d="M 50% 50% L 80% 25%" 
                    stroke="rgba(168, 85, 247, 0.2)" 
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                />
                 <motion.path 
                    d="M 50% 50% L 80% 75%" 
                    stroke="rgba(249, 115, 22, 0.2)" 
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                />
                
                {/* Animated Data Packets */}
                <motion.circle r="3" fill="#3b82f6" filter="blur(1px)">
                    <animateMotion 
                        path="M 25% 50% L 50% 50%" 
                        dur="2s" 
                        repeatCount="indefinite"
                    />
                </motion.circle>
                <motion.circle r="3" fill="#a855f7" filter="blur(1px)">
                    <animateMotion 
                        path="M 50% 50% L 80% 25%" 
                        dur="2.5s" 
                        repeatCount="indefinite"
                        begin="0.5s"
                    />
                </motion.circle>
                 <motion.circle r="3" fill="#f97316" filter="blur(1px)">
                    <animateMotion 
                        path="M 50% 50% L 80% 75%" 
                        dur="2.5s" 
                        repeatCount="indefinite"
                        begin="0.5s"
                    />
                </motion.circle>
            </svg>

            {/* Nodes */}
            {/* Frontend */}
            <motion.div 
                className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    <span className="text-xl">💻</span>
                </div>
                <span className="text-[10px] font-mono text-blue-500/80 uppercase font-bold tracking-tighter">Next.js</span>
            </motion.div>

             {/* Backend */}
             <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
            >
                <div className="w-16 h-16 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.2)] z-10">
                    <span className="text-2xl">⚙️</span>
                </div>
                <span className="text-[10px] font-mono text-green-500/80 uppercase font-bold tracking-tighter">FastAPI</span>
            </motion.div>

            {/* AI */}
            <motion.div 
                className="absolute top-[25%] right-[10%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
            >
                <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    <span className="text-lg">🧠</span>
                </div>
                <span className="text-[10px] font-mono text-purple-500/80 uppercase font-bold tracking-tighter">Gemini</span>
            </motion.div>

            {/* DB */}
            <motion.div 
                className="absolute bottom-[25%] right-[10%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
            >
                <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                    <span className="text-lg">🗄️</span>
                </div>
                <span className="text-[10px] font-mono text-orange-500/80 uppercase font-bold tracking-tighter">Vector DB</span>
            </motion.div>

       </div>
    </div>
  );
};

export default SystemArchitecture;
