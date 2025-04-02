import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type { TypedUseSelectorHook } from 'react-redux';
import { useAppSelector, useAppDispatch, useAppStore } from '../reduxstore/app/hooks';
import type {Field, Fields, Complains, Users, UserField, AllFields, BasicResponse} from '../types_this_is_exhausting/types'
import { useNavigate } from 'react-router';




const FeedbackChatRoom: React.FC = () => {
     const dispatch = useAppDispatch();
     const select = useAppSelector;
     const navigate = useNavigate();
     const store = useAppStore();
    const [complaints, setComplaints] = useState<Complains[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [filterKey, setFilterKey] = useState<string>('');
    const [Allfields, setAllFields] = useState<AllFields>();
    const [complainLoading, setComplainLoading] = useState<boolean>(false)
    

   
   

    async function getComplaints() {
        try {
            setLoading(true);
            const response = await axios.get('http://127.0.0.1:8000/getcomplaints/');

            // ✅ Ensure it parses into `Complain[]`
            const complaintsData: Complains[] = JSON.parse(response.data.data);


            const sortedComplaintsData = await sortComplaints('Priority', complaintsData);


            // ✅ Now `setComplaints` works because it's setting `Complain[]`
            setComplaints(sortedComplaintsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    async function sortComplaints(filterKey: string, array: Complains[]): Promise<Complains[]> {
        if (filterKey === 'Priority') {
            const priorityOrder: Record<string, number> = { H: 1, M: 2, L: 3 };

            return array.slice().sort((a, b) =>
                priorityOrder[a.fields.severity] - priorityOrder[b.fields.severity]
            );
        }else if (filterKey === 'Time') {
            return array.slice().sort((a, b) =>
                new Date(b.fields.time_stamp).getTime() - new Date(a.fields.time_stamp).getTime()
            )
        }
        return array;
    }

    const handleSort = async (filterKey: string) => {
        const sortedComplaintsData = await sortComplaints(filterKey, complaints);
        setComplaints(sortedComplaintsData);
    }



    async function getComplain(fields: Field){
        try {
            
            const response = await axios.post('http://127.0.0.1:8000/getcomplain/', {user: fields.user_id, admin: fields.admin_id} )
            if(response.status === 200) {
                console.log("Success")


                return {error: false,data: {userData: JSON.parse(response.data.data.userData), adminData: JSON.parse(response.data.data.adminData)}};


            }else if(response.status === 400){
                return {error: true,data: response.data.data};

            }else if( response.status === 500){
                return {error: true,data: response.data.data};

            }

        } catch (error) {
            console.log(error)
            return {error: true, message: "At getComplain:..."+error}
            
        }

    }

    const returnFullUser = (userData: Users[]) => {
        try {
            let userDataObj: UserField = {first_name: '',
                last_name: '',
                email: '',
                phone: '',
                country: '',
                time_stamp: '',
                pk: 0};
                let pkOut = 0
            userData.map(({fields, pk}, index) => {
                userDataObj = fields;
                pkOut = pk;
            })
            userDataObj.pk = pkOut;
            return {error: false, data: userDataObj, message: ''}
            
        } catch (error) {
            
            return {error: true, message: error, data: 'Error'}
        }
    }

    const handleComplain = async(fields: Field) => {
        try {
            setComplainLoading(true);
            const getComplainResponse: any  = await getComplain(fields);
        console.log(getComplainResponse.data)
        const userData: Users[] = getComplainResponse.data.userData;
        const adminData:Users[] = getComplainResponse.data.adminData;
        const returnFullUserResponse: BasicResponse = returnFullUser(userData);
        const returnFullAdminResponse: BasicResponse = returnFullUser(adminData);
        if(returnFullAdminResponse.error || returnFullUserResponse.error){
            return console.log("At returnFullUser", returnFullUserResponse.message, "....or...At returnFullAdmin", returnFullAdminResponse.message)
        }

        const userDataObj: UserField = returnFullUserResponse.data;
        const adminDataObj: UserField = returnFullAdminResponse.data;
        const AllFieldsLocal: AllFields = {userFields: userDataObj, adminFields: adminDataObj, complainFields: fields}
        setAllFields(AllFieldsLocal);

        
                
        } catch (error) {
            console.log("At handleComplain()...", error)
            
        }
        finally{
            setComplainLoading(false);
        }

        
    }
    
    useEffect(() => {
        console.log("Updated AllFields:", Allfields);
    }, [Allfields]); // Runs when AllFields updates


    useEffect(() => {
        if (complaints.length > 0 && complaints[0]?.fields) {
            let fields: Field = { 
                severity: 'H',
                title: '',
                complain: '',
                time_stamp: '',
                is_complete: '', // ✅ Use boolean
                type: '',
                user_id: 0,
                admin_id: 0
            };
    
            fields = complaints[0].fields; // ✅ Safe assignment
            handleComplain(fields);
        }
    }, [complaints]); // ✅ Dependencies are correct
    
    
        



    return (
        <div className='overflow-hidden h-screen w-screen bg-[#eee] overall-wrapper'>
            <div className='flex justify-between flex-row items-center bg-linear-to-r from-[##FFFFFF] via-[#D5FECD] to-[#fff] h-[10vh] bg-[#fff] navbar'>
                <div className='antialiased font-stretch-semi-expanded --my-font font-medium ml-[10px] text-[25px] text-[#bbb]'>
                    <h1>Optiven Complaints Admin</h1>
                </div>
                <div className='h-6 w-fit'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={1.5} stroke="currentColor" className="size-10 text-[#F9DF21] cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963
                      0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>



            </div>
            <div className='grid-cols-[2fr_5fr] grid h-[90vh] w-screen body-wrapper'>
                <div className='bg-linear-[#FFFFFF,#D5FECD] flex flex-col items-center justify-start bg-[#ddd] complains-side h-[100%]'>
                    <div className='flex flex-col justify-center items-center w-[90%] bg-[#eee] mt-3 mx-auto bg-sky-100 py-4'>
                        <label className="flex justify-between flex-row items-center w-[60%] select h-[10%]">
                            <span className="label text-orange-900 font-medium">Filter</span>
                            <select onChange={(event) => handleSort(event.target.value)} defaultValue="Pick a Framework" className="select select-info outline-none bg-sky-300 rounded-xl indent-4 h-10 font-medium ">
                                <option disabled={true}>Pick a Framework</option>
                                <option>Priority</option>
                                <option>Admin</option>
                                <option>Time</option>
                            </select>
                        </label>
                    </div>
                    <div className='relative py-2 scroll-smooth overflow-auto justify-items-center grid grid-cols-1 grid-rows-auto auto-rows-[200px] gap-4 bg-transparent w-[100%] h-[77vh] complains'>
                        {complaints && complaints.length > 0 ? (
                            complaints.map(({ fields }, index) => (

                                <div onClick={() => handleComplain(fields)} key={index} style={complains} className='p-2 w-[90%] rounded-lg cursor-pointer bg[#fff] pl-6 pr-6 flex justify-center flex-col bg-[#fff] complain-item'>
                                    <div className={`py-1 font-semibold shadow rounded-md flex justify-center w-[30%] text-[#fff] ${fields.severity === 'H'&& ( 'bg-red-500')} ${fields.severity === 'M' && ('bg-orange-500')} ${fields.severity === 'L' && ('bg-green-500')}`} >
                                        <h2>{fields.severity}</h2>
                                    </div>
                                    <div className='font-medium text-[#6a6a6b]'>
                                        <p>{fields.title}
                                        </p>
                                    </div>
                                    <div className='font-semibold text-[#bbb] w-[40%] my-2 flex justify-between'>
                                        <p>Type:</p>
                                        <p>Title Deed</p>
                                    </div>
                                    <div className='flex justify-end w-[100%]'>
                                        <div className='py-1 font-semibold shadow rounded-md flex justify-center w-[30%] bg-[#7b8ee0] text-[#fff]'>
                                            {fields.is_complete ? (
                                                                                        <div className='py-1 font-semibold shadow rounded-md flex justify-center w-[30%] bg-[#7b8ee0] text-[#fff]'>

                                                                                            <h2>Complete</h2>

</div>
                                            ): ( 
                                                <div className='py-1 font-semibold shadow rounded-md flex justify-center w-[30%] bg-[#7b8ee0] text-[#fff]'>
                                           <h2>Pending</h2>
                                           </div>
                                            ) }
                                        </div>
                                    </div>

                                    {/* <hr/> */}
                                </div>
                            ))

                        ) : !loading && (<p className='transition duration-3000 font-medium text-sky-300 row-span-1/8 '>There are no new complaints</p>)}
                        {loading && (
                            <div className=" absolute inset-0 flex justify-center items-center bg-opacity-50 top-0">
                                <div className="w-[70px] h-[70px] border-8 border-t-8 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                            </div>
                        )}

                        {/* <div style={complains} className='duration-300 ease-in p-2 w-[90%] rounded-lg cursor-pointer bg[#fff] pl-6 pr-6 flex justify-center flex-col bg-[#fff] complain-item'>
                            <div className='py-1 font-semibold shadow rounded-md flex justify-center w-[30%] bg-[#fc97a0] text-[#fff] border border-black'>
                                <h2>High</h2>
                            </div>
                            <div className='font-medium text-[#6a6a6b]'>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                            <div className='font-semibold text-[#bbb] w-[40%] my-2 flex justify-between'>
                                <p>Type:</p>
                                <p>Title Deed</p>
                            </div>
                            <div className='flex justify-end w-[100%]'>
                                <div className='py-1 font-semibold shadow rounded-md flex justify-center w-[30%] bg-[#7b8ee0] text-[#fff] '>
                                    <h2>Pending</h2>
                                </div>
                            </div>

                        </div>
                        <div style={complains} className='p-2 w-[90%] rounded-lg cursor-pointer bg[#fff] pl-6 pr-6 flex justify-center flex-col bg-[#fff] complain-item'>
                            <div className='py-1 font-semibold shadow rounded-md flex justify-center w-[30%] bg-[#fc97a0] text-[#fff] border border-black'>
                                <h2>High</h2>
                            </div>
                            <div className='font-medium text-[#6a6a6b]'>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                            <div className='font-semibold text-[#bbb] w-[40%] my-2 flex justify-between'>
                                <p>Type:</p>
                                <p>Title Deed</p>
                            </div>
                            <div className='flex justify-end w-[100%]'>
                                <div className='py-1 font-semibold shadow rounded-md flex justify-center w-[30%] bg-[#7b8ee0] text-[#fff] border border-black'>
                                    <h2>Pending</h2>
                                </div>
                            </div>

                        </div>
                        <div style={complains} className='p-2 w-[90%] rounded-lg cursor-pointer bg[#fff] pl-6 pr-6 flex justify-center flex-col bg-[#fff] complain-item'>
                            <div className='py-1 font-semibold shadow rounded-md flex justify-center w-[30%] bg-[#fc97a0] text-[#fff] border border-black'>
                                <h2>High</h2>
                            </div>
                            <div className='font-medium text-[#6a6a6b]'>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                            <div className='font-semibold text-[#bbb] w-[40%] my-2 flex justify-between'>
                                <p>Type:</p>
                                <p>Title Deed</p>
                            </div>
                            <div className='flex justify-end w-[100%]'>
                                <div className='py-1 font-semibold shadow rounded-md flex justify-center w-[30%] bg-[#7b8ee0] text-[#fff] border border-black'>
                                    <h2>Pending</h2>
                                </div>
                            </div>

                        </div>
                        <div style={complains} className='p-2 w-[90%] rounded-lg cursor-pointer bg[#fff] pl-6 pr-6 flex justify-center flex-col bg-[#fff] complain-item'>
                            <div className='py-1 font-semibold shadow rounded-md flex justify-center w-[30%] bg-[#fc97a0] text-[#fff] border border-black'>
                                <h2>High</h2>
                            </div>
                            <div className='font-medium text-[#6a6a6b]'>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                            <div className='font-semibold text-[#bbb] w-[40%] my-2 flex justify-between'>
                                <p>Type:</p>
                                <p>Title Deed</p>
                            </div>
                            <div className='flex justify-end w-[100%]'>
                                <div className='py-1 font-semibold shadow rounded-md flex justify-center w-[30%] bg-[#7b8ee0] text-[#fff] border border-black'>
                                    <h2>Pending</h2>
                                </div>
                            </div>

                        </div> 

 */}


                    </div>


                </div>
                <div className='flex flex-col justify-center  overflow-auto h-[90vh] bg-linear-[#D5FECD,#FFFFFF]'>
                {Allfields && Allfields != null ?  (

                    <div style={complains} className='p-6 shadow rounded-lg flex flex-col justify-between ml-6 h-[80%] w-[70%] bg-[#FFFFFF]'>
                        <div className='font-medium text-[#fc97a0] text-xl'>
                            <h1 className=''>{Allfields?.complainFields.severity === 'H' && 'High'}
                            {Allfields?.complainFields.severity === 'M' && 'Medium'}
                            {Allfields?.complainFields.severity === 'L' && 'Low'}
                            </h1>

                        </div>
                        <div className='text-[#6a6a6b] font-medium text-[25px]'>
                            <p>{Allfields?.complainFields.title}</p>
                        </div>
                        <div className='text-md text-[#656566]'>
                            <p>{Allfields?.complainFields.complain}</p>
                        </div>

                        <div className='text-[#6a6a6b] font-medium flex justify-between w-[85%]'>
                            <div className='flex justify-between w-[35%]'>
                                <div>
                                    <p>Name:</p>
                                    <p>Phone:</p>
                                </div>
                                <div>
                                    <p>{Allfields?.userFields.first_name+' '+Allfields?.userFields.last_name}</p>
                                    <p>{Allfields?.userFields.phone}</p>
                                </div>
                            </div>
                            <div className='flex justify-between w-[55%]'>
                                <div>
                                    <p>Issue Handler:</p>
                                    <p>Time:</p>
                                </div>
                                <div>
                                    <p>{Allfields?.adminFields.first_name+' '+Allfields?.adminFields.last_name}</p>
                                    <p>{Allfields?.complainFields.time_stamp ? new Date(Allfields.complainFields.time_stamp).toLocaleString() : 'N/A'}</p>
                                    </div>
                            </div>

                        </div>
                        <div className='flex justify-between w-[100%] items-center'>
                            <div className='font-semibold text-xl text-[#7b8ee0]'>
                                <h3>{}</h3>
                            </div>
                            <div className='flex w-[75%] justify-between'>
                                <div style={mailBtShadow} className='cursor-pointer shadow-md flex justify-center rounded-lg bg-linear-to-r from-[#7b8ee0] to-[#e0e6ff] w-[150px] h-[50px]'>
                                    <button>Email</button>
                                </div>
                                <div style={escalateBtShadow} className='cursor-pointer shadow-md flex justify-center rounded-lg bg-linear-to-r from-[#fc97a0] to-[#b80f1d] w-[150px] h-[50px]'>
                                    <button>Escalate</button>
                                </div>

                                <div style={completeBtShadow} className='cursor-pointer shadow-md flex justify-center rounded-lg bg-linear-to-r from-[#79EB60] to-[#F9DF21] w-[150px] h-[50px]'>
                                    <button>Complete</button>
                                </div>
                            </div>

                        </div>
                        
                    </div>
                ):  !complainLoading && (<p className='text-center transition duration-3000 font-medium text-sky-300 row-span-1/8 '>There are no new complaints</p>)}
                {complainLoading && (
                    <div className=" absolute inset-0 flex justify-center items-center bg-opacity-50 top-0">
                        <div className="w-[70px] h-[70px] border-8 border-t-8 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                )}
                </div>

            </div>
        </div>
    );

}

const complainSide = {
    height: '90vh',
    backgroundColor: '#ddd',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'auto',
};

const complains = {
    boxShadow: '0px 3px 10px 2px #ddd',
}

const completeButton = {
    border: '0',
    padding: '0',
    margin: '0',
    width: '150px',
    height: '40px',


}

const mailBtShadow = {
    boxShadow: '0px 4px 10px 2px #7b8ee0',
}
const escalateBtShadow = {
    boxShadow: '0px 4px 10px 2px #fc97a0',
}
const completeBtShadow = {
    boxShadow: '0px 4px 10px 2px #79EB60',
}

export default FeedbackChatRoom;