'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Smartphone } from 'lucide-react';

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
    <div className="fixed bottom-4 left-4 right-4 z-40 flex flex-col gap-3 md:right-auto md:w-[22rem]">
      <AnimatePresence initial={false}>
        {showPrompt && deferredPrompt && (
          <motion.div
            key="install-prompt"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            className="glass rounded-[var(--radius-card)] p-5"
          >
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Smartphone className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1.5 text-[15px] font-semibold text-ink">Install Portfolio App</h3>
                <p className="mb-4 text-sm text-ink-muted">
                  Add this to your device for quick access and offline viewing.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleInstall}
                    className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-bright"
                  >
                    Install
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {showUpdatePrompt && (
          <motion.div
            key="update-prompt"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            className="glass rounded-[var(--radius-card)] p-5"
          >
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ok/10 text-ok">
                <RefreshCw className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1.5 text-[15px] font-semibold text-ink">Update Available</h3>
                <p className="mb-4 text-sm text-ink-muted">
                  A new version is ready. Update to get the latest work and improvements.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdate}
                    className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-bright"
                  >
                    Update Now
                  </button>
                  <button
                    onClick={dismissUpdate}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
                  >
                    Later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
