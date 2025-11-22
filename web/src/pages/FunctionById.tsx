import { useEffect, useState } from 'react'
import EditorValue from '@/components/editor-value'
import ReadOnlyTerminal from '@/components/terminal'
import { getFuncById, updateFunc } from '@/lib/api'
import { Route } from '@/routes/function.$functionId'
import { Button } from '@/components/button'
import { GetFunctionPayload } from '@/lib/type'

const FunctionById = () => {

  const { functionId } = Route.useParams()

  const [editorValue, setEditorValue] = useState<null | string>(null)
  const [responseError, setResponseError] = useState<string>('')
  const [fnName, setFnName] = useState("")

  const [fnData, setfnData] = useState<null | GetFunctionPayload>(null)
  console.log("fnData", fnData)




  useEffect(() => {

    const getPostEditorValue = async () => {
      const res = await getFuncById(functionId);

      setfnData(res.data)
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


  

  const triggerEditorValue = async (url: string | null) => {


    console.log("hhhhhiasdijhasdihjasidasih", fnData)

    // if (url !== typeof 'string') return;

    if (fnData !== null) return
    // const trimUrl = url.replace('.js', '')


    try {

      // const myHeaders = new Headers();
      // myHeaders.append("Cookie", "Cookie_2=value; accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM1NjBhNzQwLTYzYWItNDhjNy1hMmQyLWUzYTRhMThjYzY4YiIsIm5hbWUiOiJ0ZXN0IDIiLCJlbWFpbCI6InRlc3QyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGlLSnV6TVVraEVmQUJ2RzNQZGNmSWVCZEVGZS54eDJTalBjaDhOSExFcS5SajF0UlBVVVRtIiwiY3JlYXRlZF9hdCI6IjIwMjUtMTAtMjdUMDE6NTI6MDIuODAzWiIsInVwZGF0ZWRfYXQiOm51bGwsInJlZnJlc2h0b2tlbiI6bnVsbCwiaWF0IjoxNzYxODA4NDQ2LCJleHAiOjE3NjE4OTQ4NDZ9.nWxWNERKdYKUHTjL8d848cd3NRJj-csTUkb4btrt-uw");

      const requestOptions = {
        method: "GET",
        // headers: myHeaders,
        // redirect: "follow"
      };

      const data = await fetch("http://localhost:4342/api/v1/invocation/add-jobs/c560a740-63ab-48c7-a2d2-e3a4a18cc68b/testFunc6", requestOptions)
        .then((response) => response.text())
        .then((result) => setResponseError(result))
        .catch((error) => console.error(error));



      // const data = await fetch(`http://localhost:4342/api/v1/invocation/add-jobs/${fnData.owner}/${fnData.fn_name}`, {
      //   method: "GET"
      // }).then(res => console.log("res inside ", res)).catch(err => console.log("err in catch", err))

      console.log("data executed", data)

    } catch (error) {
      console.log(error)
    }



  }



  useEffect(() => {
    triggerEditorValue('sasdasd')
  }, [])

  // console.log("editorValue", editorValue)


  return (
    <>

      <main className='p-4'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h2>{fnName}</h2>
          </div>
          <div>
            <Button onClick={() => triggerEditorValue(editorValue)}>Trigger Function</Button>
          </div>

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
