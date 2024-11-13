import CountChart from '@/components/CountChart'
import AttendanceChart from '@/components/AttendanceChart'
import UserCards from '@/components/UserCards'
import React from 'react'
import FinanceChart from '@/components/FinanceChart'
import EventCalender from '@/components/EventCalender'
import Announcements from '@/components/Announcements'

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
         <AttendanceChart/>
        </div>
      </div>
      {/* BOTTOMCHARTS */}
      <div className='w-full h-[500px]'>
        <FinanceChart/>
      </div>
      </div>
      {/* RIGHT */}
      <div className='w-full lg:w-1/3 flex flex-col  gap-8'>
      <EventCalender/>
      <Announcements/>
      </div>
    </div>
  )
}

export default AdminPage