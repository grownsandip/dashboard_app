"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useFormState } from "react-dom";
import { useForm } from 'react-hook-form';
import InputField from '../InputField';
import { subjectSchema, SubjectSchema } from '@/lib/formValidationSchemas';
import { createSubject, updateSubject } from '@/lib/actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const SubjectForm = ({ setOpen, type, data, relatedData }: { type: "create" | "update"; data?: any; setOpen: Dispatch<SetStateAction<boolean>>;relatedData?: any }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<SubjectSchema>({ resolver: zodResolver(subjectSchema) })

    const [state, formAction] = useFormState(type === "create" ? createSubject : updateSubject, { success: false, error: false });//next docs check
    const onSubmit = handleSubmit((data) => {
        //console.log(data);
        formAction(data);
    });
    const router = useRouter()
    useEffect(() => {
        if (state.success) {
            setOpen(false)
            toast(`Subject has been ${type === "create" ? "created" : "updated"}`)
            router.refresh()
        }
    }, [state,router,type,setOpen])
    const faculties  = Array.isArray(relatedData?.faculties)?relatedData.faculties:[];
    //console.log(faculties)
    return (
        <form className='flex flex-col gap-8' onSubmit={onSubmit}>
            <h1 className='text-xl font-semibold'>{type === "create" ? "Create a new Subject" : "Update the Subject"}</h1>
            <div className='flex justify-between flex-wrap gap-4'>
                <InputField type={type} label="Subject Name" name="name" defaultValue={data?.name} register={register} error={errors?.name} />
                {data && (<InputField type={type} label="Faculty Id" name="id" defaultValue={data?.id} register={register} error={errors?.id} hidden />)}
                <div className='flex flex-col gap-2 w-full md:w-1/4'>
                    <label className='text-xs text-gray-400'>Faculties</label>
                    <select className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full' defaultValue={data?.faculties} {...register("faculties")} multiple>
                        { faculties.map((faculty: { id: string; username: string; firstname: string; lastname: string }) => (<option key={faculty.id} value={faculty.id}>{
                            faculty.firstname+" "+faculty.lastname}</option>))}
                    </select>
                    {errors.faculties?.message && <p className='text-xs text-red-400'>{errors.faculties.message.toString()}</p>}
                </div>
            </div>
            {state.error && (<span className='text-red-500'>something went wrong </span>)}
            <button className='bg-blue-400 text-white p-2 rounded-md'>{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default SubjectForm
