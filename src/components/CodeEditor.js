import React, {useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {useColorMode} from '@docusaurus/theme-common';
import {usePython} from "react-py";

import "./CodeEditor.css"

const editorOptions = {
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    highlightActiveLine: false,
    showPrintMargin: false,
    showGutter: false,
};

const editorOnLoad = editor => {
    editor.renderer.setScrollMargin(10, 10, 0, 0);
    editor.renderer.setPadding(16);
    editor.moveCursorTo(0, 0);
};

export default function CodeEditor(props) {
    const [input, setInput] = useState(props.code.trimEnd());
    const [showOutput, setShowOutput] = useState(false);

    const {runPython, stdout, stderr, isLoading, isRunning} = usePython();

    const {colorMode} = useColorMode();
    const isBrowser = useIsBrowser();

    let AceEditor = null;
    if (isBrowser) {
        AceEditor = require('react-ace').default;
        require("ace-builds/src-noconflict/mode-python");
        require("ace-builds/src-noconflict/theme-textmate");
        require("ace-builds/src-noconflict/theme-idle_fingers");
        require("ace-builds/src-noconflict/ext-language_tools");
    }

    return <BrowserOnly>
        {() => <div className={"code-editor"}>
            <div className={"code-editor-window"}>
                <AceEditor
                    value={input}
                    mode="python"
                    name="CodeBlock"
                    fontSize={'0.9rem'}
                    theme={colorMode === 'dark' ? "idle_fingers" : "textmate"}
                    onChange={(newValue, e) => setInput(newValue)}
                    width='100%'
                    maxLines={Infinity}
                    style={{backgroundColor: "rgba(0, 0, 0, 0)"}}
                    onLoad={editorOnLoad}
                    editorProps={{$blockScrolling: true}}
                    setOptions={editorOptions}
                />
            </div>
            <button
                disabled={isLoading || isRunning}
                onClick={() => {
                    setShowOutput(true);
                    return runPython(input);
                }}>
                Run
            </button>
            <button
                onClick={() => setShowOutput(false)}>
                Reset
            </button>
            {showOutput && <pre>
                {stdout}{<span style={{color: "red"}}>{stderr}</span>}
            </pre>}
        </div>}
    </BrowserOnly>
}
