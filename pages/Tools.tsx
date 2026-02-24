
import React from 'react';
import { TOOLS } from '../constants';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Tools: React.FC = () => {
  return (
    <div className="min-h-screen py-16 overflow-hidden" data-testid="tools-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Essential AI Testing Stack</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            The modern QA landscape has evolved. These are the tools you need to master to stay ahead of the curve.
          </p>
        </motion.div>

        <div className="space-y-24" data-testid="tool-list">
          {TOOLS.map((tool, idx) => (
            <motion.div 
              key={tool.id} 
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`flex flex-col md:flex-row gap-12 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              data-testid={`tool-section-${tool.id}`}
            >
              <div className="flex-1 w-full">
                <div 
                  className="relative group bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-2xl p-8 border border-slate-100 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Visual Background Elements - Non-blocking */}
                  <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none overflow-hidden select-none">
                    <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px]" />
                    <motion.div 
                      animate={{ 
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 15, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                      className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 dark:bg-indigo-400/5 rounded-full blur-3xl"
                    />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-4xl filter drop-shadow-md" data-testid={`tool-icon-${tool.id}`}>{tool.icon}</span>
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" data-testid={`tool-name-${tool.id}`}>
                        {tool.name}
                      </h2>
                    </div>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                      {tool.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {tool.features.map((feature, i) => (
                        <li 
                          key={i} 
                          className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-4">
                      <Link 
                        to={tool.link}
                        data-testid={`tool-learn-more-${tool.id}`}
                        className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                      >
                        Learn {tool.name} <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                      {tool.relatedCourseId && (
                        <Link 
                          to={`/courses/${tool.relatedCourseId}`}
                          data-testid={`tool-course-link-${tool.id}`}
                          className="inline-flex items-center px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                        >
                          Recommended Course <BookOpen className="ml-2 w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 w-full">
                <div className="aspect-video bg-white/50 dark:bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="flex flex-col items-center gap-4 text-slate-400 dark:text-slate-500 font-medium z-10">
                     <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-full group-hover:scale-110 transition-transform duration-500">
                        <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
                     </div>
                     <span className="text-lg">Interactive Demo Coming Soon</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 text-center py-12 bg-indigo-600/5 dark:bg-indigo-600/10 rounded-3xl border border-indigo-100 dark:border-indigo-900/50"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Don't see your favorite tool?</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            We are constantly updating our list of essential tools. Suggest a tool to our community and we'll add a guide for it.
          </p>
          <button data-testid="suggest-tool-button" className="px-8 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200 hover:shadow-lg transition-all">
            Suggest a Tool
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Tools;
