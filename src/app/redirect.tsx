"use client"

import { useAuth } from "@/hooks/auth"
import { Spinner } from "@/materials/Spinner"
import { EAuthStatus } from "@/utils/enums"
import Link from "next/link"

const Fallback = () => (
    <div>
        <Spinner className="h-[40px] w-[40px]" color="text-black" />
    </div>
)

export const Auth = () => {
    const { authStatus } = useAuth()

    return (
        <div className="AuthBtn mt-14 w-5/12 flex flex-col items-center">
            {authStatus === EAuthStatus.AUTHENTICATED ? (
                <Link
                    href="/conversations?cid=4"
                    className="rounded-full transition border-2 w-5/6 p-5 pt-3 pb-3 bg-black text-white block text-center hover:bg-white hover:text-black"
                >
                    Go to your conversations
                </Link>
            ) : authStatus === EAuthStatus.UNAUTHENTICATED ? (
                <>
                    <Link
                        href="/loginSignUp"
                        className="rounded-full transition border-2 w-5/6 p-5 pt-3 pb-3 bg-black text-white block text-center hover:bg-white hover:text-black"
                    >
                        Login / Register
                    </Link>

                    <Link
                        href="/loginGuest"
                        className="rounded-full transition border-2 w-5/6 p-5 pt-3 pb-3 mt-5 bg-black text-white block text-center hover:bg-white hover:text-black"
                    >
                        Login as guest
                    </Link>
                </>
            ) : (
                <Fallback />
            )}
        </div>
    )
}
