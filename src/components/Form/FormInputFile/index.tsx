import React from 'react';

type Props = {
  onClick?: React.MouseEventHandler<HTMLInputElement>
  accept?: 'image' | 'pdf',
  setImageSrc?: React.Dispatch<React.SetStateAction<string>>,
};

function FormInputFile({ onClick, accept, setImageSrc }: Props) {
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
    <input
      type="file"
      onClick={onClick}
      accept={acceptVaraint}
      onChange={setImageSrc ? handleOnPreview : undefined}
    />
  );
}

FormInputFile.defaultProps = {
  onClick: undefined,
  setImageSrc: undefined,
  accept: undefined,
};

export default FormInputFile;
