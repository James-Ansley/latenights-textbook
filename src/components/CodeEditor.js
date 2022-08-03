import React, {useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {useColorMode} from '@docusaurus/theme-common';

import "./CodeEditor.css"

export default function CodeEditor(props) {
    const [input, setInput] = useState(props.code.trimEnd());

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

    return (
        <BrowserOnly>
            {() =>
                <div className={"code-editor"}>
                    <AceEditor
                        value={input}
                        mode="python"
                        theme={colorMode === 'dark' ? "idle_fingers" : "textmate"}
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
            }
        </BrowserOnly>
    )
}
