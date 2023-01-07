import React, { useCallback } from 'react';
import './index.scss';

interface FormInputFileType extends React.InputHTMLAttributes<HTMLInputElement> {
  setImageSrc?: React.Dispatch<React.SetStateAction<string>>,
  label:string
}

function FormInputFile({
  label, setImageSrc, ...props
}: FormInputFileType) {
  const handleOnPreview:React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
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
  }, []);

  return (
    <>
      <label htmlFor={props.id} className="input-file">{label}</label>
      <input
        {...props}
        type="file"
        onChange={setImageSrc ? handleOnPreview : undefined}
      />
    </>
  );
}

FormInputFile.defaultProps = {
  setImageSrc: undefined,
};

export default FormInputFile;
