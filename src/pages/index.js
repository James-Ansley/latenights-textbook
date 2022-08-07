import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './index.module.css';

export default function Home() {
    return (
        <Layout title="LateNights">
            <main>
                <div className={styles.heroContainer}>
                    <h1>LateNights Textbook</h1>
                    <p className={styles.tagline}>A Practical Introduction to Programming</p>
                    <Link className={"button button--primary"} href={"docs/intro"}>Get Started</Link>
                </div>
            </main>
        </Layout>
    );
}
