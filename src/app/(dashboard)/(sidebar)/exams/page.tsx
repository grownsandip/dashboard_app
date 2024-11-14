import Pagenation from '@/components/Pagenation'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { role, examsData } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Exams = {
    id: number,
    subject: string,
    course: string,
    faculty: string,
    date: string,
}
const columns = [
    {
        header: "Subject",
        accessor: "Subject",
    },
    {
        header: "Course",
        accessor: "course",
        className: "",
    },
    {
        header: "Instructor",
        accessor: "instructor",
        className: "hidden md:table-cell",
    },
    {
        header: "Date",
        accessor: "commencement",
    },
    {
        header: "Actions",
        accessor: "actions",
    }
];

const StudentsListpage = () => {
    const renderRow = (item: Exams) => (
        <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-PurpleLight'>
            <td className='items-center gap-4 p-4 font-semibold'>{item.subject}</td>
            <td>{item.course}</td>
            <td className='hidden md:table-cell'>{item.faculty}</td>
            <td>{item.date}</td>
            <td>
                <div className='flex items-center gap-2'>
                    <Link href={`/list/exams/${item.id}`}>
                        <button className='w-7 h-7 rounded-full bg-Sky flex items-center justify-center'>
                            <Image src="/view.png" alt="" height={16} width={16} />
                        </button>
                    </Link>
                    {role === "admin" || role === "faculty" && (<button className='w-7 h-7 rounded-full bg-Purple flex items-center justify-center'>
                        <Image src="/delete.png" alt="" height={16} width={16} />
                    </button>)}
                </div>
            </td>
        </tr>
    )
    return (
        <div className='bg-white rounded-md p-4 flex-1 m-4 mt-0'>
            {/* TOP */}
            <div className='flex items-center justify-between'>
                <h1 className='hidden md:block text-lg font-semibold'>Examination Details</h1>
                <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
                    <TableSearch />
                    <div className='flex items-center gap-4 self-end'>
                        <button className='w-8 h-8 flex items-center justify-center rounded-full bg-Yellow'>
                            <Image src="/filter.png" alt="filter" height={14} width={14} />
                        </button>
                        <button className='w-8 h-8 flex items-center justify-center rounded-full bg-Yellow'>
                            <Image src="/sort.png" alt="sort" height={14} width={14} />
                        </button>
                        { role === "admin" || role === "faculty" && (
                                <button className='w-8 h-8 flex items-center justify-center rounded-full bg-Yellow'>
                                    <Image src="/create.png" alt="create" height={14} width={14} />
                                </button>)}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={examsData} />
            {/* PAGENATION */}
            {/* <Pagenation /> */}
        </div>
    )
}

export default StudentsListpage