import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { COURSES } from '../constants';
import { ChevronRight, PlayCircle, FileText, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = COURSES.find(c => c.id === id);
  
  const [activeModule, setActiveModule] = useState<string | null>(course?.modules[0]?.id || null);
  const [activeLesson, setActiveLesson] = useState<string | null>(course?.modules[0]?.lessons[0]?.id || null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  if (!course) {
    return <div className="p-12 text-center text-slate-900 dark:text-white">Course not found</div>;
  }

  // Create a flat list of lessons for easy navigation
  const flatLessons = useMemo(() => {
    return course.modules.flatMap(m => m.lessons.map(l => ({ ...l, moduleId: m.id })));
  }, [course]);

  const currentIndex = flatLessons.findIndex(l => l.id === activeLesson);
  const currentLesson = course.modules
    .find(m => m.id === activeModule)
    ?.lessons.find(l => l.id === activeLesson);

  const isFirst = currentIndex <= 0;
  const isLast = currentIndex === flatLessons.length - 1;

  const handleNext = () => {
    if (activeLesson) {
      setCompletedLessons(prev => new Set(prev).add(activeLesson));
    }
    
    if (!isLast) {
      const nextLesson = flatLessons[currentIndex + 1];
      setActiveModule(nextLesson.moduleId);
      setActiveLesson(nextLesson.id);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      const prevLesson = flatLessons[currentIndex - 1];
      setActiveModule(prevLesson.moduleId);
      setActiveLesson(prevLesson.id);
    }
  };

  const renderContent = (content?: string) => {
    if (!content) return null;
    return content.split('\n').map((line, index) => {
      // Helper to parse inline code
      const parseText = (text: string) => {
        const parts = text.split(/(`[^`]+`)/);
        return parts.map((part, i) => {
          if (part.startsWith('`') && part.endsWith('`')) {
            return <code key={i} className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono text-indigo-600 dark:text-indigo-400">{part.slice(1, -1)}</code>;
          }
          return part;
        });
      };

      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">{line.replace('### ', '')}</h3>;
      }
      
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="ml-4 flex items-start gap-2 text-slate-700 dark:text-slate-300 mb-2">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0"></span>
            <span className="flex-1">{parseText(line.replace('- ', ''))}</span>
          </li>
        );
      }
      
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">{parseText(line)}</p>;
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar - Curriculum */}
      <aside className="w-full md:w-80 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md border-r border-slate-200 dark:border-slate-800 h-[calc(100vh-64px)] overflow-y-auto sticky top-16 transition-colors">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-4 block">&larr; Back to Home</Link>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">{course.title}</h1>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-md">{course.difficulty}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
                {Math.round((completedLessons.size / flatLessons.length) * 100)}% Complete
            </span>
          </div>
        </div>
        <div className="p-4">
          {course.modules.map(module => (
            <div key={module.id} className="mb-6">
              <h3 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-2">{module.title}</h3>
              <div className="space-y-1">
                {module.lessons.map(lesson => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setActiveModule(module.id);
                      setActiveLesson(lesson.id);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-3 transition-colors ${
                      activeLesson === lesson.id 
                        ? 'bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {completedLessons.has(lesson.id) ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                    ) : activeLesson === lesson.id ? (
                        <PlayCircle className="w-4 h-4" />
                    ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600" />
                    )}
                    <span className="flex-1 truncate">{lesson.title}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">{lesson.duration}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-[calc(100vh-64px)] overflow-y-auto p-8 md:p-12 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          {currentLesson ? (
            <>
              <div className="mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{currentLesson.title}</h2>
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1"><ClockIcon className="w-4 h-4"/> {currentLesson.duration}</span>
                  <span>•</span>
                  <span>Module: {course.modules.find(m => m.id === activeModule)?.title}</span>
                </div>
              </div>
              
              <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
                {renderContent(currentLesson.content)}
              </div>

              <div className="mt-12 flex justify-between items-center pt-8 border-t border-slate-100 dark:border-slate-800">
                <button 
                    onClick={handlePrev}
                    disabled={isFirst}
                    className={`px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-700 font-medium transition-colors flex items-center gap-2 ${
                        isFirst 
                        ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed bg-slate-50 dark:bg-slate-900/50' 
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 bg-white dark:bg-slate-900'
                    }`}
                >
                  <ArrowLeft className="w-4 h-4" /> Previous Lesson
                </button>
                
                <button 
                    onClick={handleNext}
                    className={`px-6 py-3 rounded-lg font-medium shadow-md transition-colors flex items-center gap-2 ${
                        isLast 
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                >
                  {isLast ? 'Complete Course' : 'Mark as Complete & Next'} 
                  {!isLast && <ArrowRight className="w-4 h-4" />}
                  {isLast && <CheckCircle className="w-4 h-4" />}
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
              Select a lesson to begin
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const ClockIcon = ({className}:{className?:string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
)

export default CourseDetail;