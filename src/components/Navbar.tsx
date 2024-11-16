import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import { currentUser } from "@clerk/nextjs/server";

const Navbar = async() => {
  const user=await currentUser();
  return (
    <div className='flex items-center justify-between p-4'>
      {/* Searchbar */}
      <div className='hidden md:flex items-center text-xs rounded-full gap-2 ring-[1.5px] ring-gray-300 px-2'>
        <Image src="/search.png" alt="search" width={14} height={14}/>
        <input type="text" placeholder='search' className='width-[200px] bg-transparent p-2 outline-none'/>
      </div>
      {/* user and OTHER */}
      <div className='flex items-center gap-6 justify-end w-full'>
        <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer'>
            <Image src="/message.png" alt="" width={20} height={20}/>
        </div>
        <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative'>
            <Image src="/announcement.png" alt="" width={20} height={20}/>
            <div className='absolute -right-3 -top-3 w-5 h-5 flex items-center justify-center bg-purple-500 rounded-full text-white text-xs'>1</div>
        </div>
        <div className='flex flex-col items-center'>
            <span className='text-xs leading-3 font-medium'>Sandip</span>
            <span className='text-gray-500 text-right text-[10px]'>{user?.publicMetadata.role as string}</span>
        </div>
        {/* <Image src="/avatar.png" alt="avatar" height={36} width={36} className='rounded-full'/> */}
        <UserButton/>
      </div>
    </div>
  )
}

export default Navbar
