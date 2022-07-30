import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './index.module.css';

export default function Home() {
    return (
        <Layout title="LateNights">
            <main>
                <div class={styles.heroContainer}>
                    <h1>LateNights Textbook</h1>
                    <p class={styles.tagline}>An Introduction to Practical Data Structures and Algorithms</p>
                    <Link class={"button button--primary"} href={"docs/intro"}>Get Started</Link>
                </div>
            </main>
        </Layout>
    );
}
