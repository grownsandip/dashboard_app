import Announcements from '@/components/Announcements'
import BigCalendar from '@/components/BigCalendar'
import FormModal from '@/components/FormModal'
import Performance from '@/components/Performance'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SingleFacultyPage = () => {
  return (
    <div className='flex-1 p-4 flex flex-col gap-4 xl:flex-row'>
      {/* LEFT*/}
      <div className='w-full xl:w-2/3'>
        {/* TOP */}
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* USERINFO CARDS */}
          <div className='bg-Sky py-6 px-4 rounded-md flex-1 flex gap-4 '>
            <div className='w-1/3'>
              <Image src="https://images.pexels.com/photos/6325958/pexels-photo-6325958.jpeg?auto=compress&cs=tinysrgb&w=400" alt='img' width={144} height={144} className='w-36 h-36 rounded-full object-cover' />
            </div>
            <div className='w-2/3 flex flex-col justify-between gap-4'>
              <h1 className='text-xl font-semibold'>Faculty Name</h1>
              <div className='flex items-center gap-4'>
              <FormModal table="faculty" type="update" data={{
                id:1,
                username:"Sandip",
                email:"roysandip33290@gmail.com",
                password:"password",
                firstName:"Sandip",
                lastName:"Roy",
                phone:"9862525399",
                address:"Rajbari,Dharmanagar,North Tripura",
                bloodType:"A+",
                birthday:"2000-01-04",
                sex:"male",
                img:""
              }}/>
              </div>
              <p className='text-xs text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, corrupti commodi aliquid ratione ex(faculty description)</p>
              <div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
                <div className='w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2'>
                  <Image src="/blood.png" alt='blood' height={14} width={14} />
                  <span>A+</span>
                </div>
                <div className='w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2'>
                  <Image src="/date.png" alt='blood' height={14} width={14} />
                  <span>27 october 2024</span>
                </div>
                <div className='w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2'>
                  <Image src="/mail.png" alt='blood' height={14} width={14} />
                  <span>abc@gmail.com</span>
                </div>
                <div className='w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2'>
                  <Image src="/phone.png" alt='blood' height={14} width={14} />
                  <span>132425</span>
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
                <h1 className='text-xl font-semibold'>90%</h1>
                <span className='text-sm text-gray-400'>Attendence</span>
              </div>
            </div>
            {/* CARD */}
            <div className='bg-white rounded-md p-4 flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image src="/singleBranch.png" alt="" height={24} width={24} className='w-6 h-6' />
              <div className=''>
                <h1 className='text-xl font-semibold'>2</h1>
                <span className='text-sm text-gray-400'>Branches</span>
              </div>
            </div>
            {/* CARD */}
            <div className='bg-white rounded-md p-4 flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image src="/singleLesson.png" alt="" height={24} width={24} className='w-6 h-6' />
              <div className=''>
                <h1 className='text-xl font-semibold'>6</h1>
                <span className='text-sm text-gray-400'>Lessons</span>
              </div>
            </div>
            {/* CARD */}
            <div className='bg-white rounded-md p-4 flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image src="/singleClass.png" alt="" height={24} width={24} className='w-6 h-6' />
              <div className=''>
                <h1 className='text-xl font-semibold'>6</h1>
                <span className='text-sm text-gray-400'>Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className='mt-4 bg-white rounded-md p-4 h-[800px]'>
          <h1>Teacher&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT*/}
      <div className='w-full xl:w-1/3 flex flex-col gap-4'>
        <div className='bg-white p-4 rounded-md'>
          <h1 className='text-xl font-semibold'>Shortcuts</h1>
          <div className='mt-4 flex gap-4 flex-wrap text-xs text-gray-500'>
            <Link href={`/list/Classes?/instructorId=${"teacher2"}`} className='rounded-md p-3 bg-Sky'>Teacher&apos;s Classes</Link>
            <Link href={`/list/Students?/facultyId=${"teacher2"}`} className='rounded-md p-3 bg-pink-50'>Teacher&apos;s Students</Link>
            <Link href={`/list/Lessons?/facultyId=${"teacher2"}`} className='rounded-md p-3 bg-Purple'>Teacher&apos;s Lessons</Link>
            <Link href={`/list/Exams?/facultyId=${"teacher2"}`} className='rounded-md p-3 bg-YellowLight'>Teacher&apos;s Exams</Link>
            <Link href={`/list/Assignments?/facultyId=${"teacher2"}`} className='rounded-md p-3 bg-lightSky'>Teacher&apos;s Assignments</Link>
          </div>
        </div>
        <Performance/>
        <Announcements/>
      </div>
    </div>
  )
}

export default SingleFacultyPage
