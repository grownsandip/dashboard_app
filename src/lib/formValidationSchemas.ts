import { z } from "zod";

export const subjectSchema = z.object({
    id:z.coerce.number().optional(),
    name: z.string().min(1, { message: "Subject name is required" }),
    faculties:z.array(z.string())
});
export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
    id:z.coerce.number().optional(),
    name: z.string().min(1, { message: "Subject name is required" }),
    capacity: z.coerce.number().min(1, { message: "Capacity cannot be empty" }),
    semId: z.coerce.number().min(1, { message: "sem  is required" }),
    instructorId:z.string().optional()
});
export type ClassSchema = z.infer<typeof classSchema>;

export const facultySchema = z.object({
    id:z.string().optional(),
    username: z.string().min(3, { message: "username must be atleast 3 characters long!" }).max(20, { message: "usename must be atmost 20 characters long!" }),
    password: z.string().min(8, { message: "Password must be atleast 8 characters long" }).optional().or(z.literal("")),
    email: z.string().email({ message: "Inavlid email address" }).optional().or(z.literal("")),
    firstname: z.string().min(1, { message: "first name cannot be empty" }),
    lastname: z.string().min(1, { message: "last name cannot be empty" }),
    phone: z.string().optional(),
    img: z.string().optional(),
    address: z.string(),
    bloodType: z.string().min(1, { message: "Blood group is required" }),
    birthday: z.coerce.date({ message: "Birth date is required!" }),
    gender: z.enum(["MALE", "FEMALE"], { message: "This field is required!" }),
    subjects:z.array(z.string()).optional(),
});
export type FacultySchema = z.infer<typeof facultySchema>;

export const studentSchema = z.object({
    id:z.string().optional(),
    username: z.string().min(3, { message: "username must be atleast 3 characters long!" }).max(20, { message: "usename must be atmost 20 characters long!" }),
    password: z.string().min(8, { message: "Password must be atleast 8 characters long" }).optional().or(z.literal("")),
    email: z.string().email({ message: "Inavlid email address" }).optional().or(z.literal("")),
    firstname: z.string().min(1, { message: "first name cannot be empty" }),
    lastname: z.string().min(1, { message: "last name cannot be empty" }),
    phone: z.string().optional(),
    img: z.string().optional(),
    address: z.string(),
    bloodType: z.string().min(1, { message: "Blood group is required" }),
    birthday: z.coerce.date({ message: "Birth date is required!" }),
    gender: z.enum(["MALE", "FEMALE"], { message: "This field is required!" }),
    semId:z.coerce.number().min(1,{message:"Sem is required"}),
    classId:z.coerce.number().min(1,{message:"Class is required"}),
    parentId:z.string().min(1,{message:"Parent Id is required"}),
});
export type StudentSchema = z.infer<typeof studentSchema>;

export const examSchema = z.object({
    id:z.coerce.number().optional(),
    title: z.string().min(1, { message: "Subject name is required" }),
    startTime:z.coerce.date({message:"Start Time is required"}),
    endTime:z.coerce.date({message:"End Time is required"}),
    lessonId:z.coerce.number({message:"lesson is required"}),
});
export type ExamSchema = z.infer<typeof examSchema>;