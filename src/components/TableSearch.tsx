"use client"
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation';
const TableSearch = () => {
  const router=useRouter()
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const value=(e.currentTarget[0] as HTMLInputElement).value
    const params = new URLSearchParams(window.location.search)
    params.set("search",value)
    router.push(`${window.location.pathname}?${params}`)
  }

  return (
    <form onSubmit={handleSubmit}className='w-full md:w-auto flex items-center text-xs rounded-full gap-2 ring-[1.5px] ring-gray-300 px-2'>
    <Image src="/search.png" alt="search" width={14} height={14}/>
    <input type="text" placeholder='search' className='width-[200px] bg-transparent p-2 outline-none'/>
  </form>
  )
}

export default TableSearch
