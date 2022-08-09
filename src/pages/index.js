import React, {useState} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeEditor from "@site/src/components/CodeEditor";
import {CodeSnippets} from "./_CodeSnippets";

import styles from './index.module.css';

function grabCode() {
    return CodeSnippets[Math.floor(Math.random() * CodeSnippets.length)]
}

export default function Home() {
    let [code, updateCode] = useState(grabCode())

    return (
        <Layout title="LateNights">
            <main>
                <div className={styles.heroContainer}>
                    <h1>LateNights Textbook</h1>
                    <p className={styles.tagline}>A Practical Introduction to Programming</p>
                    <Link className={"button button--primary"} href={"docs/intro"}>Get Started</Link>
                    <p className={styles.codePrompt}>
                        Or, try out a <span className={styles.random} onClick={() => updateCode(grabCode())}>random</span> code snippet below:
                    </p>
                    <div className={styles.codeEditorWrapper}>
                        <CodeEditor code={code} showButtons/>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
