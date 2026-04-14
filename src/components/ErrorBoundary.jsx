import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-black text-red-500 font-mono p-10 flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold mb-4">Something went wrong.</h1>
                    <div className="bg-red-900/10 border border-red-500/20 p-6 rounded-lg max-w-3xl w-full overflow-auto">
                        <p className="text-xl font-bold mb-2">{this.state.error && this.state.error.toString()}</p>
                        <pre className="text-sm text-red-400 whitespace-pre-wrap">
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
