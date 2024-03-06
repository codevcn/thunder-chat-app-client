"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faPaperPlane,
    faEye,
    faEyeSlash,
    faLock,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons"
import { Spinner } from "@/materials/Spinner"
import { postLoginUser } from "@/apis/auth"
import toast from "react-hot-toast"
import axiosErrorHandler from "@/utils/axiosErrorHanlder"
import axios from "axios"
import { Form, Input } from "antd"
import { useAuthRedirect } from "@/hooks/redirect"
import { useSocketChatting } from "@/contexts/socket.context"

type TLogInUserForm = {
    email: string
    password: string
}

const LoginForm = ({ typedEmail }: { typedEmail: string }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const redirect = useAuthRedirect()
    const socket = useSocketChatting()

    const loginUser = async (form_data: TLogInUserForm) => {
        setLoading(true)

        try {
            await postLoginUser({
                email: typedEmail,
                password: form_data.password,
            })
            socket.connect()
            toast.success("Login Successfully!")
            redirect({ refresh: true })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(axiosErrorHandler(error).message)
            }
        }

        setLoading(false)
    }

    return (
        <Form
            className="flex flex-col items-center pt-7 pb-7"
            onFinish={loginUser}
            initialValues={{ email: typedEmail }}
        >
            <div className="Intro flex flex-col gap-y-1 items-center">
                <h3 className="text-3xl font-bold font-anton before:w-4">THUNDER CHAT.</h3>
                <span className="text-center text-xs">
                    You are in log in period, please provide your email and password that you used
                    in register period
                </span>
            </div>

            <div className="w-full pl-5 pr-5 box-border">
                <label
                    htmlFor="LoginForm-email"
                    className="block text-sm font-bold w-full box-border pointer-events-none opacity-40 mt-5 mb-1"
                >
                    Email
                </label>
                <Form.Item<TLogInUserForm> name="email" className="w-full">
                    <Input
                        placeholder="Enter your first name..."
                        id="RegisterForm-firstName"
                        prefix={<FontAwesomeIcon icon={faEnvelope} />}
                        className="placeholder:text-xs pl-3 pr-4 gap-x-1 opacity-50 pointer-events-none"
                    />
                </Form.Item>

                <label
                    htmlFor="LoginForm-password"
                    className="block text-sm font-bold w-full box-border mt-5 mb-1"
                >
                    Password
                </label>
                <Form.Item<TLogInUserForm>
                    name="password"
                    className="w-full"
                    rules={[
                        {
                            required: true,
                            message: "Don't empty this field",
                        },
                    ]}
                >
                    <Input.Password
                        placeholder="Enter your password..."
                        id="RegisterForm-password"
                        prefix={<FontAwesomeIcon icon={faLock} />}
                        className="placeholder:text-xs px-5 pl-4 pr-4 gap-x-1"
                        iconRender={(visible) => (
                            <FontAwesomeIcon
                                icon={visible ? faEye : faEyeSlash}
                                size="1x"
                                cursor="pointer"
                            />
                        )}
                    />
                </Form.Item>
            </div>

            <button className="flex gap-x-3 justify-center items-center rounded-full w-fit px-11 py-2 mt-6 bg-black text-white box-border">
                {loading ? (
                    <Spinner className="h-[22px] block" />
                ) : (
                    <>
                        <span>Log In</span>
                        <FontAwesomeIcon icon={faPaperPlane} size="1x" />
                    </>
                )}
            </button>
        </Form>
    )
}

export default LoginForm
