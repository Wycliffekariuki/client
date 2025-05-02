import { Sidebar, SidebarProvider } from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/appSidebar"

export default function NewFeedbackChatRoom({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-white">
      <Sidebar className=" bg-white">
      <AppSidebar />
      </Sidebar>
      <div className="w-full h-[100%] bg-yellow-100">
        {children}
      </div>
    </SidebarProvider>
  )
}
