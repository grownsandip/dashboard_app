import Link from "next/link";
import Image from "next/image";
import { role } from "@/lib/data";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "faculties", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "faculties",
        href: "/list/Faculties",
        visible: ["admin", "faculties"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/Students",
        visible: ["admin", "faculties"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "faculties"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/Subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/list/Classes",
        visible: ["admin", "faculties"],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/Lessons",
        visible: ["admin", "faculties"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/Exams",
        visible: ["admin", "faculties", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/Assignments",
        visible: ["admin", "faculties", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/Results",
        visible: ["admin", "faculties", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/Attendance",
        visible: ["admin", "faculties", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/Events",
        visible: ["admin", "faculties", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/Messages",
        visible: ["admin", "faculties", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/Announcements",
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
                    <Image src={item.icon} alt="icons" height={20} width={20} />
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