// import { Table } from '@/components/table'
import { DataTableDemo } from '@/components/table'
import { getAllFunc } from '@/lib/api'
import React, { useEffect, useState } from 'react'

const GetAllFunctions = () => {

  const [tableData, setTableData] = useState([])


  useEffect(() => {

    const getTableData = async () => {
      const res = await getAllFunc();

      if (res?.data) {
        setTableData(res.data)
      }
    }
    getTableData();
  }, [])

  console.log("tableData", tableData)

  return (
    <div>
      <DataTableDemo tableData={tableData} />
    </div>
  )
}

export default GetAllFunctions