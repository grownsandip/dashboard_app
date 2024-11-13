'use client';
import Image from 'next/image';
import React, { useState } from 'react'
// import FacultyForm from './Forms/FacultyForm';
// import StudentForm from './Forms/StudentForm';
import dynamic from 'next/dynamic';
const FacultyForm = dynamic(() => import("./Forms/FacultyForm"), {
    loading: () => <h1>loading....</h1>,
})
const StudentForm = dynamic(() => import("./Forms/StudentForm"), {
    loading: () => <h1>loading....</h1>,
})
const forms: { [key: string]: (type: "create" | "update", data?: any) => JSX.Element; } = {
    faculty: (type, data) => <FacultyForm type={type} data={data} />,
    student: (type, data) => <StudentForm type={type} data={data} />,
};
const FormModal = ({ table, type, data, id }: { table: "faculty" | "student" | "subject" | "semester" | "exam" | "assingment" | "event" | "announcement" | "parent"; type: "create" | "update" | "delete"; data?: any; id?: number | string }) => {
    const size = type == "create" ? "w-8 h-8" : "w-7 h-7"
    const bgColor = type == "create" ? "bg-Yellow" : type == "delete" ? "bg-Sky" : "bg-Pruple"
    const [open, setOpen] = useState(false);
    const Form = () => {
        return type === "delete" && id ? (
            <form action="" className='p-4 flex flex-col gap-4'>
                <span className='font-medium text-center'>Are you sure you want to delete {table}</span>
                <button className='bg-red-600 text-white rounded-md border-none py-2 px-4 w-max self-center'>delete</button>
            </form>
        ) : type === "create" || type === "update" ? (
            forms[table](type, data)
        ) : ("form not found");
    };
    return (
        <>
            <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`} onClick={() => setOpen(true)}>
                <Image src={`/${type}.png`} alt="" height={16} width={16} />
            </button>
            {
                open && (
                    <div className='w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center'>
                        <div className='bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]'>
                            <Form />
                            <div className='absolute top-4 right-4 cursor-pointer' onClick={() => setOpen(false)}>
                                <Image src="/close.png" alt="" width={14} height={14} />
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default FormModal
