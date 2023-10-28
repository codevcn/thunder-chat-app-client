'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import AppLogoPng from '@/assets/images/logo.png'
import toast from 'react-hot-toast'
import { getUserByEmail } from '@/apis/user'
import axios from 'axios'
import axiosErrorHandler from '@/utils/axiosErrorHanlder'
import RegisterForm from './registerForm'
import LoginForm from '@/app/loginSignUp/loginForm'
import { Spinner } from '@/materials/Spinner'
import validator from 'validator'
import { Form, Input } from 'antd'

type TCheckUserForm = {
    email: string,
}

const CheckUserForm = (
    {
        onSetCheckUserStatus,
        onSetTypedEmail,
    }: {
        onSetCheckUserStatus: (status: ECheckUserStatus) => void
        onSetTypedEmail: (email: string) => void
    }
) => {
    const [loading, setLoading] = useState<boolean>(false)

    const submit = async (email: string): Promise<void> => {
        try {
            await getUserByEmail(email)

            onSetCheckUserStatus(ECheckUserStatus.EXIST)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const error_result = axiosErrorHandler(error)

                if (error_result.statusCode === 404) {
                    onSetCheckUserStatus(ECheckUserStatus.NOT_EXIST)
                } else {
                    toast.error(error_result.message)
                }
            }
        }
    }

    const checkUserHandler = async (data: TCheckUserForm) => {
        onSetTypedEmail(data.email)

        setLoading(true)

        await submit(data.email)

        setLoading(false)
    }

    const emailValidator = (_: any, email: string) => {
        if (!email) {
            return Promise.reject(new Error("Don't empty this field"))
        }
        if (!validator.isEmail(email)) {
            return Promise.reject(new Error("Please enter the format of email correctly!"))
        }

        return Promise.resolve()
    }

    return (
        <Form
            className="flex flex-col items-center pt-7 pb-7"
            onFinish={checkUserHandler}
            name='CheckUserForm'
        >
            <div className='Intro flex flex-col gap-y-1 items-center text-base font-roboto'>
                <h3 className="text-3xl font-bold font-anton before:w-4">
                    THUNDER CHAT.
                </h3>
                <span className='text-center'>
                    Welcome to Thunder Chat. Enjoy!
                </span>
                <span className='text-center text-xs'>
                    Now, let's enter your email to login if you had an account or register if you did not
                </span>
            </div>

            <div className="mt-16">
                <label
                    htmlFor="CheckUserForm-email"
                    className='block pl-5 mb-1 font-bold'
                >
                    Email <span className='text-red-500'>*</span>
                </label>

                <Form.Item<TCheckUserForm>
                    name="email"
                    rules={[{ validator: emailValidator }]}
                >
                    <Input
                        id=''
                        type="text"
                        placeholder="Enter your email..."
                        style={{ padding: '12px 20px', width: 384, borderRadius: 40, columnGap: 5, fontSize: 16 }}
                        prefix={<FontAwesomeIcon icon={faEnvelope} size='1x' />}
                    />
                </Form.Item>
            </div >

            <button
                className="flex font-roboto text-base gap-x-3 justify-center items-center rounded-full w-fit px-11 py-2 mt-6 bg-black text-white box-border"
            >
                {
                    loading ?
                        <Spinner className='h-[24px] block' />
                        :
                        <>
                            <span>Submit</span>
                            <FontAwesomeIcon icon={faPaperPlane} size='1x' />
                        </>
                }
            </button>
        </Form>
    )
}

const Background = () => {
    return (
        <div style={{ backgroundImage: `url(${AppLogoPng.src})`, height: '100%', width: '150px' }}>
        </div>
    )
}

enum ECheckUserStatus {
    EXIST = 1,
    NOT_EXIST = 0,
    UNKOWN = -1,
}

const LoginSignUpPage = () => {
    const [checkUserStatus, setCheckUserStatus] = useState<ECheckUserStatus>(ECheckUserStatus.UNKOWN)
    const [typedEmail, setTypedEmail] = useState<string>('')

    const handleSetCheckUserStatus = (status: ECheckUserStatus) => {
        setCheckUserStatus(status)
    }

    const handleSetTypedEmail = (email: string) => {
        setTypedEmail(email)
    }

    return (
        <div className="LoginSignUpPage flex h-screen">
            <div className="flex flex-row items-center justify-evenly text-black overflow-hidden m-auto bg-white h-5/6 pr-10 rounded max-w-2xl">

                <Background />

                <div className="h-full box-border w-[2px] mr-10"></div>

                <div className="m-auto w-[440px] pt-7 pb-7">
                    {
                        checkUserStatus === ECheckUserStatus.UNKOWN ? (
                            <CheckUserForm
                                onSetCheckUserStatus={handleSetCheckUserStatus}
                                onSetTypedEmail={handleSetTypedEmail}
                            />
                        ) : checkUserStatus === ECheckUserStatus.EXIST ? (
                            <LoginForm
                                typedEmail={typedEmail}
                            />
                        ) : checkUserStatus === ECheckUserStatus.NOT_EXIST && (
                            <RegisterForm
                                typedEmail={typedEmail}
                            />
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default LoginSignUpPage
