import React, {useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {useColorMode} from '@docusaurus/theme-common';
import {usePython} from "react-py";

import "./CodeEditor.css"

import {BsPlayFill} from "react-icons/bs";
import {BiReset} from "react-icons/bi";

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
            <div
                className={"code-editor-window"}
                style={showOutput ? {borderRadius: ".25em .25em 0 0"} : {}}
            >
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
                <div className={"button-container"}>
                    <button
                        className={"icon-button"}
                        disabled={isLoading || isRunning}
                        onClick={() => {
                            setShowOutput(true);
                            return runPython(input);
                        }}
                        aria-label={"Run Code"}
                        title={"Run Code"}
                    >
                        <BsPlayFill className={"icon"} size={'1.7em'}/>
                    </button>
                    <button
                        className={"icon-button"}
                        onClick={() => setShowOutput(false)}
                        aria-label={"Reset Code Window"}
                        title={"Reset Code Window"}
                    >
                        <BiReset className={"icon"} size={"1.7em"}/>
                    </button>
                </div>
            </div>
            {showOutput &&
                <>
                    <pre className={"output-window"}>
                        {stdout}{<span style={{color: "red"}}>{stderr}</span>}
                    </pre>
                </>
            }
        </div>}
    </BrowserOnly>
}
