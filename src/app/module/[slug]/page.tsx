'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { getModule } from '@/data/modules';
import { useProgress } from '@/hooks/useProgress';
import { useConfetti } from '@/hooks/useConfetti';
import { getNextModule } from '@/lib/progress';
import { StepDots } from '@/components/ui/StepDots';
import { TeachScreen } from '@/components/content/TeachScreen';
import { ConfettiEffect } from '@/components/effects/ConfettiEffect';
import { CompletionBadge } from '@/components/effects/CompletionBadge';
import { Button } from '@/components/ui/Button';

// Interaction components
import { TapToClassify } from '@/components/interactions/TapToClassify';
import { CardSort } from '@/components/interactions/CardSort';
import { MatchingGame } from '@/components/interactions/MatchingGame';
import { DragToOrder } from '@/components/interactions/DragToOrder';
import { FoodWebGraph } from '@/components/interactions/FoodWebGraph';
import { HabitatExplorer } from '@/components/interactions/HabitatExplorer';
import { ScenarioCards } from '@/components/interactions/ScenarioCards';
import { QuizQuestion } from '@/components/interactions/QuizQuestion';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const INTERACTIONS: Record<string, React.ComponentType<any>> = {
  TapToClassify,
  CardSort,
  MatchingGame,
  DragToOrder,
  FoodWebGraph,
  HabitatExplorer,
  ScenarioCards,
  QuizQuestion,
};

export default function ModulePage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = params.slug;
  const mod = getModule(slug);
  const {
    loaded,
    getStepIndex,
    advanceStep,
    completeModule,
    isUnlocked,
    resetModule,
  } = useProgress();
  const { particles, active: confettiActive, fire: fireConfetti } = useConfetti();
  const [showCompletion, setShowCompletion] = useState(false);

  const stepIndex = getStepIndex(slug);

  const handleStepComplete = useCallback(() => {
    if (!mod) return;

    if (stepIndex >= mod.steps.length - 1) {
      // Module complete
      completeModule(slug);
      fireConfetti(50, 50);
      setShowCompletion(true);
    } else {
      advanceStep(slug);
    }
  }, [mod, stepIndex, slug, advanceStep, completeModule, fireConfetti]);

  const handleContinueAfterCompletion = useCallback(() => {
    setShowCompletion(false);
    const next = getNextModule(slug);
    if (next) {
      router.push(`/module/${next}`);
    } else {
      router.push('/');
    }
  }, [slug, router]);

  const handleRestart = useCallback(() => {
    resetModule(slug);
    setShowCompletion(false);
  }, [resetModule, slug]);

  if (!loaded) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-2xl animate-bob">🌿</div>
      </div>
    );
  }

  if (!mod) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🤔</div>
          <p className="text-lg font-semibold">Module not found</p>
          <button
            onClick={() => router.push('/')}
            className="touch-target mt-4 text-sky underline"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  if (!isUnlocked(slug)) {
    return (
      <div className="min-h-dvh flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-4xl mb-4">🔒</div>
          <p className="text-lg font-semibold mb-2">This module is locked</p>
          <p className="text-sm text-dim">Complete the previous module to unlock it.</p>
          <button
            onClick={() => router.push('/')}
            className="touch-target mt-4 text-sky underline"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  const step = mod.steps[Math.min(stepIndex, mod.steps.length - 1)];

  // Render the appropriate component based on step type
  function renderStep() {
    if (!step) return null;

    if (step.type === 'teach') {
      return <TeachScreen step={step} onNext={handleStepComplete} />;
    }

    if (step.interaction && INTERACTIONS[step.interaction]) {
      const Component = INTERACTIONS[step.interaction];
      return <Component {...(step.props || {})} onComplete={handleStepComplete} />;
    }

    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-dim">Unknown step type</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-dvh flex flex-col"
      style={{ '--module-accent': mod.color } as React.CSSProperties}
    >
      {/* Module header */}
      <header className="px-6 pt-4 pb-3 flex items-center gap-3">
        <button
          onClick={() => router.push('/')}
          className="touch-target w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-dim active:scale-95 transition-transform"
        >
          ←
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold truncate" style={{ fontFamily: 'var(--font-fredoka)' }}>
            {mod.title}
          </h1>
          <StepDots
            total={mod.steps.length}
            current={stepIndex}
            color={mod.color}
          />
        </div>
        {stepIndex > 0 && (
          <Button onClick={handleRestart} variant="secondary" size="sm">
            Start over
          </Button>
        )}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{ backgroundColor: `${mod.color}20` }}
        >
          {mod.icon}
        </div>
      </header>

      {/* Step content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderStep()}
      </div>

      {/* Effects */}
      <ConfettiEffect particles={particles} active={confettiActive} />
      {showCompletion && (
        <CompletionBadge
          moduleName={mod.title}
          moduleIcon={mod.icon}
          onContinue={handleContinueAfterCompletion}
        />
      )}
    </div>
  );
}
