"use client"
import { RootState } from "reduxstore/store";
import { useAppDispatch, useAppSelector, useAppStore } from "../../reduxstore/app/hooks";
import { Label } from "@/components/ui/label"
import {  SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar"
import { SidebarHeader, SidebarMenuItem, SidebarMenu, } from "@/components/ui/sidebar";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"






export function AppSidebar() {
  const select = useAppSelector;
  const dispatch = useAppDispatch();
  const complaints = select((state)  => state.complains.complain);
  console.log("Complaints from AppSidebar: ", complaints);


  const updateSelectedComplain = (index: number) => {
    dispatch({ type: "selectedComplain/setSelectedComplain", payload: { index } });
  }


  const handleComplainClick = (index: number) => {
    updateSelectedComplain(index);
  };



   



  return (
    <SidebarContent className="">
      <SidebarHeader>
        {/* <SidebarMenu>
          <SidebarMenuItem className='h-10 w-auto'>
            <img src="https://workspace.optiven.co.ke/static/media/optiven-logo-full.f498da6255572ff1ab8a.png" alt="Optiven" />
          </SidebarMenuItem>
        </SidebarMenu> */}
        <SidebarMenu>
        <SidebarMenuItem className='h-10 w-auto mb-2'>
            <img className='h-full w-auto self-start' src="https://workspace.optiven.co.ke/static/media/optiven-logo-full.f498da6255572ff1ab8a.png" alt="Optiven" />
          </SidebarMenuItem>
          <SidebarMenuItem className="bg-white">
            <div className='flex flex-cols justify-between items-center'>
          <Label htmlFor="options">Filter:</Label>
      <Select defaultValue='option1' style={{backgroundColor: 'transparent',borderRadius: 'none', boxShadow: 'none'}}>
        <SelectTrigger id="options" className='rounded-none border-none' style={{backgroundColor: 'transparent'}}>
          <SelectValue placeholder="Option 1" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
      <div></div>
      </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Complains</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>

              
            {complaints && complaints.length > 0 ? (
               console.log("User ID data", complaints),
  complaints[0].map(({ user_id, title, time_stamp, severity }, index) => (
   
    <SidebarMenuItem onClick={() => handleComplainClick(index)} key={index} className='flex py-2  flex-cols justify-center hover:bg-sky-100 rounded-4xl cursor-pointer' >
                <div className='w-[20%] flex flex-col justify-center items-center'>
                <div className={`w-[15px] h-[15px] rounded-full ${severity === 'H' && 'bg-red-500' } ${severity === 'L' && 'bg-yellow-500' } ${severity === 'M' && 'bg-orange-600' } `}></div>
                </div>

                <div className='w-[80%] grid h-23 justify-start items-center '>
                  <p className='line-clamp-2 max-w-[90%] font-medium'>{title}</p>
              
                  <p className='font-medium text-[12px] mt-2'>{user_id.first_name} {user_id.last_name}</p><p className='w-[85%] flex flex-cols justify-between w-'><span><CalendarIcon className='h-5'/></span>
                  <span className='font-medium text-[12px]'>{time_stamp ? formatDistanceToNow(new Date(time_stamp), { addSuffix: true }) : 'Just now'}</span></p>
                </div>
                <div></div>
                
            </SidebarMenuItem> 
   
  ))
) : (
  <div className='p-4 text-center'>No complaints found</div>
)}

             
            {/* <SidebarMenuItem className='flex py-2  flex-cols justify-center hover:bg-sky-100 rounded-4xl cursor-pointer' >
                <div className='w-[20%] flex flex-col justify-center items-center'>
                <div className=' bg-red-500 w-[15px] h-[15px] rounded-full'></div>
                </div>

                <div className='w-[80%] grid h-23 justify-start items-center '>
                  <p className='line-clamp-2 w-[85%] font-medium'>I am writing to Optiven to report an issue jaslkdjfskdlj;sss</p>

                  <p className='font-medium text-[12px] mt-2'>John Kuria</p><p className='w-[85%] flex flex-cols justify-between w-'><span><CalendarIcon className='h-5'/></span><span className='font-medium text-[12px]'>5 minutes ago</span></p>
                </div>
                <div></div>
                
            </SidebarMenuItem> */}
            {/* <SidebarMenuItem className='flex py-2  flex-cols justify-center hover:bg-sky-100 rounded-4xl cursor-pointer' >
                <div className='w-[20%] flex flex-col justify-center items-center'>
                <div className=' bg-orange-500 w-[15px] h-[15px] rounded-full'></div>
                </div>

                <div className='w-[80%] grid h-23 justify-start items-center '>
                  <p className='line-clamp-2 w-[85%]'>I am writing to Optiven to report an issue jaslkdjfskdlj;sss</p>

                  <p className=''>John Kuria</p><p className='w-[85%] flex flex-cols justify-between w-'><span><CalendarIcon className='h-5'/></span>5 minutes ago</p>
                </div>
                <div></div>
                
            </SidebarMenuItem>
            <SidebarMenuItem className='flex py-2  flex-cols justify-center hover:bg-sky-100 rounded-4xl cursor-pointer' >
                <div className='w-[20%] flex flex-col justify-center items-center'>
                <div className=' bg-yellow-500 w-[15px] h-[15px] rounded-full'></div>
                </div>

                <div className='w-[80%] grid h-23 justify-start items-center '>
                  <p className='line-clamp-2 w-[85%]'>I am writing to Optiven to report an issue jaslkdjfskdlj;sss</p>

                  <p className=''>John Kuria</p><p className='w-[85%] flex flex-cols justify-between w-'><span><CalendarIcon className='h-5'/></span>5 minutes ago</p>
                </div>
                <div></div>
                
            </SidebarMenuItem> */}
           
          
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarContent>
  )
}
