export const Item_per_page=10

type RouteAccessMap={
  [key:string]:string[];
};
 export const routeAccessMap:RouteAccessMap={
  "/admin(.*)": ["admin"],
  "/student(.*)": ["student"],
  "/faculty(.*)": ["faculty"],
  "/parents(.*)": ["parent"],
  "/list/faculties": ["admin", "faculty"],
  "/list/students": ["admin", "faculty"],
  "/list/parents": ["admin", "faculty"],
  "/list/subjects": ["admin"],
  "/list/classes": ["admin", "faculty"],
  "/list/exams": ["admin", "faculty", "student", "parent"],
  "/list/assignments": ["admin", "faculty", "student", "parent"],
  "/list/results": ["admin", "faculty", "student", "parent"],
  "/list/attendance": ["admin", "faculty", "student", "parent"],
  "/list/events": ["admin", "faculty", "student", "parent"],
  "/list/announcements": ["admin", "faculty", "student", "parent"],

 };