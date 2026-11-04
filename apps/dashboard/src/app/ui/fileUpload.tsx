"use client"
import { handleFileUpload } from "@/actions/timetable/csvFileUpload";
import { FaFileCsv } from "react-icons/fa";
import { useState } from "react";
import { fileSchema } from "../types/validationTypes";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

import type { File_ } from "../types/validationTypes";
import type { z } from "zod";
import { useLog, useLogDispatch } from "@/contexts/logContext";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const logs = useLog();
  const dispatch = useLogDispatch(); // ログ操作用

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<  // transformにより入出力型が異なるため明示的に型指定
    z.input<typeof fileSchema>,
    unknown,
    z.output<typeof fileSchema>
  >({
    resolver: zodResolver(fileSchema)
  })

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.files?.[0];
    if (target) {
      setFile(target);
    }
  }

  return (
    <form
      className="h-full w-full mt-5 flex flex-col gap-5 items-center"
      onSubmit={handleSubmit((data: File_) => {
        handleFileUpload(data.file)
        dispatch({
          type: "add",
          log: {
            message: "CSVファイルをアップロードしました。",
            level: "info",
            timestamp: new Date().toISOString()
          }
        });
      })}
    >
      <div className="h-full w-2/3">
        <label
          htmlFor="csv_upload"
          className="flex items-center gap-2 text-gray-100 p-2 mx-5 bg-green-400 rounded-2xl"
        >
          <FaFileCsv className="text-4xl" />
          <div className="text-base">Upload CSV</div>
        </label>
        <input
          type="file"
          id="csv_upload"
          accept=".csv"
          {...register('file', {onChange: (e) => onFileChange(e)})}
          hidden
        />
      </div>
      { file &&
        <div className="preview">
          <p>{file.name}</p>
        </div>
      }
      { errors.file && <p>{errors.file.message}</p>}
      <button
        className="w-2/3 bg-green-500 text-gray-100 flex justify-center items-end "
        type="submit"
      >
        Upload
      </button>
    </form>
  )
}
