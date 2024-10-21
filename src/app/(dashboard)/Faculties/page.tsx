import Announcements from '@/components/Announcements'
import BigCalendar from '@/components/BigCalendar'
import React from 'react'

const FacultyPage = () => {
  return (
    <div className='p-4 flex gap-4 flex-col xl:flex-row flex-1'>
    {/* left */}
    <div className='w-full xl:w-2/3'>
      <div className='bg-white rounded-md p-4 h-full'>
        <h1 className='text-xl font-semibold'>Schedule(4A)</h1>
        <BigCalendar/>
      </div>
    </div>
    {/* right */}
    <div className='w-full xl:w-1/3 flex flex-col  gap-8'>
      <Announcements />
    </div>
  </div>
  )
}

export default FacultyPage