import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import Button from 'components/Button';

import { setLabels } from 'react-chartjs-2/dist/utils';
import getCroppedImg from './utils/cropImages';

const zoomPercent = (value: number) => `${Math.round(value * 100)}`;

type Props = {
  photoUrl: string,
  setDisplayCrop: React.Dispatch<React.SetStateAction<boolean>>
  setPhotoUrl:React.Dispatch<React.SetStateAction<string>>,
  setFile: React.Dispatch<React.SetStateAction<any>>,
};

function Crop({
  photoUrl, setDisplayCrop, setPhotoUrl, setFile,
}: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const cropComplete = (cropArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // handle zoom control input
  const handleChangeZoom:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setZoom(parseInt(e.target.value, 10));
  };
  const handleChangeRotation:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setRotation(parseInt(e.target.value, 10));
  };

  // handle submit crop image

  const handleCropImage = async (e) => {
    e.preventDefault();

    const file = await getCroppedImg(photoUrl, croppedAreaPixels, rotation);
    setPhotoUrl(url);
    setFile(file);
    setDisplayCrop(false);
  };

  return (
    <>
      <Cropper
        image={photoUrl}
        crop={crop}
        zoom={zoom}
        rotation={rotation}
        aspect={1}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onRotationChange={setRotation}
        onCropComplete={cropComplete}
      />
      <label htmlFor="zoom">
        Zoom:
        {' '}
        {zoomPercent(zoom)}
      </label>
      <input
        type="range"
        id="zoom"
        min={1}
        max={3}
        step={0.01}
        value={zoom}
        onChange={handleChangeZoom}
      />
      <label htmlFor="rotation">
        Zoom:
        {' '}
        {zoomPercent(zoom)}
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
      <Button text="取消" onClick={setDisplayCrop} />
      <Button text="裁切" onClick={handleCropImage} />
    </>
  );
}

export default Crop;
