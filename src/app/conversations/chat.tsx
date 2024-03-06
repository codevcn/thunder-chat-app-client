"use client"

// >>> fix this: remove
import { dev_test_values } from "@/providers/test"

import { Avatar, Flex, Tooltip, Skeleton } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faPhone, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"
import { IconButton } from "@/materials/IconButton"
import { Messages } from "./messages"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { useEffect, useState, memo } from "react"
import { fetchConversationThunk } from "@/redux/messages/messages.thunk"
import { useSearchParams } from "next/navigation"
import validator from "validator"
import { CONV_ID_QUERY_KEY } from "@/utils/constants"
import { pushMsg } from "@/redux/messages/messages.slice"
import {
    faMicrophone,
    faPaperclip,
    faFaceSmile,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons"
import { Input } from "antd"
import { InfoBar } from "./infoBar"
import { openInfoBar } from "@/redux/conversations/conversationsSlice"
import { pickFirstLetterOfNameUser, setLastSeen } from "@/utils/helpers"

const Header = ({
    infoBarIsOpened,
    onOpenInfoBar,
}: {
    infoBarIsOpened: boolean
    onOpenInfoBar: (open: boolean) => void
}) => {
    const { recipient } = useAppSelector(({ messages }) => messages)

    return (
        <Flex
            justify="space-between"
            className="px-6 py-1.5 bg-regular-bg-darkGray-cl w-full box-border h-header-height"
            gap={10}
        >
            {recipient ? (
                <Tooltip title="View user info" placement="bottom">
                    <Flex gap={10} className="cursor-pointer" onClick={() => onOpenInfoBar(true)}>
                        {recipient.Profile && recipient.Profile.avatar ? (
                            <Avatar src={recipient.Profile.avatar} size={45} />
                        ) : (
                            <Avatar size={45}>{pickFirstLetterOfNameUser(recipient)}</Avatar>
                        )}
                        <div>
                            <h3 className="text-lg font-bold">
                                {recipient.lastName + " " + recipient.firstName}
                            </h3>
                            <div className="text-xs text-regular-text-secondary-cl">
                                {"Last seen " + setLastSeen(dev_test_values.user_1.lastOnline)}
                            </div>
                        </div>
                    </Flex>
                </Tooltip>
            ) : (
                <Flex gap={10}>
                    <Skeleton.Avatar active size={45} style={{ backgroundColor: "#b8b8b826" }} />
                    <Flex vertical className="h-full" justify="space-between">
                        <Skeleton.Button
                            active
                            style={{ height: 20, width: 100, backgroundColor: "#b8b8b826" }}
                        />
                        <Skeleton.Button
                            active
                            style={{ height: 20, width: 150, backgroundColor: "#b8b8b826" }}
                        />
                    </Flex>
                </Flex>
            )}

            <Flex
                className={`${infoBarIsOpened ? "translate-x-slide-header-icons" : "translate-x-0"} transition duration-300 ease-slide-info-bar-timing`}
                align="center"
                gap={10}
            >
                <Tooltip title="Search this chat" placement="bottomRight" arrow={false}>
                    <div>
                        <IconButton className="flex justify-center items-center text-regular-icon-cl w-[35px] h-[35px]">
                            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                        </IconButton>
                    </div>
                </Tooltip>

                <Tooltip title="Call" placement="bottomRight" arrow={false}>
                    <div>
                        <IconButton className="flex justify-center items-center text-regular-icon-cl w-[35px] h-[35px]">
                            <FontAwesomeIcon icon={faPhone} size="lg" />
                        </IconButton>
                    </div>
                </Tooltip>

                <Tooltip title="More actions" placement="bottomRight" arrow={false}>
                    <div>
                        <IconButton className="flex justify-center items-center text-regular-icon-cl w-[35px] h-[35px]">
                            <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
                        </IconButton>
                    </div>
                </Tooltip>
            </Flex>
        </Flex>
    )
}

const TypeMessageBar = memo(() => {
    const { fetchedMsgs } = useAppSelector(({ messages }) => messages)
    const [message, setMessage] = useState<string>("")
    const dispatch = useAppDispatch()

    const typing: React.ChangeEventHandler<HTMLTextAreaElement> = async (e) => {
        const value = e.target.value
        console.log(">>> value >>>", `"${value}"`)
        if (/\n/.test(value)) return
        console.log(">>> sau >>>", `"${value}"`)
        setMessage(value)
    }

    const sendMessage = async () => {
        console.log(">>> run this")
        if (!message.trim()) return
        dispatch(
            pushMsg({
                id: dev_test_values.random_between_two_numbers(1000, 2000),
                authorId: 11,
                content: message,
                conversationId: 4,
                createdAt: new Date().toISOString(),
                isNewMsg: true,
            })
        )
    }

    const catchEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && e.shiftKey) {
            setMessage((pre) => pre + "\n")
        } else if (e.key === "Enter") {
            sendMessage()
            setMessage("")
        }
    }

    return (
        fetchedMsgs && (
            <Flex className="pt-2 pb-4 w-type-message-bar-width box-border" align="center" gap={10}>
                <Flex
                    className="relative z-10 w-full rounded-2xl bg-regular-bg-darkGray-cl px-3 border-2 border-regular-bg-darkGray-cl hover:border-regular-violet-cl transition duration-200"
                    align="center"
                    gap={5}
                >
                    <div className="text-gray-500 hover:text-regular-violet-cl relative bottom-0 left-0">
                        <FontAwesomeIcon icon={faFaceSmile} color="inherit" size="xl" />
                    </div>

                    <div className="relative bg-regular-bg-darkGray-cl w-full">
                        <Input.TextArea
                            className="bg-transparent text-base p-3 px-1 z-10 styled-scrollbar border-transparent text-white hover:border-transparent focus:border-transparent focus:shadow-none"
                            onChange={typing}
                            autoSize={{ minRows: 1, maxRows: 10 }}
                            onKeyDown={catchEnter}
                            value={message}
                        />
                        <div
                            className={`${message ? "animate-hide-placeholder" : "animate-grow-placeholder"} left-2 z-0 absolute top-1/2 -translate-y-1/2 text-regular-placeholder-text-cl`}
                        >
                            Message...
                        </div>
                    </div>

                    <div className="text-gray-500 hover:text-regular-violet-cl relative bottom-0 right-0">
                        <FontAwesomeIcon icon={faPaperclip} color="inherit" size="xl" />
                    </div>
                </Flex>

                <Tooltip title={message ? "Send message" : "Record voice message"} placement="top">
                    <Flex
                        className={`bg-regular-bg-darkGray-cl rounded-full p-[27px] relative hover:text-white ${message ? "text-regular-violet-cl" : "text-gray-500"} cursor-pointer hover:bg-regular-violet-cl`}
                        justify="center"
                        align="center"
                    >
                        <div
                            className={`${message ? "animate-hide-icon" : "animate-grow-icon"} absolute`}
                        >
                            <FontAwesomeIcon icon={faMicrophone} color="inherit" size="xl" />
                        </div>
                        <div
                            className={`${message ? "animate-grow-icon" : "animate-hide-icon"} absolute`}
                        >
                            <FontAwesomeIcon icon={faPaperPlane} color="inherit" size="xl" />
                        </div>
                    </Flex>
                </Tooltip>
            </Flex>
        )
    )
})

export const Chat = () => {
    const { conversation } = useAppSelector(({ messages }) => messages)
    const dispatch = useAppDispatch()
    const search = useSearchParams()
    const [conversationId, setConversationId] = useState<number>()
    const { infoBarIsOpened } = useAppSelector(({ conversations }) => conversations)

    const hanldeOpenInfoBar = async (open: boolean) => {
        dispatch(openInfoBar(open))
    }

    useEffect(() => {
        const conversationId = search.get(CONV_ID_QUERY_KEY)
        if (conversationId && validator.isNumeric(conversationId)) {
            const conv_id = parseInt(conversationId)

            dispatch(fetchConversationThunk(conv_id))

            setConversationId(conv_id)
        }
    }, [])

    return (
        conversationId &&
        conversation && (
            <Flex className="w-chat-n-info-container-width box-border overflow-hidden relative">
                <Flex
                    className="Chatting w-full box-border h-screen bg-no-repeat bg-transparent bg-cover bg-center relative"
                    vertical
                    align="center"
                >
                    <Header infoBarIsOpened={infoBarIsOpened} onOpenInfoBar={hanldeOpenInfoBar} />

                    <Flex //
                        className={`${infoBarIsOpened ? "translate-x-slide-chat-container w-msgs-container-width" : "translate-x-0 w-full"} h-chat-container-height transition duration-300 ease-slide-info-bar-timing overflow-hidden`}
                        vertical
                        justify="space-between"
                        align="center"
                    >
                        <Messages conversationId={conversationId} />

                        <TypeMessageBar />
                    </Flex>
                </Flex>

                <InfoBar />
            </Flex>
        )
    )
}
