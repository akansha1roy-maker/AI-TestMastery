
import React, { useState } from 'react';
import { INTERVIEW_QUESTIONS } from '../constants';
import { ChevronDown, ChevronUp, BookOpen, Filter, Search, Plus, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { InterviewQuestion } from '../types';

const Prep: React.FC = () => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>(() => {
    const saved = localStorage.getItem('ai_testmastery_custom_questions');
    const customQuestions = saved ? JSON.parse(saved) : [];
    return [...customQuestions, ...INTERVIEW_QUESTIONS];
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
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

    setQuestions(prev => [newEntry, ...prev]);
    const saved = localStorage.getItem('ai_testmastery_custom_questions');
    const currentCustom = saved ? JSON.parse(saved) : [];
    localStorage.setItem('ai_testmastery_custom_questions', JSON.stringify([newEntry, ...currentCustom]));
    
    setNewQuestion('');
    setNewAnswer('');
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen py-16" data-testid="prep-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4" data-testid="prep-heading">Interview Prep</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Master the most common questions for AI Testing & QA Automation roles.
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8">
           <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
             <input
                type="text"
                data-testid="search-input"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm text-slate-900 dark:text-white placeholder-slate-400"
             />
           </div>
           <button
             onClick={() => setShowAddForm(!showAddForm)}
             data-testid="add-question-toggle"
             className={`flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all shadow-md whitespace-nowrap ${
               showAddForm ? 'bg-slate-200 dark:bg-slate-800' : 'bg-indigo-600 text-white hover:bg-indigo-700'
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
              data-testid="add-form"
            >
              <form onSubmit={handleAddQuestion} className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 rounded-2xl border-2 border-indigo-100 dark:border-indigo-900/50 shadow-xl max-w-2xl mx-auto">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Question</label>
                    <input
                      type="text" required
                      data-testid="form-question-input"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 outline-none dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Answer</label>
                    <textarea
                      required rows={3}
                      data-testid="form-answer-input"
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 outline-none dark:text-white"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <select
                      data-testid="form-category-select"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="px-4 py-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 dark:text-white"
                    >
                      {formCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <button type="submit" data-testid="form-submit" className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold">
                      Save Question
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10" data-testid="filters">
          {categories.map((cat) => (
            <button
              key={cat}
              data-testid={`filter-${cat.toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Questions List */}
        <div className="space-y-4" data-testid="questions-list">
          {filteredQuestions.map((item) => (
            <div key={item.id} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden" data-testid={`question-item-${item.id}`}>
              <button
                onClick={() => toggleQuestion(item.id)}
                data-testid={`toggle-${item.id}`}
                className="w-full text-left px-6 py-5 flex items-start justify-between hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex-1 pr-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 mb-2 inline-block">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white leading-tight">{item.question}</h3>
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
                    <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800" data-testid={`answer-${item.id}`}>
                      <div className="flex gap-3">
                        <BookOpen className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" />
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{item.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          {filteredQuestions.length === 0 && <div className="text-center py-12 text-slate-500" data-testid="empty-results">No questions found matching your search.</div>}
        </div>
      </div>
    </div>
  );
};

export default Prep;
