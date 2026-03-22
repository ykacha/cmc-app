import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgressStore } from '../../store/progressStore';

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useProgressStore();

  return (
    <button
      onClick={toggleDarkMode}
      className="relative flex items-center justify-center w-9 h-9 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--color-teal)]/30 transition-all duration-300 cursor-pointer overflow-hidden"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={darkMode ? 'sun' : 'moon'}
          initial={{ rotate: -60, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 60, scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {darkMode
            ? <Sun size={15} style={{ color: 'var(--color-amber)' }} />
            : <Moon size={15} style={{ color: 'var(--color-blue)' }} />
          }
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
