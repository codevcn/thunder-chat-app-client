import { createSelector } from "reselect"
import { RootState } from "../store"

export const selectConversation = (id: number) => createSelector(
    ({ conversations }: RootState) => conversations.searchResults,
    (searchResults) => searchResults?.find((result) => result.id === id)
)

export const sortConversationsByPinned = createSelector(
    ({ conversations }: RootState) => conversations.conversations,
    (conversations) => conversations ? [...conversations].sort((pre, next) => next.pinIndex - pre.pinIndex) : null
)