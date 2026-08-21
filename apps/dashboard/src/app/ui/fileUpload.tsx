"use client"
import { handleFileUpload } from "@/actions/timetable/upload";
import { Flex, Button } from "@chakra-ui/react";
import { FaFileCsv } from "react-icons/fa";
import { useState } from "react";
import { File_, FileSchema } from "../types/timetable_types";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";


export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const { resolver, handleSubmit } = useForm<File_>({
    resolver: zodResolver(FileSchema),
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    }}>
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
          onChange={handleFileChange}
          hidden
        />
      </div>
      { file &&
        <div className="preview">
          <p>{file.name}</p>
        </div>
      }
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
