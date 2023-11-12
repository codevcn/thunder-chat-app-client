'use client'

import { Navigation } from "./navigation"
import { Conversations } from "./conversations"
import { Chat } from "./chat"
import { Flex } from "antd"
import { useBackground } from "@/contexts/backgroundContext"

const ConversationPage = () => {
    const { background } = useBackground()

    return (
        <Flex
            className="ConversationPage bg-regular-black w-full"
            style={background ? { backgroundImage: `url(${background})` } : {}}
        >
            <Navigation />

            <Flex
                className="w-full"
            >
                <Conversations />

                <Chat />
            </Flex>
        </Flex>
    )
}

export default ConversationPage