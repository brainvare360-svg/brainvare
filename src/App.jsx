'use client'

import React, { useEffect, Suspense, lazy } from 'react';
import { usePathname } from 'next/navigation';
import PublicLayout from './layouts/PublicLayout';
import Lenis from 'lenis';

// Lazy-loaded public pages
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Work = lazy(() => import('./pages/Work'));
const Agency = lazy(() => import('./pages/Agency'));
const BlogList = lazy(() => import('./pages/BlogList'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Careers = lazy(() => import('./pages/Careers'));

// Lazy-loaded admin pages
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const DashboardHome = lazy(() => import('./pages/admin/DashboardHome'));
const ContentManager = lazy(() => import('./pages/admin/ContentManager'));
const EnquiriesManager = lazy(() => import('./pages/admin/EnquiriesManager'));
const PagesManager = lazy(() => import('./pages/admin/PagesManager'));
const ReelsManager = lazy(() => import('./pages/admin/ReelsManager'));
const CareersManager = lazy(() => import('./pages/admin/CareersManager'));
const Login = lazy(() => import('./pages/admin/Login'));

// Minimal loading fallback — invisible to avoid flash
const PageFallback = () => (
  <div className="min-h-screen bg-brand-dark" />
);

function App() {
  const pathname = usePathname();

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
  }, [pathname]);

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-red selection:text-white">
      <Suspense fallback={<PageFallback />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<Agency />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/careers" element={<Careers />} />
          </Route>

          {/* Admin Login — outside protection */}
          <Route path="/admin/login" element={<Login />} />

          {/* Admin Routes — protected */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardHome />} />
            <Route path="enquiries" element={<EnquiriesManager />} />
            <Route path="pages" element={<PagesManager />} />
            <Route path="reels" element={<ReelsManager />} />
            <Route path="careers" element={<CareersManager />} />
            <Route path="content" element={<ContentManager />} />
            <Route path="*" element={<DashboardHome />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
