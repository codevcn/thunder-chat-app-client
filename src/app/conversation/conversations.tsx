'use client'

import { Avatar, Tooltip, Flex } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMagnifyingGlass, faThumbtack,
} from '@fortawesome/free-solid-svg-icons'
import { Input } from 'antd'
import dayjs from "dayjs"
import { useDebounce } from '@/hooks/debounce'

type TConversation = {
    id: number,
    avatar: string,
    title: string,
    subtitle: string,
    lastMessageTime: Date,
    pinIndex: number,
}

const ConversationCard = ({ params }: { params: TConversation }) => {
    const { avatar, lastMessageTime, pinIndex, subtitle, title } = params

    return (
        <Flex
            align="center"
            className="px-3 py-3 w-full cursor-pointer hover:bg-regular-LightGray rounded-xl"
            gap={8}
        >
            <Flex>
                <Avatar
                    className="mt-auto"
                    src={avatar}
                    size={50}
                />
            </Flex>
            <div className="w-full max-w-[196px]">
                <Flex
                    justify="space-between"
                    align="center"
                    gap={10}
                    className="w-full"
                >
                    <h3 className="truncate font-bold w-fit">
                        {title}
                    </h3>
                    <div className="text-[10px] w-max text-regular-BlurGray">
                        {dayjs(lastMessageTime).format('MMM D, YYYY')}
                    </div>
                </Flex>
                <Flex
                    justify="space-between"
                    align="center"
                    gap={10}
                    className="mt-1 w-full"
                >
                    <p className="truncate w-full">
                        {subtitle}
                    </p>
                    {
                        pinIndex !== 0 &&
                        <Tooltip
                            title="This conversation was pinned"
                            color="purple"
                            placement="bottom"
                        >
                            <span><FontAwesomeIcon icon={faThumbtack} /></span>
                        </Tooltip>
                    }
                </Flex>
            </div>
        </Flex>
    )
}

export const Conversations = ({
    conversations
}: { conversations: TConversation[] }) => {
    const debounce = useDebounce(250)

    const search = () => debounce(async () => {

    })

    const sort_by_pinned = () => conversations.sort((pre, next) => next.pinIndex - pre.pinIndex)

    return (
        <Flex
            className="pt-3 pb-2 box-border h-screen bg-regular-DarkGray w-1/4 border-regular-LightGray border-r"
            vertical
            gap={10}
        >
            <div
                className="relative px-3"
            >
                <span
                    className="absolute top-1/2 -translate-y-1/2 z-20 pl-5"
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
                <Input
                    type="text"
                    className="box-border h-[40px] px-5 pl-12 rounded-full z-10 placeholder:text-regular-PlaceHolderText text-white bg-regular-PrettyGray border-regular-PrettyGray hover:border-regular-violet hover:bg-regular-PrettyGray"
                    placeholder="Search..."
                    onChange={search}
                />
            </div>

            <div className="px-3 box-border w-full h-full overflow-x-hidden overflow-y-auto styled-scrollbar">
                {
                    sort_by_pinned().map((params) => (
                        <ConversationCard params={params} key={params.id} />
                    ))
                }
            </div>
        </Flex>
    )
}