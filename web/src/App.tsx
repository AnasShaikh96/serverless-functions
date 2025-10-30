import { useEffect, useState } from 'react'
import EditorValue from './components/editor-value'
import ReadOnlyTerminal from './components/terminal'
import { createFunc } from './lib/api'

function App() {

  const [editorValue, setEditorValue] = useState<null | string>(null)
  const [responseError, setResponseError] = useState<string>('')

  useEffect(() => {
    const user = localStorage.getItem('user')

    const postEditorValue = async () => {

      const res = await createFunc({
        runtime: '18',
        fn_name: 'helloWorld',
        fn_zip_file: editorValue,
        owner: user
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

export default App
