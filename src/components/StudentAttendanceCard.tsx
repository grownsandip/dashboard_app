import prisma from '@/lib/prisma'
import React from 'react'

const StudentAttendanceCard = async ({id}:{id:string}) => {
    const attendance=await prisma.attendance.findMany({
        where:{
            studentId:id,
            date:{
                gte:new Date(new Date().getFullYear(),0,1)
            }
        }
    })
    const totalDays=attendance.length;
    const presentDays=attendance.filter(day=>day.present).length;
    const percent=Math.floor((presentDays/totalDays)*100);
  return (
    <div className=''>
        <h1 className='text-xl font-semibold'>{percent}%</h1>
        <span className='text-sm text-gray-400'>Attendence</span>
     </div>
  )
}

export default StudentAttendanceCard
