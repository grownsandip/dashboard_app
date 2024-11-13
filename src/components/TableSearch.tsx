import Image from 'next/image'
import React from 'react'

const TableSearch = () => {
  return (
    <div className='w-full md:w-auto flex items-center text-xs rounded-full gap-2 ring-[1.5px] ring-gray-300 px-2'>
    <Image src="/search.png" alt="search" width={14} height={14}/>
    <input type="text" placeholder='search' className='width-[200px] bg-transparent p-2 outline-none'/>
  </div>
  )
}

export default TableSearch
