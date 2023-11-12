'use client'

import { Avatar, Flex, Tooltip, Skeleton } from "antd"
import dayjs from "dayjs"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMagnifyingGlass, faPhone, faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons'
import { IconButton } from "@/materials/IconButton"
import { Messages } from "./messages"

// >>> fix this: remove
import { dev_test_values } from "@/lib/test"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { useEffect, useState } from "react"
import { fetchConversationThunk } from "@/redux/messages/messagesThunks"
import { useSearchParams } from 'next/navigation'
import validator from "validator"
import { CONV_ID_QUERY_KEY } from "@/utils/constants"

const Header = () => {
    const { recipient } = useAppSelector(({ messages }) => messages)

    return (
        <Flex
            justify="space-between"
            className="px-6 py-1.5 bg-regular-DarkGray w-full box-border h-[10%]"
            gap={10}
        >
            {
                recipient ?
                    <Tooltip
                        title="View user details"
                        color="purple"
                        placement="bottom"
                    >
                        <Flex
                            gap={10}
                            className="cursor-pointer"
                        >
                            {
                                recipient.Profile && recipient.Profile.avatar ?
                                    <Avatar src={recipient.Profile.avatar} size={45} />
                                    :
                                    <Avatar size={45}>
                                        {recipient.firstName[0]}
                                    </Avatar>
                            }
                            <div>
                                <h3 className="text-lg font-bold">
                                    {recipient.lastName + ' ' + recipient.firstName}
                                </h3>
                                <div className="text-xs text-regular-BlurGray">
                                    {'Last seen ' + dayjs(dev_test_values.user_1.lastOnline).format('MM/DD/YYYY, h:mm A')}
                                </div>
                            </div>
                        </Flex>
                    </Tooltip>
                    :
                    <Flex
                        gap={10}
                    >
                        <Skeleton.Avatar active size={45} style={{ backgroundColor: '#b8b8b826' }} />
                        <Flex
                            vertical
                            className="h-full"
                            justify="space-between"
                        >
                            <Skeleton.Button active style={{ height: 20, width: 100, backgroundColor: '#b8b8b826' }} />
                            <Skeleton.Button active style={{ height: 20, width: 150, backgroundColor: '#b8b8b826' }} />
                        </Flex>
                    </Flex>
            }

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
                        <IconButton className="flex justify-center items-center text-regular-BlurGray w-[35px] h-[35px]">
                            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
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
                        <IconButton className="flex justify-center items-center text-regular-BlurGray w-[35px] h-[35px]">
                            <FontAwesomeIcon icon={faPhone} size="lg" />
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
                        <IconButton className="flex justify-center items-center text-regular-BlurGray w-[35px] h-[35px]">
                            <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
                        </IconButton>
                    </div>
                </Tooltip>
            </Flex>
        </Flex>
    )
}

export const Chat = () => {
    const { conversation } = useAppSelector(({ messages }) => messages)
    const dispatch = useAppDispatch()
    const search = useSearchParams()
    const [convId, setConvId] = useState<number>()

    useEffect(() => {
        const conversationId = search.get(CONV_ID_QUERY_KEY)
        if (conversationId && validator.isNumeric(conversationId)) {
            const conv_id = parseInt(conversationId)

            dispatch(
                fetchConversationThunk(conv_id)
            )

            setConvId(conv_id)
        }
    }, [])

    return (
        convId && conversation ?
            <Flex
                className="Chatting box-border h-screen w-3/4 bg-no-repeat bg-transparent bg-cover bg-center"
                vertical
                align="center"
            >
                <Header />

                <Messages
                    conversationId={convId}
                />
            </Flex>
            :
            <></>
    )
}