import FormModal from '@/components/FormModal'
import Pagenation from '@/components/Pagenation'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { parentsData, role } from '@/lib/data'
import prisma from '@/lib/prisma'
import { Item_per_page } from '@/lib/settings'
import { Faculty, Prisma, Subject } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type SubjectList = Subject & { faculties: Faculty[] };
const columns = [
    {
        header: "Subject Name",
        accessor: "name",
        className: "",
    },
    {
        header: "Faculties",
        accessor: "facultynames",
        className: "hidden md:table-cell",
    },
    {
        header: "Actions",
        accessor: "actions",
        className: "",
    },
];

const renderRow = (item: SubjectList) => (
    <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-PurpleLight'>
        <td className='flex items-center gap-4 p-4'>{item.name}</td>
        <td className='hidden md:table-cell'>{item.faculties.map((faculty) => faculty.firstname).join(",")}</td>
        <td>
            <div className='flex items-center gap-2'>
                {role === "admin" && (
                    <>
                        <FormModal table='subject' type='update' data={item} />
                        <FormModal table='subject' type='delete' id={item.id} />
                    </>)}
            </div>
        </td>
    </tr>
)
const SubjectsListpage = async ({ searchParams, }: { searchParams: { [key: string]: string } | undefined }) => {
    const { page, ...queryParams } = searchParams || {};//getting info from search params
    const p = page ? parseInt(page) : 1; //if page exists otherwise take 1 as default
    //URL PARAMS CONDITION Params may have many roles we need to filter them out
    const query: Prisma.SubjectWhereInput = {};
    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "search": {
                        query.name = { contains: value, mode: 'insensitive' }
                    }
                    break;
                }
            }
        }
    }
    // data fetchinng
    const [data, count] = await prisma.$transaction([
        prisma.subject.findMany({
            where: query,
            include: {
                faculties: true,
            },
            take: Item_per_page,//for pagenaton each page 10 items
            skip: Item_per_page * (p - 1), //when p=0 we skip 0 items,when 1 we skip first 10 items....so on
        }
        ),
        prisma.subject.count({ where: query })
    ]);
    return (
        <div className='bg-white rounded-md p-4 flex-1 m-4 mt-0'>
            {/* TOP */}
            <div className='flex items-center justify-between'>
                <h1 className='hidden md:block text-lg font-semibold'>All Subjects</h1>
                <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
                    <TableSearch />
                    <div className='flex items-center gap-4 self-end'>
                        <button className='w-8 h-8 flex items-center justify-center rounded-full bg-Yellow'>
                            <Image src="/filter.png" alt="filter" height={14} width={14} />
                        </button>
                        <button className='w-8 h-8 flex items-center justify-center rounded-full bg-Yellow'>
                            <Image src="/sort.png" alt="filter" height={14} width={14} />
                        </button>
                        {role === "admin" && (<FormModal table='subject' type='create' />)}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={data} />
            {/* PAGENATION */}
            <Pagenation page={p} count={count}/>
        </div>
    )
}

export default SubjectsListpage