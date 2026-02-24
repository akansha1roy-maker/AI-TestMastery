
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Cpu, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { COURSES } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen" data-testid="home-page">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100/80 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-semibold tracking-wide uppercase mb-6 backdrop-blur-sm">
                The Future of QA is Here
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6" data-testid="hero-title">
                Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">AI-Powered</span> Testing
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
                Learn to build self-healing test suites, deploy autonomous agents with TestSprite, and integrate MCP workflows. Upgrade your QA career today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/tools"
                  data-testid="cta-tools"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  View Tool Guides
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/playground"
                  data-testid="cta-playground"
                  className="inline-flex items-center justify-center px-8 py-4 border border-slate-200 dark:border-slate-700 text-lg font-medium rounded-xl text-slate-700 dark:text-slate-200 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 backdrop-blur-sm transition-all shadow-sm hover:shadow-md"
                >
                  <Play className="ml-2 w-5 h-5 mr-2" />
                  Try AI Playground
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 bg-slate-50/30 dark:bg-slate-900/30" data-testid="value-props">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-100 dark:border-slate-700 hover:border-indigo-100 dark:hover:border-indigo-800 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mb-6">
                <Zap className="text-emerald-600 dark:text-emerald-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Velocity & Stability</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Move beyond flaky Selenium scripts. Learn Playwright for rock-solid execution and auto-waiting mechanisms.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-100 dark:border-slate-700 hover:border-indigo-100 dark:hover:border-indigo-800 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center mb-6">
                <Cpu className="text-violet-600 dark:text-violet-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Autonomous Agents</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Deploy TestSprite agents that explore your UI, find edge cases, and report bugs without writing a single line of test code.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-100 dark:border-slate-700 hover:border-indigo-100 dark:hover:border-indigo-800 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-6">
                <Shield className="text-indigo-600 dark:text-indigo-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Future-Proof Skills</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Master MCP (Model Context Protocol) to build custom tooling that connects LLMs directly to your CI/CD pipeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Preview */}
      <section className="py-24" data-testid="featured-courses">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Learning Paths</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">Start your journey with our most popular modules.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.slice(0, 3).map((course) => (
              <Link key={course.id} to={`/courses/${course.id}`} data-testid={`course-card-${course.id}`} className="group block h-full">
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800">
                  <div className="h-48 overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex gap-2 mb-3">
                      <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold">{course.difficulty}</span>
                      <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold">{course.duration}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{course.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">{course.description}</p>
                    <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                      Start Module <ArrowRight className="ml-1 w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
