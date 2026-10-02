"use client"

import { signOut } from "next-auth/react";
import { FaRegAddressCard } from "react-icons/fa6";

export default function UserInfo({user}: { user: { name: string; } }) {
  return (
    <div className="w-9/10 mt-10 flex flex-col items-center justify-center gap-10">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <div className="w-full text-3xl font-bold mb-4 text-center px-4 border-b-4 border-gray-400 pb-4">登録者情報</div>
        <div className="w-full flex gap-4">
          <div className="w-1/3 border-2 p-4 border-gray-200 bg-gray-300 rounded-2xl">
            <FaRegAddressCard className="w-full text-5xl text-white"/>
          </div>
          <h1 className="w-2/3 text-2xl font-bold text-start flex items-center">{user?.name}</h1>
        </div>
      </div>
      <button className="w-2xs bg-rose-600 text-white px-4 py-2 rounded-lg text-md shadow-2xl" onClick={() => signOut()}>ログアウト</button>
    </div>
  )
}
