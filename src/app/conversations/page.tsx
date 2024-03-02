"use client"

import { Navigation } from "./navigation"
import { Conversations } from "./conversations"
import { Chat } from "./chat"
import { Flex } from "antd"
import { useConvBackground } from "@/contexts/backgroundContext"
import { memo } from "react"

const MainSectionOfPage = memo(() => {
    return (
        <>
            <Navigation />

            <Flex className="w-full">
                <Conversations />

                <Chat />
            </Flex>
        </>
    )
})

const ConversationPage = () => {
    const { background } = useConvBackground()

    return (
        <Flex
            className="ConversationPage bg-regular-black-cl w-full"
            style={background ? { backgroundImage: `url(${background})` } : {}}
        >
            <MainSectionOfPage />
        </Flex>
    )
}

export default ConversationPage
