import React, { useCallback, useState, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';
// component
import Button from 'components/Button';
import Popup, { PopupDisplayType } from 'components/Popup';
import { RotationScroll, ZoomScroll } from './components';
// utils
import getCroppedImg from './utils/cropImages';
// style
import './index.scss';

interface CropType extends PopupDisplayType {
  onCropped: (croppedImage: string) => void,
  image: string,
}

function Crop({
  onCropped, onClose, display, image,
}: CropType) {
  /* state */
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const croppedImage = useRef('');

  /* handlers */
  // crop
  const handleCropComplete = useCallback((cropArea: Area, cropPixels: Area) => {
    setCroppedAreaPixels(cropPixels);
  }, []);
  const handleCropImage = useCallback(async () => {
    try {
      const getCroppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation,
      );
      if (getCroppedImage) {
        croppedImage.current = getCroppedImage;
        onCropped(croppedImage.current);
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  }, [croppedAreaPixels, rotation]);
  // exit
  const handleCloseCropPanel:
  React.MouseEventHandler<HTMLButtonElement | HTMLDivElement> = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Popup display={display} onClose={onClose}>
      <div className="crop-panel">
        <div className="crop-panel__container">
          <Cropper
            image={image}
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
          <ZoomScroll zoom={zoom} setZoom={setZoom} />
          <RotationScroll rotation={rotation} setRotation={setRotation} />
        </div>
        <div className="crop-panel__buttons">
          <Button
            text="裁切"
            onClick={handleCropImage}
          />
          <Button
            text="取消"
            variant={{ outline: true }}
            onClick={handleCloseCropPanel}
          />
        </div>
      </div>
    </Popup>
  );
}

export default Crop;
