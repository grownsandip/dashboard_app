'use client';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
// import FacultyForm from './Forms/FacultyForm';
// import StudentForm from './Forms/StudentForm';
import dynamic from 'next/dynamic';
import { useFormState } from 'react-dom';
import { deleteClass, deleteExam, deleteFaculty, deleteStudent, deleteSubject } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { formContainerProps } from './FormContainer';


const deleteActionMap={
    subject:deleteSubject,
    class:deleteClass,
    faculty:deleteFaculty,
    student:deleteStudent,
    parent:deleteSubject,
    exam:deleteExam,
    event:deleteSubject,
    announcement:deleteSubject,
    assignment:deleteSubject,
    result:deleteSubject,
    lesson:deleteSubject,
};



const FacultyForm = dynamic(() => import("./Forms/FacultyForm"), {
    loading: () => <h1>loading....</h1>,
})
const StudentForm = dynamic(() => import("./Forms/StudentForm"), {
    loading: () => <h1>loading....</h1>,
})
const SubjectForm = dynamic(() => import("./Forms/SubjectForm"), {
    loading: () => <h1>loading....</h1>,
})
const ClassForm = dynamic(() => import("./Forms/ClassForm"), {
    loading: () => <h1>loading....</h1>,
})
const ExamForm = dynamic(() => import("./Forms/ExamForm"), {
    loading: () => <h1>loading....</h1>,
})
const forms: { [key: string]: (setOpen: Dispatch<SetStateAction<boolean>>, type: "create" | "update", data?: any,relatedData?:any) => JSX.Element; } = {
    subject: (setOpen, type, data,relatedData) => <SubjectForm setOpen={setOpen} type={type} data={data} relatedData={relatedData} />,
    class: (setOpen, type, data,relatedData) => <ClassForm setOpen={setOpen} type={type} data={data} relatedData={relatedData} />,
    faculty: ( setOpen,type, data,relatedData) => <FacultyForm type={type} data={data} setOpen={setOpen}  relatedData={relatedData}/>,
    student: (setOpen, type, data,relatedData) => <StudentForm setOpen={setOpen} type={type} data={data}  relatedData={relatedData}/>,
    exam: (setOpen, type, data,relatedData) => <ExamForm setOpen={setOpen} type={type} data={data}  relatedData={relatedData}/>,
};
const FormModal = ({ table, type, data, id,relatedData}:formContainerProps & {relatedData?:any}) => {
    const size = type == "create" ? "w-8 h-8" : "w-7 h-7"
    const bgColor = type == "create" ? "bg-Yellow" : type == "update" ? "bg-Sky" : "bg-Pruple"
    const [open, setOpen] = useState(false);
    const Form = () => {
        const [state,formAction]= useFormState(deleteActionMap[table],{success:false,error:false});

        const router=useRouter();
        useEffect(()=>{
        if(state.success){
        setOpen(false)
        toast(`${table} has been ${type==="create"?"created":"deleted"}`)
        router.refresh()
       }
    },[state]);

        return type === "delete" && id ? (
            <form action={formAction} className='p-4 flex flex-col gap-4'>
                <input type="text | number" name='id' value={id} hidden/>
                <span className='font-medium text-center'>Are you sure you want to delete {table}</span>
                <button className='bg-red-600 text-white rounded-md border-none py-2 px-4 w-max self-center'>delete</button>
            </form>
        ) : type === "create" || type === "update" ? (
            forms[table](setOpen, type, data,relatedData)
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
