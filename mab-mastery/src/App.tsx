import { Routes, Route, Navigate } from 'react-router-dom';
import { useProgressStore } from './store/progressStore';
import { Sidebar } from './components/layout/Sidebar';
import { ErrorBoundary } from './components/ErrorBoundary';
import Dashboard from './pages/Dashboard';
import SectionPage from './pages/SectionPage';
import QuizPage from './pages/QuizPage';

export default function App() {
  const darkMode = useProgressStore((s) => s.darkMode);
  const sidebarOpen = useProgressStore((s) => s.sidebarOpen);

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <div className="flex h-screen bg-[var(--bg)] text-[var(--text)] overflow-hidden">
        <Sidebar />
        <main
          id="main-scroll"
          className={`flex-1 overflow-y-auto scrollbar-thin main-transition ${
            sidebarOpen ? 'md:ml-[280px]' : 'md:ml-14'
          }`}
        >
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/structure/:moduleId" element={<SectionPage sectionId="structure" />} />
              <Route path="/glycosylation/:moduleId" element={<SectionPage sectionId="glycosylation" />} />
              <Route path="/moa/:moduleId" element={<SectionPage sectionId="moa" />} />
              <Route path="/effector/:moduleId" element={<SectionPage sectionId="effector" />} />
              <Route path="/engineering/:moduleId" element={<SectionPage sectionId="engineering" />} />
              <Route path="/cqa/:moduleId" element={<SectionPage sectionId="cqa" />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/quiz/:sectionId" element={<QuizPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
