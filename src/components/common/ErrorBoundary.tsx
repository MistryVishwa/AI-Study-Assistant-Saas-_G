import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "Something went wrong. Please try again later.";
      
      try {
        // Check if it's our custom Firestore error
        const firestoreError = JSON.parse(this.state.error?.message || "");
        if (firestoreError.error) {
          errorMessage = `Database Error: ${firestoreError.error}`;
          if (firestoreError.error.includes('Missing or insufficient permissions')) {
            errorMessage = "You don't have permission to perform this action. Please check your account settings.";
          }
        }
      } catch (e) {
        // Not a JSON error, use default
      }

      return (
        <div className="min-h-screen bg-edu-black flex items-center justify-center p-8">
          <div className="glass p-12 rounded-[40px] max-w-lg w-full text-center space-y-6 border-red-400/20">
            <div className="w-20 h-20 bg-red-400/10 text-red-400 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl font-bold">!</span>
            </div>
            <h2 className="text-2xl font-bold">Oops! Something went wrong</h2>
            <p className="text-white/40 leading-relaxed">{errorMessage}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-gold px-8 py-3 rounded-2xl"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
