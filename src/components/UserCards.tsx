import Image from 'next/image'
import React from 'react'

const UserCards = ({type}:{type:string}) => {
  return (
    <div className='rounded-2xl odd:bg-Purple even:bg-Yellow p-4 flex-1 min-w-[130px]'>
        <div className='flex justify-between items-center'>
            <span className='text-[10px] bg-white rounded-full px-2 py-1 text-green-600'>2024/25</span>
            <Image src="/more.png" alt='more' height={20} width={20}/>
        </div>
        <h1 className='text-xl font-semibold my-4'>1,234</h1>
        <h2 className='font-medium text-sm capitalize text-gray-500'>{type}</h2>
    </div>
  )
}

export default UserCards