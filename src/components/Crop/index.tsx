import React, { useCallback, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
// component
import Cropper from 'react-easy-crop';
import Button from 'components/Button';
import { Area } from 'react-easy-crop/types';
import getCroppedImg from './utils/cropImages';

// style
import './index.scss';

const dummyDogImage = 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60';

const zoomPercent = (value: number) => `${Math.round(value * 100)}`;

type Props = {
  onCropped: (croppedImage: string) => void,
  setDisplayCropPanel: React.Dispatch<React.SetStateAction<boolean>>
};

function Crop({ onCropped, setDisplayCropPanel }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const croppedImage = useRef('');

  const handleCropComplete = useCallback((cropArea: Area, cropPixels: Area) => {
    setCroppedAreaPixels(cropPixels);
  }, []);

  // handle zoom control input
  const handleChangeZoom:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setZoom(parseInt(e.target.value, 10) / 100);
  };
  const handleChangeRotation:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setRotation(parseInt(e.target.value, 10));
  };

  // handle crop image
  const handleCropImage = useCallback(async () => {
    try {
      const getCroppedImage = await getCroppedImg(
        dummyDogImage,
        croppedAreaPixels,
        rotation,
      );
      if (getCroppedImage) {
        croppedImage.current = getCroppedImage;
        onCropped(croppedImage.current);
        setDisplayCropPanel(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [croppedAreaPixels, rotation]);

  // handle when click cancel button
  const handleCloseCropPanel:
  React.MouseEventHandler<HTMLButtonElement | HTMLDivElement> = (e) => {
    e.preventDefault();
    setDisplayCropPanel(false);
  };

  return createPortal(
    <>
      <div className="crop-panel">
        <div className="crop-panel__container">
          <Cropper
            image={dummyDogImage}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div className="crop-panel__control">
          <div className="crop-panel__slider">
            <label htmlFor="zoom">
              Zoom:
              {' '}
              {zoomPercent(zoom)}
              %
            </label>
            <input
              type="range"
              id="zoom"
              min={100}
              max={300}
              step={1}
              value={zoom * 100}
              onChange={handleChangeZoom}
            />
          </div>
          <div className="crop-panel__slider">
            <label htmlFor="rotation">
              Rotation:
              {' '}
              {rotation}
            </label>
            <input
              type="range"
              id="rotation"
              min={0}
              max={360}
              step={1}
              value={rotation}
              onChange={handleChangeRotation}
            />
          </div>
        </div>
        <div className="crop-panel__buttons">
          <Button text="裁切" onClick={handleCropImage} />
          <Button text="取消" variant="outline" onClick={handleCloseCropPanel} />
        </div>
      </div>
      <div
        className="crop-back"
        onClick={handleCloseCropPanel}
        aria-hidden="true"
      />
    </>,
    document.getElementById('root')!,
  );
}

export default Crop;
