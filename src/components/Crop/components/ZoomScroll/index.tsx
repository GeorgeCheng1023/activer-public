import React, { useCallback } from 'react';

interface Props {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
}

function ZoomSlider({ zoom, setZoom }: Props) {
  const zoomPercent = useCallback((value: number) => `${Math.round(value * 100)}`, []);
  const handleChangeZoom
  :React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setZoom(parseInt(e.target.value, 10) / 100);
  }, []);

  return (
    <div className="crop-panel__scroll">
      <label
        htmlFor="zoom"
        className="crop-panel__scroll__label"
      >
        Zoom:
        {' '}
        {zoomPercent(zoom)}
        %
      </label>
      <input
        className="crop-panel__scroll__input"
        type="range"
        id="zoom"
        min={100}
        max={300}
        step={1}
        value={zoom * 100}
        onChange={handleChangeZoom}
      />
    </div>
  );
}

export default ZoomSlider;
