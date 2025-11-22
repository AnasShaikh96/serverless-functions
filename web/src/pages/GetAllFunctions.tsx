// import { Table } from '@/components/table'
import { Button } from '@/components/button'
import { DataTableDemo } from '@/components/table'
import { getAllFunc } from '@/lib/api'
import { useNavigate } from '@tanstack/react-router'
import React, { useEffect, useState } from 'react'

const GetAllFunctions = () => {

  const [tableData, setTableData] = useState([])
  const navigate = useNavigate()

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
    <div className='p-4'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h2 className='text-xl font-bold'>All Functions</h2>
        </div>
        <div>
          <Button onClick={() => navigate({ to: '/function/create' })}> Create new Function </Button>
        </div>
      </div>
      <DataTableDemo tableData={tableData} />
    </div>
  )
}

export default GetAllFunctions