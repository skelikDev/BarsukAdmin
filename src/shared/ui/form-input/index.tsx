import { FC, ReactNode, useId, useState } from 'react';
import { Input, TInputProps } from '@/shadcn/components/ui/input.tsx';
import { cn } from '@/shadcn/lib/utils.ts';

export type TFormInputProps = {
  label?: string;
  error?: string | { text: string; type: 'error' | 'warning' };
  errorPosition?: 'top' | 'bottom';
  isStatic?: boolean;
} & TInputProps;

type TErrorProps = {
  error: string | undefined;
  errorType: 'error' | 'warning';
};

const Error: FC<TErrorProps> = ({ error, errorType }) => {
  if (!error) {
    return null;
  }
  if (errorType === 'warning') {
    return <span className={'text-xs text-yellow-500'}>{error}</span>;
  }
  return <span className={'text-xs text-red-500'}>{error}</span>;
};

type TInputLayoutProps = {
  isStatic?: boolean;
  errorPosition?: 'top' | 'bottom';

  children: ReactNode;
  label?: ReactNode;
  error?: ReactNode;
};

const InputLayout: FC<TInputLayoutProps> = (props) => {
  const { isStatic, errorPosition, children, label, error } = props;

  return (
    <div
      className={cn('flex flex-col justify-between', {
        'h-[80px] relative': isStatic && errorPosition === 'bottom',
        'h-fit': !isStatic || errorPosition === 'bottom',
      })}
    >
      <div className={'flex h-5 pl-0.5 justify-between'}>
        {label && label}
        {error && errorPosition !== 'bottom' && error}
      </div>
      <div
        className={cn('w-full', {
          'absolute bottom-1/2 left-0 translate-y-1/2': isStatic,
        })}
      >
        {children}
      </div>
      <div>{error && errorPosition === 'bottom' && error}</div>
    </div>
  );
};

export const FormInput: FC<TFormInputProps> = ({
  errorPosition,
  onFocus,
  onBlur,
  label,
  error: rawError,
  isStatic,
  id,
  className,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const generatedId = useId();
  const error = typeof rawError === 'string' ? rawError : rawError?.text;
  const errorType = typeof rawError === 'object' ? rawError.type : 'error';

  return (
    <InputLayout
      error={error && <Error error={error} errorType={errorType} />}
      label={
        label && (
          <label className={'text-sm'} htmlFor={id ?? generatedId}>
            {label}
          </label>
        )
      }
      errorPosition={errorPosition}
      isStatic={isStatic}
    >
      <Input
        id={id ?? generatedId}
        onFocus={(event) => {
          setIsFocused(true);
          if (onFocus) {
            onFocus(event);
          }
        }}
        onBlur={(event) => {
          setIsFocused(false);
          if (onBlur) {
            onBlur(event);
          }
        }}
        className={cn(
          'w-full',
          {
            'border-primary focus-visible:ring-primary': isFocused && !error,
            'border-error focus-visible:ring-error':
              error && errorType === 'error',
            'border-warning focus-visible:ring-warning':
              error && errorType === 'warning',
          },
          className
        )}
        {...props}
      />
    </InputLayout>
  );
};
