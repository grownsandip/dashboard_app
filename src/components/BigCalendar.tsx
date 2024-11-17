"use client"
import React, { useState } from 'react'
import { Calendar,momentLocalizer, View, Views } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
const BigCalendar = ({data}:{data:{title:string;start:Date;end:Date}[]}) => {
    const localizer=momentLocalizer(moment)
    const [view,setView]=useState<View>(Views.WORK_WEEK)
    const handleOnChangeView=(selectedView:View)=>{
        setView(selectedView)
    }

  return (
      <Calendar
      localizer={localizer}
      events={data}
      step={50}
      views={["work_week","day"]}
      view={view}
      startAccessor="start"
      endAccessor="end"
      style={{height:"98%"}}
      onView={handleOnChangeView}
      min={new Date(2024,11,18,8,0,0)}
      max={new Date(2024,11,22,17,0,0)}
      />
  )
}

export default BigCalendar
