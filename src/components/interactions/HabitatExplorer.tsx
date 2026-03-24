'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { habitats } from '@/data/habitats';
import { getOrganism, getAbioticFactor } from '@/data/organisms';
import { Button } from '@/components/ui/Button';
import { ItemImage } from '@/components/ui/ItemImage';
import type { HabitatType } from '@/lib/types';

interface HabitatExplorerProps {
  instructions: string;
  onComplete: () => void;
}

export function HabitatExplorer({ instructions, onComplete }: HabitatExplorerProps) {
  const [activeHabitat, setActiveHabitat] = useState<HabitatType>('woods');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [explored, setExplored] = useState<Set<string>>(new Set());
  const [visitedHabitats, setVisitedHabitats] = useState<Set<HabitatType>>(new Set(['woods']));

  const habitat = habitats.find(h => h.id === activeHabitat)!;
  const exploredEnough = explored.size >= 6 && visitedHabitats.size >= 3;

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
            onClick={() => { setActiveHabitat(h.id); setSelectedItem(null); setVisitedHabitats(prev => new Set(prev).add(h.id)); }}
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
        {/* Scene banner */}
        <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3">
          <Image
            src={`/images/scenes/${activeHabitat}.webp`}
            alt={habitat.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute bottom-2 left-3 text-white text-sm font-bold drop-shadow-md" style={{ fontFamily: 'var(--font-fredoka)' }}>
            {habitat.name}
          </div>
        </div>

        {/* Habitat description */}
        <p className="text-sm text-dim mb-4">{habitat.description}</p>

        {/* Items to explore - mixed together without revealing classification */}
        <div className="mb-4">
          <h3 className="text-xs font-bold text-dim uppercase tracking-wide mb-2">
            Things to Explore
          </h3>
          <div className="text-xs text-dim mb-3">
            {visitedHabitats.size < 3
              ? `Visit all 3 habitats (${visitedHabitats.size}/3) · ${explored.size}/6 explored`
              : `Tap ${Math.max(0, 6 - explored.size)} more to continue (${explored.size}/6 explored)`
            }
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
                    transition-all duration-200 flex flex-col items-center gap-1
                    ${isSelected ? 'ring-2 ring-sky scale-105 shadow-md' : 'active:scale-95'}
                    ${isExplored && !isSelected ? 'opacity-70' : ''}
                  `}
                >
                  <ItemImage id={id} name={data.name} size={40} fallbackEmoji="?" />
                  {data.name.length > 12 ? data.name.split(' ')[0] : data.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {selectedData && (
        <div className="px-6 py-3 border-t border-surface animate-slide-in bg-card">
          <div className="flex items-start gap-3">
            <ItemImage id={selectedItem!} name={selectedData.name} size={56} className="flex-shrink-0" />
            <div className="flex-1 min-w-0">
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
          </div>
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
