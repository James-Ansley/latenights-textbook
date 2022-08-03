import React, {useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {useColorMode} from '@docusaurus/theme-common';

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
        {() =>
            <div className={"code-editor"}>
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
        }
    </BrowserOnly>
}
