"use client"
import { handleFileUpload } from "@/actions/timetable/csvFileUpload";
import { Flex, Button } from "@chakra-ui/react";
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
      style={{
        height: 'full',
        margin: 'auto',
        padding: '10px',
        borderRadius: 'xl',
        boxShadow: 'xl',
        fontSize: 'xs'
      }}
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
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5px',
            gap: '5px',
            boxShadow: '5px 5px 5px 5px rgba(0, 0, 0, 0.1)',
            borderRadius: '5px',
          }}
        >
          <FaFileCsv style={{color: 'green'}}/>Upload CSV
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
      <Button
        width={'80%'}
        bgColor={'green.400'}
        fontWeight={'bold'}
        justifyContent={'center'}
        margin={'5'}
        boxShadow={'md'}
        type="submit"
      >
        Upload
      </Button>
    </form>
  )
}
