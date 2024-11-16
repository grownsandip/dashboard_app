import CountChartContainer from '@/components/CountChartContainer'
import UserCards from '@/components/UserCards'
import React from 'react'
import FinanceChart from '@/components/FinanceChart'
import EventCalender from '@/components/EventCalender'
import Announcements from '@/components/Announcements'
import AttendanceChartContainer from '@/components/AttendanceChartContainer'

const AdminPage = () => {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      {/* LEFT */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
      {/* USER CARS */}
      <div className='flex gap-4 justify-between flex-wrap'>
        <UserCards type="admin"/>
        <UserCards type="faculty"/>
        <UserCards type="student"/>
        <UserCards type="parent"/>
      </div>
      {/* MIDDLECHARTS */}
      <div className='flex gap-4 flex-col lg:flex-row'>
        {/* COUNTCHARTS*/}
        <div className='w-full lg:w-1/3 h-[450px]'>
        <CountChartContainer/>
        </div>
        {/* ATTENDANCE CHARTS */}
        <div className='w-full lg:w-2/3 h-[450px]'>
         <AttendanceChartContainer/>
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