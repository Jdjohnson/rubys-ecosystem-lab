'use client';

import { useState, useCallback } from 'react';
import { webNodes, webEdges, getConnections } from '@/data/food-web';
import { getOrganism } from '@/data/organisms';
import { Button } from '@/components/ui/Button';
import { ItemImage } from '@/components/ui/ItemImage';

interface FoodWebGraphProps {
  instructions: string;
  onComplete: () => void;
}

export function FoodWebGraph({ instructions, onComplete }: FoodWebGraphProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [explored, setExplored] = useState<Set<string>>(new Set());

  const connections = selectedId ? getConnections(selectedId) : null;
  const selectedOrganism = selectedId ? getOrganism(selectedId) : null;

  const handleNodeTap = useCallback((id: string) => {
    setSelectedId(prev => prev === id ? null : id);
    setExplored(prev => new Set(prev).add(id));
  }, []);

  const exploredEnough = explored.size >= 5;

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-4 pb-2">
        <p className="text-base text-dim">{instructions}</p>
        <div className="text-sm text-dim mt-1">
          Tap to explore · {explored.size}/5 to continue
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-2">
        <svg
          viewBox="0 0 1000 800"
          className="w-full h-full"
          style={{ maxHeight: 'calc(100dvh - 320px)' }}
        >
          {/* Edges */}
          {webEdges.map((edge, i) => {
            const fromNode = webNodes.find(n => n.id === edge.from);
            const toNode = webNodes.find(n => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            const className = 'web-edge';
            let stroke = '#d4c9b8';
            let strokeWidth = 1;
            let opacity = 0.4;

            if (selectedId) {
              const isEatsEdge = connections?.eats.includes(edge.from) && edge.to === selectedId;
              const isEatenByEdge = edge.from === selectedId && connections?.eatenBy.includes(edge.to);

              if (isEatsEdge) {
                stroke = '#4ade80';
                strokeWidth = 3;
                opacity = 1;
              } else if (isEatenByEdge) {
                stroke = '#f87171';
                strokeWidth = 3;
                opacity = 1;
              } else {
                opacity = 0.08;
              }
            }

            return (
              <line
                key={i}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={stroke}
                strokeWidth={strokeWidth}
                opacity={opacity}
                className={className}
              />
            );
          })}

          {/* Nodes */}
          {webNodes.map((node) => {
            const organism = getOrganism(node.id);
            if (!organism) return null;

            const isSelected = selectedId === node.id;
            const isConnected = selectedId && (
              connections?.eats.includes(node.id) ||
              connections?.eatenBy.includes(node.id)
            );
            const isDimmed = selectedId && !isSelected && !isConnected;

            let fillColor = '#4a8c4a';
            if (organism.type === 'consumer') {
              if (organism.roles.includes('predator')) fillColor = '#ef4444';
              else if (organism.roles.includes('herbivore') || organism.roles.includes('prey')) fillColor = '#60a5fa';
              else if (organism.roles.includes('omnivore')) fillColor = '#a855f7';
              else if (organism.roles.includes('scavenger')) fillColor = '#f97316';
            } else if (organism.type === 'decomposer') {
              fillColor = '#8b6f47';
            }

            return (
              <g
                key={node.id}
                className="web-node"
                onClick={() => handleNodeTap(node.id)}
                style={{
                  opacity: isDimmed ? 0.15 : 1,
                  transition: 'opacity 0.3s ease',
                  cursor: 'pointer',
                }}
              >
                {/* Invisible touch target - minimum 48px equivalent in SVG space */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={Math.max(node.radius, 24)}
                  fill="transparent"
                />
                {/* Outer ring for selected */}
                {isSelected && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.radius + 6}
                    fill="none"
                    stroke="#5ba3d9"
                    strokeWidth={3}
                    className="animate-pulse-glow"
                  />
                )}
                {/* Main circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.radius}
                  fill={fillColor}
                  stroke="white"
                  strokeWidth={2}
                />
                {/* Label */}
                <text
                  x={node.x}
                  y={node.y + node.radius + 14}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={600}
                  fill={isDimmed ? '#d4c9b8' : '#2c1810'}
                >
                  {organism.name.length > 14
                    ? organism.name.split(' ').map((word, wi) => (
                        <tspan key={wi} x={node.x} dy={wi === 0 ? 0 : 13}>
                          {word}
                        </tspan>
                      ))
                    : organism.name}
                </text>
              </g>
            );
          })}

          {/* Legend - only show after first selection to avoid pre-labeling */}
          {selectedId && (
            <g transform="translate(30, 30)" opacity={0.7}>
              {[
                { color: '#4a8c4a', label: 'Producer' },
                { color: '#60a5fa', label: 'Prey' },
                { color: '#ef4444', label: 'Predator' },
                { color: '#a855f7', label: 'Omnivore' },
                { color: '#8b6f47', label: 'Decomposer' },
              ].map((item, i) => (
                <g key={item.label} transform={`translate(0, ${i * 18})`}>
                  <circle cx={6} cy={0} r={5} fill={item.color} />
                  <text x={16} y={3} fontSize={9} fill="#9a8a7a">{item.label}</text>
                </g>
              ))}
            </g>
          )}
        </svg>
      </div>

      {/* Info panel */}
      {selectedOrganism && (
        <div className="px-6 py-3 border-t border-surface animate-slide-in bg-card">
          <div className="flex items-start gap-3">
            <ItemImage id={selectedId!} name={selectedOrganism.name} size={56} className="flex-shrink-0" />
            <div className="flex-1">
              <div className="font-bold text-lg" style={{ fontFamily: 'var(--font-fredoka)' }}>
                {selectedOrganism.name}
              </div>
              <div className="text-sm text-dim capitalize">
                {selectedOrganism.roles.join(' · ')}
              </div>
              <div className="text-sm mt-1">{selectedOrganism.funFact}</div>
              <div className="flex flex-col gap-1 mt-2 text-xs text-dim">
                {connections && connections.eats.length > 0 && (
                  <span className="text-correct">
                    Eats: {connections.eats.map(id => getOrganism(id)?.name || id).join(', ')}
                  </span>
                )}
                {connections && connections.eatenBy.length > 0 && (
                  <span className="text-incorrect">
                    Eaten by: {connections.eatenBy.map(id => getOrganism(id)?.name || id).join(', ')}
                  </span>
                )}
                {connections && connections.eats.length === 0 && connections.eatenBy.length === 0 && (
                  <span className="italic">
                    This organism has special feeding relationships not shown in this simplified web.
                  </span>
                )}
              </div>
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
