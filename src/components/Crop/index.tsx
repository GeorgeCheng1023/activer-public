import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import Button from 'components/Button';

import { Area } from 'react-easy-crop/types';
import getCroppedImg from './utils/cropImages';

// style
import './index.scss';

const dummyDogImage = 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60';

const zoomPercent = (value: number) => `${Math.round(value * 100)}`;

function Crop() {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const [croppedImage, setCroppedImage] = useState();

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

  // handle submit crop image

  const handleCropImage = useCallback(async () => {
    try {
      const getCroppedImage = await getCroppedImg(
        dummyDogImage,
        croppedAreaPixels,
        rotation,
      );
      setCroppedImage(getCroppedImage);
    } catch (error) {
      console.error(error);
    }
  }, [croppedAreaPixels, rotation]);

  return (
    <div className="crop-item">
      <div className="crop-item__container">
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
      <div className="crop-item__control">
        <div className="crop-item__slider">
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
        <div className="crop-item__slider">
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
      <Button text="裁切" onClick={handleCropImage} />
      <img src={croppedImage} alt="crop" />
    </div>
  );
}

export default Crop;
