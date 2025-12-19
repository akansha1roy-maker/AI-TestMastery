import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Clock, BarChart } from 'lucide-react';
import { COURSES } from '../constants';
import { motion } from 'framer-motion';

const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('All');

  const filteredCourses = COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDiff = filterDifficulty === 'All' || course.difficulty === filterDifficulty;
    return matchesSearch && matchesDiff;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Course Catalog</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">Comprehensive guides to master AI testing tools and methodologies.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between transition-colors">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 dark:text-white placeholder-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto">
            <Filter className="text-slate-400 w-5 h-5 flex-shrink-0" />
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <button
                key={level}
                onClick={() => setFilterDifficulty(level)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filterDifficulty === level
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/courses/${course.id}`} className="block h-full group">
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-48">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm">
                      {course.difficulty}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{course.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3">{course.description}</p>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                       <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                        <BarChart className="w-4 h-4 mr-1" />
                        {course.modules.length} Modules
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          
          {filteredCourses.length === 0 && (
            <div className="col-span-full text-center py-20">
              <p className="text-slate-500 dark:text-slate-400 text-lg">No courses found matching your criteria.</p>
              <button 
                onClick={() => {setSearchTerm(''); setFilterDifficulty('All');}}
                className="mt-4 text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;