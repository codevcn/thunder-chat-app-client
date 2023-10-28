'use client'

import { Navigation } from "./navigation"
import { Conversations } from "./conversations"
import { Chatting } from "./chatting"

// >>> fix this: remove
import { conversations } from "@/lib/test"

const ConversationPage = () => {
    return (
        <div className="ConversationPage flex bg-black">
            <Navigation />

            <Conversations
                conversations={conversations}
            />

            <Chatting />
        </div>
    )
}

export default ConversationPage