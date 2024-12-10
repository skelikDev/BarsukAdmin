import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar.tsx';
import { AppSidebar } from '@/components/ui-composition/app-sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserSearchForm } from '@/components/user-search-form';

function App() {

    return (

        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            <BrowserRouter>
                <Routes>
                    <Route path="/cashier" element={<><UserSearchForm/></>} />
                    <Route path="/pos" element={< >ieieieieieiie</>} />
                </Routes>
            </BrowserRouter>
        </SidebarProvider>
    )
}

export default App
