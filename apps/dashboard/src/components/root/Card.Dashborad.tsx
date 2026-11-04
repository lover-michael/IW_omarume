import React from "react"

type cardProps = {
  title: string,
  children: React.ReactNode;
}

export const CardComponent = (props: cardProps) => {
  return (
    <div className="m-2 p-2 h-100 rounded-2xl shadow-2xl bg-gray-100">
      <title>{props.title}</title>
      <span className="font-bold text-2xl">{props.title}</span>
      <div className="w-full min-h-fit my-2 border-t-2 border-gray-300">
        {props.children}
      </div>
    </div>
  )
}
