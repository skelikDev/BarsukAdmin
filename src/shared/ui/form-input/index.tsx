import { FC, forwardRef, ReactNode, useId, useState } from 'react';
import { Input, TInputProps } from '@/shadcn/components/ui/input.tsx';
import { cn } from '@/shadcn/lib/utils.ts';
import { CircleAlert } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shadcn/components/ui/tooltip';
import classes from './form-input.module.css';

export type TFormInputProps = {
  label?: string;
  extraText?: string;
  status?: 'default' | 'success' | 'warning' | 'error';
  extraTextPosition?: 'top' | 'bottom' | 'icon';
} & TInputProps;

type TErrorProps = {
  children?: string;
  status: 'default' | 'success' | 'warning' | 'error';
};

const ExtraText: FC<TErrorProps> = ({ children, status }) => {
  if (!children) {
    return null;
  }

  return (
    <span
      className={cn('text-xs', {
        'text-success': status === 'success',
        'text-warning': status === 'warning',
        'text-error': status === 'error',
        'text-primary': status === 'default',
      })}
    >
      {children}
    </span>
  );
};

type TInputLayoutProps = {
  label?: string;
  extraText?: string;
  status?: 'default' | 'success' | 'warning' | 'error';
  extraTextPosition?: 'top' | 'bottom' | 'icon';
  onFocus?: () => void;
  onBlur?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children: ReactNode;
};

const InputLayout: FC<TInputLayoutProps> = (props) => {
  const {
    label,
    extraText,
    status,
    extraTextPosition,
    children,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const isTopExtraText =
    extraText &&
    (extraTextPosition === 'top' || extraTextPosition === undefined);

  const isBottomExtraText = extraText && extraTextPosition === 'bottom';
  return (
    <div
      className={cn('flex w-full flex-col')}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {(label || isTopExtraText) && (
        <div className={'flex justify-between'}>
          {label && label}
          {extraText && isTopExtraText && (
            <ExtraText status={status ?? 'default'}>{extraText}</ExtraText>
          )}
        </div>
      )}
      {children}
      {extraText && isBottomExtraText && <div>{extraText}</div>}
    </div>
  );
};

export const FormInput = forwardRef<HTMLInputElement, TFormInputProps>(
  (
    {
      label,
      extraText,
      status,
      extraTextPosition,
      after,
      id,
      className,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const isIconExtraText = extraText && extraTextPosition === 'icon';
    const mergedExtraText = isIconExtraText ? (
      <>
        <TooltipTrigger asChild>
          <div className={'absolute left-0 top-0'} />
        </TooltipTrigger>
        <CircleAlert
          size={16}
          className={cn(classes.icon)}
          data-status={status ?? 'default'}
        />
      </>
    ) : (
      after
    );

    const tooltipContent = extraText && (
      <TooltipContent side={'top'} align={'start'}>
        {extraText}
      </TooltipContent>
    );

    return (
      <Tooltip open={Boolean(tooltipContent && (isFocused || isHovered))}>
        {tooltipContent}
        <InputLayout
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          label={label}
          extraText={extraText}
          status={status}
          extraTextPosition={extraTextPosition}
        >
          <Input
            ref={ref}
            {...props}
            id={id ?? generatedId}
            className={className}
            after={mergedExtraText}
            status={status}
          />
        </InputLayout>
      </Tooltip>
    );
  }
);

FormInput.displayName = 'FormInput';
