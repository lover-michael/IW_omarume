'use client'

import { SectionSidebar } from "./Section.Sidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaX } from "react-icons/fa6";


export default function Sidebar() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className={`p-2 flex min-h-full text-(--color-sidebar-fg) bg-(--color-sidebar-bg) border-e-2 transition-all duration-300 ${isOpen ? 'w-62' : 'w-10'}`}>
      <div className={`w-9/10 ${isOpen ? "" : "hidden"}`}>
        <span className="font-bold text-3xl text-(--color-sidebar-fg)">MENU</span>
        <div className="my-2 flex flex-col gap-1">
          <SectionSidebar name={'管理画面'} path={'/'} nowPath={pathName} />
          <SectionSidebar name={'時刻表情報'} path={'/stationInfo'} nowPath={pathName} />
        </div>
      </div>
      <button
        className="h-fit py-2 flex items-baseline hover:text-(--color-sidebar-accent-fg)"
        onClick={() => { setIsOpen(!isOpen) }}
      >
        { isOpen ? <FaX className="text-xl" /> : <FaBars className="text-xl" />}
      </button>
    </aside>
  )
}
