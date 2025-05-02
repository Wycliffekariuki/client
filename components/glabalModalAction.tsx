import React, { useEffect, useState} from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { ChevronDownIcon } from "lucide-react";
import { UserPlus } from "lucide-react"
import { AlertTriangle } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { AllAdmins } from "types_this_is_exhausting/types";
import axios from "axios";


interface ActionModalProps {
  open: boolean
  onCLose: () => void
  actionType: "assign" | "severity" | "resolve"
}






export function ActionModal({ open, onCLose, actionType}: ActionModalProps) {
   const [admins, setAdmins] = useState<AllAdmins[]>([]);
   const [adminId, setAdminId] = useState<number | null>(null)
   useEffect(() => {
    getAllAdmins();
}, []);

   const getAllAdmins = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/getalladmins/');
      if (response.status === 200) {
        console.log("Admins: ", response.data.data);
        const adminsData: AllAdmins[] = response.data.data;
        setAdmins(adminsData);
      }
      if (response.status === 500) {
        console.log("Internal Server Error: ", response.data.err);
      }
    }catch(error) {
      console.error("Error fetching admins: ", error);
    }
   }
   


   const reassignAdmin = async(admin) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/reassignadmin/', {admin:  admin});
      if (response.status === 200) {
        console.log("Admin Reassigned: ", response.data.message);
      }else if( response.status === 400) {
        console.log("At reassignAdmin: ",response.data.message,"Error: ")
      }else if (response.status === 500) {
        console.log("At reassignAdmin: ", response.data.err)
      }
    } catch (error) {
      
    }

   }
  




  console.log("actionType", actionType);
  return (
    <Dialog open={open} onOpenChange={onCLose}>
      <DialogContent>
      
     {actionType === "assign" && ( 
      <div className="bg-gradient-to-r from-indigo-50 to-white border border-indigo-200 rounded-3xl p-8 shadow-lg max-w-3xl mx-auto mt-10">
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0 bg-indigo-100 p-4 rounded-full">
          <UserPlus className="text-indigo-600 w-8 h-8" />
        </div>
        {admins && admins.length > 0 ? (
           <div className="flex-1">
           <h2 className="text-2xl font-bold text-slate-800 mb-2">Reassign Complaint</h2>
           <p className="text-slate-600 mb-6">
             Please select a new admin to handle this complaint. Only available admins are listed below.
           </p>
 
           <div className="mb-4">
             <label className="block text-slate-700 font-medium mb-1">Select Admin</label>
            
             <select
               defaultValue=""
               onChange={() => {}}
               className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
               
             >
                   <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-600" />
                   {admins.map(({ id, user_id, department }, index) => (
                     <option key={index} value={id}>{user_id.first_name} {user_id.last_name} {department} </option>
                   ))}
                   
                   
               {/* <option value={id}>{user_id.first_name} {user_id.last_name} {department} </option> */}
               {/* <option value="adminC">Admin C</option> */}
               
             </select>
           </div>
 
           <button
             onClick={() => {}}
             className="w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition"
           >
             Reassign to Admin
           </button>
         </div>
            

            ) : (
              <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">No Admins Available</h2>
              <p className="text-slate-600 mb-6">
                No admins are available to handle this complaint at the moment.
              </p>
              <button
                onClick={() => {}}
                className="w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition"
                >Close</button>
              </div>

            )}
       
      </div>
    </div>
     )}
     {actionType === "severity" && (
      <div className="bg-gradient-to-r from-yellow-50 to-white border border-yellow-200 rounded-3xl p-8 shadow-lg max-w-3xl mx-auto mt-10">
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0 bg-yellow-100 p-4 rounded-full">
          <AlertTriangle className="text-yellow-600 w-8 h-8" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Adjust Complaint Severity</h2>
          <p className="text-slate-600 mb-6">
            Please select the new severity level for this complaint. Choose the appropriate level based on the issue's impact.
          </p>

          <div className="mb-4">
            <label className="block text-slate-700 font-medium mb-1">Select Severity Level</label>
            <select
              value="medium"
              onChange={() => {}}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              // disabled
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <button
            onClick={() => {}}
            className="w-full py-3 rounded-xl font-semibold text-white bg-yellow-600 hover:bg-yellow-700 transition"
          >
            Confirm Severity Change
          </button>
        </div>
      </div>
    </div>
     )}
     {actionType === "resolve" && (
       <div className="bg-gradient-to-r from-green-50 to-white border border-green-200 rounded-3xl p-8 shadow-lg max-w-3xl mx-auto mt-10">
       <div className="flex items-start gap-6">
         <div className="flex-shrink-0 bg-green-100 p-4 rounded-full">
           <CheckCircle className="text-green-600 w-8 h-8" />
         </div>
         <div className="flex-1">
           <h2 className="text-2xl font-bold text-slate-800 mb-2">Mark Complaint as Resolved</h2>
           <p className="text-slate-600 mb-6">
             Are you sure you want to mark this complaint as resolved? Once resolved, it will be closed and cannot be changed.
           </p>
 
           <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6 text-slate-700">
             <p className="text-lg font-medium">
               By marking this complaint as resolved, it will no longer be active.
             </p>
           </div>
 
           <button
             onClick={() => {onCLose()}}
             className="w-full py-3 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 transition"
           >
             Mark as Resolved
           </button>
         </div>
       </div>
     </div>
     )}
     </DialogContent>
      {/* <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent> */}
    </Dialog>
  )
}
