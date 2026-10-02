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
      className="w-full mt-5 flex flex-col gap-5 items-center"
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
      <div>
        <label
          htmlFor="csv_upload"
          className="flex items-center gap-2 text-lg text-black px-3 py-1 bg-gray-200"
        >
          <FaFileCsv className="text-4xl text-green-400" />
          <div className="text-sm">Upload CSV</div>
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
        className="w-40 h-6 bg-green-500 text-gray-100 justify-center items-center flex"
        type="submit"
      >
        Upload
      </button>
    </form>
  )
}
