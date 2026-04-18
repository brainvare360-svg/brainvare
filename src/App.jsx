import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

// Layout + auth — always loaded (small, needed on every route)
import PublicLayout from './layouts/PublicLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy-loaded public pages — each becomes its own JS chunk
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Work = lazy(() => import('./pages/Work'));
const Agency = lazy(() => import('./pages/Agency'));
const Insights = lazy(() => import('./pages/Insights'));
const BlogList = lazy(() => import('./pages/BlogList'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

// Lazy-loaded admin pages — zero admin code ships to public visitors
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const DashboardHome = lazy(() => import('./pages/admin/DashboardHome'));
const ContentManager = lazy(() => import('./pages/admin/ContentManager'));
const EnquiriesManager = lazy(() => import('./pages/admin/EnquiriesManager'));
const PagesManager = lazy(() => import('./pages/admin/PagesManager'));
const ReelsManager = lazy(() => import('./pages/admin/ReelsManager'));
const Login = lazy(() => import('./pages/admin/Login'));

// Minimal loading fallback — brand-consistent, lightweight
const PageLoader = () => (
  <div className="min-h-screen bg-brand-dark flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-white/20 border-t-brand-red rounded-full animate-spin" />
  </div>
);

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
      <Suspense fallback={<PageLoader />}>
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
            <Route path="content" element={<ContentManager />} />
            <Route path="*" element={<DashboardHome />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
