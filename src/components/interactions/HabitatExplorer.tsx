'use client';

import { useState, useCallback } from 'react';
import { habitats } from '@/data/habitats';
import { getOrganism, getAbioticFactor } from '@/data/organisms';
import { Button } from '@/components/ui/Button';
import type { HabitatType } from '@/lib/types';

interface HabitatExplorerProps {
  instructions: string;
  onComplete: () => void;
}

export function HabitatExplorer({ instructions, onComplete }: HabitatExplorerProps) {
  const [activeHabitat, setActiveHabitat] = useState<HabitatType>('woods');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [explored, setExplored] = useState<Set<string>>(new Set());

  const habitat = habitats.find(h => h.id === activeHabitat)!;
  const exploredEnough = explored.size >= 6;

  const handleItemTap = useCallback((id: string) => {
    setSelectedItem(prev => prev === id ? null : id);
    setExplored(prev => new Set(prev).add(id));
  }, []);

  const selectedOrganism = selectedItem ? getOrganism(selectedItem) : null;
  const selectedAbiotic = selectedItem ? getAbioticFactor(selectedItem) : null;
  const selectedData = selectedOrganism || selectedAbiotic;

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-4 pb-2">
        <p className="text-base text-dim">{instructions}</p>
      </div>

      {/* Habitat tabs */}
      <div className="flex gap-2 px-6 py-2">
        {habitats.map((h) => (
          <button
            key={h.id}
            onClick={() => { setActiveHabitat(h.id); setSelectedItem(null); }}
            className={`
              touch-target flex-1 py-3 px-2 rounded-xl text-center text-sm font-semibold
              transition-all duration-200
              ${activeHabitat === h.id
                ? 'bg-forest-light text-white shadow-md'
                : 'bg-surface text-dim active:bg-earth-light/20'
              }
            `}
          >
            <span className="text-lg block">{h.icon}</span>
            <span className="text-xs">{h.name.split(' / ')[0]}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {/* Habitat description */}
        <p className="text-sm text-dim mb-4">{habitat.description}</p>

        {/* Items to explore - mixed together without revealing classification */}
        <div className="mb-4">
          <h3 className="text-xs font-bold text-dim uppercase tracking-wide mb-2">
            Things to Explore
          </h3>
          <div className="text-xs text-dim mb-3">
            Tap {6 - explored.size > 0 ? `${6 - explored.size} more` : 'any'} to continue ({explored.size}/6 explored)
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {[...habitat.biotic, ...habitat.abiotic].map((id) => {
              const org = getOrganism(id);
              const factor = getAbioticFactor(id);
              const data = org || factor;
              if (!data) return null;
              const isSelected = selectedItem === id;
              const isExplored = explored.has(id);
              return (
                <button
                  key={id}
                  onClick={() => handleItemTap(id)}
                  className={`
                    touch-target eco-card p-2 text-center text-xs font-semibold
                    transition-all duration-200
                    ${isSelected ? 'ring-2 ring-sky scale-105 shadow-md' : 'active:scale-95'}
                    ${isExplored && !isSelected ? 'opacity-70' : ''}
                  `}
                >
                  <div className="text-lg mb-0.5">
                    {isExplored ? '✓' : '?'}
                  </div>
                  {data.name.split(' ').slice(-1)[0]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {selectedData && (
        <div className="px-6 py-3 border-t border-surface animate-slide-in bg-card">
          <div className="font-bold text-base" style={{ fontFamily: 'var(--font-fredoka)' }}>
            {selectedData.name}
          </div>
          <div className="text-xs text-dim capitalize mb-1">
            {selectedData.classification === 'biotic'
              ? (selectedOrganism?.roles.join(' · ') || 'biotic')
              : 'abiotic'}
          </div>
          {'funFact' in selectedData && (
            <p className="text-sm">{selectedData.funFact}</p>
          )}
          {'description' in selectedData && (
            <p className="text-sm">{selectedData.description}</p>
          )}
        </div>
      )}

      {exploredEnough && (
        <div className="px-6 py-3 border-t border-surface">
          <Button onClick={onComplete} size="md" className="w-full">
            Continue →
          </Button>
        </div>
      )}
    </div>
  );
}
