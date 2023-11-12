'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faAnglesRight,
    faUser,
    faLock,
    faArrowRotateLeft,
    faEye,
    faEyeSlash,
    faPaperPlane
} from '@fortawesome/free-solid-svg-icons'
import { get_days_in_month, get_years_list } from '@/utils/dateTime'
import { PASSWORD_REGEX } from '@/utils/regex'
import { postRegisterUser } from '@/apis/auth'
import axios from 'axios'
import axiosErrorHandler from '@/utils/axiosErrorHanlder'
import toast from 'react-hot-toast'
import { Spinner } from '@/materials/Spinner'
import { Select, Input, Tooltip, Form } from 'antd'
import { useAuthRedirect } from '@/hooks/redirect'

const Warning = ({ text }: { text: string }) => {
    return (
        <div className='text-red-600 mt-2 w-full text-center text-xs font-bold'>
            {text}
        </div>
    )
}

const DateOfBirth = ({
    onSetData,
}: {
    onSetData: TSetDataHandler,
}) => {
    const [dayMonthYear, setDayMonthYear] = useState<TBirthday>({ day: 0, month: 0, year: 0 })
    const [message, setMessage] = useState<string>('')

    const handleChangeDate = (value: string, type: 'day' | 'month' | 'year') => {
        const value_in_number = parseInt(value)

        setMessage('')

        if (type === 'day') {
            setDayMonthYear(pre => ({ ...pre, day: value_in_number }))
        } else if (type === 'month') {
            setDayMonthYear(pre => ({ ...pre, month: value_in_number }))
        } else {
            setDayMonthYear(pre => ({ ...pre, year: value_in_number }))
        }
    }

    const tooltip_color = '#5b5b5b'

    const validator = (_: any, value: number) => {
        if (!value) {
            setMessage("Don't empty any fields")
            return Promise.reject()
        }

        return Promise.resolve()
    }

    const submit = (values: { birthday: TBirthday }) => {
        onSetData({ birthday: values.birthday })
    }

    return (
        <Form
            onFinish={submit}
        >
            <div className='mt-5 w-[440px] box-border'>
                <label
                    htmlFor="RegisterUserForm-dateOfBirth"
                    className='block text-sm w-full box-border font-bold'
                >
                    Date of birth <span className='font-bold text-red-700'>*</span>
                </label>

                <div className='flex justify-center w-full gap-x-2 mt-2'>
                    <Tooltip placement="bottom" title="Select day" color={tooltip_color}>
                        <div className='w-full'>
                            <Form.Item<TRegisterUserForm>
                                name={['birthday', 'day']}
                                rules={[{ validator }]}
                            >
                                <Select
                                    id="RegisterUserForm-dateOfBirth-day"
                                    placeholder="Select day"
                                    size="large"
                                    onChange={(value: string) => handleChangeDate(value, 'day')}
                                    options={
                                        get_days_in_month(dayMonthYear.month).map(day => ({
                                            value: day,
                                            label: day,
                                        }))
                                    }
                                />
                            </Form.Item>
                        </div>
                    </Tooltip>

                    <Tooltip placement="bottom" title="Select month" color={tooltip_color}>
                        <div className='w-full'>
                            <Form.Item<TRegisterUserForm>
                                name={['birthday', 'month']}
                                rules={[{ validator }]}
                            >
                                <Select
                                    id="RegisterUserForm-dateOfBirth-month"
                                    placeholder="Select month"
                                    size="large"
                                    onChange={(value: string) => handleChangeDate(value, 'month')}
                                    options={
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => ({
                                            value: month,
                                            label: month,
                                        }))
                                    }
                                />
                            </Form.Item>
                        </div>
                    </Tooltip>

                    <Tooltip placement="bottom" title="Select year" color={tooltip_color}>
                        <div className='w-full'>
                            <Form.Item<TRegisterUserForm>
                                name={['birthday', 'year']}
                                rules={[{ validator }]}
                            >
                                <Select
                                    id="RegisterUserForm-dateOfBirth-year"
                                    size="large"
                                    placeholder="Select year"
                                    onChange={(value: string) => handleChangeDate(value, 'year')}
                                    options={
                                        get_years_list(100).map(year => ({
                                            value: year,
                                            label: year,
                                        }))
                                    }
                                />
                            </Form.Item>
                        </div>
                    </Tooltip>
                </div>

                {
                    message &&
                    <Warning text="Don't empty any fields" />
                }

                <Form.Item
                    className='flex justify-center'
                >
                    <button
                        className="flex mt-5 gap-x-3 text-base justify-center items-center rounded-full w-fit px-9 py-2 bg-black text-white"
                    >
                        <span>
                            Next
                        </span>
                        <FontAwesomeIcon icon={faAnglesRight} size='1x' />
                    </button>
                </Form.Item>
            </div>
        </Form>
    )
}

const NameAndPassword = ({
    onSwitchStep,
    preData,
}: {
    onSwitchStep: TSwitchStepHandler,
    preData: TRegisterUserForm,
}) => {
    const [loading, setLoading] = useState<boolean>(false)
    const redirect = useAuthRedirect({ refresh: true })

    const submit = async (data: TRegisterUserForm) => {
        try {
            await postRegisterUser({
                birthday: new Date(data.birthday.year, data.birthday.month - 1, data.birthday.day),
                email: data.typedEmail,
                firstName: data.firstName,
                lastName: data.lastName,
                password: data.password,
            })

            toast.success('Hooray!! Register successfully')

            redirect()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(axiosErrorHandler(error).message)
            }
        }
    }

    const onFinish = async (values: TNamePassword) => {
        const data_to_submit: TRegisterUserForm = {
            ...preData,
            ...values,
        }

        setLoading(true)
        await submit(data_to_submit)
        setLoading(false)
    }

    return (
        <Form
            onFinish={onFinish}
        >
            <div className='mt-5 w-[440px] p-5 pb-0'>
                <label
                    htmlFor="RegisterUserForm-dateOfBirth"
                    className='block text-sm w-full box-border font-bold mb-1'
                >
                    Your Name & Password <span className='font-bold text-red-700'>*</span>
                </label>

                <div className='flex gap-x-5'>
                    <div>
                        <label
                            htmlFor="RegisterForm-firstName"
                            className='text-xs pl-2'
                        >
                            First Name
                        </label>
                        <div className='relative mt-1'>
                            <Form.Item<TRegisterUserForm>
                                name="firstName"
                                rules={[{ required: true, message: "Don't empty this field" }]}
                            >
                                <Input
                                    placeholder='Enter your first name...'
                                    id='RegisterForm-firstName'
                                    prefix={<FontAwesomeIcon icon={faUser} />}
                                    className='placeholder:text-xs p-2 pl-3 pr-4 gap-x-1 hover:border-black'
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="RegisterForm-lastName"
                            className='text-xs pl-2'
                        >
                            Last Name
                        </label>
                        <div className='relative mt-1'>
                            <Form.Item<TRegisterUserForm>
                                name="lastName"
                                rules={[{ required: true, message: "Don't empty this field" }]}
                            >
                                <Input
                                    placeholder='Enter your last name...'
                                    id='RegisterForm-lastName'
                                    prefix={<FontAwesomeIcon icon={faUser} />}
                                    className='placeholder:text-xs p-2 pl-3 pr-4 gap-x-1'
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>

                <div className='mt-3'>
                    <label
                        htmlFor="RegisterForm-lastName"
                        className='text-xs pl-2'
                    >
                        Password
                    </label>
                    <div className='flex gap-x-4 relative mt-1'>
                        <Form.Item<TRegisterUserForm>
                            name="password"
                            className='w-full'
                            rules={[{
                                pattern: PASSWORD_REGEX,
                                required: true,
                                message: "Password must be from 6 characters and must contain one upper case and one number",
                            }]}
                        >
                            <Input.Password
                                placeholder='Enter your password...'
                                id='RegisterForm-password'
                                prefix={<FontAwesomeIcon icon={faLock} />}
                                className='placeholder:text-xs p-2 pl-4 pr-4 gap-x-1'
                                iconRender={(visible) => (
                                    <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} size="1x" cursor="pointer" />
                                )}
                            />
                        </Form.Item>
                    </div>
                </div>

                <div className='flex gap-x-3 mt-5 items-center justify-center'>
                    <button
                        type="button"
                        onClick={() => onSwitchStep('pre')}
                        className={`flex bg-black rounded-full p-[8px] transition-transform hover:-rotate-[360deg] duration-500`}
                    >
                        <FontAwesomeIcon
                            icon={faArrowRotateLeft}
                            size='lg'
                            color='white'
                            className='m-auto'
                        />
                    </button>

                    <Form.Item>
                        <button
                            className="flex gap-x-3 text-base justify-center items-center rounded-full w-fit px-8 py-2 bg-black text-white box-border"
                            type="submit"
                        >
                            {
                                loading ?
                                    <Spinner className='h-[24px] block' />
                                    :
                                    <>
                                        <span>
                                            Submit
                                        </span>
                                        <FontAwesomeIcon icon={faPaperPlane} size='1x' />
                                    </>
                            }
                        </button>
                    </Form.Item>
                </div>
            </div>
        </Form>
    )
}

type TBirthday = {
    day: number
    month: number
    year: number
}

type TNamePassword = {
    password: string
    firstName: string
    lastName: string
}

type TRegisterUserForm = TNamePassword & { birthday: TBirthday, typedEmail: string }

enum ERegisterSteps {
    DATE_OF_BIRTH = 1,
    NAME_PASSWORD,
}

type TSetDataHandler = (data: Partial<TRegisterUserForm>) => void

type TSwitchStepHandler = (direction: 'pre' | 'next') => void

const RegisterForm = (
    { typedEmail }: { typedEmail: string }
) => {
    const [data, setData] = useState<TRegisterUserForm>({
        birthday: { day: 0, month: 0, year: 0 },
        firstName: '',
        lastName: '',
        password: '',
        typedEmail,
    })
    const [step, setStep] = useState<ERegisterSteps>(ERegisterSteps.DATE_OF_BIRTH)

    const switchStep: TSwitchStepHandler = (direction: 'pre' | 'next') => {
        setStep(pre => direction === 'next' ? pre + 1 : pre - 1)
    }

    const slide = () => {
        if (step === ERegisterSteps.DATE_OF_BIRTH)
            return '-translate-x-[0%]'
        else if (step === ERegisterSteps.NAME_PASSWORD)
            return '-translate-x-[50%]'
    }

    const handleSetData: TSetDataHandler = (data) => {
        setData(pre => ({ ...(pre || {}), ...(data as any) }))

        if (step !== ERegisterSteps.NAME_PASSWORD) {
            switchStep('next')
        }
    }

    return (
        <div
            className="flex flex-col items-center box-border"
        >
            <div className='Intro flex flex-col gap-y-1 items-center'>
                <h3 className="text-3xl font-bold font-anton before:w-4">
                    THUNDER CHAT.
                </h3>
                <span className='text-center text-xs'>
                    You are in register period, please complete the register by providing the following details.
                    Thank you!
                </span>
            </div>

            <div className='overflow-hidden w-[440px]'>
                <div className={`w-min flex ${slide()} transition duration-300`}>
                    <DateOfBirth
                        onSetData={handleSetData}
                    />

                    <NameAndPassword
                        onSwitchStep={switchStep}
                        preData={data}
                    />
                </div>
            </div>
        </div>
    )
}

export default RegisterForm