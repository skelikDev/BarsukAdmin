import styled from 'styled-components';
import { theme } from '../../../app/theme';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: ${theme.dimensions.spacing['14']};
  height: ${theme.dimensions.spacing['20']};
  justify-content: center;
  transition: all 0.2s;
`;

export const Error = styled.div`
  bottom: 0;
  position: absolute;
  padding-left: ${theme.dimensions.spacing[1]};
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.error.main};
  height: ${theme.dimensions.spacing['5']};
  width: 100%;
  ${theme.typography.caption};
`;

export const Label = styled.label`
  top: 0;
  position: absolute;
  padding-left: ${theme.dimensions.spacing[1]};
  display: block;
  color: ${theme.colors.text.ghost};
  width: 100%;
  height: ${theme.dimensions.spacing['5']};
  ${theme.typography.caption};
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: ${theme.dimensions.spacing[3]};
  transform: translateY(-50%);
  pointer-events: none;
`;

export type StyledInputProps = {
  $size?: 's' | 'm' | 'l';
  $error?: boolean
}

export const Input = styled.input<StyledInputProps>`
  width: 100%;
  height: ${theme.dimensions.spacing['10']};
  padding: ${theme.dimensions.spacing[2]} ${theme.dimensions.spacing[3]};
  font-size: ${theme.typography.fontSizes.base};
  font-family: ${theme.typography.fontFamily.sans};
  color: ${theme.colors.text.main};
  background-color: ${theme.colors.background.main};
  border: 1px solid ${theme.colors.border.main};
  border-radius: ${theme.dimensions.borderRadius.default};
  box-shadow: ${theme.shadows.xs};
  transition: all 0.2s;

  &::placeholder {
    color: ${theme.colors.text.disabled};
  }

  &:hover {
    border-color: ${theme.colors.border.hover};
  }

  &:focus {
    border-color: ${theme.colors.interactive.main};
    box-shadow: 0 0 0 3px ${theme.colors.interactive.main}33; /* 33 в конце означает 20% прозрачности */
    outline: none;
  }

  &:disabled {
    background-color: ${theme.colors.background.hover};
    color: ${theme.colors.text.disabled};
    border-color: ${theme.colors.border.main};
    cursor: not-allowed;
  }

  ${props => props.$error && `
    border-color: ${theme.colors.error.main};
    &:focus {
      border-color: ${theme.colors.error.main};
      box-shadow: 0 0 0 3px ${theme.colors.error.main}33;
    }
  `}

  ${props => props.$size === 's' && `
    padding: ${theme.dimensions.spacing[1]} ${theme.dimensions.spacing[2]};
    font-size: ${theme.typography.fontSizes.sm};
  `}

  ${props => props.$size === 'l' && `
    padding: ${theme.dimensions.spacing[3]} ${theme.dimensions.spacing[4]};
    font-size: ${theme.typography.fontSizes.lg};
  `}
`;
