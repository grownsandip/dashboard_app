import FormModal from '@/components/FormModal'
import Pagenation from '@/components/Pagenation'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import prisma from '@/lib/prisma'
import { Item_per_page } from '@/lib/settings'
import { auth } from '@clerk/nextjs/server'
import { Class, Faculty, Lesson, Prisma, Subject} from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type LessonList = Lesson & { faculty: Faculty } & {Class:Class} & {subject:Subject};

const LessonListpage = async ({ searchParams, }: { searchParams: { [key: string]: string } | undefined }) => {
    const {sessionClaims}=await auth();
    const role=(sessionClaims?.metadata as {role:string})?.role;
    const { page, ...queryParams } = searchParams || {};//getting info from search params
    const p = page ? parseInt(page) : 1; //if page exists otherwise take 1 as default
    //URL PARAMS CONDITION Params may have many roles we need to filter them out
    const query: Prisma.LessonWhereInput = {};
    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "classId": {
                        query.classId=parseInt(value)
                    }
                    break;
                    case "facultyId": {
                        query.facultyId = value
                    }
                    break;
                    case "search":{ //search query based on two parameters
                        query.OR = [
                          { subject: { name: { contains: value, mode: "insensitive" } } },
                          { faculty: { firstname: { contains: value, mode: "insensitive" } } },
                        ];
                    }
                    break;
                }
            }
        }
    }
    // data fetchinng
    const [data, count] = await prisma.$transaction([
        prisma.lesson.findMany({
            where: query,
            include: {
                subject: {select:{name:true}},
                Class:{select:{name:true}},
                faculty:{select:{firstname:true,lastname:true}},
            },
            take: Item_per_page,//for pagenaton each page 10 items
            skip: Item_per_page * (p - 1), //when p=0 we skip 0 items,when 1 we skip first 10 items....so on
        }
        ),
        prisma.lesson.count({ where: query })
    ]);
    const columns = [
        {
            header: "Subject Name",
            accessor: "subjectname",
            className: "",
        },
        {
            header: "Course Code",
            accessor: "coursecode",
            className: "hidden md:table-cell",
        },
        {
            header: "Faculty",
            accessor: "faculty",
            className: "hidden md:table-cell",
        },
        ...(role === "admin"
            ? [
                {
                  header: "Actions",
                  accessor: "action",
                },
              ]
            : []),
    ];
    const renderRow = (item: LessonList) => (
        <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-PurpleLight'>
            <td className='flex items-center gap-4 p-4'>{item.subject.name}</td>
            <td className='hidden md:table-cell'>{item.Class.name}</td>
            <td className='hidden md:table-cell'>{item.faculty.firstname+" "+item.faculty.lastname}</td>
            <td>
                <div className='flex items-center gap-2'>
                    {role === "admin" && (
                        <>
                            <FormModal table='lesson' type='update' data={item} />
                            <FormModal table='lesson' type='delete' id={item.id} />
                        </>)}
                </div>
            </td>
        </tr>
    )
    return (
        <div className='bg-white rounded-md p-4 flex-1 m-4 mt-0'>
            {/* TOP */}
            <div className='flex items-center justify-between'>
                <h1 className='hidden md:block text-lg font-semibold'>All Lessons</h1>
                <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
                    <TableSearch />
                    <div className='flex items-center gap-4 self-end'>
                        <button className='w-8 h-8 flex items-center justify-center rounded-full bg-Yellow'>
                            <Image src="/filter.png" alt="filter" height={14} width={14} />
                        </button>
                        <button className='w-8 h-8 flex items-center justify-center rounded-full bg-Yellow'>
                            <Image src="/sort.png" alt="filter" height={14} width={14} />
                        </button>
                        {role === "admin" && (<FormModal table='lesson' type='create' />)}
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

export default LessonListpage