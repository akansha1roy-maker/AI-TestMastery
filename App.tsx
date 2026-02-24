
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import Tools from './pages/Tools';
import ToolDetail from './pages/ToolDetail';
import Playground from './pages/Playground';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Prep from './pages/Prep';
import Background from './components/Background';
import { TOOLS, BLOG_POSTS, COURSES } from './constants';

const SEOMetadataManager = () => {
  const location = useLocation();
  
  React.useEffect(() => {
    const path = location.pathname;
    let title = 'AI TestMastery | Master AI-Powered Testing';
    let description = 'A comprehensive learning platform for modern AI testing strategies, covering Playwright, TestSprite, MCP Agents, and AI-driven QA workflows.';

    // Check for exact matches
    if (path === '/') {
      title = 'AI TestMastery | Master AI-Powered Testing';
      description = 'Learn to build self-healing test suites, deploy autonomous agents with TestSprite, and master Playwright automation.';
    } else if (path === '/tools') {
      title = 'Essential AI Testing Stack | AI TestMastery';
      description = 'Explore the modern QA landscape with guides for Playwright, TestSprite, Stagehand, and MCP.';
    } else if (path === '/blog') {
      title = 'Insights & Guides | AI TestMastery Blog';
      description = 'Stay updated with the latest in AI QA workflows, strategies, and emerging technologies.';
    } else if (path === '/playground') {
      title = 'AI Testing Playground | AI TestMastery';
      description = 'Experiment with Playwright automation in an interactive AI-powered simulator with real-time feedback.';
    } else if (path === '/prep') {
      title = 'Interview Prep | AI TestMastery';
      description = 'Master the most common questions for AI Testing & QA Automation roles with our comprehensive prep guide.';
    }

    // Handle dynamic routes
    const toolMatch = path.match(/^\/tools\/(.+)/);
    if (toolMatch) {
      const tool = TOOLS.find(t => t.id === toolMatch[1]);
      if (tool) {
        title = `${tool.name} Guide | AI TestMastery`;
        description = tool.description;
      }
    }

    const blogMatch = path.match(/^\/blog\/(.+)/);
    if (blogMatch) {
      const post = BLOG_POSTS.find(p => p.id === blogMatch[1]);
      if (post) {
        title = `${post.title} | AI TestMastery`;
        description = post.excerpt;
      }
    }

    const courseMatch = path.match(/^\/courses\/(.+)/);
    if (courseMatch) {
      const course = COURSES.find(c => c.id === courseMatch[1]);
      if (course) {
        title = `${course.title} | AI TestMastery`;
        description = course.description;
      }
    }

    // Update document title
    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

  }, [location]);

  return null;
};

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
      <SEOMetadataManager />
      <div className="flex flex-col min-h-screen relative">
        <Background />
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
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
