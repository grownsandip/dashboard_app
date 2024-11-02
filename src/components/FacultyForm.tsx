"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import InputField from './InputField';
import Image from 'next/image';

const schema = z.object({
    username: z.string().min(3, { message: "username must be atleast 3 characters long!" }).max(20, { message: "usename must be atmost 20 characters long!" }),
    email: z.string().email({ message: "Inavlid email address" }),
    password: z.string().min(8, { message: "Password must be atleast 8 characters long" }),
    firstName: z.string().min(1, { message: "first name cannot be empty" }),
    lastName: z.string().min(1, { message: "last name cannot be empty" }),
    phone: z.number().min(1, { message: "Phone numbers must be 10 characters" }),
    address: z.string().min(1, { message: "address is required" }),
    bloodType: z.string().min(1, { message: "Blood group is required" }),
    birthday: z.date({ message: "Birth date is required!" }),
    sex: z.enum(["male", "female", "others"], { message: "This field is required!" }),
    img: z.instanceof(File, { message: "Image is required!" })
});
type Inputs = z.infer<typeof schema>;

const FacultyForm = ({ type, data }: { type: "create" | "update"; data?: any }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({ resolver: zodResolver(schema) })
    const onSubmit = handleSubmit(data => {
        console.log(data)
    })
    return (
        <form className='flex flex-col gap-8' onSubmit={onSubmit}>
            <h1 className='text-xl font-semibold'>create a new Faculty</h1>
            <span className='text-xs text-gray-400 font-medium'>Authentication information</span>
            <div className='flex justify-between flex-wrap gap-4'>
                <InputField type={type} label="Username" name="username" defaultValue={data?.username} register={register} error={errors.username} />
                <InputField type="email" label="Email" name="email" defaultValue={data?.email} register={register} error={errors.email} />
                <InputField type="password" label="Password" name="password" defaultValue={data?.password} register={register} error={errors.password} />
            </div>
            <span className='text-xs text-gray-400 font-medium'>Personal information</span>
            < div className='flex justify-between flex-wrap gap-4'>
                <InputField type="text" label="First Name" name="firstname" defaultValue={data?.firstName} register={register} error={errors.firstName} />
                <InputField type="text" label="Last Name" name="lastname" defaultValue={data?.lastName} register={register} error={errors.lastName} />
                <InputField type="tel" label="Phone" name="phone" defaultValue={data?.phone} register={register} error={errors.phone} />
                <InputField type="text" label="Address" name="address" defaultValue={data?.address} register={register} error={errors.address} />
                <InputField type="bloodType" label="Blood Group" name="bloodType" defaultValue={data?.bloodType} register={register} error={errors.bloodType} />
                <InputField type="date" label="Date of Birth" name="birthday" defaultValue={data?.birthday} register={register} error={errors.birthday} />
                <div className='flex flex-col gap-2 w-full md:w-1/4'>
                    <label className='text-xs text-gray-400'>Gender</label>
                    <select className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full' defaultValue={data?.sex} {...register("sex")}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                    </select>
                    {errors.sex?.message && <p className='text-xs text-red-400'>{errors.sex.message.toString()}</p>}
                </div>
                <div className='flex flex-col gap-2 w-full md:w-1/4 justify-center'>
                    <label className='text-xs text-gray-400 flex items-center gap-2 cursor-pointer' htmlFor='img'>
                        <Image src="/upload.png" alt="" width={28} height={28} />
                        <span>Upload a photo</span>
                    </label>
                    <input type="File" id="img" {...register("img")} className='hidden' />
                    {errors.img?.message && <p className='text-xs text-red-400'>{errors.img.message.toString()}</p>}
                </div>
            </div>
            <button className='bg-blue-400 text-white p-2 rounded-md'>{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default FacultyForm
