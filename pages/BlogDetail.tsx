import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-transparent text-slate-900 dark:text-white transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <Link to="/blog" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  // Simple parser to render markdown-like content into HTML elements
  const renderContent = (content?: string) => {
    if (!content) return null;
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let tableBuffer: string[] = [];

    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];

      // If it's a table line, buffer it
      if (line.trim().startsWith('|')) {
        tableBuffer.push(line);
        // If it's the last line, flush the buffer
        if (index === lines.length - 1) {
          elements.push(
            <pre key={`table-${index}`} className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto text-sm my-4 font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              {tableBuffer.join('\n')}
            </pre>
          );
        }
        continue;
      }

      // If we have buffered table lines but current line isn't a table, flush it
      if (tableBuffer.length > 0) {
        elements.push(
          <pre key={`table-${index - 1}`} className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto text-sm my-4 font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
            {tableBuffer.join('\n')}
          </pre>
        );
        tableBuffer = [];
      }

      if (line.startsWith('## ')) {
        elements.push(<h2 key={index} className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">{line.replace('## ', '')}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={index} className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">{line.replace('### ', '')}</h3>);
      } else if (line.startsWith('* ') || line.startsWith('•\t') || line.startsWith('• ')) {
        // Handle various bullet points
        elements.push(<li key={index} className="ml-6 list-disc text-slate-700 dark:text-slate-300 mb-2">{line.replace(/^(\* |•\t|• )/, '')}</li>);
      } else if (line.trim() === '') {
        elements.push(<br key={index} />);
      } else if (line.includes('<a ')) {
        elements.push(<p key={index} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: line }} />);
      } else {
        elements.push(<p key={index} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">{line}</p>);
      }
    }

    return elements;
  };

  return (
    <div className="min-h-screen py-16 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Articles
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-semibold mb-4">
            <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">{post.category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-8">
            <div className="flex items-center gap-6 text-slate-500 dark:text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </div>
                <span className="font-medium text-slate-900 dark:text-slate-200">{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {post.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {post.readTime} read
              </div>
            </div>
          </div>
        </header>

        <article className="prose prose-slate dark:prose-invert prose-lg max-w-none bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
          {renderContent(post.content)}
        </article>

        <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Share this article</h3>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 text-sm font-medium transition-colors shadow-sm">Twitter</button>
            <button className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 text-sm font-medium transition-colors shadow-sm">LinkedIn</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;