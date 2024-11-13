import Announcements from '@/components/Announcements'
import BigCalendar from '@/components/BigCalendar'
import Performance from '@/components/Performance'
import { studentsData } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SingleStudentPage=() => {

  const id = 0
  return (
    <div className='flex-1 p-4 flex flex-col gap-4 xl:flex-row'>
      {/* LEFT*/}
      <div className='w-full xl:w-2/3'>
        {/* TOP */}
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* USERINFO CARDS */}
          <div className='bg-Sky py-6 px-4 rounded-md flex-1 flex gap-4 '>
            <div className='w-1/3'>
              <Image src={studentsData[id].photo} alt='img' width={144} height={144} className='w-36 h-36 rounded-full object-cover' />
            </div>
            <div className='w-2/3 flex flex-col justify-between gap-4'>
              <h1 className='text-xl font-semibold'>{studentsData[id].name}</h1>
              <p className='text-xs text-gray-500'>{studentsData[id].address}</p>
              <div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
                <div className='w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2'>
                  <Image src="/blood.png" alt='blood' height={14} width={14} />
                  <span>{studentsData[id].bloodGroup}</span>
                </div>
                <div className='w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2'>
                  <Image src="/date.png" alt='blood' height={14} width={14} />
                  <span>{studentsData[id].addmissionDate}</span>
                </div>
                <div className='w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2'>
                  <Image src="/mail.png" alt='blood' height={14} width={14} />
                  <span>{studentsData[id].email}</span>
                </div>
                <div className='w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2'>
                  <Image src="/phone.png" alt='blood' height={14} width={14} />
                  <span>{studentsData[id].phone}</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className='flex-1 flex gap-4 justify-between flex-wrap'>
            {/* CARD */}
            <div className='bg-white rounded-md p-4 flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image src="/singleAttendance.png" alt="" height={24} width={24} className='w-6 h-6' />
              <div className=''>
                <h1 className='text-xl font-semibold'>{studentsData[id].attendence}%</h1>
                <span className='text-sm text-gray-400'>Attendence</span>
              </div>
            </div>
            {/* CARD */}
            <div className='bg-white rounded-md p-4 flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image src="/singleBranch.png" alt="" height={24} width={24} className='w-6 h-6' />
              <div className=''>
                <h1 className='text-xl font-semibold'>{studentsData[id].semester}</h1>
                <span className='text-sm text-gray-400'>semester</span>
              </div>
            </div>
            {/* CARD */}
            <div className='bg-white rounded-md p-4 flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image src="/singleLesson.png" alt="" height={24} width={24} className='w-6 h-6' />
              <div className=''>
                <h1 className='text-xl font-semibold'>{studentsData[id].subjects}</h1>
                <span className='text-sm text-gray-400'>subjects</span>
              </div>
            </div>
            {/* CARD */}
            <div className='bg-white rounded-md p-4 flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image src="/singleClass.png" alt="" height={24} width={24} className='w-6 h-6' />
              <div className=''>
                <h1 className='text-xl font-semibold'>{studentsData[id].courses}</h1>
                <span className='text-sm text-gray-400'>Courses</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className='mt-4 bg-white rounded-md p-4 h-[800px]'>
          <h1>Student&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT*/}
      <div className='w-full xl:w-1/3 flex flex-col gap-4'>
        <div className='bg-white p-4 rounded-md'>
          <h1 className='text-xl font-semibold'>Shortcuts</h1>
          <div className='mt-4 flex gap-4 flex-wrap text-xs text-gray-500'>
            <Link href="/" className='rounded-md p-3 bg-Sky'>Student&apos;s Classes</Link>
            <Link href={`/list/Faculties?/classId=${2}`} className='rounded-md p-3 bg-pink-50'>Student&apos;s Faculties</Link>
            <Link href="/" className='rounded-md p-3 bg-Purple'>Student&apos;s Subjects</Link>
            <Link href="/" className='rounded-md p-3 bg-YellowLight'>Student&apos;s Exams</Link>
            <Link href="/" className='rounded-md p-3 bg-lightSky'>Student&apos;s Assignments</Link>
          </div>
        </div>
        <Performance/>
        <Announcements/>
      </div>
    </div>
  )
}

export default SingleStudentPage
