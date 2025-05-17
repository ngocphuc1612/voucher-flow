import type { PropsWithChildren } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons/Logo';
import { SidebarNav } from './SidebarNav';
import { UserCircle, Settings, LogOut } from 'lucide-react';

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" variant="sidebar" className="border-r">
        <SidebarHeader className="p-4 items-center">
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <Logo />
            <h1 className="text-xl font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
              VoucherFlow
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-2 mt-auto border-t">
           {/* Placeholder for user profile/settings - can be expanded later */}
          <div className="group-data-[collapsible=icon]:hidden flex flex-col gap-2">
            <Button variant="ghost" className="justify-start w-full text-sidebar-foreground">
              <UserCircle className="mr-2 h-5 w-5" /> Profile
            </Button>
            <Button variant="ghost" className="justify-start w-full text-sidebar-foreground">
              <Settings className="mr-2 h-5 w-5" /> Settings
            </Button>
            <Button variant="ghost" className="justify-start w-full text-sidebar-foreground">
              <LogOut className="mr-2 h-5 w-5" /> Logout
            </Button>
          </div>
           <div className="hidden group-data-[collapsible=icon]:flex flex-col gap-2 items-center">
            <Button variant="ghost" size="icon" className="text-sidebar-foreground"><UserCircle className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="text-sidebar-foreground"><Settings className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="text-sidebar-foreground"><LogOut className="h-5 w-5" /></Button>
           </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-4">
          <SidebarTrigger className="md:hidden" />
          {/* Breadcrumbs or page title can go here */}
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
