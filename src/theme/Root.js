import React, {useEffect, useState} from 'react';
import {PythonProvider} from "react-py";

export default function Root({children}) {
    const [isMobile, setIsMobile] = useState()
    useEffect(() => {
        setIsMobile(
            !!navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)/i)
        )
    }, [])
    return (
        isMobile === undefined ? (
            <>{children}</>
        ) : (
            <PythonProvider lazy={isMobile} terminateOnCompletion={isMobile}>
                {children}
            </PythonProvider>
        )
    )
}
