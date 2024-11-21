"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useFormState } from "react-dom";
import { useForm } from 'react-hook-form';
import InputField from '../InputField';
import { examSchema, ExamSchema} from '@/lib/formValidationSchemas';
import { createExam, updateExam} from '@/lib/actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const ExamForm = ({ setOpen, type, data, relatedData }: { type: "create" | "update"; data?: any; setOpen: Dispatch<SetStateAction<boolean>>;relatedData?: any }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ExamSchema>({ resolver: zodResolver(examSchema) })

    const [state, formAction] = useFormState(type === "create" ? createExam : updateExam, { success: false, error: false });//next docs check
    const onSubmit = handleSubmit((data) => {
        //console.log(data);
        formAction(data);
    });
    const router = useRouter()
    useEffect(() => {
        if (state.success) {
            setOpen(false)
            toast(`Exam has been ${type === "create" ? "created" : "updated"}`)
            router.refresh()
        }
    }, [state,router,type,setOpen])
    const {lessons}=relatedData;
    //console.log(faculties)
    return (
        <form className='flex flex-col gap-8' onSubmit={onSubmit}>
            <h1 className='text-xl font-semibold'>{type === "create" ? "Create a new Exam" : "Update the Exam"}</h1>
            <div className='flex justify-between flex-wrap gap-4'>
                <InputField  label="Title" name="title" defaultValue={data?.title} register={register} error={errors?.title} />
                <InputField type="datetime-local" label="Start Date" name="startTime" defaultValue={data?.startTime} register={register} error={errors?.startTime} />
                <InputField type="datetime-local" label="End Date" name="endTime" defaultValue={data?.endTime} register={register} error={errors?.endTime} />
                {data && (<InputField type={type} label="Faculty Id" name="id" defaultValue={data?.id} register={register} error={errors?.id} hidden />)}
                <div className='flex flex-col gap-2 w-full md:w-1/4'>
                    <label className='text-xs text-gray-400'>Lessons</label>
                    <select className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full' defaultValue={data?.faculties} {...register("lessonId")}>
                        { lessons.map((lesson: { id: number; name:string}) => (<option key={lesson.id} value={lesson.id}>{lesson.name}</option>))}
                    </select>
                    {errors.lessonId?.message && <p className='text-xs text-red-400'>{errors.lessonId.message.toString()}</p>}
                </div>
            </div>
            {state.error && (<span className='text-red-500'>something went wrong </span>)}
            <button className='bg-blue-400 text-white p-2 rounded-md'>{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default ExamForm