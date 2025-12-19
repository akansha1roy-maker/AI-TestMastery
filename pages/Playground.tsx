
import React, { Component, useState, useEffect, useRef, ReactNode, ErrorInfo } from 'react';
import { Play, RotateCcw, AlertTriangle, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { generateTestAdvice } from '../services/gemini';
import { TestLog } from '../types';

// Custom Error Boundary Component
interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Fixed ErrorBoundary by using React.Component explicitly to ensure that
// properties like setState and props are correctly inherited and recognized by the TypeScript compiler.
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Using property initializer for state instead of constructor to ensure it is correctly associated with the type
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Playground Error Boundary caught an error:", error, errorInfo);
  }

  // Handle retry logic to reset state and attempt re-render
  // Added comment: Fixed inheritance visibility for setState
  handleRetry = () => {
    // Accessing setState from base Component class to clear error state
    this.setState({ hasError: false, error: null });
  };

  render() {
    // Accessing state from base Component class
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-slate-900 text-slate-300 p-8">
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl flex flex-col items-center max-w-lg w-full text-center">
            <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Simulation Error</h2>
            <p className="text-slate-400 mb-6">
              Something went wrong while rendering the playground environment.
            </p>
            
            {this.state.error && (
              <div className="w-full bg-black/50 rounded-lg p-4 mb-6 text-left overflow-auto max-h-40 border border-slate-700">
                <code className="text-xs font-mono text-red-400 break-words">
                  {this.state.error.toString()}
                </code>
              </div>
            )}

            <button
              onClick={this.handleRetry}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reload Environment
            </button>
          </div>
        </div>
      );
    }

    // Accessing props from base Component class to render children
    // Added comment: Fixed inheritance visibility for props
    return this.props.children;
  }
}

const Playground: React.FC = () => {
  const [code, setCode] = useState(`import { test, expect } from '@playwright/test';

test('AI generated login test', async ({ page }) => {
  await page.goto('https://example.com/login');
  
  // AI-resilient selector example
  await page.getByLabel('Email address').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');
  
  await page.getByRole('button', { name: 'Sign in' }).click();
  
  // Expect a dashboard header to be visible
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});`);

  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<TestLog[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const runTestSimulation = () => {
    setIsRunning(true);
    setLogs([]);
    setAiAnalysis(null);

    const steps = [
      { msg: 'Starting Playwright worker...', level: 'info', delay: 500 },
      { msg: 'Browser launched: chromium', level: 'info', delay: 1200 },
      { msg: 'Navigating to https://example.com/login', level: 'info', delay: 2000 },
      { msg: 'Waiting for selector "Email address"', level: 'info', delay: 2800 },
      { msg: 'Filled input "user@example.com"', level: 'success', delay: 3500 },
      { msg: 'Waiting for selector "Password"', level: 'info', delay: 3800 },
      { msg: 'Filled input "***"', level: 'success', delay: 4200 },
      { msg: 'Clicking button "Sign in"', level: 'info', delay: 4800 },
      { msg: 'Waiting for navigation...', level: 'info', delay: 5500 },
      // Simulate a random failure for educational purposes
      { msg: 'Error: Timed out 5000ms waiting for expect(locator).toBeVisible()\nLocator: getByRole(\'heading\', { name: \'Dashboard\' })\nExpected: visible\nReceived: hidden', level: 'error', delay: 7000 },
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setIsRunning(false);
        return;
      }

      const step = steps[currentStep];
      setLogs(prev => [...prev, { 
        id: Date.now(), 
        timestamp: new Date().toLocaleTimeString(), 
        level: step.level as any, 
        message: step.msg 
      }]);

      currentStep++;
    }, 1000); 
  };

  const handleAskAI = async () => {
    if (logs.length === 0) return;
    setIsAnalyzing(true);
    
    // Find the error log
    const errorLog = logs.find(l => l.level === 'error');
    const errorMsg = errorLog ? errorLog.message : "No explicit error found in logs, but test failed.";

    const advice = await generateTestAdvice(code, errorMsg);
    setAiAnalysis(advice);
    setIsAnalyzing(false);
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-900 text-slate-300">
        {/* Toolbar */}
        <div className="h-14 bg-slate-800 border-b border-slate-700 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-indigo-400" />
              Playwright Simulator
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {setCode('// Write your test code here...'); setLogs([]); setAiAnalysis(null);}}
              className="p-2 hover:bg-slate-700 rounded-md text-slate-400 transition-colors" title="Reset Code"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button 
              disabled={isRunning}
              onClick={runTestSimulation}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md font-medium text-white transition-all ${
                isRunning ? 'bg-slate-600 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-emerald-900/50'
              }`}
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running...' : 'Run Test'}
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Editor Area */}
          <div className="flex-1 border-r border-slate-700 flex flex-col min-h-[50%] md:min-h-0">
            <div className="bg-slate-800/50 px-4 py-2 text-xs font-mono text-slate-500 border-b border-slate-700">test.spec.ts</div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-slate-900 p-4 font-mono text-sm text-slate-100 resize-none focus:outline-none leading-relaxed"
              spellCheck="false"
            />
          </div>

          {/* Console / Output Area */}
          <div className="flex-1 flex flex-col min-h-[50%] md:min-h-0 bg-black">
            <div className="bg-slate-800/50 px-4 py-2 text-xs font-mono text-slate-500 border-b border-slate-700 flex justify-between items-center">
              <span>Console Output</span>
              {logs.some(l => l.level === 'error') && !isRunning && (
                <button 
                  onClick={handleAskAI}
                  disabled={isAnalyzing}
                  className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  <Sparkles className="w-3 h-3" />
                  {isAnalyzing ? 'Analyzing...' : 'Ask AI to Fix'}
                </button>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-2">
              {logs.length === 0 && !isRunning && (
                <div className="text-slate-600 italic">Ready to execute tests...</div>
              )}
              
              {logs.map((log) => (
                <div key={log.id} className="flex gap-2 animate-fadeIn">
                  <span className="text-slate-500">[{log.timestamp}]</span>
                  <span className={`
                    ${log.level === 'error' ? 'text-red-400' : ''}
                    ${log.level === 'success' ? 'text-emerald-400' : ''}
                    ${log.level === 'warn' ? 'text-yellow-400' : ''}
                    ${log.level === 'info' ? 'text-slate-300' : ''}
                  `}>
                    {log.message}
                  </span>
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>

            {/* AI Analysis Panel */}
            {aiAnalysis && (
               <div className="bg-slate-800 border-t border-slate-700 p-4 max-h-60 overflow-y-auto animate-slideUp">
                 <div className="flex items-center gap-2 mb-2 text-indigo-400 font-semibold text-sm">
                   <Sparkles className="w-4 h-4" />
                   AI Analysis
                 </div>
                 <div className="prose prose-invert prose-sm max-w-none text-slate-300">
                   {/* Simple markdown rendering for demo purposes */}
                   {aiAnalysis.split('\n').map((line, i) => (
                     <p key={i} className="mb-1">{line}</p>
                   ))}
                 </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Playground;
