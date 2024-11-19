import React from 'react'
import FormModal from './FormModal';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
 export type formContainerProps={
    table: "faculty" | "student" | "subject" | "semester" | "exam" | "assignment" | "event" | "announcement" | "parent" | "class" | "lesson" | "result"; type: "create" | "update" | "delete"; data?: any; id?: number | string 
 }
const FormContainer = async ({ table, type, data, id }: formContainerProps) => {
    let relatedData={}
    if(type!=="delete"){
        switch (table) {
            case "subject":
                const subjectFaculties=await prisma.faculty.findMany({
                    select:{id:true,username:true,firstname:true,lastname:true}
                })
                relatedData={faculties:subjectFaculties}
                break;
            case "class":
                const classSems=await prisma.semester.findMany({
                    select:{id:true,level:true}
                })
                const classTeachers=await prisma.faculty.findMany({
                    select:{id:true,firstname:true,lastname:true}
                })
                relatedData={faculties:classTeachers,semesters:classSems}
                break;
            case "faculty":
                 const facultySubjects=await prisma.subject.findMany({
                    select:{id:true,name:true}
                 })
                 relatedData={subjects:facultySubjects}
                 break;
            case "student":
                const studentSems=await prisma.semester.findMany({
                    select:{id:true,level:true}
                })
                const studentClasses=await prisma.class.findMany({
                    include:{_count:{select:{students:true}}}
                })
                relatedData={semesters:studentSems,classes:studentClasses}
                break;
            case "exam":
                const {userId,sessionClaims}=await auth();
                const role = (sessionClaims?.metadata as { role?: string })?.role;
                const examLessons=await prisma.lesson.findMany({
                    where:{
                        ...(role==="faculty"?{facultyId:userId!}:{})
                    },
                    select:{
                       id:true,
                       name:true,
                    }
                })
                relatedData={lessons:examLessons}
                break;
            default:
                break;
        }
    }
  return (
    <div className=''>
      <FormModal table={table} type={type} data={data} id={id} relatedData={relatedData}/>
    </div>
  )
}

export default FormContainer
