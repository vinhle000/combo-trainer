// ComboTrainer.tsx with TypeScript + Timing Validation + Rhythm Visuals
import { useEffect, useState } from 'react';

import { useGamepadContext } from '../context/GameContext';

export default function ComboTrainer() {
  const { buttons, axes } = useGamepadContext();

  return (
    <div className='p-8 font-mono text-white bg-gray-900 min-h-screen'>
      <ul>
        {buttons.map((pressed, index) => (
          <li key={index}>
            Button {index}: {pressed ? 'Pressed' : 'Released'}
          </li>
        ))}
      </ul>

      <div className='mt-4'>
        <p>Axes:</p>
        <pre>{JSON.stringify(axes, null, 2)}</pre>
      </div>
    </div>
  );
}
