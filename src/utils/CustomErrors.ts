
export class ConversationError extends Error {
    constructor(message: string) {
        super(message)

        this.name = "Conversation Error"
    }
}