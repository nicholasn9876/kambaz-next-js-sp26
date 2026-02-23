"use client";
import React from "react";
import { usePathname } from "next/navigation";
export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
 const pathname = usePathname();
 const Capitalize = (str?: string) => {
  return str ? str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase() : "";
 }
 return (
   <span>
     {course?.name} &gt; {Capitalize(pathname.split("/").pop())}
   </span>
);}
