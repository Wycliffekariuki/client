import React, { useState } from 'react';

import { useNavigate } from 'react-router';

import { useAppDispatch, useAppStore } from '../reduxstore/app/hooks';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Eye, EyeOff } from 'lucide-react';
import { UserField, Users } from 'types_this_is_exhausting/types';
import { loginAction } from '../reduxstore/features/counterSlice';

type FormData = {
    email: string;
    password: string;
}

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required")
});

const Login: React.FC = () => {
    const dispatch  = useAppDispatch();
    const login = loginAction();
    const store = useAppStore();
    const [showPassword, setShowPassword] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const formik = useFormik<FormData>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            
            try {
                setIsLoading(true);
                console.log("Form submission success: ", values )
                const response = await axios.post('http://127.0.0.1:8000/login/', values);
                if(response.status === 200){
                dispatch(login);
                console.log(store.getState().login.login);
                const adminUser: UserField = response.data.data.adminData;
                const adminId: number = response.data.data.id;
                console.log("Admin ID: ", adminId, "Admin Data: ", adminUser);
                const adminData: Users = {fields: adminUser, pk: adminId};
                dispatch({type: 'admin/setAdmin', payload: adminData});
                console.log("Admin Data from store: ", store.getState().admin.admin);
                navigate('/admin')
                   
                }else if(response.status === 400){
                    console.log("There was an error: ", response.data.message)
                }else if(response.status === 500){
                    console.log("Internal Server Error: ", response.data.err);
                }
                
            } catch (error) {
                console.log(error)
                
            } finally {
                formik.resetForm();
                setShowPassword(true);
                setIsLoading(false);
            }
        }
    })

    return (
        <div className='bg-green-50 flex flex-col justify-center items-center w-screen h-screen'>
            <form onSubmit={formik.handleSubmit} className='relative rounded-lg shadow-xl shadow-green-200 bg-white lg:w-[25%] sm:w-[40%] sm:h-[60%] lg:h-[60%] flex flex-col justify-center items-center'>
            <div className="absolute lg:h-11 h-8 bottom-[85%]">
            <img
              className="h-full w-auto self-start"
              src="https://workspace.optiven.co.ke/static/media/optiven-logo-full.f498da6255572ff1ab8a.png"
              alt="Optiven Image"
            />
          </div>
                <div className='w-[70%] h-[60%] flex flex-col justify-between items-center'>

                    <div className="mb-5 lg:mb-0 w-full">
                        <label
                            htmlFor="email"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="example@gmail.com"
                                className="indent-[15px] h-[35px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <p className="text-red-500 text-sm">
                                    {formik.errors.email}
                                </p>
                            ) : null}
                        </div>

                    </div>
                    <div className="mb-5 lg:mb-0 w-full ">
                        <label
                            htmlFor="password"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Password
                        </label>
                        <div className="mt-2">
                            <div className='flex relative'>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "password" : "text"}
                                    placeholder="********"
                                    className="indent-[15px] h-[35px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <button
                                style={{backgroundColor: 'transparent', outline: 'none', border: 'none'}}
                                    type='button'
                                    className="absolute cursor-pointer inset-y-0 right-1 flex items-center "
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {formik.touched.password && formik.errors.password ? (
                                <p className="text-red-500 text-sm">
                                    {formik.errors.password}
                                </p>
                            ) : null}

                        </div>
                        {isLoading && (
                            <div className="mb-2 top-[85%] absolute inset-0 flex justify-center items-center bg-opacity-50 top-0">
                                <div className="w-[40px] h-[40px] border-8 border-t-8 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                            </div>
                            )}


                    </div>
                    <button type='submit' className="w-[70%] cursor-pointer bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                        Button
                    </button>
                </div>



            </form>
        </div>
    );
}
export type Route = {
    id: '/',
    path: '/'
}

export default Login;


