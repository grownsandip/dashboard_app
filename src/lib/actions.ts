"use server";


import { SubjectSchema ,ClassSchema, FacultySchema, StudentSchema, ExamSchema} from "./formValidationSchemas";
import prisma from "./prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

type CurrentState={success:boolean,error:boolean}

export const createSubject = async (currentState:CurrentState,data: SubjectSchema) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        faculties:{
            connect:data.faculties.map((facultyId)=>({id:facultyId}))
        }
      },
    });
    // revalidatePath("/list/subjects")
    return {success:true,error:false}
  } catch (error) {
    console.log(error);
    return {success:false,error:true}
  }
};

export const updateSubject = async (currentState:CurrentState,data: SubjectSchema) => {
    try {
      await prisma.subject.update({
        where:{
            id:data.id
        },
        data: {
          name: data.name,
          faculties:{
            set:data.faculties.map((facultyId)=>({id:facultyId}))
          }
        },
      });
      // revalidatePath("/list/subjects")
      return {success:true,error:false}
    } catch (error) {
      console.log(error);
      return {success:false,error:true}
    }
  };
  export const deleteSubject = async (currentState:CurrentState,data: FormData) => {
    const id=data.get("id") as string;
    try {
      await prisma.subject.delete({
        where: {
          id: parseInt(id),
        },
      });
      // revalidatePath("/list/subjects")
      return {success:true,error:false}
    } catch (error) {
      console.log(error);
      return {success:false,error:true}
    }
  };

  //class actions
  export const createClass = async (currentState:CurrentState,data: ClassSchema) => {
    try {
      await prisma.class.create({
        data
      });
      // revalidatePath("/list/subjects")
      return {success:true,error:false}
    } catch (error) {
      console.log(error);
      return {success:false,error:true}
    }
  };
  
  export const updateClass = async (currentState:CurrentState,data: ClassSchema) => {
      try {
        await prisma.class.update({
          where:{
              id:data.id
          },
          data,
        });
        // revalidatePath("/list/subjects")
        return {success:true,error:false}
      } catch (error) {
        console.log(error);
        return {success:false,error:true}
      }
    };
    export const deleteClass = async (currentState:CurrentState,data: FormData) => {
      const id=data.get("id") as string;
      try {
        await prisma.class.delete({
          where: {
            id: parseInt(id),
          },
        });
        // revalidatePath("/list/subjects")
        return {success:true,error:false}
      } catch (error) {
        console.log(error);
        return {success:false,error:true}
      }
    };

    //tecaher form actions
    export const createFaculty = async (currentState:CurrentState,data: FacultySchema) => {
      try {
        const user = await (await clerkClient()).users.createUser ({ //this was in change logs of clerk
          username:data.username,
          password:data.password,
          firstName:data.firstname,
          lastName:data.lastname,
          publicMetadata:{role:"faculty"},
        });
        await prisma.faculty.create({
          data:{
            id:user.id,
            username:data.username,
            firstname:data.firstname,
            lastname:data.lastname,
            email:data.email||null,
            address:data.address,
            phone:data.phone||null,
            bloodType:data.bloodType,
            gender:data.gender,
            img:data.img || null,
            dob:data.birthday,
            subjects:{
              connect:data.subjects?.map((subjectId:string)=>({
                id:parseInt(subjectId)
              }))
            }
          }
        })
        // revalidatePath("/list/subjects")
        return {success:true,error:false}
      } catch (error) {
        console.log(error);
        return {success:false,error:true}
      }
    };
    
    export const updateFaculty = async (currentState:CurrentState,data: FacultySchema) => {
        if(!data.id){
          return  {success:false,error:true}
        }
        try {
            const user = await (await clerkClient()).users.updateUser(data.id,{ //this was in change logs of clerk
            username:data.username,
            ...(data.password!=="" && {password:data.password}),
            firstName:data.firstname,
            lastName:data.lastname,
          });
          await prisma.faculty.update({
            where:{id:data.id},
            data:{
              ...(data.password!=="" && {password:data.password}),
              username:data.username,
              firstname:data.firstname,
              lastname:data.lastname,
              email:data.email||null,
              address:data.address,
              phone:data.phone||null,
              bloodType:data.bloodType,
              gender:data.gender,
              img:data.img || null,
              dob:data.birthday,
              subjects:{
                set:data.subjects?.map((subjectId:string)=>({
                  id:parseInt(subjectId)
                })),
              },
            },
          });
          // revalidatePath("/list/subjects")
          return {success:true,error:false}
        } catch (error) {
          console.log(error);
          return {success:false,error:true}
        }
      };
      export const deleteFaculty = async (currentState:CurrentState,data: FormData) => {
        const id=data.get("id") as string;
        try {
          await (await clerkClient()).users.deleteUser(id)
          await prisma.faculty.delete({
            where: {
              id:id,
            },
          });
          // revalidatePath("/list/subjects")
          return {success:true,error:false}
        } catch (error) {
          console.log(error);
          return {success:false,error:true}
        }
      };


       //tecaher form actions
    export const createStudent = async (currentState:CurrentState,data: StudentSchema) => {
      try {
        const classItem=await prisma.class.findUnique({
          where:{
            id:data.classId,
          },
            include:{_count:{select:{students:true}}},
        });
        if(classItem && classItem.capacity===classItem._count.students){
          return {success:false,error:true};
        }
        const user = await (await clerkClient()).users.createUser ({ //this was in change logs of clerk
          username:data.username,
          password:data.password,
          firstName:data.firstname,
          lastName:data.lastname,
          publicMetadata:{role:"student"},
        });
        await prisma.student.create({
          data:{
            id:user.id,
            username:data.username,
            firstname:data.firstname,
            lastname:data.lastname,
            email:data.email||null,
            address:data.address,
            phone:data.phone||null,
            bloodType:data.bloodType,
            gender:data.gender,
            img:data.img || null,
            dob:data.birthday,
            semId:data.semId,
            classId:data.classId,
            parentId:data.parentId,
          }
        })
        // revalidatePath("/list/subjects")
        return {success:true,error:false}
      } catch (error) {
        console.log(error);
        return {success:false,error:true}
      }
    };
    
    export const updateStudent = async (currentState:CurrentState,data: StudentSchema) => {
        if(!data.id){
          return  {success:false,error:true}
        }
        try {
            const user = await (await clerkClient()).users.updateUser(data.id,{ //this was in change logs of clerk
            username:data.username,
            ...(data.password!=="" && {password:data.password}),
            firstName:data.firstname,
            lastName:data.lastname,
          });
          await prisma.student.update({
            where:{id:data.id},
            data:{
              ...(data.password!=="" && {password:data.password}),
              username:data.username,
              firstname:data.firstname,
              lastname:data.lastname,
              email:data.email||null,
              address:data.address,
              phone:data.phone||null,
              bloodType:data.bloodType,
              gender:data.gender,
              img:data.img || null,
              dob:data.birthday,
              semId:data.semId,
              classId:data.classId,
              parentId:data.parentId,
            },
          });
          // revalidatePath("/list/subjects")
          return {success:true,error:false}
        } catch (error) {
          console.log(error);
          return {success:false,error:true}
        }
      };
      export const deleteStudent = async (currentState:CurrentState,data: FormData) => {
        const id=data.get("id") as string;
        try {
          await (await clerkClient()).users.deleteUser(id)
          await prisma.student.delete({
            where: {
              id:id,
            },
          });
          // revalidatePath("/list/subjects")
          return {success:true,error:false}
        } catch (error) {
          console.log(error);
          return {success:false,error:true}
        }
      };

      export const createExam = async (currentState:CurrentState,data: ExamSchema) => {
        const {userId,sessionClaims}=await auth();
        const role = (sessionClaims?.metadata as { role?: string })?.role;
        try {
          if(role==="faculty"){
          const facultyLessons=await prisma.lesson.findFirst({
            where:{
              facultyId:userId!,
              id:data.lessonId,
            }
          })
          if(!facultyLessons){
            return {success:false,error:true}
          }
        }
          await prisma.exam.create({
            data: {
              title: data.title,
              startDate:data.startTime,
              endDate:data.endTime,
              lessonId:data.lessonId,
            },
          });
          // revalidatePath("/list/subjects")
          return {success:true,error:false}
        } catch (error) {
          console.log(error);
          return {success:false,error:true}
        }
      };
      
      export const updateExam = async (currentState:CurrentState,data: ExamSchema) => {
        const {userId,sessionClaims}=await auth();
        const role = (sessionClaims?.metadata as { role?: string })?.role;
        try {
          if(role==="faculty"){
          const facultyLessons=await prisma.lesson.findFirst({
            where:{
              facultyId:userId!,
              id:data.lessonId,
            }
          })
          if(!facultyLessons){
            return {success:false,error:true}
          }
        }
          await prisma.exam.update({
            where:{
              id:data.id,
            },
            data: {
              title: data.title,
              startDate:data.startTime,
              endDate:data.endTime,
              lessonId:data.lessonId,
            },
          });
          // revalidatePath("/list/subjects")
          return {success:true,error:false}
        } catch (error) {
            console.log(error);
            return {success:false,error:true}
          }
        };
        export const deleteExam = async (currentState:CurrentState,data: FormData) => {
          const id=data.get("id") as string;
          const {userId,sessionClaims}=await auth();
          const role = (sessionClaims?.metadata as { role?: string })?.role;
          try {
            await prisma.exam.delete({
              where: {
                id: parseInt(id),
                ...(role==="faculty"?{lesson:{facultyId:userId!}}:{})
              },
            });
            // revalidatePath("/list/subjects")
            return {success:true,error:false}
          } catch (error) {
            console.log(error);
            return {success:false,error:true}
          }
        };