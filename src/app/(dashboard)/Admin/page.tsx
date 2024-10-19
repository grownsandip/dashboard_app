import UserCards from '@/components/UserCards'
import React from 'react'

const AdminPage = () => {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      {/* LEFT */}
      <div className='w-full lg:w-2/3'>
      {/* USER CARS */}
      <div className='flex gap-4 justify-between flex-wrap'>
        <UserCards type="faculties"/>
        <UserCards type="students"/>
        <UserCards type="staff"/>
      </div>
      </div>
      {/* RIGHT */}
      <div className='w-full lg:w-1/3'>right</div>
    </div>
  )
}

export default AdminPage