import Announcements from '@/components/Announcements'
import BigCalenderContainer from '@/components/BigCalenderContainer';
import EventCalender from '@/components/EventCalender'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const StudentPage = async () => {
  const {userId}=await auth()
  const classItem=await prisma.class.findMany({
    where:{
      students:{some:{id:userId!}}
    }
  })
  //console.log(classItem)
  return (
    <div className='p-4 flex gap-4 flex-col xl:flex-row'>
      {/* left */}
      <div className='w-full xl:w-2/3'>
        <div className='bg-white rounded-md p-4 h-full'>
          <h1 className='text-xl font-semibold'>Schedule of {classItem[0].semId}th semester</h1>
          <BigCalenderContainer type="classId" id={classItem[0].id}/>
        </div>
      </div>
      {/* right */}
      <div className='w-full xl:w-1/3 flex flex-col  gap-8'>
        <EventCalender />
        <Announcements />
      </div>
    </div>
  )
}

export default StudentPage