import CountChart from '@/components/CountChart'
import UserCards from '@/components/UserCards'
import React from 'react'

const AdminPage = () => {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      {/* LEFT */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
      {/* USER CARS */}
      <div className='flex gap-4 justify-between flex-wrap'>
        <UserCards type="faculties"/>
        <UserCards type="students"/>
        <UserCards type="staff"/>
      </div>
      {/* MIDDLECHARTS */}
      <div className='flex gap-4 flex-col lg:flex-row'>
        {/* COUNTCHARTS*/}
        <div className='w-full lg:w-1/3 h-[450px]'>
        <CountChart/>
        </div>
        {/* ATTENDANCE CHARTS */}
        <div className='w-full lg:w-2/3 h-[450px]'>

        </div>
      </div>
      {/* BOTTOMCHARTS */}
      <div className=''></div>
      </div>
      {/* RIGHT */}
      <div className='w-full lg:w-1/3'>right</div>
    </div>
  )
}

export default AdminPage