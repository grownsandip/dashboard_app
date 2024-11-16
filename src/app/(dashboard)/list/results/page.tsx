import FormModal from '@/components/FormModal'
import Pagenation from '@/components/Pagenation'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import prisma from '@/lib/prisma'
import { Item_per_page } from '@/lib/settings'
import { auth } from '@clerk/nextjs/server'
import { Prisma } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type ResultList = {
    id: number;
    title: string;
    level: string;
    studentFirstName: string;
    studentLastName: string;
    facultyFirstName: string;
    facultyLastName: string;
    score: number;
    className: string;
    startTime: Date;
};

const ResultsListpage = async ({ searchParams, }: { searchParams: { [key: string]: string } | undefined }) => {
    const { sessionClaims, userId } = await auth();
    const role = (sessionClaims?.metadata as { role: string })?.role;
    const { page, ...queryParams } = searchParams || {};//getting info from search params
    const p = page ? parseInt(page) : 1; //if page exists otherwise take 1 as default
    //URL PARAMS CONDITION Params may have many roles we need to filter them out
    const query: Prisma.ResultWhereInput = {};
    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "studentId": {
                        query.studentId = value;
                    }
                        break;
                    case "search": { //search query based on two parameters
                        query.OR = [
                            { exam: { title: { contains: value, mode: "insensitive" } } },
                            { Student: { firstname: { contains: value, mode: "insensitive" } } },
                        ];
                    }
                        break;
                }
            }
        }
    }
    //role conditions
    switch (role) {
        case "admin":
            break;
        case "faculty":
            query.OR = [
                { exam: { lessons: { facultyId: userId! } }, assignment: { lessons: { facultyId: userId! } } }
            ]
            break;
        case "student":
            query.studentId=userId!
            break;
        case "parent":
            query.Student={
                parentId:userId!
            }
            break;
        default:
            break;
    }
    // data fetchinng
    const [dataRes, count] = await prisma.$transaction([
        prisma.result.findMany({
            where: query,
            include: {
                Student: { select: { firstname: true, lastname: true } },
                exam: {
                    include: {
                        lessons: {
                            select: {
                                Class: { select: { name: true } },
                                faculty: { select: { firstname: true, lastname: true } }
                            }
                        }
                    }
                },
                assignment: {
                    include: {
                        lessons: {
                            select: {
                                Class: { select: { name: true } },
                                faculty: { select: { firstname: true, lastname: true } }
                            }
                        }
                    }
                }
            },
            take: Item_per_page,//for pagenaton each page 10 items
            skip: Item_per_page * (p - 1), //when p=0 we skip 0 items,when 1 we skip first 10 items....so on
        }
        ),
        prisma.result.count({ where: query })
    ]);
    const data = dataRes.map(item => {
        const assessment = item.exam || item.assignment
        //console.log(assessment)
        if (!assessment) return null
        const isExam = "startDate" in assessment;
        return {
            id: item.id,
            title: item.exam?.title,
            level: item.assignment?.level,
            studentFirstName: item.Student.firstname,
            studentLastName: item.Student.lastname,
            facultyFirstName: assessment.lessons.faculty.firstname,
            facultyLastName: assessment.lessons.faculty.lastname,
            score: item.score,
            className: assessment.lessons.Class.name,
            startTime: assessment.startDate,
        }
    })
    const columns = [
        {
            header: "Title",
            accessor: "title",
            className: "",
        },
        {
            header: "Student",
            accessor: "students",
            className: "hidden md:table-cell",
        },
        {
            header: "Score",
            accessor: "score",
            className: "hidden md:table-cell",
        },
        {
            header: "Faculty",
            accessor: "faculty",
            className: "hidden md:table-cell",
        },
        {
            header: "Date",
            accessor: "date",
            className: "hidden md:table-cell",
        },
        {
            header: "Course Code",
            accessor: "coursecode",
            className: "hidden md:table-cell",
        },
        ...(role === "admin" || role === "teacher"
            ? [
                {
                    header: "Actions",
                    accessor: "action",
                },
            ]
            : []),
    ];

    const renderRow = (item: ResultList) => (
        <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-PurpleLight'>
            <td className='flex items-center gap-4 p-4'>{item.title ? item.title : item.level}</td>
            <td className='hidden md:table-cell'>{item.studentFirstName + " " + item.studentLastName}</td>
            <td className='hidden md:table-cell'>{item.score}</td>
            <td className='hidden md:table-cell'>{item.facultyFirstName + " " + item.facultyLastName}</td>
            <td>{new Intl.DateTimeFormat("en-IN").format(item.startTime)}</td>
            <td className='hidden md:table-cell'>{item.className}</td>
            <td>
                <div className='flex items-center gap-2'>
                    {(role === "admin" || role === "faculty") && (
                        <>
                            <FormModal table='result' type='update' data={item} />
                            <FormModal table='result' type='delete' id={item.id} />
                        </>)}
                </div>
            </td>
        </tr>
    )
    return (
        <div className='bg-white rounded-md p-4 flex-1 m-4 mt-0'>
            {/* TOP */}
            <div className='flex items-center justify-between'>
                <h1 className='hidden md:block text-lg font-semibold'>Results</h1>
                <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
                    <TableSearch />
                    <div className='flex items-center gap-4 self-end'>
                        <button className='w-8 h-8 flex items-center justify-center rounded-full bg-Yellow'>
                            <Image src="/filter.png" alt="filter" height={14} width={14} />
                        </button>
                        <button className='w-8 h-8 flex items-center justify-center rounded-full bg-Yellow'>
                            <Image src="/sort.png" alt="filter" height={14} width={14} />
                        </button>
                        {(role === "admin" || role === "faculty") && (<FormModal table='result' type='create' />)}
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

export default ResultsListpage