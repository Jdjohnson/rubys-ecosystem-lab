'use client';

import Link from 'next/link';
import { modules } from '@/data/modules';
import { useProgress } from '@/hooks/useProgress';

export default function Home() {
  const { loaded, isUnlocked, isCompleted, completedModules, totalStars } = useProgress();

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl animate-bob">🌿</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-6 py-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🌲🦅🐟</div>
        <h1
          className="text-3xl font-bold text-foreground mb-1"
          style={{ fontFamily: 'var(--font-fredoka)' }}
        >
          Ruby&apos;s Ozarks Ecosystem Lab
        </h1>
        <p className="text-base text-dim">
          Explore the living and nonliving world around Springfield
        </p>
        {totalStars > 0 && (
          <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-gold-light/30 rounded-full text-sm font-semibold">
            ⭐ {totalStars} star{totalStars !== 1 ? 's' : ''} earned
          </div>
        )}
      </div>

      {/* Module grid */}
      <div className="space-y-3 stagger-children">
        {modules.map((mod) => {
          const unlocked = isUnlocked(mod.slug);
          const completed = isCompleted(mod.slug);

          return (
            <div key={mod.slug}>
              {unlocked ? (
                <Link
                  href={`/module/${mod.slug}`}
                  className={`
                    eco-card flex items-center gap-4 p-4 transition-all duration-200
                    ${completed ? 'opacity-80' : ''}
                    active:scale-98
                  `}
                  style={{
                    borderLeft: `4px solid ${mod.color}`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: `${mod.color}20` }}
                  >
                    {completed ? '✓' : mod.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-dim">
                        {mod.number}.
                      </span>
                      <h2 className="text-base font-bold truncate">{mod.title}</h2>
                    </div>
                    <p className="text-sm text-dim truncate">{mod.subtitle}</p>
                  </div>
                  <div className="text-dim text-lg flex-shrink-0">
                    {completed ? (
                      <span className="text-correct font-bold">⭐</span>
                    ) : (
                      '→'
                    )}
                  </div>
                </Link>
              ) : (
                <div
                  className="eco-card flex items-center gap-4 p-4 opacity-40"
                  style={{ borderLeft: '4px solid #d4c9b8' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 bg-surface">
                    🔒
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-dim">
                        {mod.number}.
                      </span>
                      <h2 className="text-base font-bold truncate">{mod.title}</h2>
                    </div>
                    <p className="text-sm text-dim">
                      Complete Module {mod.number - 1} to unlock
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick quiz link */}
      {completedModules.length > 0 && (
        <div className="mt-6 text-center">
          <Link
            href="/quiz"
            className="touch-target inline-flex items-center gap-2 px-6 py-3 bg-surface rounded-2xl font-semibold text-dim active:scale-95 transition-transform"
          >
            📝 Quick Quiz
          </Link>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-dim/50">
        Made for Ruby 🌿 Springfield, MO
      </div>
    </main>
  );
}
