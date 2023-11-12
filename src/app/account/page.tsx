'use client'

import { client_axios } from "@/configs/axios"
import Link from "next/link"
import { useState } from "react"

const Account = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const test_api = async () => {
        try {
            setLoading(true)
            const { data } = await client_axios.post('/test')
            setLoading(false)
            console.log('>>> testing data >>>', data)
        } catch (error) {
            console.log('>>> testing error >>>', error)
        }
    }

    return (
        <div>
            <h2>
                <div>account</div>
                <Link href={'/conversation'}>
                    conversation
                </Link>
            </h2>

            <div className="mt-10 bg-gray-300 text-black">
                {
                    loading ?
                        <h2>Loading...</h2>
                        :
                        <button
                            onClick={test_api}
                            className="p-5 bg-pink-300"
                        >
                            test api
                        </button>
                }
            </div>
        </div>
    )
}

export default Account