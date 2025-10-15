import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
// import { Editor } from './components/editor.tsx'
import './userworker'
import { Editor } from '@monaco-editor/react'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Editor />
    {/* <Editor /> */}
    {/* <App /> */}
  </StrictMode>,
)
