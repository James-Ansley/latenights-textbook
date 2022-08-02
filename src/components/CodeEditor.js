import React, {useState} from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

import "./CodeEditor.css"

export default function CodeEditor(props) {
    const [input, setInput] = useState(props.code.trimEnd());
    return (
        <div className={"code-editor"}>
            <AceEditor
                value={input}
                mode="python"
                theme={"github"}
                onChange={(newValue, e) => {
                    setInput(newValue)
                }}
                onLoad={editor => {
                    editor.renderer.setScrollMargin(10, 10, 0, 0);
                    editor.renderer.setPadding(16);
                    editor.moveCursorTo(0, 0);
                }}
                name="CodeBlock"
                fontSize={'0.9em'}
                editorProps={{$blockScrolling: true}}
                width='100%'
                maxLines={Infinity}
                style={{backgroundColor: "rgba(0, 0, 0, 0)"}}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    highlightActiveLine: false,
                    cursorStyle: "ace",
                    showPrintMargin: false,
                    scrollPastEnd: false,
                    showLineNumbers: false,
                    showGutter: false,
                }}
            />
        </div>
    )
}
