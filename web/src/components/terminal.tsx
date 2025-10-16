import { useEffect, useRef, useState } from 'react'

import { Terminal as XTerminal } from '@xterm/xterm'
import socket from '@/lib/socket';
import "@xterm/xterm/css/xterm.css";

const Terminal = () => {

    const terminalRef = useRef(null);
    const isRenderedRef = useRef(false)


    const [terminalData, setTerminalData] = useState<null | string>(null)


    console.log("terminalData", terminalData)


    useEffect(() => {

        if (isRenderedRef.current) return;
        isRenderedRef.current = true;

        const terminal = new XTerminal({

            rows: 20,
            fontSize: 13,
            fontFamily: '"Menlo for Powerline", Menlo, Consolas, "Liberation Mono", Courier, monospace',
            convertEol: true,
            cursorBlink: false,
        })


        if (terminalRef.current) {
            terminal.open(terminalRef.current)
        }
        terminal.write("asdasda")
    }, [])




    return (
        <div id='terminal' ref={terminalRef} />
    )
}

export default Terminal