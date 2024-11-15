import Pagenation from '@/components/Pagenation'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import prisma from '@/lib/prisma'
import { role} from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Item_per_page } from '@/lib/settings'
import { Assignment, Class, Faculty, Prisma, Subject } from '@prisma/client'
import FormModal from '@/components/FormModal'

type AssignmentList = Assignment & {
    lessons: {
        subject: Subject,
        Class: Class,
        faculty: Faculty
    }
}
const columns = [
    {
        header: "Subject Name",
        accessor: "Subjectname",
        classNme: "",
    },
    {
        header: "Course Code",
        accessor: "coursecode",
        className: "hidden md:table-cell",
    },
    {
        header: "Instructor",
        accessor: "instructor",
        className: "hidden md:table-cell",
    },
    {
        header: "Due Date",
        accessor: "duedate",
    },
    {
        header: "Actions",
        accessor: "actions",
        className: "",
    }
];

const renderRow = (item: AssignmentList) => (
    <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-PurpleLight'>
        <td className='items-center gap-4 p-4 font-semibold'>{item.lessons.subject.name}</td>
        <td>{item.lessons.Class.name}</td>
        <td className='hidden md:table-cell'>{item.lessons.faculty.firstname + " " + item.lessons.faculty.lastname}</td>
        <td>{new Intl.DateTimeFormat("en-IN").format(item.dueDate)}</td>
        <td>
            <div className='flex items-center gap-2'>
                <Link href={`/exams/${item.id}`}>
                    <button className='w-7 h-7 rounded-full bg-Sky flex items-center justify-center'>
                        <Image src="/view.png" alt="" height={16} width={16} />
                    </button>
                </Link>
                {role === "admin" || role === "faculty" && (<>
                    <FormModal table='exam' type="update" data={item} />
                    <FormModal table='exam' type="delete" id={item.id} />
                </>)}
            </div>
        </td>
    </tr>
)
const AssignmentsListpage = async ({ searchParams, }: { searchParams: { [key: string]: string } | undefined }) => {
    const { page, ...queryParams } = searchParams || {};//getting info from search params
    const p = page ? parseInt(page) : 1; //if page exists otherwise take 1 as default
    //URL PARAMS CONDITION Params may have many roles we need to filter them out
    const query: Prisma.AssignmentWhereInput = {};
    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            query.lessons={}
            if (value !== undefined) {
                switch (key) {
                    case "classId":
                        query.lessons.classId = parseInt(value)
                        break;
                    case "facultyId": 
                        query.lessons.facultyId = value;
                        break;
                    case "search": //search query based on two parameters
                        query.lessons.subject={
                                name: { contains: value, mode: "insensitive" }
                            };
                        break;
                        default:
                        break;
                    }
            }
        }
    }

    // data fetchinng
    const [data, count] = await prisma.$transaction([
        prisma.assignment.findMany({
            where: query,
            include: {
                lessons: {
                    select: {
                        subject: { select: { name: true } },
                        faculty: { select: { firstname: true, lastname: true } },
                        Class: { select: { name: true } },
                    }
                }
            },
            take: Item_per_page,//for pagenaton each page 10 items
            skip: Item_per_page * (p - 1), //when p=0 we skip 0 items,when 1 we skip first 10 items....so on
        }
        ),
        prisma.assignment.count({ where: query })
    ]);
    return (
        <div className='bg-white rounded-md p-4 flex-1 m-4 mt-0'>
            {/* TOP */}
            <div className='flex items-center justify-between'>
                <h1 className='hidden md:block text-lg font-semibold'>Assignment Lists</h1>
                <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
                    <TableSearch />
                    <div className='flex items-center gap-4 self-end'>
                        <button className='w-8 h-8 flex items-center justify-center rounded-full bg-Yellow'>
                            <Image src="/filter.png" alt="filter" height={14} width={14} />
                        </button>
                        <button className='w-8 h-8 flex items-center justify-center rounded-full bg-Yellow'>
                            <Image src="/sort.png" alt="sort" height={14} width={14} />
                        </button>
                        {role === "admin" || role === "faculty" && (
                            <FormModal table="exam" type="create" />)}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={data} />
            {/* PAGENATION */}
            <Pagenation page={p} count={count} />
        </div>
    )
}

export default AssignmentsListpage