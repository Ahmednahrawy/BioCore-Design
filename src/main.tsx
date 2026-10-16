import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class RootErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('BioCore Design runtime error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px 20px', fontFamily: 'system-ui, sans-serif', maxWidth: '600px', margin: '40px auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>Application Reload Required</h2>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
            A client-side initialization update was caught. Please refresh the page to load the latest build.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '10px 20px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Refresh Website
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  );
}
