"use client"
import React, { useState } from 'react'
import { Calendar,momentLocalizer, View, Views } from 'react-big-calendar'
import moment from 'moment'
import { calendarEvents } from '@/lib/data'
import "react-big-calendar/lib/css/react-big-calendar.css";
const BigCalendar = () => {
    const localizer=momentLocalizer(moment)
    const [view,setView]=useState<View>(Views.WORK_WEEK)
    const handleOnChangeView=(selectedView:View)=>{
        setView(selectedView)
    }
  return (
      <Calendar
      localizer={localizer}
      events={calendarEvents}
      step={50}
      views={["work_week","day"]}
      view={view}
      startAccessor="start"
      endAccessor="end"
      style={{height:"98%"}}
      onView={handleOnChangeView}
      min={new Date(2024,9,21,8,0,0)}
      max={new Date(2024,9,21,17,0,0)}
      />
  )
}

export default BigCalendar
