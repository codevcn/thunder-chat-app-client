'use client'

import Link from "next/link"

const Account = () => {
    return (
        <h2>
            <div>account</div>
            <Link href={'/conversation'}>
                conversation
            </Link>
        </h2>
    )
}

export default Account