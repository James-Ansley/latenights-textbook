import React, {isValidElement} from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import ElementContent from '@theme/CodeBlock/Content/Element';
import StringContent from '@theme/CodeBlock/Content/String';

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

import {useState} from "react";
import {usePython} from "react-py";

function maybeStringifyChildren(children) {
    if (React.Children.toArray(children).some((el) => isValidElement(el))) {
        return children;
    }
    return Array.isArray(children) ? children.join('') : children;
}

export default function CodeBlock({children: rawChildren, ...props}) {
    const children = maybeStringifyChildren(rawChildren);
    const [input, setInput] = useState(children.trimEnd());
    const {runPython, stdout, stderr, isLoading} = usePython();
    if (props.className === "language-python") {
        return (
            <div>
                <AceEditor
                    value={input}
                    mode="python"
                    theme={"github"}
                    onChange={(newValue, e) => {
                        setInput(newValue)
                    }}
                    onLoad={editor => {
                        editor.renderer.setScrollMargin(18, 18, 0, 0);
                        editor.renderer.setPadding(18);
                        editor.moveCursorTo(0, 0);
                    }}
                    name="CodeBlock"
                    fontSize={'0.95em'}
                    editorProps={{$blockScrolling: true}}
                    width='100%'
                    maxLines={Infinity}
                    style={{
                        borderRadius: '0.25em',
                        backgroundColor: "#F6F8FA",
                        padding: "1em",
                    }}
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
    } else {
        const isBrowser = useIsBrowser();
        const CodeBlockComp =
            typeof children === 'string' ? StringContent : ElementContent;
        return (
            <CodeBlockComp key={String(isBrowser)} {...props}>
                {children}
            </CodeBlockComp>
        );
    }

}
