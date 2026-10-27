'use client';

import React, { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

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
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-screen items-center justify-center bg-canvas p-4">
            <div className="glass w-full max-w-2xl rounded-[var(--radius-panel)] p-8 text-center md:p-12">
              <div className="mb-6">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-warn/10 text-warn">
                  <AlertTriangle className="h-7 w-7" />
                </div>
                <h1 className="mb-4 text-[1.75rem] font-bold text-ink md:text-[2rem]">
                  Oops! Something went wrong
                </h1>
                <p className="text-ink-muted">
                  {this.state.error?.message || 'An unexpected error occurred'}
                </p>
                <details className="mt-4 text-left">
                  <summary className="mb-2 cursor-pointer text-sm text-accent hover:underline">
                    Technical Details
                  </summary>
                  <pre className="max-h-40 overflow-auto rounded-lg bg-black/40 p-4 text-xs text-ink-muted">
                    {this.state.error?.stack}
                  </pre>
                </details>
              </div>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button
                  onClick={() => window.location.reload()}
                  className="rounded-xl bg-accent px-6 py-3 font-semibold text-accent-ink transition-colors hover:bg-accent-bright"
                >
                  Reload Page
                </button>
                <button
                  onClick={() => (window.location.href = '/')}
                  className="glass rounded-xl px-6 py-3 font-semibold text-ink transition-colors hover:bg-white/5"
                >
                  Go to Home
                </button>
              </div>

              <p className="mt-8 text-xs text-ink-subtle">
                If this problem persists, please contact support at{' '}
                <a
                  href="mailto:muhammadabdullah51700@gmail.com"
                  className="text-accent hover:underline"
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
