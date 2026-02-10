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
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

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

    // Register service worker with update handling
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registered:', registration);

          // Check for updates every hour
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000);

          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (!newWorker) return;

            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available
                setWaitingWorker(newWorker);
                setShowUpdatePrompt(true);
                console.log('🔄 New version available');
              }
            });
          });

          // Periodic cache cleanup (once per day)
          setInterval(() => {
            if (registration.active) {
              registration.active.postMessage({ type: 'CLEANUP_CACHES' });
              console.log('🧹 Triggered cache cleanup');
            }
          }, 24 * 60 * 60 * 1000);
        })
        .catch((error) => console.error('❌ SW registration failed:', error));

      // Listen for controller change (new SW activated)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('🔄 New service worker activated, reloading...');
        window.location.reload();
      });
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

  const handleUpdate = () => {
    if (!waitingWorker) return;

    // Send SKIP_WAITING message to waiting service worker
    waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    setShowUpdatePrompt(false);
  };

  const dismissUpdate = () => {
    setShowUpdatePrompt(false);
  };

  // Don't show if already dismissed
  useEffect(() => {
    if (localStorage.getItem('pwa-dismissed')) {
      setShowPrompt(false);
    }
  }, []);

  return (
    <AnimatePresence>
      {/* Install Prompt */}
      {showPrompt && deferredPrompt && (
        <motion.div
          key="install-prompt"
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

      {/* Update Prompt */}
      {showUpdatePrompt && (
        <motion.div
          key="update-prompt"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50"
        >
          <div className="glass rounded-2xl p-6 shadow-2xl border-2 border-[color:var(--accent)]/20 bg-[color:var(--background-secondary)]">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🔄</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2 text-[color:var(--foreground)]">Update Available</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  A new version of the app is available. Update now to get the latest features and improvements.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-gradient-button text-gray-900 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Update Now
                  </button>
                  <button
                    onClick={dismissUpdate}
                    className="px-4 py-2 glass rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-[color:var(--foreground)]"
                  >
                    Later
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
