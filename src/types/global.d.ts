export { };

declare global {
  type TagType = {
    color: 'primary' | 'secondary' | 'success';
    icon?: 'minus' | 'plus' | 'move';
    text: string;
  };
  type CardType = {
    imgUrl: string,
    title: string,
    altText: string,
    tags: Array<TagType>,
    animation: string,
    detail?: string
  };

  type ButtonType = {
    color?: 'primary' | 'secondary';
    variant?: 'outline';
    size?: 'lg' | 'sm' ;
    text: string;
    disabled?:boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  };

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
