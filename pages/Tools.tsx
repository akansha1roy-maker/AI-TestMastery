
import React from 'react';
import { TOOLS } from '../constants';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Tools: React.FC = () => {
  return (
    <div className="min-h-screen py-16 overflow-hidden">
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

        <div className="space-y-24">
          {TOOLS.map((tool, idx) => (
            <motion.div 
              key={tool.id} 
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`flex flex-col md:flex-row gap-12 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 w-full">
                <motion.div 
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative group bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-2xl p-8 border border-slate-100 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Subtle Background Animation Pattern */}
                  <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px] animate-[pulse_8s_infinite]" />
                    <motion.div 
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 20, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                      className="absolute -top-1/2 -left-1/2 w-full h-full border border-indigo-500/20 rounded-full"
                    />
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <motion.span 
                        whileHover={{ rotate: 15, scale: 1.2 }}
                        className="text-4xl filter drop-shadow-md"
                      >
                        {tool.icon}
                      </motion.span>
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {tool.name}
                      </h2>
                    </div>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                      {tool.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {tool.features.map((feature, i) => (
                        <motion.li 
                          key={i} 
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-4">
                      <Link 
                        to={tool.link}
                        className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                      >
                        Learn {tool.name} <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                      {tool.relatedCourseId ? (
                        <Link 
                          to={`/courses/${tool.relatedCourseId}`}
                          className="inline-flex items-center px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                        >
                          Recommended Course <BookOpen className="ml-2 w-4 h-4" />
                        </Link>
                      ) : (
                        <button className="inline-flex items-center px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-600 rounded-xl font-medium cursor-not-allowed transition-colors">
                          Docs Unavailable <ExternalLink className="ml-2 w-4 h-4 opacity-50" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="flex-1 w-full">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="aspect-video bg-white/50 dark:bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {/* Decorative Tech Background */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity" />
                  
                  <div className="flex flex-col items-center gap-4 text-slate-400 dark:text-slate-500 font-medium z-10">
                     <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-full group-hover:scale-110 transition-transform duration-500">
                        <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
                     </div>
                     <span className="text-lg">Interactive Demo Coming Soon</span>
                  </div>

                  {/* Animated corner decorations */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-indigo-500/0 group-hover:border-indigo-500/40 transition-all duration-500 rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-indigo-500/0 group-hover:border-indigo-500/40 transition-all duration-500 rounded-bl-2xl" />

                  {/* Decorative blobs from Home page logic */}
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      x: [0, 20, 0],
                      y: [0, -20, 0]
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-200 dark:bg-indigo-600 rounded-full blur-3xl opacity-30 dark:opacity-10 group-hover:opacity-50 transition-opacity" 
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 text-center py-12 bg-indigo-600/5 dark:bg-indigo-600/10 rounded-3xl border border-indigo-100 dark:border-indigo-900/50"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Don't see your favorite tool?</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            We are constantly updating our list of essential tools. Suggest a tool to our community and we'll add a guide for it.
          </p>
          <button className="px-8 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200 hover:shadow-lg transition-all">
            Suggest a Tool
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Tools;
