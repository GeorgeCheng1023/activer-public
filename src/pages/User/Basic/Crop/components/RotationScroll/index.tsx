import React, { useCallback } from 'react';

interface Props {
  rotation: number;
  setRotation: React.Dispatch<React.SetStateAction<number>>
}

function RotationScroll({ rotation, setRotation }: Props) {
  const handleChangeRotation
  :React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setRotation(parseInt(e.target.value, 10));
  }, []);

  return (
    <div className="crop-panel__scroll">
      <label
        className="crop-panel__scroll__label"
        htmlFor="rotation"
      >
        Rotation:
        {' '}
        {rotation}
      </label>
      <input
        className="crop-panel__scroll__input"
        type="range"
        id="rotation"
        min={0}
        max={360}
        step={1}
        value={rotation}
        onChange={handleChangeRotation}
      />
    </div>
  );
}

export default RotationScroll;
