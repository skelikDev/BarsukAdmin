import * as React from 'react';
import { cn } from '@/shadcn/lib/utils.ts';
import IMask, { MaskedOptions } from 'imask';
import { FC, useEffect, useId, useRef } from 'react';

export type TInputProps = {
  maskOptions?: MaskedOptions;
} & React.ComponentProps<'input'>;

const Input = React.forwardRef<HTMLInputElement, TInputProps>(
  ({ className, maskOptions, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
      if (inputRef.current && maskOptions) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const mask = IMask(inputRef.current, maskOptions);
        mask.on('accept', () => {
          if (inputRef.current && 'dispatchEvent' in inputRef.current) {
            const event = new Event('input', { bubbles: true });
            inputRef.current.dispatchEvent(event);
          }
        });

        return () => {
          mask.destroy();
        };
      }
    }, [maskOptions]);

    React.useImperativeHandle(ref, () => inputRef.current!);

    return (
      <input
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={inputRef}
        {...props}
      />
    );
  }
);

type TInputDProps = {
  label?: string;
  error?: string | { text: string; type: 'error' | 'warning' };
  errorPosition?: 'top' | 'bottom';
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

export const InputD: FC<TInputDProps> = ({ errorPosition, ...props }) => {
  const generatedId = useId();
  const error =
    typeof props.error === 'string' ? props.error : props.error?.text;
  const errorType =
    typeof props.error === 'object' ? props.error.type : 'error';

  return (
    <div className={'h-[76px] relative flex flex-col justify-between'}>
      <div className={'flex h-5 pl-1 justify-between'}>
        {props.label && (
          <label className={'text-sm'} htmlFor={props.id ?? generatedId}>
            {props.label}
          </label>
        )}
        {error && errorPosition === 'top' && (
          <Error error={error} errorType={errorType} />
        )}
      </div>
      <Input
        id={props.id ?? generatedId}
        className={'absolute top-1/2 left-0 transform -translate-y-1/2 w-full'}
      />
      <div className={'flex h-5 pl-1'}>
        {error && errorPosition !== 'top' && (
          <Error error={error} errorType={errorType} />
        )}
      </div>
    </div>
  );
};

Input.displayName = 'Input';

export { Input };
