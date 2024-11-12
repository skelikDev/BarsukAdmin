import styled from "styled-components";
import { theme } from "../../../app/theme";
import { FC } from "react";

export type SwitchProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export const Switch: FC<SwitchProps> = ({ value, onChange }) => {
  return (
    <SwitchWrapper onClick={() => onChange(!value)} $isActive={value}>
      <SwitchKnob $isActive={value} />
    </SwitchWrapper>
  );
};

const SwitchWrapper = styled.div<{ $isActive: boolean }>`
  width: 40px;
  height: 20px;
  border-radius: 10px;
  background-color: ${({ $isActive }) =>
    $isActive
      ? theme.colors.interactive.main
      : theme.colors.interactive.disabled};
  display: flex;
  align-items: center;
  padding: 2px;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const SwitchKnob = styled.div<{ $isActive: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${theme.colors.background.main};
  transform: ${({ $isActive }) =>
    $isActive ? "translateX(20px)" : "translateX(0)"};
  transition: transform 0.3s;
`;
