import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgressStore } from '../store/progressStore';
import { SECTIONS } from '../lib/sections';
import { ModuleLayout } from '../components/layout/ModuleLayout';
import { Topbar } from '../components/layout/Topbar';
import SectionRenderer from '../components/ui/SectionRenderer';
import AIChat from '../components/ui/AIChat';

import { structureModules } from '../content/structure';
import { glycosylationModules } from '../content/glycosylation';
import { moaModules } from '../content/moa';
import { effectorModules } from '../content/effector';
import { engineeringModules } from '../content/engineering';
import { cqaModules } from '../content/cqa';
import type { ModuleContent } from '../types/content';

const MODULE_MAP: Record<string, ModuleContent[]> = {
  structure: structureModules,
  glycosylation: glycosylationModules,
  moa: moaModules,
  effector: effectorModules,
  engineering: engineeringModules,
  cqa: cqaModules,
};

interface Props {
  sectionId: string;
}

export default function SectionPage({ sectionId }: Props) {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const markVisited = useProgressStore((s) => s.markVisited);

  const section = SECTIONS.find((s) => s.id === sectionId);
  const modules = MODULE_MAP[sectionId] || [];

  const moduleIndex = useMemo(() => {
    if (!moduleId) return 0;
    const num = parseInt(moduleId.replace('m', ''), 10);
    return isNaN(num) ? 0 : num;
  }, [moduleId]);

  const currentModule = modules[moduleIndex] || null;
  const prevModule = moduleIndex > 0 ? modules[moduleIndex - 1] : null;
  const nextModule = moduleIndex < modules.length - 1 ? modules[moduleIndex + 1] : null;

  useEffect(() => {
    if (currentModule) {
      markVisited(currentModule.id);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentModule, markVisited]);

  if (!section || !currentModule) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-[var(--text-muted)] text-lg mb-4">Module not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-[var(--color-teal)] text-white rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handlePrev = () => {
    if (moduleIndex > 0) {
      navigate(`${section.basePath}/m${moduleIndex - 1}`);
    }
  };

  const handleNext = () => {
    if (moduleIndex < modules.length - 1) {
      navigate(`${section.basePath}/m${moduleIndex + 1}`);
    }
  };

  return (
    <div className="min-h-screen">
      <Topbar
        currentModule={currentModule}
        sectionId={sectionId}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={moduleIndex > 0}
        hasNext={moduleIndex < modules.length - 1}
      />
      <ModuleLayout
        module={currentModule}
        sectionId={sectionId}
        prevModule={prevModule}
        nextModule={nextModule}
        basePath={section.basePath}
      >
        <SectionRenderer sections={currentModule.sections} />
      </ModuleLayout>
      <AIChat sectionId={sectionId} moduleTitle={currentModule.title} />
    </div>
  );
}
