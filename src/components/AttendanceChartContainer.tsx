import Image from 'next/image'
import React from 'react'
import AttendanceChart from './AttendanceChart';
import prisma from '@/lib/prisma';

const AttendanceChartContainer = async () => {
    const today = new Date()
    const dayOfWeek = today.getDay();//returns day of the week as number representation
    const daySinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const lastMonday = new Date(today)
    lastMonday.setDate(today.getDate() - daySinceMonday) //gives us the span of week

    const resData = await prisma.attendance.findMany({
        where: {
            date: {
                gte: lastMonday
            }
        },
        select: {
            date: true,
            present: true,
        }
    })
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"]
    const attendanceMap: { [key: string]: { present: number, absent: number } } = {
        Mon: { present: 1, absent: 10},
        Tue: { present: 23, absent: 10 },
        Wed: { present: 10, absent: 8 },
        Thu: { present: 90, absent: 23 },
        Fri: { present: 2, absent: 5 },
    }
    resData.forEach(item => {
        const itemDate = new Date(item.date)
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            const dayName = daysOfWeek[dayOfWeek - 1];
            if (item.present) {
                attendanceMap[dayName].present += 1;
            } else {
                attendanceMap[dayName].absent += 1;
            }
        }
    })
    const data = daysOfWeek.map((day) => (
        {
                name: day,
                present: attendanceMap[day].present!,
                absent: attendanceMap[day].absent!,
        }
    ));
    return (
        <div className='bg-white h-full rounded-lg p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>Attendance</h1>
                <Image src="/moreDark.png" alt="more" height={20} width={20} />
            </div>
            <AttendanceChart data={data} />
        </div>
    )
}

export default AttendanceChartContainer
