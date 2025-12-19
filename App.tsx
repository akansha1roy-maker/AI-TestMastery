
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
// Courses page import removed
import CourseDetail from './pages/CourseDetail';
import Tools from './pages/Tools';
import ToolDetail from './pages/ToolDetail';
import Playground from './pages/Playground';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Prep from './pages/Prep';
import Background from './components/Background';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen relative">
        <Background />
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Courses catalog route removed */}
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/:id" element={<ToolDetail />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/prep" element={<Prep />} />
            <Route path="/about" element={<div className="p-20 text-center">About Page Placeholder</div>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;