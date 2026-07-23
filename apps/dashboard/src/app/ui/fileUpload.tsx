"use client"
import { Flex } from "@chakra-ui/react";
import { FaFileCsv } from "react-icons/fa";

export default function FileUpload() {
  return (
    <form style={{
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
          }}
        >
          <FaFileCsv style={{color: 'green'}}/>Upload CSV
        </label>
        <input
          type="file"
          id="csv_upload"
          hidden
        />
      </div>
      <div className="preview">
        <p>アップロードするファイルが選択されていません</p>
      </div>
    </form>
  )
}
