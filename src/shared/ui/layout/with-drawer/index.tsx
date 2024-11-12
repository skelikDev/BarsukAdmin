import styled from "styled-components";
import { theme } from "../../../../app/theme";
import { FC, ReactNode } from "react";
import { Drawer } from "../../drawer";

interface LayoutWithDrawerProps {
  children: ReactNode;
  isOpenDrawer: boolean;
  onCloseDrawer?: () => void;
  onOpenDrawer?: () => void;
  drawerContent: ReactNode;
}

export const WithDrawer: FC<LayoutWithDrawerProps> = ({
  children,
  isOpenDrawer,
  onCloseDrawer,
  onOpenDrawer,
  drawerContent,
}) => {
  return (
    <LayoutContainer>
      <MainContent>{children}</MainContent>
      <Drawer
        withModChoose
        onClose={onCloseDrawer}
        isOpen={isOpenDrawer}
        onOpen={onOpenDrawer}
      >
        {drawerContent}
      </Drawer>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const MainContent = styled.main`
  flex-grow: 1;
  max-width: calc(100vw - ${theme.dimensions.spacing[20]});
  padding: ${theme.dimensions.spacing[5]};
  background-color: ${theme.colors.background.secondary};
  overflow-y: auto;
  overflow-x: hidden;
`;
