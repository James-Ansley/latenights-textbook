import React, {isValidElement} from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import ElementContent from '@theme/CodeBlock/Content/Element';
import StringContent from '@theme/CodeBlock/Content/String';
import CodeEditor from "@site/src/components/CodeEditor";

function maybeStringifyChildren(children) {
    if (React.Children.toArray(children).some((el) => isValidElement(el))) {
        return children;
    }
    return Array.isArray(children) ? children.join('') : children;
}

export default function CodeBlock({children: rawChildren, ...props}) {
    const children = maybeStringifyChildren(rawChildren);
    if (props.className === "language-python") {
        return <CodeEditor code={children}/>
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
