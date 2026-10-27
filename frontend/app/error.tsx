'use client';

import { useEffect } from 'react';
import { Wrench } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas p-4">
      <div className="glass w-full max-w-2xl rounded-[var(--radius-panel)] p-8 text-center md:p-12">
        <div className="mb-6">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <Wrench className="h-7 w-7" />
          </div>
          <h1 className="mb-4 text-[1.75rem] font-bold text-ink md:text-[2rem]">
            Page Error
          </h1>
          <p className="text-ink-muted">
            {error.message || 'Something went wrong while loading this page'}
          </p>
          {error.digest && (
            <p className="mt-2 font-mono text-xs text-ink-subtle">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={reset}
            className="rounded-xl bg-accent px-6 py-3 font-semibold text-accent-ink transition-colors hover:bg-accent-bright"
          >
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="glass rounded-xl px-6 py-3 font-semibold text-ink transition-colors hover:bg-white/5"
          >
            Go to Home
          </button>
        </div>

        <p className="mt-8 text-xs text-ink-subtle">
          If this problem persists, try clearing your browser cache or contact support.
        </p>
      </div>
    </div>
  );
}
