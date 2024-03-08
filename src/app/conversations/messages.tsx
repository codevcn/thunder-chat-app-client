"use client"

import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import React, { useRef } from "react"
import { Flex } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState, memo } from "react"
import { fetchMessagesThunk } from "@/redux/messages/messages.thunk"
import type { TConvMessage, TMessage, TUserWithoutPassword } from "@/utils/types"
import { Spinner } from "@/materials/Spinner"
import dayjs from "dayjs"
import { EEventNames, ETimeGapOfStickyTimes, ETimeFormats } from "@/utils/enums"
import { ScrollToBottomEventor } from "@/utils/CustomEvents"
import { ScrollToBottomMessageBtn } from "./scrollToBottomMsgBtn"
import { createPortal } from "react-dom"

type TMessageProps = {
    content: string
    time: string
    isNewMsg: boolean
}

const CreatorMessage = ({ content, time, isNewMsg }: TMessageProps) => {
    const [animate, setAnimate] = useState<boolean>(true)

    const set_animate_new_msg = () =>
        isNewMsg && animate
            ? "-translate-x-14 translate-y-4 opacity-0"
            : "translate-x-0 translate-y-0 opacity-100"

    useEffect(() => {
        if (isNewMsg) {
            setTimeout(() => {
                setAnimate(false)
            }, 10)
        }
    }, [])

    return (
        <Flex //
            className="w-full"
            justify="space-between"
        >
            <span></span>
            <div
                className={`${set_animate_new_msg()} transition duration-200 bg-regular-violet-cl rounded-t-2xl rounded-bl-2xl py-1.5 px-2 relative`}
            >
                <p className="text-sm inline break-all">{content}</p>
                <div className="float-right ml-3 relative right-0 top-1">
                    <span className="text-xs text-regular-creator-msg-time-cl">{time}</span>
                    <div className="inline-block ml-0.5">
                        <FontAwesomeIcon icon={faCheckDouble} fontSize={12} />
                    </div>
                </div>
            </div>
        </Flex>
    )
}

const RecipientMessage = ({ content, time, isNewMsg }: TMessageProps) => {
    return (
        <div
            className={`${""} bg-regular-darkGray-cl rounded-t-2xl rounded-br-2xl pt-1.5 pb-2 px-2 w-fit relative`}
        >
            <p className="text-sm inline break-all">{content}</p>
            <span className="text-xs text-regular-recipient-msg-time-cl float-right ml-3 relative right-0 top-2">
                {time}
            </span>
        </div>
    )
}

const Message = ({
    message,
    creator,
    isNewMsg,
}: {
    message: TMessage
    creator: TUserWithoutPassword
    isNewMsg: boolean
}) => {
    const { authorId, content, createdAt: msgTime } = message
    const isCreatorMessage = creator.id === authorId

    const format_message_time = (msg_time: string) => dayjs(msg_time).format("hh:mm")

    return (
        <div className="Message-Container max-w-full">
            {isCreatorMessage ? (
                <CreatorMessage
                    content={content}
                    time={format_message_time(msgTime)}
                    isNewMsg={isNewMsg}
                />
            ) : (
                <RecipientMessage
                    content={content}
                    time={format_message_time(msgTime)}
                    isNewMsg={isNewMsg}
                />
            )}
        </div>
    )
}

const NoMessagesYet = () => {
    return (
        <Flex vertical align="center" gap={2} className="m-auto text-base w-2/4 cursor-pointer">
            <p className="font-bold">No messages here yet...</p>
            <p className="text-center">Send a message or tap on the greeting below.</p>
            <p className="bg-regular-violet-cl font-bold p-5 py-2 mt-2 rounded-lg hover:scale-105 transition">
                SAY HELLO!
            </p>
        </Flex>
    )
}

const StickyTime = ({ sticky_time }: { sticky_time: string }) => {
    return (
        <div className="flex w-full py-2">
            <div className="m-auto py-0.5 px-1 cursor-pointer font-bold">{sticky_time}</div>
        </div>
    )
}

export const Messages = memo(({ conversationId }: { conversationId: number }) => {
    const { messages, fetchedMsgs } = useAppSelector(({ messages }) => messages)
    const dispatch = useAppDispatch()
    const user = useAppSelector(({ user }) => user.user)
    const messages_container_ref = useRef<HTMLDivElement>(null)

    const scrollToBottomMessage = async () => {
        messages_container_ref.current?.scrollTo({
            top: -100,
            behavior: "instant",
        })
        messages_container_ref.current?.scrollTo({
            top: -1,
            behavior: "smooth",
        })
    }

    const scrollSendMsg = () => {
        messages_container_ref.current?.scrollTo({
            top: -1,
            behavior: "smooth",
        })
    }

    useEffect(() => {
        scrollSendMsg()
    }, [messages])

    const fetchMessages = async () => {
        await dispatch(fetchMessagesThunk(conversationId))
    }

    const publishScrollToBottomMsgEvent = () => {
        messages_container_ref.current?.addEventListener(EEventNames.SCROLL_TO_BOTTOM_MSG, (e) => {
            if (ScrollToBottomEventor.isThisEvent(e)) {
                scrollToBottomMessage()
            }
        })
    }

    useEffect(() => {
        fetchMessages()
        publishScrollToBottomMsgEvent()

        return () => {
            messages_container_ref.current?.removeEventListener("scroll", () => {})
            messages_container_ref.current?.removeEventListener(
                EEventNames.SCROLL_TO_BOTTOM_MSG,
                () => {}
            )
        }
    }, [])

    const handle_sticky_time = (pre_msg_time: string, current_msg_time: string): string | null => {
        const pre_time_data = dayjs(pre_msg_time)
        const current_time_data = dayjs(current_msg_time)
        const today_time_data = dayjs()

        if (current_time_data.diff(pre_time_data, "day") === 0) {
            if (current_time_data.diff(pre_time_data, "hour") > ETimeGapOfStickyTimes.IN_HOURS) {
                return current_time_data.format(ETimeFormats.HH_mm)
            }
        } else {
            if (current_time_data.diff(today_time_data, "day") === 0) {
                return "Today"
            }

            return current_time_data.format(ETimeFormats.MMMM_DD_YYYY)
        }

        return null
    }

    const handle_sticky_time_of_first_msg = (current_msg_time: string): string | null => {
        const current_time_data = dayjs(current_msg_time)
        const today_time_data = dayjs()

        if (current_time_data.diff(today_time_data, "day") === 0) {
            return "Today"
        }

        return current_time_data.format(ETimeFormats.MMMM_DD_YYYY)
    }

    const map_message = (messages: TConvMessage[], user: TUserWithoutPassword) =>
        messages.map((message, index) => {
            const sticky_time =
                index > 0
                    ? handle_sticky_time(messages[index - 1].createdAt, message.createdAt)
                    : handle_sticky_time_of_first_msg(message.createdAt)

            return (
                <React.Fragment key={message.id}>
                    {sticky_time && <StickyTime sticky_time={sticky_time} />}

                    <Message
                        message={message}
                        key={message.id}
                        creator={user}
                        isNewMsg={!!message.isNewMsg}
                    />
                </React.Fragment>
            )
        })

    return (
        <>
            {createPortal(
                <ScrollToBottomMessageBtn messagesContainerRef={messages_container_ref} />,
                document.body
            )}

            <Flex
                className="w-full h-full overflow-y-auto styled-scrollbar flex-col-reverse px-3 box-border"
                vertical
                align="center"
                ref={messages_container_ref}
            >
                {fetchedMsgs && user ? (
                    messages && messages.length > 0 ? (
                        <Flex className="py-2 box-border w-messages-list-width gap-y-2" vertical>
                            {map_message(messages, user)}
                        </Flex>
                    ) : (
                        <NoMessagesYet />
                    )
                ) : (
                    <div className="m-auto w-11 h-11">
                        <Spinner />
                    </div>
                )}
            </Flex>
        </>
    )
})
