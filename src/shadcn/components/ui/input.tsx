import * as React from 'react';
import { cn } from '@/shadcn/lib/utils.ts';
import IMask, { MaskedOptions } from 'imask';
import { ComponentPropsWithoutRef, ReactNode, useEffect, useRef } from 'react';
import { Primitive } from '@radix-ui/react-primitive';
import classes from './input.module.css';
export type TInput1Props = {
  maskOptions?: MaskedOptions;
} & React.ComponentPropsWithoutRef<typeof Primitive.input>;

export type TInputProps = {
  before?: ReactNode;
  after?: ReactNode;
  status?: 'default' | 'success' | 'warning' | 'error';
  maskOptions?: MaskedOptions;
} & ComponentPropsWithoutRef<typeof Primitive.input>;

export const Input = React.forwardRef<HTMLInputElement, TInputProps>(
  ({ before, after, status, className, maskOptions, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
      if (inputRef.current && maskOptions) {
        console.log(maskOptions);
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
    const wrapperClasses = cn(
      'h-9 w-full rounded-md bg-transparent shadow-sm focus-visible:ring-1',
      'relative inline-flex items-center w-full',
      'rounded-md border shadow-sm',
      {
        [classes?.default?.toString() ?? '']:
          status === 'default' || status === undefined,
      },
      { [classes.error?.toString() ?? '']: status === 'error' },
      { [classes.success?.toString() ?? '']: status === 'success' },
      { [classes.warning?.toString() ?? '']: status === 'warning' },
      className
    );

    const inputClasses = cn(
      'w-full appearance-none border-none bg-transparent focus:outline-none',
      'px-3 py-2 placeholder-gray-400 text-base leading-5',
      'placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground'
    );

    return (
      <div className={wrapperClasses}>
        {before && <span className="flex items-center pl-2">{before}</span>}
        <input ref={inputRef} className={inputClasses} {...props} />
        {after && (
          <span className="relative flex items-center pr-2">{after}</span>
        )}
      </div>
    );
  }
);
