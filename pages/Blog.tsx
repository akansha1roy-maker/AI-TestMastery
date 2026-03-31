import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { Calendar, User, Clock, ArrowRight, Filter, Plus, Save, X, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost } from '../types';

const Blog: React.FC = () => {
  // Initialize state with combination of local storage custom posts + default constants
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('ai_testmastery_custom_posts');
    const customPosts = saved ? JSON.parse(saved) : [];
    // Ensure the newest static posts from constants are also included
    return [...customPosts, ...BLOG_POSTS];
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCategory, setNewCategory] = useState('Strategy');

  // Extract unique categories from all posts
  const categories = ['All', ...Array.from(new Set(posts.map(post => post.category)))];

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: BlogPost = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      excerpt: newExcerpt || newContent.substring(0, 100) + '...',
      content: newContent,
      author: newAuthor || 'Community Contributor',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: `${Math.ceil(newContent.split(' ').length / 200)} min`,
      category: newCategory,
    };

    // Update State
    setPosts(prev => [newPost, ...prev]);

    // Update Local Storage (only save the custom ones to avoid duplicates with constants)
    const saved = localStorage.getItem('ai_testmastery_custom_posts');
    const currentCustom = saved ? JSON.parse(saved) : [];
    const updatedCustom = [newPost, ...currentCustom];
    localStorage.setItem('ai_testmastery_custom_posts', JSON.stringify(updatedCustom));

    // Reset Form
    setNewTitle('');
    setNewExcerpt('');
    setNewContent('');
    setNewAuthor('');
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Insights & Guides</h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Stay updated with the latest in AI QA workflows.</p>
          </div>

          <div className="flex flex-col gap-4 items-end">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
            >
              {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showAddForm ? 'Close Editor' : 'Write Post'}
            </button>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                      : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Add Post Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <form onSubmit={handleAddPost} className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 rounded-2xl border-2 border-indigo-100 dark:border-indigo-900/30 shadow-2xl">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                    <PenTool className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create New Article</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Article Title</label>
                      <input
                        type="text"
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g., Automating with Stagehand"
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Author Name</label>
                      <input
                        type="text"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        placeholder="Your Name"
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                      >
                        <option value="Strategy">Strategy</option>
                        <option value="Playwright">Playwright</option>
                        <option value="AI Agents">AI Agents</option>
                        <option value="MCP">MCP</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Excerpt (Short Summary)</label>
                      <textarea
                        rows={2}
                        value={newExcerpt}
                        onChange={(e) => setNewExcerpt(e.target.value)}
                        placeholder="A brief overview of the post..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Content (Markdown supported)</label>
                      <textarea
                        rows={4}
                        required
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="Write your article content here..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                   <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25"
                  >
                    <Save className="w-4 h-4" />
                    Publish Post
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Posts List */}
        <div className="space-y-8">
          <AnimatePresence mode='popLayout'>
            {filteredPosts.map(post => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link to={`/blog/${post.id}`} className="block group">
                  <article className="bg-white/80 dark:bg-slate-900/80 backdrop-blur p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 group-hover:shadow-md group-hover:border-indigo-100 dark:group-hover:border-indigo-900 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/0 via-indigo-50/0 to-indigo-50/0 group-hover:via-indigo-50/30 dark:group-hover:via-indigo-900/10 transition-all duration-500" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-semibold">
                          <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-md border border-indigo-100 dark:border-indigo-900/50">
                            {post.category}
                          </span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" />
                      </div>
                      
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" /> {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" /> {post.date}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {post.readTime}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                <Filter className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">No articles found in this category.</p>
              <button 
                onClick={() => setSelectedCategory('All')}
                className="mt-4 text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                View all articles
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
