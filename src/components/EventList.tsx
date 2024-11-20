import prisma from '@/lib/prisma';
import React from 'react'

const EventList = async ({dateParams}:{dateParams:string|undefined}) => {
  const date=dateParams?new Date(dateParams):new Date();
  //fetching date of events beginning and ending within time limit
  const data=await prisma.event.findMany({
    where:{
      startTime:{
        gte:new Date(date.setHours(0,0,0,0)),
        lte:new Date(date.setHours(23,59,59,9999))
      }
    }
  })
  return (data.map(event => (
            <div className='p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-Sky even:border-t-Purple' key={event.id}>
                <div className='flex items-center justify-between'>
                    <h1 className='font-semibold text-gray-600'>{event.title}</h1>
                    <span className='text-gray-300 text-xs'>{event.startTime.toLocaleTimeString("en-IN",{
                      hour:"2-digit",
                      minute:"2-digit",
                      hour12:false,
                    })}</span>
                </div>
                <p className='mt-2 text-gray-400 text-sm'>{event.description}</p>
            </div>
        ))
  )
}

export default EventList