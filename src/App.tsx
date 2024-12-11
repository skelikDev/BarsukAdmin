import {
  SidebarProvider,
  useSidebar,
} from '@/shadcn/components/ui/sidebar.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppSidebar } from '@/widgets/ui-composition/app-sidebar';
import { UserSearchForm } from '@/widgets/user-search-form';
import { MenuIcon } from 'lucide-react';
import { FC } from 'react';

type TLayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<TLayoutProps> = ({ children }) => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="flex flex-col grow w-full">
      <div className="flex items-center justify-between p-4">
        <span>LOGO</span>
        <MenuIcon onClick={toggleSidebar} size={24} />
      </div>
      <div className="flex-1 bg-gray-200">{children}</div>
    </div>
  );
};

function App() {
  return (
    <SidebarProvider defaultOpen={false}>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route
              path="/cashier"
              element={
                <>
                  <UserSearchForm />
                </>
              }
            />
            <Route path="/pos" element={<>ieieieieieiie</>} />
          </Routes>
        </BrowserRouter>
      </Layout>
      <AppSidebar side={'right'} collapsible={'icon'} />
    </SidebarProvider>
  );
}

export default App;
