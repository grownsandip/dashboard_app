import prisma from '@/lib/prisma'
import React from 'react'
import BigCalendar from './BigCalendar'
import { adjustScheduleCurrentWeek } from '@/lib/utils'

const BigCalenderContainer = async ({type,id}:{type:"facultyId"|"classId",id:string | number |null}) => {
    const dataRes=await prisma.lesson.findMany({
        where:{
            ...(type==="facultyId"?{facultyId:id as string}:{classId:id as number})
        }
    })
    const data=dataRes.map(lesson=>({
        title:lesson.name,
        start:lesson.startTime,
        end:lesson.endTime,
}))
const schedule = adjustScheduleCurrentWeek(data)
  return (
    <div className=''>
      <BigCalendar data={schedule}/>
    </div>
  )
}

export default BigCalenderContainer
