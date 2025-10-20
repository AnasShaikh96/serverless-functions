import React, { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
interface ReadOnlyTerminalProps {
	output: string; // new logs to display
	height?: string; // optional height
}

const ReadOnlyTerminal: React.FC<ReadOnlyTerminalProps> = ({ output, height = "300px" }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const termRef = useRef<Terminal | null>(null);

	// Initialize terminal
	useEffect(() => {
		const term = new Terminal({
			disableStdin: true, // read-only
			convertEol: true,   // auto-handle newlines
			cursorBlink: false,
			fontFamily: "monospace",
			fontSize: 14,
			theme: {
				background: "#0d1117",
				foreground: "#d0d0d0",
			},
		});

		if (containerRef.current) {
			term.open(containerRef.current);
			term.writeln("🚀 Terminal initialized.\r\n");
			term.scrollToBottom();
		}

		termRef.current = term;

		return () => term.dispose();
	}, []);

	// Update terminal whenever output changes
	useEffect(() => {
		if (termRef.current && typeof output === 'string') {
			// Clear previous logs if you want full replacement
			//   termRef.current.clear();
			termRef.current.write(output.replace(/\r?\n/g, "\r\n"));
			termRef.current.scrollToBottom();
		}
	}, [output]);

	return <div ref={containerRef} style={{ height, width: "100%" }} />;
};

export default ReadOnlyTerminal;
