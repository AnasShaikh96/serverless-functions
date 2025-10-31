import { useEffect, useState } from 'react'
import EditorValue from '@/components/editor-value'
import ReadOnlyTerminal from '@/components/terminal'
import { updateFunc } from '@/lib/api'

const FunctionById = () => {


  const [editorValue, setEditorValue] = useState<null | string>(null)
  const [responseError, setResponseError] = useState<string>('')

  useEffect(() => {
    // const user = localStorage.getItem('user')

    const postEditorValue = async () => {

      const id = '4dc27ad9-5681-46f4-ab6c-005f4f60b2f1' // home
      // let id = "ddf73c34-515d-4d30-86ee-cb64e5d47222"


      const res = await updateFunc(id, {
        // runtime: '18',
        // fn_name: 'helloWorldnew',
        fn_zip_file: editorValue,
        // owner: user
      })

      console.log("asdasd", res)
    }

    postEditorValue();

  }, [editorValue])




  const updateEditorValue = (data: any) => {
    setEditorValue(data)
  }

  return (
    <>

      <main className='p-2'>
        <div>
          <h2>Function Name</h2>

        </div>
        <div className='flex mt-4' >
          <div className='w-36 bg-gray-50 p-3'>
            <div className='bg-white w-full p-1 flex justify-between items-center'>

              <span> index.js</span>

              <span className='w-3 h-3 bg-gray-400 rounded-full'></span>


            </div>
          </div>
          <div className='h-[500px] bg-red-200 w-full max-w-[700px] border-2 border-red-300 '>
            <EditorValue updateEditorValue={updateEditorValue} />
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
