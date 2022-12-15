export interface ButtonVariants {
  outline?: boolean;
  round?: boolean;
  colorReverse?: boolean;
}

export interface ButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'success' | 'dark' | 'white' | 'danger';
  variant?: ButtonVariants;
  size?: 'lg' | 'sm';
  text?: string;
  iconAfter?: JSX.Element;
  iconBefore? : JSX.Element;
}
