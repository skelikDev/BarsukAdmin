import React, { FC, ReactNode, useState } from "react";
import styled from "styled-components";
import { theme } from "../../../app/theme";
import { Menu } from "lucide-react";
import { Switch } from "../switch";

interface DrawerProps {
  withModChoose?: boolean;
  onClose?: () => void;
  isOpen?: boolean;
  onOpen?: () => void;

  children: ReactNode;
  closedContent?: ReactNode;
}

const useControl = ({
  withModChoose,
  isOutsideOpen,
  onClose,
  onOpen,
}: {
  withModChoose?: boolean;
  isOutsideOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}) => {
  const isControlled = isOutsideOpen !== undefined;

  const [isInnerOpen, setIsInnerOpen] = useState(false);
  const [isAlwaysOpen, setIsAlwaysOpen] = useState(false);
  const handleOpen = () => {
    if (isControlled) {
      onOpen && onOpen();
    } else {
      setIsInnerOpen(true);
      onOpen && onOpen();
    }
  };

  const handleClose = () => {
    if (isControlled) {
      onClose && onClose();
    } else {
      setIsInnerOpen(false);
      onClose && onClose();
    }
  };

  const isOpen = isAlwaysOpen
    ? true
    : isOutsideOpen !== undefined
      ? isOutsideOpen
      : isInnerOpen;
  const isBackdrop = isOpen && !isAlwaysOpen;
  return {
    isOpen,
    isBackdrop,
    isAlwaysOpen,
    setIsAlwaysOpen,
    handleOpen,
    handleClose,
  };
};

export const Drawer: FC<DrawerProps> = ({
  withModChoose,

  isOpen: isOutsideOpen,
  onClose,
  onOpen,
  children,
  closedContent,
}) => {
  const {
    isAlwaysOpen,
    setIsAlwaysOpen,
    handleOpen,
    isOpen,
    isBackdrop,
    handleClose,
  } = useControl({
    withModChoose,
    isOutsideOpen,
    onClose,
    onOpen,
  });

  const showedContent = closedContent
    ? isOpen
      ? children
      : closedContent
    : children;

  return (
    <Wrapper $isAlwaysOpen={isAlwaysOpen}>
      <DrawerContainer $isOpen={isOpen}>
        <Actions>
          {isAlwaysOpen ? (
            <div />
          ) : (
            <OpenDrawerButton onClick={handleOpen}>
              <Menu />
            </OpenDrawerButton>
          )}
          <div>
            Закрепить меню
            <Switch
              value={isAlwaysOpen}
              onChange={(value) => {
                setIsAlwaysOpen(value);
              }}
            />
          </div>
          {isAlwaysOpen ? (
            <div />
          ) : (
            isOpen && <CloseButton onClick={handleClose}>X</CloseButton>
          )}
        </Actions>
        <Content>{showedContent}</Content>
      </DrawerContainer>
      {isBackdrop && (
        <Backdrop
          onClick={(event) => {
            event.currentTarget === event.target && handleClose();
          }}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $isAlwaysOpen?: boolean }>`
  width: ${({ $isAlwaysOpen }) =>
    $isAlwaysOpen ? theme.dimensions.sizes.md : theme.dimensions.spacing["20"]};
`;

const Actions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.dimensions.spacing[5]};
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 100vw;
  background-color: ${theme.colors.background.secondary};
  opacity: 0.9;
  z-index: 100;
`;

const DrawerContainer = styled.div<{
  $isOpen: boolean;
}>`
  position: fixed;
  top: 0;
  right: 0;
  width: ${({ $isOpen }) =>
    $isOpen ? theme.dimensions.sizes.md : theme.dimensions.spacing["20"]};
  height: 100vh;
  background-color: ${theme.colors.background.main};
  box-shadow: ${theme.shadows.lg};
  transition: width 0.3s ease-in-out;
  z-index: 150;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CloseButton = styled.button`
  top: ${theme.dimensions.spacing[3]};
  right: ${theme.dimensions.spacing[3]};
  background: none;
  border: none;
  font-size: ${theme.typography.fontSizes.base};
  cursor: pointer;
  color: ${theme.colors.text.main};
  transition: color 0.2s;

  &:hover {
    color: ${theme.colors.interactive.main};
  }
`;

const Content = styled.div`
  padding: ${theme.dimensions.spacing[4]};
  display: flex;
  flex-direction: column;
  gap: ${theme.dimensions.spacing[4]};
`;

const OpenDrawerButton = styled.button`
  top: ${theme.dimensions.spacing[3]};
  left: ${theme.dimensions.spacing[3]};
  background: none;
  border: none;
  font-size: ${theme.typography.fontSizes.lg};
  cursor: pointer;
  color: ${theme.colors.text.main};
  z-index: 200;

  &:hover {
    color: ${theme.colors.interactive.main};
  }
`;
