'use client'

import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { Input } from 'antd'
import React from "react"
import { Flex, Tooltip } from "antd"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMicrophone, faPaperclip, faFaceSmile,
    faPaperPlane, faCheckDouble,
} from '@fortawesome/free-solid-svg-icons'
import { ChangeEventHandler, useEffect, useState } from "react"
import { fetchMessagesThunk } from "@/redux/messages/messagesThunks"
import { TMessage, TUserWithoutPassword } from "@/utils/types"
import { Spinner } from "@/materials/Spinner"
import { MsgAppendix } from "@/materials/MsgAppendix"
import dayjs from "dayjs"
import { EPeriodsOfStickyTime, ETimeFormats } from "@/utils/enums"

const Footer = () => {
    const [message, setMessage] = useState<string>('')

    const typing: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        const { value } = e.target

        setMessage(value)
    }

    return (
        <Flex
            className="w-full pt-2 pb-4 px-44"
            align="center"
            gap={10}
        >
            <Flex
                className="relative z-10 w-full rounded-2xl bg-regular-DarkGray px-3 border-2 border-regular-DarkGray hover:border-regular-violet transition duration-200"
                align="center"
                gap={5}
            >
                <div className="text-gray-500 hover:text-regular-violet relative bottom-0 left-0">
                    <FontAwesomeIcon icon={faFaceSmile} color="inherit" size="xl" />
                </div>

                <div className="relative bg-regular-DarkGray w-full">
                    <Input.TextArea
                        className="bg-transparent text-base p-3 px-1 z-10 styled-scrollbar border-transparent text-white hover:border-transparent focus:border-transparent"
                        onChange={typing}
                        value={message}
                        autoSize={{ minRows: 1, maxRows: 10 }}
                    />
                    <div
                        className={`${message ? 'animate-hide-placeholder' : 'animate-grow-placeholder'} left-2 z-0 absolute top-1/2 -translate-y-1/2 text-regular-PlaceHolderText`}
                    >
                        Message...
                    </div>
                </div>

                <div className="text-gray-500 hover:text-regular-violet relative bottom-0 right-0">
                    <FontAwesomeIcon icon={faPaperclip} color="inherit" size="xl" />
                </div>
            </Flex>

            <Tooltip
                title={message ? "Send message" : "Record voice message"}
                color="purple"
                placement="top"
            >
                <Flex
                    className={`bg-regular-DarkGray rounded-full p-[27px] relative hover:text-white ${message ? 'text-regular-violet' : 'text-gray-500'} cursor-pointer hover:bg-regular-violet`}
                    justify="center"
                    align="center"
                >
                    <div className={`${message ? 'animate-hide-icon' : 'animate-grow-icon'} absolute`}>
                        <FontAwesomeIcon icon={faMicrophone} color="inherit" size="xl" />
                    </div>
                    <div className={`${message ? 'animate-grow-icon' : 'animate-hide-icon'} absolute`}>
                        <FontAwesomeIcon icon={faPaperPlane} color="inherit" size="xl" />
                    </div>
                </Flex>
            </Tooltip>
        </Flex>
    )
}

type TMessageProps = {
    content: string,
    time: string,
}

const CreatorMessage = ({
    content,
    time,
}: TMessageProps) => {
    return (
        <Flex
            className="w-full"
            justify="space-between"
        >
            <span></span>
            <div className="bg-regular-violet rounded-t-2xl rounded-bl-2xl py-1.5 px-2 relative">
                <p className="text-sm inline">
                    {content}
                </p>
                <div className="float-right ml-3 relative right-0 top-1">
                    <span className="text-xs text-regular-CreatorMsgTime">
                        {time}
                    </span>
                    <div className="inline-block ml-0.5">
                        <FontAwesomeIcon icon={faCheckDouble} fontSize={12} />
                    </div>
                </div>
            </div>
        </Flex>
    )
}

const RecipientMessage = ({
    content,
    time,
}: TMessageProps) => {
    return (
        <div className="bg-regular-DarkGray rounded-t-2xl rounded-br-2xl pt-1.5 pb-2 px-2 w-fit relative">
            <p className="text-sm inline">
                {content}
            </p>
            <span className="text-xs text-regular-RecipientMsgTime float-right ml-3 relative right-0 top-2">
                {time}
            </span>
        </div>
    )
}

const Message = ({
    message,
    creator,
}: {
    message: TMessage,
    creator: TUserWithoutPassword,
}) => {
    const { authorId, content, createdAt: msgTime } = message
    const isCreatorMessage = creator.id === authorId

    const format_message_time = (msg_time: string) => dayjs(msg_time).format('hh:mm')

    return (
        <div className="Message-Container">
            {
                isCreatorMessage ?
                    <CreatorMessage
                        content={content}
                        time={format_message_time(msgTime)}
                    />
                    :
                    <RecipientMessage
                        content={content}
                        time={format_message_time(msgTime)}
                    />
            }
        </div>
    )
}

const NoMessagesYet = () => {
    return (
        <Flex
            vertical
            align="center"
            gap={2}
            className="m-auto text-base w-2/4 cursor-pointer"
        >
            <p className="font-bold">
                No messages here yet...
            </p>
            <p className="text-center">
                Send a message or tap on the greeting below.
            </p>
            <p className="bg-regular-violet font-bold p-5 py-2 mt-2 rounded-lg hover:scale-105 transition">
                SAY HELLO!
            </p>
        </Flex>
    )
}

const StickyTime = ({ sticky_time }: { sticky_time: string }) => {
    return (
        <div className="flex w-full py-2">
            <div className="m-auto py-0.5 px-1 cursor-pointer font-bold">
                {sticky_time}
            </div>
        </div>
    )
}

export const Messages = ({ conversationId }: { conversationId: number }) => {
    const { messages } = useAppSelector(({ messages }) => messages)
    const dispatch = useAppDispatch()
    const [fetchedMsgs, setFetchedMsgs] = useState<boolean>(false)
    const user = useAppSelector(({ user }) => user.user)
    console.log('>>> messes >>>', messages)
    const fetchMessages = async () => {
        await dispatch(fetchMessagesThunk(conversationId))
        setFetchedMsgs(true)
    }

    useEffect(() => {
        fetchMessages()
    }, [])

    const set_date_to_d_m_y = (dayjs: dayjs.Dayjs) => dayjs.set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0)

    const handle_sticky_time = (pre_msg_time: string, current_msg_time: string): string | null => {
        const pre_time_data = dayjs(pre_msg_time)
        const current_time_data = dayjs(current_msg_time)
        const today_time_data = dayjs()

        if (current_time_data.diff(pre_time_data, 'day') === 0) {
            if (current_time_data.diff(pre_time_data, 'hour') > EPeriodsOfStickyTime.IN_HOURS) {
                return current_time_data.format(ETimeFormats.HH_mm)
            }
        } else {
            if (current_time_data.diff(today_time_data, 'day') === 0) {
                return 'Today'
            }

            return current_time_data.format(ETimeFormats.MMMM_DD_YYYY)
        }

        return null
    }

    const map_message = (messages: TMessage[], user: TUserWithoutPassword) => (message: TMessage, index: number) => {
        const sticky_time = index > 0 ?
            handle_sticky_time(messages[index - 1].createdAt, message.createdAt)
            : dayjs(message.createdAt).format(ETimeFormats.MMMM_DD_YYYY)

        return (
            <React.Fragment key={message.id}>
                {
                    sticky_time &&
                    <StickyTime
                        sticky_time={sticky_time}
                    />
                }

                <Message
                    message={message}
                    key={message.id}
                    creator={user}
                />
            </React.Fragment>
        )
    }

    return (
        <Flex
            className="Messages w-full h-[90%]"
            vertical
            justify="space-between"
            align="center"
        >
            <Flex
                className="w-full h-full px-[165px] py-2 box-border overflow-y-auto styled-scrollbar"
                vertical
                gap={7}
            >
                {
                    fetchedMsgs && user ? (
                        messages && messages.length > 0 ?
                            messages.map(map_message(messages, user))
                            :
                            <NoMessagesYet />
                    ) : (
                        <div className="m-auto w-11 h-11">
                            <Spinner />
                        </div>
                    )

                }
            </Flex>

            {
                fetchedMsgs ?
                    <Footer />
                    :
                    <></>
            }
        </Flex>
    )
}