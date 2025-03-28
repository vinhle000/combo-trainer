import { createContext, useContext, useEffect, useState, useRef } from 'react';

type GamepadState = {
  buttons: boolean[];
  axes: number[];
};

const GamepadContext = createContext<GamepadState | null>(null);

export const GamepadProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [buttons, setButtons] = useState<boolean[]>([]);
  const [axes, setAxes] = useState<number[]>([]);
  const lastButtons = useRef<boolean[]>([]);
  const lastAxes = useRef<number[]>([]);

  useEffect(() => {
    let frameId: number;

    const update = () => {
      const pad = navigator.getGamepads().filter((pad) => !!pad)[0]; //first pad connected found

      if (pad) {
        // setButtons(pad.buttons.map((b) => b.pressed));
        // setAxes([...pad.axes]); //spread to create a shallow copy
        const newButtons = pad.buttons.map((b) => b.pressed);
        const newAxes = [...pad.axes];

        const buttonsChanged =
          newButtons.length !== lastButtons.current.length ||
          newButtons.some((val, i) => val !== lastButtons.current[i]);

        const axesChanged =
          newAxes.length !== lastAxes.current.length ||
          newAxes.some((val, i) => val !== lastAxes.current[i]);

        if (buttonsChanged) {
          setButtons(newButtons);
          lastButtons.current = newButtons;
        }

        if (axesChanged) {
          setAxes(newAxes);
          lastAxes.current = newAxes;
        }
      }
      frameId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <GamepadContext.Provider value={{ buttons, axes }}>
      {children}
    </GamepadContext.Provider>
  );
};

export function useGamepadContext(): GamepadState {
  const context = useContext(GamepadContext);
  if (!context) {
    throw new Error('useGamepad must be used within a <GamepadPadProvider>');
  }
  return context;
}
