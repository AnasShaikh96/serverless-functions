import { useEffect, useRef } from 'react'

import { Terminal as XTerminal } from '@xterm/xterm'
import socket from '@/lib/socket';

const Terminal = () => {

    const terminalRef = useRef(null);
    const isRenderedRef = useRef(false)



    useEffect(() => {

        if (isRenderedRef.current) return;
        isRenderedRef.current = true;

        const terminal = new XTerminal({
            rows: 20
        })

        if (terminalRef.current) {
            terminal.open(terminalRef.current)
        }

        terminal.onData((data) => {
            socket.emit("terminal:write", data)
        })


        function onTerminalData(data: any) {
            terminal.write(data)
        }

        socket.emit('terminal:data', onTerminalData)

    }, [])




    return (
        <div id='terminal' ref={terminalRef} />
    )
}

export default Terminal