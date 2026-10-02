'use client'

import { SectionSidebar } from "./Section.Sidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";


export default function Sidebar() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="min-h-screen w-45 bg-[var(--color-sidebar-bg)] border-e-2 transition-all duration-300 ease-in-out transform translate-x-0">
      <div className="flex p-2 text-3xl my-2 font-bold text-[var(--color-sidebar-fg)]">
        MENU
        <button className="p-2 ml-auto duration-300 hover:text-[var(--color-sidebar-accent-fg)]"><FaBars className="text-xl" /></button>
      </div>
      <div className="my-2 flex flex-col items-center gap-1">
        <SectionSidebar name={'管理画面'} path={'/'} nowPath={pathName} />
        <SectionSidebar name={'時刻表情報'} path={'/stationInfo'} nowPath={pathName} />
      </div>
    </aside>
  )
}
