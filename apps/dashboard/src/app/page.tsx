import { CardComponent } from "@/components/root/Card.Dashborad";
import FileUpload from "./ui/fileUpload";
import ClipBoard from "./ui/clipBoard";

export default function Home() {
  return (
    <div className="grid min-h-full bg-gray-200 grid-cols-1 gap-4 md:grid-cols-2">
      <div className="font-bold text-4xl px-2 md:col-span-2">
        DashBoard
      </div>
      <div className="col-span-1 md:col-span-2">
        <CardComponent title="Clip Board">
          <ClipBoard />
        </CardComponent>
      </div>
      <div className="md:col-span-1">
        <CardComponent title="Master Account">
          <div></div>
        </CardComponent>
      </div>
      <div className="md:col-span-1">
        <CardComponent title="File Upload">
          <FileUpload />
        </CardComponent>
      </div>
    </div>
  )
}
