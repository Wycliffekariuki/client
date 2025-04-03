import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/appSidebar"

export default function NewFeedbackChatRoom({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
      <AppSidebar />
      </Sidebar>
      <div className="w-full bg-slate-500">
        <SidebarTrigger style={{backgroundColor: 'transparent'}}> </SidebarTrigger>
        {children}
      </div>
    </SidebarProvider>
  )
}
