'use client'

import { Avatar, Flex, Input, Tooltip } from "antd"
import dayjs from "dayjs"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMagnifyingGlass, faPhone, faEllipsisVertical, faMicrophone, faPaperclip, faFaceSmile,
    faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'
import { IconButton } from "@/materials/IconButton"

// >>> fix this: remove
import { user_1 } from "@/lib/test"
import { ChangeEventHandler, useState } from "react"

const Header = () => {
    return (
        <Flex
            justify="space-between"
            className="px-6 py-1.5 bg-regular-DarkGray w-full box-border"
            gap={10}
        >
            <Tooltip
                title="View user details"
                color="purple"
                placement="bottom"
            >
                <Flex
                    gap={10}
                    className="cursor-pointer"
                >
                    <Avatar src={user_1.avatar} size={45} />
                    <div>
                        <h3 className="text-lg font-bold">
                            {user_1.name}
                        </h3>
                        <div className="text-xs text-regular-BlurGray">
                            {'Last seen ' + dayjs(user_1.lastOnline).format('MM/DD/YYYY, h:mm A')}
                        </div>
                    </div>
                </Flex>
            </Tooltip>

            <Flex
                align="center"
                gap={10}
            >
                <Tooltip
                    title="Search this chat"
                    color="purple"
                    placement="bottomRight"
                    arrow={false}
                >
                    <div>
                        <IconButton title="">
                            <Flex
                                className="text-regular-BlurGray w-[18px] h-[18px]"
                                justify="center"
                                align="center"
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                            </Flex>
                        </IconButton>
                    </div>
                </Tooltip>

                <Tooltip
                    title="Call"
                    color="purple"
                    placement="bottomRight"
                    arrow={false}
                >
                    <div>
                        <IconButton>
                            <Flex
                                className="text-regular-BlurGray w-[18px] h-[18px]"
                                justify="center"
                                align="center"
                            >
                                <FontAwesomeIcon icon={faPhone} size="lg" />
                            </Flex>
                        </IconButton>
                    </div>
                </Tooltip>

                <Tooltip
                    title="More actions"
                    color="purple"
                    placement="bottomRight"
                    arrow={false}
                >
                    <div>
                        <IconButton>
                            <Flex
                                className="text-regular-BlurGray w-[18px] h-[18px]"
                                justify="center"
                                align="center"
                            >
                                <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
                            </Flex>
                        </IconButton>
                    </div>
                </Tooltip>
            </Flex>
        </Flex>
    )
}

const Messages = () => {
    return (
        <div>

        </div>
    )
}

const Footer = () => {
    const [message, setMessage] = useState<string>('')

    const typing: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        const { value } = e.target

        setMessage(value)
    }

    return (
        <Flex
            className="w-2/3 pt-3 pb-5 px-5"
            align="center"
            gap={10}
        >
            <Flex
                className="w-full rounded-2xl bg-regular-DarkGray px-3 border-2 border-regular-DarkGray hover:border-regular-violet transition duration-200"
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

export const Chatting = () => {
    return (
        <Flex
            className="Chatting h-screen max-w-[70%] w-full box-border"
            justify="space-between"
            vertical
            align="center"
        >
            <Header />

            <Messages />

            <Footer />
        </Flex>
    )
}