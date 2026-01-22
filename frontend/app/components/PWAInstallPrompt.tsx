'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Show prompt after 3 seconds
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => console.log('SW registered:', registration))
        .catch((error) => console.log('SW registration failed:', error));
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('PWA installed');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-dismissed', 'true');
  };

  // Don't show if already dismissed
  useEffect(() => {
    if (localStorage.getItem('pwa-dismissed')) {
      setShowPrompt(false);
    }
  }, []);

  return (
    <AnimatePresence>
      {showPrompt && deferredPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50"
        >
          <div className="glass rounded-2xl p-6 shadow-2xl border-2 border-[color:var(--accent)]/20">
            <div className="flex items-start gap-4">
              <div className="text-4xl">📱</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">Install Portfolio App</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Install this app on your device for quick access and offline viewing!
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleInstall}
                    className="px-4 py-2 bg-[color:var(--accent)] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Install
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="px-4 py-2 glass rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
