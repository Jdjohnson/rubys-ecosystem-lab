'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ItemImageProps {
  id: string;
  name: string;
  size?: number;
  className?: string;
  fallbackEmoji?: string;
}

export function ItemImage({ id, name, size = 48, className = '', fallbackEmoji }: ItemImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // Show first letter or emoji fallback
    return (
      <div
        className={`flex items-center justify-center bg-surface rounded-lg text-dim font-bold ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
        aria-label={name}
      >
        {fallbackEmoji || name.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      src={`/images/organisms/${id}.webp`}
      alt={name}
      width={size}
      height={size}
      className={`rounded-lg object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
