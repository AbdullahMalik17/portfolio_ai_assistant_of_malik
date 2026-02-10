'use client';

import { useEffect } from 'react';

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
    <div className="min-h-screen flex items-center justify-center bg-[color:var(--background)] p-4">
      <div className="glass rounded-3xl p-8 md:p-12 max-w-2xl w-full text-center">
        <div className="mb-6">
          <div className="text-6xl mb-4">🔧</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[color:var(--foreground)] mb-4">
            Page Error
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            {error.message || 'Something went wrong while loading this page'}
          </p>
          {error.digest && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-button text-gray-900 rounded-xl font-semibold hover:scale-105 transition-all hover:shadow-lg hover:shadow-[color:var(--accent)]/30"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 glass border border-[color:var(--accent)]/20 hover:border-[color:var(--accent)]/40 rounded-xl font-semibold transition-all hover:scale-105"
          >
            Go to Home
          </button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-8">
          If this problem persists, try clearing your browser cache or contact support.
        </p>
      </div>
    </div>
  );
}
