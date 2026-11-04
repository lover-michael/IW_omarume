import Link from "next/link"
import { FaAngleRight } from "react-icons/fa6"

type propsType = {
  title: string,
  subTitle?: string,
  icon: React.ReactNode,
  href: string,
}

export const InfoCardComponent = ({ title, subTitle="", icon, href }: propsType) => {
  return (
    <Link className="flex items-center w-11/12 h-25 rounded-2xl border-2 border-gray-200 bg-gray-50" href={href}>
      <div className="w-15 h-15 mx-2 flex items-center justify-center bg-gray-300 rounded-full">
        {icon}
      </div>
      <div className="w-3/5 text-md text-center">
        <div className="font-bold">{title}</div>
        {subTitle === "" ? "" : <div className="rounded-2xl py-1 px-1 mx-2 bg-rose-400 text-gray-100">{subTitle}</div>}
      </div>
      <FaAngleRight className="w-1/5 text-right text-2xl font-bold"/>
    </Link>
  )
}
