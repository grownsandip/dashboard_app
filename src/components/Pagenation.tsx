"use client"
import React from 'react'
import { Item_per_page } from '@/lib/settings';
import { useRouter } from 'next/navigation';

const Pagenation = ({ page, count }: { page: number, count: number }) => {
  const router = useRouter();
  const hasPrev = Item_per_page * (page - 1) > 0;
  const hasNext = Item_per_page * (page - 1) + Item_per_page < count;
  const PageChange = (newPage: number) => {
    const params = new URLSearchParams(window.location.search)
    params.set("page", newPage.toString())
    router.push(`${window.location.pathname}?${params}`)
  }
  return (
    <div className='p-4 flex items-center justify-between text-gray-500'>
      <button disabled={!hasPrev} className='py-2 px-4 rounded-md text-xs font-semibold bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed' onClick={() => PageChange(page - 1)}>Prev</button>
      <div className='flex items-center gap-4'>
        {Array.from({ length: Math.ceil(count / Item_per_page) }, (_, index) => {
          const pageIndex = index + 1;
          //console.log(pageIndex)
          return (<button className={`px-2 rounded-sm ${page === pageIndex ? "bg-Sky" : ""}`} key={pageIndex} onClick={() => PageChange(pageIndex)}>{pageIndex}</button>);
        })}
      </div>
      <button  disabled={!hasNext} className='py-2 px-4 rounded-md text-xs font-semibold bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed' onClick={() => PageChange(page + 1)}>Next</button>
    </div>
  )
}

export default Pagenation
