"use client"
import { announcementsData } from '@/lib/data'
import React from 'react'

const Announcements = () => {
    const id = 0
    const colors = ["bg-lightSky","bg-YellowLight","bg-PurpleLight"]
    return (
        <div className='bg-white rounded-md p-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-semibold'>Announcements</h1>
                <span className='text-xs text-gray-400'>View all</span>
            </div>
            <div className='flex flex-col gap-4 mt-4'>
                <div className='bg-lightSky rounded-md p-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-medium'>{announcementsData[id].title}</h2>
                        <span className='text-xs text-gray-400 bg-white rounded-md px-1 py-1'>{announcementsData[id].date}</span>
                    </div>
                    <p className='text-sm text-gray-500 mt-1'>{announcementsData[id].desc}</p>
                </div>
                <div className='bg-YellowLight rounded-md p-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-medium'>{announcementsData[id+1].title}</h2>
                        <span className='text-xs text-gray-400 bg-white rounded-md px-1 py-1'>{announcementsData[id+1].date}</span>
                    </div>
                    <p className='text-sm text-gray-500 mt-1'>{announcementsData[id+1].desc}</p>
                </div>
                <div className='bg-PurpleLight rounded-md p-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-medium'>{announcementsData[id+2].title}</h2>
                        <span className='text-xs text-gray-400 bg-white rounded-md px-1 py-1'>{announcementsData[id+2].date}</span>
                    </div>
                    <p className='text-sm text-gray-500 mt-1'>{announcementsData[id+2].desc}</p>
                </div>
            </div>
        </div>

    )
}

export default Announcements
