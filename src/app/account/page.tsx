'use client'

import { client_axios } from "@/configs/axios"
import axios from "axios"
import Link from "next/link"
import { useRef, useState } from "react"

const Account = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const input_ref = useRef<HTMLTextAreaElement>(null)
    const [message, setMessage] = useState<string>()

    const test_api = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get("https://vcn-demo-api.onrender.com/api/home/clientOrigin")
            setLoading(false)
            console.log('>>> testing data >>>', data)
        } catch (error) {
            console.log('>>> testing error >>>', error)
        }
    }

    const print = (value: string): string => {
        return '"' + value + '"'
    }

    const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = async (e) => {
        const value = e.target.value
        console.log('>>> onChange >>>', print(value))
    }

    const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = async (e) => {
        console.log('>>> onKeyDown')
        if (e.key === 'Enter') {
            console.log('>>> run enter')
            setMessage('')
        }
    }

    return (
        <div>
            <h2>
                <div>account</div>
                <Link href={'/conversations?cid=4'}>
                    conversation
                </Link>
            </h2>

            <div className="m-5">
                <textarea
                    className="text-black p-5 resize-none"
                    rows={10}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    ref={input_ref}
                ></textarea>
            </div>

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