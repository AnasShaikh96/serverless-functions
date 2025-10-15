import { Editor, type EditorProps, type Monaco } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import React, { useRef } from 'react'

const EditorValue = () => {
	const editorRef = useRef<null | editor.IStandaloneCodeEditor>(null);


	function handleEditorValidation(markers: editor.IMarker[]) {
		// model markers
		markers.forEach((marker) => console.log('onValidate:', marker.message));
	}

	function handleEditorWillMount(monaco: Monaco) {
		// here is the monaco instance
		// do something before editor is mounted
		monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
	}

	function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
		if (editorRef.current) {
			editorRef.current = editor;
		}
	}

	function showValue() {
		if (editorRef.current) {
			alert(editorRef?.current.getValue());
		}
	}

	return (
		<>
			<button onClick={showValue}>Show value</button>
			<Editor
				height="90vh"
				defaultLanguage="javascript"
				defaultValue="// some comment"
				onMount={handleEditorDidMount}
				beforeMount={handleEditorWillMount}
				onValidate={handleEditorValidation}
			/>
		</>
	);
}

export default EditorValue