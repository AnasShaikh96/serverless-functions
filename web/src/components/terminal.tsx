import React, { useEffect, useRef, useState } from 'react'

import { Terminal as XTerminal } from '@xterm/xterm'
import socket from '@/lib/socket';
import "@xterm/xterm/css/xterm.css";

const Terminal = ({ error }: { error: string | null }) => {



    const terminalRef = useRef(null);
    const isRenderedRef = useRef(false)

    // if (isRenderedRef.current) return;
    // isRenderedRef.current = true;

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

    if (typeof error === 'string') {
        terminal.write(error)
    }

    return (
        <div id='terminal' ref={terminalRef} />
    )
}

export default Terminal