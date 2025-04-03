"use client"
import * as React from 'react';
import { Label } from "@/components/ui/label"
import {  SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar"
import { SidebarHeader, SidebarMenuItem, SidebarMenu, } from "@/components/ui/sidebar";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Complains } from 'types_this_is_exhausting/types';
import { CalendarIcon } from "lucide-react"






export function AppSidebar() {
        



  return (
    <SidebarContent>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="bg-white">
            <div className='flex flex-cols justify-center items-center'>
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
      </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Complains</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>

              

            <SidebarMenuItem className='flex py-2  flex-cols justify-center hover:bg-sky-100 rounded-4xl cursor-pointer' >
                <div className='w-[20%] flex flex-col justify-center items-center'>
                <div className=' bg-red-500 w-[15px] h-[15px] rounded-full'></div>
                </div>

                <div className='w-[80%] grid h-23 justify-start items-center '>
                  <p className='line-clamp-2 w-[85%] font-medium'>I am writing to Optiven to report an issue jaslkdjfskdlj;sss</p>

                  <p className='font-medium text-[12px] mt-2'>John Kuria</p><p className='w-[85%] flex flex-cols justify-between w-'><span><CalendarIcon className='h-5'/></span><span className='font-medium text-[12px]'>5 minutes ago</span></p>
                </div>
                <div></div>
                
            </SidebarMenuItem>
            <SidebarMenuItem className='flex py-2  flex-cols justify-center hover:bg-sky-100 rounded-4xl cursor-pointer' >
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
                
            </SidebarMenuItem>
           
          
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarContent>
  )
}
