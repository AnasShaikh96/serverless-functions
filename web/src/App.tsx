import { useEffect, useState } from 'react'
import EditorValue from './components/editor-value'
import Terminal from './components/terminal'

function App() {

  const [editorValue, setEditorValue] = useState<null | string>(null)

  const [responseError, setResponseError] = useState<null | string>(`
    default 
    
    
    error`)



  useEffect(() => {



    const postEditorData = async () => {


      try {
        throw new Error(`Response error for 
        
    new 
    
    data`)
        const data = await fetch('http://localhost:8080/api/v1/functions', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({ runtime: 'Nodejs', fn_name: 'helloWorld.js', fn_zip_file: '' })
        }).then((res) => res.json())
          .catch(err => setResponseError(err))
      } catch (error: Error) {

        if (typeof error === 'string') {
          // setResponseError(error.message)
          setResponseError(`This is a 
            
            Random 
            
            error
            
            message`)
        } else {
          setResponseError('An unknown error occured')
        }
        console.log("error", typeof error, `${error.message}`)

      }


      // console.log(data)

    }
    postEditorData()
  }, [editorValue])


  const updateEditorValue = (data: any) => {
    setEditorValue(data)

    setResponseError('trigger on update valu')
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
              <Terminal error={responseError} />
            </div>
          </div>
        </div>

      </main>

    </>
  )
}

export default App
