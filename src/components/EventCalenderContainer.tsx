import React from 'react'
import EventList from './EventList'
import Image from 'next/image'
import EventCalender from './EventCalender'

const EventCalenderContainer = async ({searchParams}:{[keys:string]:string | undefined | any}) => {
    const {date}=searchParams;
  return (
    <div className='bg-white p-4 rounded-md'>
            <EventCalender/>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-semibold my-4'>Events</h1>
                <Image src="/moreDark.png" alt="more" height={20} width={20} />
            </div>
            <div className='flex flex-col gap-4'>
                <EventList dateParams={date}/>
        </div>
    </div>
  )
}

export default EventCalenderContainer
