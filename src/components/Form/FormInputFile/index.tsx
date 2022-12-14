import React from 'react';
import './index.scss';

type Props = {
  id: string;
  name: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>
  accept?: 'image' | 'pdf',
  setImageSrc?: React.Dispatch<React.SetStateAction<string>>,
};

function FormInputFile({
  onClick, accept, setImageSrc, id, label, name,
}: Props) {
  let acceptVaraint;
  switch (accept) {
    case 'image':
      acceptVaraint = 'image/*';
      break;
    case 'pdf':
      acceptVaraint = '.pdf';
      break;
    default:
      acceptVaraint = undefined;
  }

  const handleOnPreview:React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files![0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      // convert image file to base64 string
      if (reader.result && setImageSrc) {
        setImageSrc(reader.result as string);
      }
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <label htmlFor={id} className="input-file">{label}</label>
      <input
        id={id}
        type="file"
        name={name}
        onClick={onClick}
        accept={acceptVaraint}
        onChange={setImageSrc ? handleOnPreview : undefined}
      />
    </>
  );
}

FormInputFile.defaultProps = {
  onClick: undefined,
  setImageSrc: undefined,
  accept: undefined,
};

export default FormInputFile;
