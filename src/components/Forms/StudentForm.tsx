"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import InputField from '../InputField';
import Image from 'next/image';
import { useFormState } from 'react-dom';
import { studentSchema, StudentSchema } from '@/lib/formValidationSchemas';
import { createStudent, updateStudent } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { CldUploadWidget } from 'next-cloudinary';


const FacultyForm = ({ type, data, setOpen, relatedData }: {
    type: "create" | "update"; data?: any; setOpen: Dispatch<SetStateAction<boolean>>;
    relatedData?: any
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<StudentSchema>({ resolver: zodResolver(studentSchema) })
    const [state, formAction] = useFormState(type === "create" ? createStudent : updateStudent, { success: false, error: false });//next docs check
    const onSubmit = handleSubmit((data) => {
        //console.log(data);
        formAction({...data,img:img?.secure_url});
    });
    const router = useRouter()
    useEffect(() => {
        if (state.success) {
            toast(`Student has been ${type === "create" ? "created" : "updated"}`)
            setOpen(false)
            router.refresh()
        }
    }, [state, router, type, setOpen])
    const [img,setImg]=useState<any>();
    const { classes,semesters } = relatedData;
    return (
        <form className='flex flex-col gap-8' onSubmit={onSubmit}>
            <h1 className='text-xl font-semibold'>{type === "create" ? "Create a new Student" : "Update this Student"}</h1>
            <span className='text-xs text-gray-400 font-medium'>Authentication information</span>
            <div className='flex justify-between flex-wrap gap-4'>
                <InputField type={type} label="Username" name="username" defaultValue={data?.username} register={register} error={errors?.username} />
                <InputField type="email" label="Email" name="email" defaultValue={data?.email} register={register} error={errors?.email} />
                <InputField type="password" label="Password" name="password" defaultValue={data?.password} register={register} error={errors?.password} />
            </div>
            <span className='text-xs text-gray-400 font-medium'>Personal information</span>
            <CldUploadWidget uploadPreset="Institute" onSuccess={(result,{widget})=>{setImg(result.info),widget.close()}}> 
                    {({ open }) => {
                        return (
                            <div className='text-xs text-gray-400 flex items-center gap-2 cursor-pointer' onClick={()=>open()}>
                            <Image src="/upload.png" alt="" width={28} height={28} />
                            <span>Upload a photo</span>
                        </div>
                        );
                    }}
                </CldUploadWidget>
                <Image src={img?.secure_url ||"/noAvatar.png"} alt='avatar' height={30} width={30}/>
            <div className='flex justify-between flex-wrap gap-4'>
                <InputField type="text" label="First Name" name="firstname" defaultValue={data?.firstname} register={register} error={errors?.firstname} />
                <InputField type="text" label="Last Name" name="lastname" defaultValue={data?.lastname} register={register} error={errors?.lastname} />
                <InputField type="tel" label="Phone" name="phone" defaultValue={data?.phone} register={register} error={errors.phone} />
                <InputField type="text" label="Address" name="address" defaultValue={data?.address} register={register} error={errors.address} />
                <InputField type="bloodType" label="Blood Group" name="bloodType" defaultValue={data?.bloodType} register={register} error={errors.bloodType} />
                <InputField type="date" label="Date of Birth" name="birthday" defaultValue={data?.dob.toISOString().split("T")[0]} register={register} error={errors.birthday} />
                <InputField type="" label="Parent Id" name="parentId" defaultValue={data?.parentId} register={register} error={errors.parentId} />
                {data && (<InputField  label="Id" name="id" defaultValue={data?.id} register={register} error={errors?.id} hidden/>)}
                <div className='flex flex-col gap-2 w-full md:w-1/4'>
                    <label className='text-xs text-gray-400'>Gender</label>
                    <select className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full' defaultValue={data?.gender} {...register("gender")}>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                    {errors.gender?.message && <p className='text-xs text-red-400'>{errors.gender.message.toString()}</p>}
                </div>
                <div className='flex flex-col gap-2 w-full md:w-1/4'>
                    <label className='text-xs text-gray-400'>Semester</label>
                    <select className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full' defaultValue={data?.semId} {...register("semId")}>
                        {semesters.map((sem: { id: number; level: number }) => (<option key={sem.id} value={sem.id}>{sem.level}</option>))}
                    </select>
                    {errors.semId?.message && <p className='text-xs text-red-400'>{errors.semId.message.toString()}</p>}
                </div>
                <div className='flex flex-col gap-2 w-full md:w-1/4'>
                    <label className='text-xs text-gray-400'>Class</label>
                    <select className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full' defaultValue={data?.classId} {...register("classId")}>
                        {classes.map((classItem: { id: number;name:string;capacity:number;_count:{students:number} }) => (<option key={classItem.id} value={classItem.id}>({classItem.name} -{" "} {classItem._count.students+"/"+classItem.capacity}{" "}capacity)</option>))}
                    </select>
                    {errors.semId?.message && <p className='text-xs text-red-400'>{errors.semId.message.toString()}</p>}
                </div>
            </div>
            {state.error && (<span className='text-red-500'>something went wrong </span>)}
            <button className='bg-blue-400 text-white p-2 rounded-md'>{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default FacultyForm
