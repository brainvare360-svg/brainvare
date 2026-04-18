import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import DashboardHome from './pages/admin/DashboardHome';
import ContentManager from './pages/admin/ContentManager';
import EnquiriesManager from './pages/admin/EnquiriesManager';
import PagesManager from './pages/admin/PagesManager';
import ReelsManager from './pages/admin/ReelsManager';
import Lenis from 'lenis';

import Home from './pages/Home';
import Services from './pages/Services';
import Work from './pages/Work';
import Agency from './pages/Agency';
import Insights from './pages/Insights';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-red selection:text-white">
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<Agency />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="enquiries" element={<EnquiriesManager />} />
          <Route path="pages" element={<PagesManager />} />
          <Route path="reels" element={<ReelsManager />} />
          <Route path="content" element={<ContentManager />} />
          <Route path="*" element={<DashboardHome />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
