"use client"

import Link from "next/link";
import Image from "next/image";
import { role } from "@/lib/data";
import { usePathname } from 'next/navigation'

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Dashboard",
        href: "/",
        visible: ["admin", "faculties", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "faculties",
        href: "faculties",
        visible: ["admin", "faculties"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/students",
        visible: ["admin", "faculties"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/parents",
        visible: ["admin", "faculties"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/classes",
        visible: ["admin", "faculties"],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/lessons",
        visible: ["admin", "faculties"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/exams",
        visible: ["admin", "faculties", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/assignments",
        visible: ["admin", "faculties", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/results",
        visible: ["admin", "faculties", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/attendance",
        visible: ["admin", "faculties", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/events",
        visible: ["admin", "faculties", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/messages",
        visible: ["admin", "faculties", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/announcements",
        visible: ["admin", "faculties", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "faculties", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "faculties", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "faculties", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  const pathname = usePathname();
  return (
    <div className="mt-4 text-sm">
      {menuItems.map(i => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block my-4 text-gray-400 font-light">{i.title}</span>
          {
            i.items.map((item) => {
              if(item.visible.includes(role)){
                return (
                  <Link href={item.href} key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 py-2 text-gray-500 rounded-md hover:bg-lightSky md:px-2"
                  >
                    <Image src={item.icon} alt="icon" height={20} width={20} />
                    <span className="hidden lg:block">{item.label}</span>
                  </Link>
                  
                )
              }
            })
          }
        </div>
      ))}
    </div>
  )
}

export default Menu;