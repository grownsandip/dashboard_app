import FormModal from '@/components/FormModal';
import Pagenation from '@/components/Pagenation';
import Table from '@/components/Table';
import TableSearch from '@/components/TableSearch';
import prisma from '@/lib/prisma';
import { Item_per_page } from '@/lib/settings';
import { auth } from '@clerk/nextjs/server';
import { Class,Event, Prisma} from '@prisma/client';
import Image from 'next/image';
import React from 'react'
type EventList = Event & { class: Class };
const EventsListPage = async ({
    searchParams,
  }: {
    searchParams: { [key: string]: string | undefined };
  }) => {
    const { userId, sessionClaims } = await auth();
   // console.log(userId)
    const role = (sessionClaims?.metadata as { role?: string })?.role;
   // console.log(role)
    const columns = [
        {
          header: "Title",
          accessor: "title",
        },
        {
          header: "Class",
          accessor: "class",
        },
        {
          header: "Date",
          accessor: "date",
          className: "hidden md:table-cell",
        },
        {
          header: "Start Time",
          accessor: "startTime",
          className: "hidden md:table-cell",
        },
        {
          header: "End Time",
          accessor: "endTime",
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
    const renderRow = (item: EventList) => (
        <tr
          key={item.id}
          className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
        >
          <td className="flex items-center gap-4 p-4">{item.title}</td>
          <td>{item.class?.name || "-"}</td>
          <td className="hidden md:table-cell">
            {new Intl.DateTimeFormat("en-IN").format(item.startTime)}
          </td>
          <td className="hidden md:table-cell">
            {item.startTime.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </td>
          <td className="hidden md:table-cell">
            {item.endTime.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </td>
          <td>
            <div className="flex items-center gap-2">
              {role === "admin" && (
                <>
                  (<FormModal table="event" type="update" data={item} />
                  <FormModal table="event" type="delete" id={item.id} />)
                </>
              )}
            </div>
          </td>
        </tr>
      );
    const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.EventWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }
 //role conditions
 const roleConditions = {
    faculty: { lessons: { some: { facultyId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  query.OR = [
    { classId: null },
    {
      class: roleConditions[role as keyof typeof roleConditions] || {},
    },
  ];

  const [data, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: query,
      include: {
        class: true,
      },
      take: Item_per_page,
      skip: Item_per_page* (p - 1),
    }),
    prisma.event.count({ where: query }),
  ]);
  //console.log(data)
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
    {/* TOP */}
    <div className="flex items-center justify-between">
      <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <TableSearch />
        <div className="flex items-center gap-4 self-end">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
            <Image src="/filter.png" alt="" width={14} height={14} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
            <Image src="/sort.png" alt="" width={14} height={14} />
          </button>
          {role === "admin" && (<FormModal table="event" type="create" />)}
        </div>
      </div>
    </div>
    {/* LIST */}
    <Table columns={columns} renderRow={renderRow} data={data} />
    {/* PAGINATION */}
    <Pagenation page={p} count={count} />
  </div>
  )
}

export default EventsListPage