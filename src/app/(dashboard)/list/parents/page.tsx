import Pagenation from '@/components/Pagenation'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { parentsData, role} from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Parent={
    id: number,
    name: string,
    students:string[],
    email: string,
    phone: string,
    address: string,
}
const columns = [
    {
        header: "Name",
        accessor: "name",
        className:"",
    },
    {
        header: "Student Names",
        accessor: "studentnames",
        className:"hidden md:table-cell",
    },
    {
        header: "Contacts",
        accessor: "contacts",
        className: "hidden md:table-cell",
    },
    {
        header: "Address",
        accessor: "address",
        className: "hidden md:table-cell",
    },
    {
        header: "Actions",
        accessor: "actions",
        className:"",
    },
];

const ParentsListpage = () => {
    const renderRow=(item:Parent)=>(
         <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-PurpleLight'>
            <td className='flex items-center p-4 gap-4'>
                <div className='flex flex-col'>
                   <h3 className='font-semibold'>{item.name}</h3>
                   <p className='text-xs text-gray-500'>{item?.email}</p>
                </div>
            </td>
            <td className='hidden md:table-cell'>{item.students.join(",")}</td>
            <td className='hidden md:table-cell'>{item.phone}</td>
            <td className='hidden md:table-cell'>{item.address}</td>
            <td>
                <div className='flex items-center gap-2'>
                    <Link href={`/list/parents/${item.id}`}>
                    <button className='w-7 h-7 rounded-full bg-Sky flex items-center justify-center'>
                        <Image src="/view.png" alt="" height={16} width={16}/>
                    </button>
                    </Link>
                    {role==="admin"&&(<button className='w-7 h-7 rounded-full bg-Purple flex items-center justify-center'>
                        <Image src="/delete.png" alt="" height={16} width={16}/>
                    </button>)}
                </div>
            </td>
         </tr>
    )
    return (
        <div className='bg-white rounded-md p-4 flex-1 m-4 mt-0'>
            {/* TOP */}
            <div className='flex items-center justify-between'>
                <h1 className='hidden md:block text-lg font-semibold'>All Parents</h1>
                <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
                    <TableSearch />
                    <div className='flex items-center gap-4 self-end'>
                        <button className='w-8 h-8 flex items-center justify-center rounded-full bg-Yellow'>
                            <Image src="/filter.png" alt="filter" height={14} width={14} />
                        </button>
                        <button className='w-8 h-8 flex items-center justify-center rounded-full bg-Yellow'>
                            <Image src="/sort.png" alt="filter" height={14} width={14} />
                        </button>
                        <button className='w-8 h-8 flex items-center justify-center rounded-full bg-Yellow'>
                            <Image src="/plus.png" alt="filter" height={14} width={14} />
                        </button>
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={parentsData}/>
            {/* PAGENATION */}
            <Pagenation />
        </div>
    )
}

export default ParentsListpage