import Link from "next/link"
import React from "react"


interface child {
    children: React.ReactNode
}
const layout = async({ children }: child) => {
    
    return (
        <section>
            <div>
                <nav className="flex items-center gap-2 p-4 bg-[#f8fafc]">
                    <Link href='/account' className="focus:underline focus:underline-offset-2">Profile</Link>
                    <Link href='/account/security' className="focus:underline focus:underline-offset-2">Security</Link>
                </nav>
                <div className="bg-[#ffff] px-4">
                    {children}
                </div>
            </div>
        </section>
    )
}

export default layout