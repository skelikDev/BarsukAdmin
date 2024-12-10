import {
    Sidebar,
    SidebarContent, SidebarFooter, SidebarGroup,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from '@/components/ui/sidebar.tsx';
import {
    Banknote,
    CreditCardIcon,
    Trash2Icon
} from 'lucide-react';
import { FC } from 'react';

const items = [
    {
        title: "Касса",
        url: "/cashier",
        icon: Banknote,
    },
    {
        title: "Касса тест POS",
        url: "/pos",
        icon: CreditCardIcon,
    },
    {
        title: "Hecbr [eq cjcb",
        url: "/pos",
        icon: Trash2Icon,
    },

]

type TAppSidebarProps = {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
}

export const AppSidebar: FC<TAppSidebarProps> = ({
                                                     side,
                                                     variant,
                                                     collapsible
                                                 }) => {
    return (
        <Sidebar {...{side, variant, collapsible}}>
            <SidebarHeader/>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <a href={item.url}>
                                        <item.icon/>
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup/>
            </SidebarContent>
            <SidebarFooter/>
        </Sidebar>
    )
}