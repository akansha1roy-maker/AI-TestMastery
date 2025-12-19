
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { TOOLS, COURSES } from '../constants';
import { ArrowLeft, CheckCircle, ExternalLink, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const ToolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tool = TOOLS.find(t => t.id === id);

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-transparent text-slate-900 dark:text-white transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-4">Tool not found</h2>
        <Link to="/tools" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>
      </div>
    );
  }

  const relatedCourse = tool.relatedCourseId ? COURSES.find(c => c.id === tool.relatedCourseId) : null;

  // Simple Markdown-ish parser for summary content
  const renderContent = (content?: string) => {
    if (!content) return null;
    return content.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('* ')) {
        return (
            <li key={index} className="ml-4 flex items-start gap-2 text-slate-700 dark:text-slate-300 mb-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0"></span>
                <span>{line.replace('* ', '')}</span>
            </li>
        );
      }
       if (line.match(/^\d\./)) {
         return (
            <div key={index} className="ml-4 mb-2 text-slate-700 dark:text-slate-300">
               {line}
            </div>
         )
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen pb-20 transition-colors duration-300">
      {/* Hero Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/tools" className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
            </Link>
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-5xl shadow-sm border border-slate-100 dark:border-slate-700">
                    {tool.icon}
                </div>
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">{tool.name}</h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400">{tool.description}</p>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none">
                    {renderContent(tool.summaryContent)}
                </article>

                <div className="mt-12 p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur rounded-xl border border-slate-100 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Why we recommend it</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {tool.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                            {feature}
                        </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-1 space-y-6">
                <div className="sticky top-24">
                     {relatedCourse && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-xl shadow-lg border border-indigo-100 dark:border-indigo-900 overflow-hidden"
                        >
                            <div className="h-32 bg-indigo-600 relative overflow-hidden">
                                <img src={relatedCourse.image} alt={relatedCourse.title} className="w-full h-full object-cover opacity-50" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="bg-white/20 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Recommended Course</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{relatedCourse.title}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">{relatedCourse.description}</p>
                                <Link 
                                    to={`/courses/${relatedCourse.id}`}
                                    className="block w-full text-center py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                                >
                                    Start Learning
                                </Link>
                            </div>
                        </motion.div>
                     )}

                    <div className="mt-6">
                         <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">External Resources</h4>
                         
                         {tool.docLink ? (
                            <a href={tool.docLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800 transition-colors mb-2 text-slate-700 dark:text-slate-300 text-sm border border-slate-100 dark:border-slate-800 group">
                                <span className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Official Documentation</span>
                                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                            </a>
                         ) : (
                            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100 dark:bg-slate-800/30 text-slate-400 dark:text-slate-600 text-sm border border-slate-100 dark:border-slate-800 mb-2 cursor-not-allowed">
                                <span>Official Documentation</span>
                                <ExternalLink className="w-4 h-4 opacity-50" />
                            </div>
                         )}

                         {tool.repoLink ? (
                             <a href={tool.repoLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 text-sm border border-slate-100 dark:border-slate-800 group">
                                <span className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">GitHub Repository</span>
                                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                             </a>
                         ) : (
                            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100 dark:bg-slate-800/30 text-slate-400 dark:text-slate-600 text-sm border border-slate-100 dark:border-slate-800 cursor-not-allowed">
                                <span>GitHub Repository</span>
                                <ExternalLink className="w-4 h-4 opacity-50" />
                            </div>
                         )}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetail;
