import Link from "next/link"

type SectionSidebarProps = {
  name: string;
  path: string;
  nowPath: string;
}

export const SectionSidebar = ({ name, path, nowPath }: SectionSidebarProps) => {
  return (
    <div className={`w-8/10 text-center p-3 rounded-2xl duration-300 ${nowPath === path ? "bg-[var(--color-sidebar-accent)] text-[var(--color-sidebar-accent-fg)] shadow-2xl" : "bg-[var(--color-sidebar-bg)] text-[var(--color-sidebar-fg)]"}`}>
      <Link href={path}>{name}</Link>
    </div>
  )
}
