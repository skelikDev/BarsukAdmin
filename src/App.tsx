import {
  SidebarProvider,
  useSidebar,
} from '@/shadcn/components/ui/sidebar.tsx';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { AppSidebar } from '@/widgets/ui-composition/app-sidebar';
import { UserSearchForm } from '@/widgets/user-search-form';
import { MenuIcon } from 'lucide-react';
import { FC } from 'react';
import { ThemeProvider } from '@/app/theme-provider';
import { ModeToggle } from '@/shared/ui/mode-toggle';
import { TooltipProvider } from '@/shadcn/components/ui/tooltip.tsx';
import { Cashier } from './widgets/cashier';
import { Toaster } from '@/shadcn/components/ui/toaster.tsx';

type TLayoutProps = {};

const Layout: FC<TLayoutProps> = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="flex w-full grow flex-col bg-background">
      <div className="flex items-center justify-between p-4">
        <ModeToggle />
        <span>LOGO</span>
        <div className={'flex items-center gap-4'}>
          <UserSearchForm className={'w-60'} />
          <div
            className={
              'flex h-9 w-9 cursor-pointer items-center justify-center rounded-md hover:bg-primary-foreground hover:bg-opacity-10'
            }
          >
            <MenuIcon onClick={toggleSidebar} size={24} />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <SidebarProvider defaultOpen={false}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/cashier" element={<Cashier />}>
                  <Route path="/cashier/:id" element={<Cashier />} />
                </Route>
                <Route path="/pos" element={<>ieieieieieiie</>} />
              </Route>
            </Routes>
          </BrowserRouter>
          <AppSidebar side={'right'} collapsible={'icon'} />
          <Toaster />
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
