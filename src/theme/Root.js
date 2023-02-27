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
    return (
        isMobile === undefined ? (
            <>{children}</>
        ) : (
            // Lazy = true until loading times are figured out.
            <PythonProvider lazy={true} terminateOnCompletion={isMobile}>
            {/*<PythonProvider lazy={isMobile} terminateOnCompletion={isMobile}>*/}
                {children}
            </PythonProvider>
        )
    )
}
