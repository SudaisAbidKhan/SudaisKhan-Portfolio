import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Project';
import Skills from './pages/Skills';
import Achievements from './pages/Achievement';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import './index.css';

/* ── Scroll to top on every route change ── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

/* ── Animated page wrapper ── */
function PageTransition({ children }) {
  const { pathname } = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    setTransitionStage('fadeOut');
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setTransitionStage('fadeIn');
    }, 160);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div style={{
      opacity: transitionStage === 'fadeIn' ? 1 : 0,
      transform: transitionStage === 'fadeIn' ? 'translateY(0)' : 'translateY(8px)',
      transition: 'opacity 0.28s ease, transform 0.28s ease',
    }}>
      {displayChildren}
    </div>
  );
}

/* ── Top progress bar on navigation ── */
function ProgressBar() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setVisible(true);
    setWidth(0);
    const t1 = setTimeout(() => setWidth(70), 50);
    const t2 = setTimeout(() => setWidth(100), 400);
    const t3 = setTimeout(() => setVisible(false), 700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [pathname]);

  if (!visible) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, zIndex: 9999,
      height: '2px', width: `${width}%`,
      background: 'linear-gradient(90deg, #2563EB, #60A5FA)',
      transition: 'width 0.4s ease',
      boxShadow: '0 0 10px rgba(96,165,250,0.6)',
    }} />
  );
}

/* ── 404 fallback ── */
function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', flexDirection: 'column', gap: '1.5rem',
      paddingTop: '80px', textAlign: 'center', padding: '6rem 2rem',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 'clamp(5rem, 15vw, 9rem)',
        fontWeight: 700, color: 'var(--navy-700)', lineHeight: 1,
        letterSpacing: '-0.04em',
      }}>404</div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--slate-200)' }}>
        Page not found
      </h1>
      <p style={{ color: 'var(--slate-500)', maxWidth: '340px', lineHeight: 1.7 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a href="/" style={{
        padding: '10px 24px', borderRadius: '8px',
        background: 'var(--blue-600)', color: '#fff',
        fontWeight: 600, fontSize: '0.9rem',
        border: '1px solid var(--blue-500)',
        transition: 'background 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-500)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--blue-600)'}
      >← Back to Home</a>
    </div>
  );
}

function AppContent() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* Subtle noise texture overlay */}
      <div className="noise-overlay" />

      {/* Navigation progress indicator */}
      <ProgressBar />

      {/* Fixed navigation */}
      <Navbar />

      {/* Page content with transition */}
      <main style={{ flex: 1 }}>
        <PageTransition>
          <Routes>
            <Route path="/"             element={<Home />} />
            <Route path="/about"        element={<About />} />
            <Route path="/projects"     element={<Projects />} />
            <Route path="/skills"       element={<Skills />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/resume"       element={<Resume />} />
            <Route path="/contact"      element={<Contact />} />
            <Route path="*"             element={<NotFound />} />
          </Routes>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}