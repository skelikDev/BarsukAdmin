import styled from 'styled-components';
import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { theme } from '../../../app/theme';

export type StyledButtonProps = {
  $size?: 's' | 'm' | 'l';
  $variant?: 'primary' | 'secondary' | 'danger';
  $disabled?: boolean;
  $fullWidth?: boolean;
};

export const ButtonWrapper = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
  padding: ${({ theme, $size }) => {
    switch ($size) {
      case 's':
        return `${theme.dimensions.spacing[1]} ${theme.dimensions.spacing[2]}`;
      case 'l':
        return `${theme.dimensions.spacing[3]} ${theme.dimensions.spacing[4]}`;
      default:
        return `${theme.dimensions.spacing[2]} ${theme.dimensions.spacing[3]}`;
    }
  }};
  font-size: ${({ theme, $size }) => {
    switch ($size) {
      case 's':
        return theme.typography.fontSizes.sm;
      case 'l':
        return theme.typography.fontSizes.lg;
      default:
        return theme.typography.fontSizes.base;
    }
  }};
  font-family: ${theme.typography.fontFamily.sans};
  color: ${({
              theme,
              $variant,
            }) => $variant === 'primary' ? theme.colors.text.inverse : theme.colors.text.main};
  background-color: ${({ theme, $variant }) => {
    switch ($variant) {
      case 'secondary':
        return theme.colors.background.secondary;
      case 'danger':
        return theme.colors.error.main;
      default:
        return theme.colors.interactive.main;
    }
  }};
  border: none;
  border-radius: ${theme.dimensions.borderRadius.default};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  box-shadow: ${theme.shadows.xs};
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme, $variant, $disabled }) =>
            $disabled ? 'inherit' : $variant === 'danger' ? theme.colors.error.dark : theme.colors.interactive.hover};
  }

  &:active {
    background-color: ${({ theme, $variant, $disabled }) =>
            $disabled ? 'inherit' : $variant === 'danger' ? theme.colors.error.darkest : theme.colors.interactive.active};
  }

  &:disabled {
    opacity: 0.6;
  }
`;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  size?: 's' | 'm' | 'l';
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, icon, size, variant, fullWidth, ...props }, ref) => {

    return (
      <ButtonWrapper ref={ref} $size={size} $variant={variant}
                     $fullWidth={fullWidth} {...props}>
        {icon && <span
          style={{ marginRight: icon && children ? '8px' : '0' }}>{icon}</span>}
        {children}
      </ButtonWrapper>
    );
  },
);

Button.displayName = 'Button';
