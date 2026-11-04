export const DisplayPeople = () => {
  return (
    <div className="w-11/12 rounded-2xl py-5 text-center grid grid-cols-2 text-gray-50 bg-emerald-500">
      <div className="col-span-1 border-r py-2 border-gray-600">
        <span className="font-bold">ただいまの乗車人数</span>
        <div className="">
          <span className="font-extrabold text-5xl">5</span>
          <span className="font-bold">人</span>
        </div>
      </div>
      <div className="col-span-1 py-2">
        <span className="font-bold">残りの座席</span>
        <div className="">
          <span className="font-extrabold text-5xl">3</span>
          <span className="font-bold">席</span>
        </div>
      </div>
    </div>
  )
}
