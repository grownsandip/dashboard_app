"use client";
import Image from 'next/image';
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const data = [
    {
      name: 'Mon',
      present: 24,
      absent: 40,
    },
    {
      name: 'Tue',
      present: 13,
      absent: 30,
    },
    {
      name: 'Wed',
      present: 98,
      absent: 20,
    },
    {
      name: 'Fri',
      present: 27,
      absent: 39,
    },
    {
      name: 'Sat',
      present: 18,
      absent: 48,
    },
  ];
  

const AttendanceChart = () => {
  return (
    <div className='bg-white h-full rounded-lg p-4'>
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>Attendance</h1>
            <Image src="/moreDark.png" alt="more" height={20} width={20}/>
        </div>
        <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={data}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false}  stroke='#ddd'/>
          <XAxis dataKey="name" axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false}/>
          <YAxis axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false} />
          <Tooltip contentStyle={{borderRadius:"10px",borderColor:"lightgray"}} />
          <Legend  align='left' verticalAlign='top' wrapperStyle={{paddingTop:"20px",paddingBottom:"40px"}}/>
          <Bar dataKey="present" fill="#C3EBFA" legendType='circle'/>
          <Bar dataKey="absent" fill="#FAE27C"  legendType='circle' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AttendanceChart
