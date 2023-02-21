import React, {
  useCallback, useState, ChangeEvent,
} from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';
import Button from 'components/Button';
import Popup from 'components/Popup';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getUserPortrait, setAvatar } from 'store/userAuth';
import { useNavigate } from 'react-router-dom';
import { RotationScroll, ZoomScroll } from './components';
import getCroppedImg from './utils/cropImages';
import './index.scss';

function Crop() {
  /* state */
  const userPortrait = useAppSelector(getUserPortrait);
  const [currentPortrait, setCurrentPortrait] = useState(userPortrait);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /* handlers */

  // crop
  const handleCropComplete = (cropArea: Area, cropPixels: Area) => {
    setCroppedAreaPixels(cropPixels);
  };

  const handleCropImage = useCallback(async () => {
    try {
      const getCroppedImage = await getCroppedImg(
        currentPortrait,
        croppedAreaPixels,
        rotation,
      );
      if (getCroppedImage) {
        dispatch(setAvatar(getCroppedImage));
        navigate('/user/basic', { replace: true });
        // handle the portrait crop

        // handleChange('avatar', croppedImage);
        // setDisplaySuccess(false);
        // setIsBlocking(true);

        // onCropped(croppedImage.current);
      }
    } catch (error) {
      console.error(error);
    }
  }, [croppedAreaPixels, rotation]);

  const handleClickUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        // convert image file to base64 string
        if (reader.result) {
          setCurrentPortrait(reader.result as string);
        }
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <Popup backLink="/user/basic">

      <div className="crop-panel">
        <div className="crop-panel__container">
          <Cropper
            image={currentPortrait}
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
          <input
            type="file"
            onChange={handleClickUpload}
          />
          <Button
            text="確定"
            type="button"
            onClick={handleCropImage}
          />
          <Button
            text="取消"
            type="button"
            variant={{ outline: true }}
            onClick={() => navigate('/user/basic', { replace: true })}
          />
        </div>
      </div>
    </Popup>
  );
}

export default Crop;
