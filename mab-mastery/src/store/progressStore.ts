import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface QuizScore {
  sectionId: string;
  questionId: string;
  correct: boolean;
  selectedIndex: number;
}

interface ProgressState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  visitedModules: string[];
  markVisited: (moduleId: string) => void;
  lastVisited: string | null;
  setLastVisited: (moduleId: string) => void;
  quizScores: QuizScore[];
  addQuizScore: (score: QuizScore) => void;
  resetQuizScores: (sectionId?: string) => void;
  getModuleProgress: (sectionId: string, totalModules: number) => number;
  getSectionQuizScore: (sectionId: string) => { correct: number; total: number };
  getTotalProgress: () => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      darkMode: true,
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
      sidebarOpen: true,
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

      visitedModules: [],
      markVisited: (moduleId: string) =>
        set((s) => ({
          visitedModules: s.visitedModules.includes(moduleId)
            ? s.visitedModules
            : [...s.visitedModules, moduleId],
          lastVisited: moduleId,
        })),

      lastVisited: null,
      setLastVisited: (moduleId: string) => set({ lastVisited: moduleId }),

      quizScores: [],
      addQuizScore: (score: QuizScore) =>
        set((s) => ({
          quizScores: [
            ...s.quizScores.filter((q) => q.questionId !== score.questionId),
            score,
          ],
        })),
      resetQuizScores: (sectionId?: string) =>
        set((s) => ({
          quizScores: sectionId
            ? s.quizScores.filter((q) => q.sectionId !== sectionId)
            : [],
        })),

      getModuleProgress: (sectionId: string, totalModules: number) => {
        const visited = get().visitedModules.filter((m) =>
          m.startsWith(sectionId)
        );
        return totalModules > 0
          ? Math.round((visited.length / totalModules) * 100)
          : 0;
      },

      getSectionQuizScore: (sectionId: string) => {
        const scores = get().quizScores.filter(
          (q) => q.sectionId === sectionId
        );
        return {
          correct: scores.filter((q) => q.correct).length,
          total: scores.length,
        };
      },

      getTotalProgress: () => {
        const totalModules = 70;
        return Math.round(
          (get().visitedModules.length / totalModules) * 100
        );
      },
    }),
    { name: 'mab-mastery-progress' }
  )
);
