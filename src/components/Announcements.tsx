"use client"
import React from 'react'

const Announcements = () => {
    return (
        <div className='bg-white rounded-md p-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-semibold'>Announcements</h1>
                <span className='text-xs text-gray-400'>View all</span>
            </div>
            <div className='flex flex-col gap-4 mt-4'>
                <div className='bg-lightSky rounded-md p-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-medium'>Lorem ipsum dolor sit</h2>
                        <span className='text-xs text-gray-400 bg-white rounded-md px-1 py-1'>21-10-2025</span>
                    </div>
                    <p className='text-sm text-gray-500 mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat adipisci molestias quisquam delectus sunt neque hic accusantium illum </p>
                </div>
                <div className='bg-YellowLight rounded-md p-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-medium'>Lorem ipsum dolor sit</h2>
                        <span className='text-xs text-gray-400 bg-white rounded-md px-1 py-1'>21-10-2025</span>
                    </div>
                    <p className='text-sm text-gray-500 mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat adipisci molestias quisquam delectus sunt neque hic accusantium illum </p>
                </div>
                <div className='bg-PurpleLight rounded-md p-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-medium'>Lorem ipsum dolor sit</h2>
                        <span className='text-xs text-gray-400 bg-white rounded-md px-1 py-1'>21-10-2025</span>
                    </div>
                    <p className='text-sm text-gray-500 mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat adipisci molestias quisquam delectus sunt neque hic accusantium illum </p>
                </div>
            </div>
        </div>
    )
}

export default Announcements
