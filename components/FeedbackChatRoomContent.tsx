import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector, useAppStore } from '../reduxstore/app/hooks';

import { SidebarTrigger } from "@/components/ui/sidebar";
import IssueHeroCard from "./complaintCard";
import { ActionModal } from "./glabalModalAction";
import type {Complains} from '../types_this_is_exhausting/types'





const FeedbackChatRoomContent: React.FC = () => {
    const dispatch = useAppDispatch();
    const select = useAppSelector;
    const store = useAppStore;
    const [modalType, setModalType] = useState<"assign" | "severity" | "resolve" | null>(null);

    
    const admin_id = select((state) => state.admin.admin?.pk);
    const complaints = select((state) => state.complains.complain)
    useEffect(() => {
            getComplaints();
        }, []);



    async function getComplaints() {
        try {
            console.log("Admin ID: ", admin_id);
            const response = await axios.post('http://127.0.0.1:8000/getcomplaints/', {admin: admin_id});
            dispatch({type: 'complain/setComplain', payload: response.data.data});
            // ✅ Ensure it parses into `Complain[]`
            const complaintsData: Complains[] = (response.data.data);
            console.log("Complaints Data: ", complaintsData)
            console.log("Complaints Data From Store: ", complaints);
           



            // ✅ Now `setComplaints` works because it's setting `Complain[]`
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
        }
    }

    

   
    

 


  





    


    const openModal = (type: "assign" | "severity" | "resolve" ) => {
        setModalType(type);
    }
 




    return (
        <div className='min-h-[1000px] '>
            <ActionModal 
            open={!!modalType}
            onCLose={() => setModalType(null)}
            actionType={modalType!}
             />
            <div className=" h-10 px-4 flex flex-cols justify-between items-center">
                <SidebarTrigger size={'lg'} className="h-7" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-orange-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

            </div>
            <div className="message ml-15 mb-6 font-medium text-3xl transition delay-150 duration-700 ease-in">
                One Problem at a time my
            </div>
            <div className="ml-6 content h-full">
                <div className="layer-1 flex flex-row justify-between  gap-4 h-30 w-[80%]">
                    <div className="rounded-md stats layer-c-1 bg-purple-50 basis-78 overflow-hidden">
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-8 w-8 stroke-current text-green-500">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </div>
                            <div className="stat-title text-stone-700 mt-2">Total Issues Resolved</div>
                            <div className="stat-value text-green-500">25.6K</div>
                            <div className="stat-desc text-stone-700">21% more than last month</div>
                        </div>
                    </div>
                    <div className="rounded-md layer-c-1 bg-purple-50 basis-54" >
                    <div className="stat flex flex-col justify-between items-center pt-4">
                            
                            <div className="stat-title text-stone-700 mt-0">Total Issues last Month</div>
                            <div className="stat-value text-green-500 mt-2">25.6K</div>
                            <div className="stat-desc text-stone-700 mb-2">21% more than last month</div>
                        </div>
                    </div>
                    <div className="rounded-md layer-c-1 bg-purple-50 basis-123"></div>
                </div>
                <div className="w-[80%] my-4 flex flex-col justify-center items-center">
                <hr className="h-[1px] w-[100%] border-slate-100"></hr>

                </div>
                <div className="layer-2 flex flex-row gap-4 h-60 w-[80%] justify-between mt-4">
                    <div className="layer-c-1 rounded-2xl   w-[100%]">
                        <IssueHeroCard 
                        triggerAction = {openModal}
                        />
                    </div>
                
                </div>
            </div>
        </div>

    );

};
export default FeedbackChatRoomContent