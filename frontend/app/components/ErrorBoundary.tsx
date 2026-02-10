'use client';

import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // You can also log to an error reporting service like Sentry here
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-[color:var(--background)] p-4">
            <div className="glass rounded-3xl p-8 md:p-12 max-w-2xl w-full text-center">
              <div className="mb-6">
                <div className="text-6xl mb-4">⚠️</div>
                <h1 className="text-3xl md:text-4xl font-bold text-[color:var(--foreground)] mb-4">
                  Oops! Something went wrong
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  {this.state.error?.message || 'An unexpected error occurred'}
                </p>
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-sm text-[color:var(--accent)] hover:underline mb-2">
                    Technical Details
                  </summary>
                  <pre className="text-xs bg-[color:var(--background-secondary)] p-4 rounded-lg overflow-auto max-h-40 text-gray-400">
                    {this.state.error?.stack}
                  </pre>
                </details>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-gradient-button text-gray-900 rounded-xl font-semibold hover:scale-105 transition-all hover:shadow-lg hover:shadow-[color:var(--accent)]/30"
                >
                  Reload Page
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-3 glass border border-[color:var(--accent)]/20 hover:border-[color:var(--accent)]/40 rounded-xl font-semibold transition-all hover:scale-105"
                >
                  Go to Home
                </button>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-8">
                If this problem persists, please contact support at{' '}
                <a
                  href="mailto:muhammadabdullah51700@gmail.com"
                  className="text-[color:var(--accent)] hover:underline"
                >
                  muhammadabdullah51700@gmail.com
                </a>
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
