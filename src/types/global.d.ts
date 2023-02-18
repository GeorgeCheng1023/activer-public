export { };

declare global {

  type FormTextProp = {
    formStyle: 'default' | 'heroForm' | 'disabled' | 'withButton' | 'withoutLabel';
    labelText: string;
    placeholder: string;
    inputType: string;
    value: string;
    required: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    buttonText?: string;
  };
}
