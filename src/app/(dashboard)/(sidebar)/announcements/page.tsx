import FormModal from '@/components/FormModal'
import { announcementsData, role,studentsData } from '@/lib/data'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import Pagenation from '@/components/Pagenation'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



type Announcements={
    id:number,
    title: string,
    desc: string,
    dept: string,
    semester: string,
    date : string
}

const columns = [
    {
        header: "Title",
        accessor: "title",
        className:"",
    },
    {
        header: "Description",
        accessor: "description",
        className:"hidden md:table-cell",
    },
    {
        header: "Department",
        accessor: "department",
        className:"hidden md:table-cell",
    },
    {
        header: "Semester",
        accessor: "semester",
        className:"hidden md:table-cell",
    },
    {
        header: "Date",
        accessor: "date",
        className:"hidden md:table-cell",
    },
    {
        header: "Actions",
        accessor: "actions",
        className:"",
    },
];

const AnnouncementsPage = () => {
    const renderRow=(item:Announcements)=>(
        <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-PurpleLight'>
           <td className='flex items-center p-4 gap-4'>
               <div className='flex flex-col'>
                  <h3 className='font-semibold'>{item.title}</h3>
               </div>
           </td>
           <td className='hidden md:table-cell'>{item.desc}</td>
           <td className='hidden md:table-cell'>{item.dept}</td>
           <td className='hidden md:table-cell'>{item.semester}</td>
           <td className='hidden md:table-cell'>{item.date}</td>
           <td>
               <div className='flex items-center gap-2'>
                   <Link href={`/list/students/${item.id}`}>
                   <button className='w-7 h-7 rounded-full bg-Sky flex items-center justify-center'>
                       <Image src="/view.png" alt="" height={16} width={16}/>
                   </button>
                   </Link>
                   {role==="admin"&&(//<button className='w-7 h-7 rounded-full bg-Purple flex items-center justify-center'>
                       //<Image src="/delete.png" alt="" height={16} width={16}/>
                   //</button>
                   <FormModal table='student' type='delete' id={item.id}/>
                   )}
               </div>
           </td>
        </tr>
   )
    return (
        <div className='bg-white rounded-md p-4 flex-1 m-4 mt-0'>
            {/* TOP */}
            <div className='flex items-center justify-between'>
                <h1 className='hidden md:block text-lg font-semibold'>All Announcements</h1>
                <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
                    <TableSearch />
                    <div className='flex items-center gap-4 self-end'>
                        <button className='w-8 h-8 flex items-center justify-center rounded-full bg-Yellow'>
                            <Image src="/filter.png" alt="filter" height={14} width={14} />
                        </button>
                        <button className='w-8 h-8 flex items-center justify-center rounded-full bg-Yellow'>
                            <Image src="/sort.png" alt="filter" height={14} width={14} />
                        </button>
                        {role ==="admin" &&(//<button className='w-8 h-8 flex items-center justify-center rounded-full bg-Yellow'>
                            //<Image src="/plus.png" alt="filter" height={14} width={14} />
                       // </button>
                       <FormModal table='student' type='create'/>
                       )}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={announcementsData}/>
            {/* PAGENATION */}
            <Pagenation />
        </div>
    )
}

export default AnnouncementsPage