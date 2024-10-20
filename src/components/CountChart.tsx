'use client'
import Image from 'next/image';
import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: 'Total',
      count: 100,
      fill: 'white',
    },
    {
        name: 'Girls',
        count: 50,
        fill: '#C3EBFA',
    },
    {
      name: 'Boys',
      count: 50,
      fill: '#FAE27C',
    },
  ];

const CountChart = () => {
  return (
    <div className='bg-white rounded-xl w-full h-full p-4'>
        {/* TITLE */}
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>Students</h1>
            <Image src="/moreDark.png" alt="more" height={20} width={20}/>
        </div>
        {/* CHARTS */}
        <div className='relative w-full h-[75%] '>
        <ResponsiveContainer>
        <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
          <RadialBar
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            dataKey="count"
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <Image src="/maleFemale.png" alt="malefemale" width={50} height={50} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
        </div>
        {/* BOTTOM */}
        <div className='flex justify-center gap-16'>
            <div className='flex flex-col gap-1'>
              <div className='w-5 h-5 bg-Sky rounded-full'/>
              <h1 className='font-bold'>1,234</h1>
              <h2 className='text-xs text-gray-400'>Boys(55%)</h2>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='w-5 h-5 bg-Yellow rounded-full'/>
              <h1 className='font-bold'>1,234</h1>
              <h2 className='text-xs text-gray-400'>Girls(45%)</h2>
            </div>
        </div>
    </div>
  )
}

export default CountChart