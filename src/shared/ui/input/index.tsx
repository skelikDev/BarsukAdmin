import React, {
  FocusEventHandler,
  FormEventHandler,
  forwardRef,
  KeyboardEventHandler,
  ReactNode,
} from 'react';
import * as Styled from './ui';

export type InputProps = {
  type?: string;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  label?: string;
  name?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  autoComplete?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  step?: number | string;
  min?: number | string;
  max?: number | string;
  multiple?: boolean;
  accept?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: KeyboardEventHandler<HTMLInputElement>;
  onInput?: FormEventHandler<HTMLInputElement>;

  icon?: ReactNode;
  size?: 's' | 'm' | 'l';
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
     icon,
     size,
     label,
     error,
     ...props
   }, ref) => {
    // @ts-expect-error
    return (
      <Styled.Wrapper>
        {label && <Styled.Label>{label}</Styled.Label>}
        <Styled.InputWrapper>
          <Styled.Input ref={ref} {...props} $size={size} $error={!!error} />
          <Styled.IconWrapper>
            {icon}
          </Styled.IconWrapper>
        </Styled.InputWrapper>
        {error && <Styled.Error>{error}</Styled.Error>}
      </Styled.Wrapper>

    );
  },
);
