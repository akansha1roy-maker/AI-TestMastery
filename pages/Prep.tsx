import React, { useState } from 'react';
import { INTERVIEW_QUESTIONS } from '../constants';
import { ChevronDown, ChevronUp, BookOpen, Filter, Search, Plus, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { InterviewQuestion } from '../types';

const Prep: React.FC = () => {
  // Initialize state with combination of local storage custom questions + default constants
  const [questions, setQuestions] = useState<InterviewQuestion[]>(() => {
    const saved = localStorage.getItem('ai_testmastery_custom_questions');
    const customQuestions = saved ? JSON.parse(saved) : [];
    // Ensure the newest static questions from constants are also included
    return [...customQuestions, ...INTERVIEW_QUESTIONS];
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);

  // Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newCategory, setNewCategory] = useState<InterviewQuestion['category']>('General');

  const categories = ['All', 'General', 'Playwright', 'AI Agents', 'Strategy', 'MCP'];
  const formCategories = ['General', 'Playwright', 'AI Agents', 'Strategy', 'MCP'];

  const filteredQuestions = questions.filter(q => {
    const matchesCategory = activeCategory === 'All' || q.category === activeCategory;
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          q.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleQuestion = (id: string) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    const newEntry: InterviewQuestion = {
      id: `custom-${Date.now()}`,
      question: newQuestion,
      answer: newAnswer,
      category: newCategory,
    };

    // Update State: Newest on top
    setQuestions(prev => [newEntry, ...prev]);

    // Update Local Storage (only persist the custom ones)
    const saved = localStorage.getItem('ai_testmastery_custom_questions');
    const currentCustom = saved ? JSON.parse(saved) : [];
    const updatedCustom = [newEntry, ...currentCustom];
    localStorage.setItem('ai_testmastery_custom_questions', JSON.stringify(updatedCustom));
    
    // Reset form
    setNewQuestion('');
    setNewAnswer('');
    setNewCategory('General');
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Interview Prep</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Master the most common questions for AI Testing & QA Automation roles.
          </p>
        </div>

        {/* Action Bar: Search & Add Button */}
        <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8">
           <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
             <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
             />
           </div>
           <button
             onClick={() => setShowAddForm(!showAddForm)}
             className={`flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all shadow-md whitespace-nowrap ${
               showAddForm 
               ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300' 
               : 'bg-indigo-600 text-white hover:bg-indigo-700'
             }`}
           >
             {showAddForm ? <X className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
             {showAddForm ? 'Cancel' : 'Add Question'}
           </button>
        </div>

        {/* Add Question Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, mb: 0 }}
              animate={{ opacity: 1, height: 'auto', mb: 32 }}
              exit={{ opacity: 0, height: 0, mb: 0 }}
              className="overflow-hidden"
            >
              <form onSubmit={handleAddQuestion} className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 rounded-2xl border-2 border-indigo-100 dark:border-indigo-900/50 shadow-xl max-w-2xl mx-auto">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-indigo-500" />
                  Submit New Question
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Question</label>
                    <input
                      type="text"
                      required
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-slate-900 dark:text-white"
                      placeholder="e.g., What is the difference between Playwright and Cypress?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Answer</label>
                    <textarea
                      required
                      rows={4}
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-slate-900 dark:text-white resize-none"
                      placeholder="Provide a comprehensive answer..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category / Tag</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-slate-900 dark:text-white"
                    >
                      {formCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors shadow-lg shadow-indigo-500/30"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Question
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <div className="flex items-center gap-2 mr-2 text-slate-500 dark:text-slate-400 font-medium">
             <Filter className="w-4 h-4" /> Filter:
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(item.id)}
                className="w-full text-left px-6 py-5 flex items-start justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors focus:outline-none"
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      item.category === 'Playwright' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' :
                      item.category === 'AI Agents' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                      item.category === 'MCP' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                      'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white leading-tight">
                    {item.question}
                  </h3>
                </div>
                <div className="mt-1 flex-shrink-0 text-slate-400">
                  {openQuestionId === item.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openQuestionId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <BookOpen className="w-5 h-5 text-indigo-500" />
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {filteredQuestions.length === 0 && (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              No questions found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prep;
