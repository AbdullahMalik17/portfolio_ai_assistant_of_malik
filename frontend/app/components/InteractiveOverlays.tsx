'use client';

import dynamic from 'next/dynamic';

// None of these render anything until the visitor opens them, so they are kept
// out of the shared bundle and fetched on first hydration instead.
const CommandPalette = dynamic(() => import('./CommandPalette'), { ssr: false });
const DeveloperTerminal = dynamic(() => import('./DeveloperTerminal'), { ssr: false });
const ContextMenu = dynamic(() => import('./ContextMenu'), { ssr: false });
const PWAInstallPrompt = dynamic(() => import('./PWAInstallPrompt'), { ssr: false });

export default function InteractiveOverlays() {
  return (
    <>
      <CommandPalette />
      <DeveloperTerminal />
      <ContextMenu />
      <PWAInstallPrompt />
    </>
  );
}
