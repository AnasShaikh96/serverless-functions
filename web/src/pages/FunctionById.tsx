import { useEffect, useState } from 'react'
import EditorValue from '@/components/editor-value'
import ReadOnlyTerminal from '@/components/terminal'
import { getFuncById, updateFunc } from '@/lib/api'
import { Route } from '@/routes/function.$functionId'

const FunctionById = () => {

  const { functionId } = Route.useParams()

  const [editorValue, setEditorValue] = useState<null | string>(null)
  const [responseError, setResponseError] = useState<string>('')
  const [fnName, setFnName] = useState("")


  useEffect(() => {

    const getPostEditorValue = async () => {
      const res = await getFuncById(functionId);

      setFnName(res.data.fn_name)
      setEditorValue(res.data.fn_zip_file)
    }

    getPostEditorValue()
  }, [])


  const updateEditorValue = async (data: any) => {
    const res = await updateFunc(functionId, {
      fn_zip_file: data,
    })

    console.log(res);
    return res;
  }

  return (
    <>

      <main className='p-2'>
        <div>
          <h2>{fnName}</h2>

        </div>
        <div className='flex mt-4' >
          <div className='w-36 bg-gray-50 p-3'>
            <div className='bg-white w-full p-1 flex justify-between items-center'>

              <span> index.js</span>

              <span className='w-3 h-3 bg-gray-400 rounded-full'></span>


            </div>
          </div>
          <div className='h-[500px] bg-red-200 w-full max-w-[700px] border-2 border-red-300 '>
            <EditorValue updateEditorValue={updateEditorValue} defaultValue={editorValue} />
          </div>
          <div className='w-full ' >
            <h3>Output</h3>
            <div>
              <ReadOnlyTerminal output={responseError} />
              {/* <Terminal error={responseError} /> */}
            </div>
          </div>
        </div>

      </main>

    </>
  )
}

export default FunctionById;
