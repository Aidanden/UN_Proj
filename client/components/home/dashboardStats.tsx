"use client";


import Link from "next/link";
import {navItems} from "@/lib/navigation";
import {useDepartments} from "@/lib/query/departments";


const quickLinks = navItems.filter((item) => item.href !== "/")


export function DashboardStats() {
  const {data: departments , isError, isLoading} = useDepartments();

 let deptCount = "—";
 if(isLoading) deptCount = "...";
 else if(isError) deptCount = "غير متصل بالسيرفر";
 else deptCount = String(departments?.length ?? 0);



 return (
    <div className="space-y-4">
        <p className="text-sm text-zinc-600">
            مرحبا - اختر قسما للبدء
        </p>

        <ul className= " flex flex-wrap gap-2">
            {quickLinks.map(({label,href})=>(
                <li key={href}>
                    <Link href={href}
                    className=" rounded border border-zinc-200 bg-white px-2 py-1.5 text-sm hover:bg-zinc-50">
                        {label}
                    </Link>
                </li>
            ))}

        </ul>
        <p className="text-sm text-zinc-600">
            عدد الاقسام: <span className="font-medium">{deptCount}</span>
        </p>
    </div>

    

 )









}