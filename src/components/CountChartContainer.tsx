import Image from 'next/image'
import React from 'react'
import CountChart from './CountChart'
import prisma from '@/lib/prisma'

const CountChartContainer = async () => {
    //getting data from students table
    const data=await prisma.student.groupBy({
        by:["gender"],
        _count:true,
    })
    //console.log(data)
    const boys=data.find((d)=>d.gender==="MALE")?._count||0;
    const girls=data.find((d)=>d.gender==="FEMALE")?._count||0;
    return (
        <div className='bg-white rounded-xl w-full h-full p-4'>
            {/* TITLE */}
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>Students</h1>
                <Image src="/moreDark.png" alt="more" height={20} width={20} />
            </div>
            <CountChart boys={boys} girls={girls}/>
            {/* BOTTOM */}
            <div className='flex justify-center gap-16'>
                <div className='flex flex-col gap-1'>
                    <div className='w-5 h-5 bg-Sky rounded-full' />
                    <h1 className='font-bold'>{boys}</h1>
                    <h2 className='text-xs text-gray-400'>Boys({Math.round(boys/(boys+girls)*100)}%)</h2>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='w-5 h-5 bg-Yellow rounded-full' />
                    <h1 className='font-bold'>{girls}</h1>
                    <h2 className='text-xs text-gray-400'>Girls({Math.round(girls/(boys+girls)*100)}%)</h2>
                </div>
            </div>
        </div>
    )
}

export default CountChartContainer
