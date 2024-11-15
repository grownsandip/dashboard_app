import Announcements from '@/components/Announcements'
import BigCalendar from '@/components/BigCalendar'
import EventCalender from '@/components/EventCalender'
import { Sidebar } from 'lucide-react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import React from 'react'
import { RegisterForm } from '@/components/register-form'

const AdminSignUpPage = () => {
  return (
    <div>


      <div className="flex h-screen w-full bg-slate-200 items-center justify-center px-4">
        <RegisterForm />
      </div>



    </div>
  )
}

export default AdminSignUpPage