import React, {useEffect, useState} from 'react';
import {PythonProvider} from "react-py";

export default function Root({children}) {
    const [isMobile, setIsMobile] = useState()
    useEffect(() => {
        setIsMobile(
            !!navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)/i)
            || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
        )
    }, [])
    // const isDev = process.env.NODE_ENV === 'development'
    return (
        isMobile === undefined ? (
            <>{children}</>
        ) : (
            <PythonProvider lazy={true} terminateOnCompletion={isMobile}>
            {/*<PythonProvider lazy={isMobile || isDev} terminateOnCompletion={isMobile}>*/}
                {children}
            </PythonProvider>
        )
    )
}
