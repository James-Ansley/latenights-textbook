import React from 'react';
import {PythonProvider} from "react-py";

export default function Root({children}) {
    return (
        <>
            <PythonProvider>
                {children}
            </PythonProvider>
        </>
    )
}
