import React from "react"


interface child {
    children: React.ReactNode
}
const layout = async ({ children }: child) => {

    return (
        <>
            {children}
        </>
    )
}

export default layout