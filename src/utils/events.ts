import { EEventNames } from "./enums"

type TCreateEventPayload = {
    behavior: ScrollBehavior
}

export class ScrollToBottomEventor {
    static createEvent(payload: TCreateEventPayload): CustomEvent<unknown> {
        return new CustomEvent<TCreateEventPayload>(EEventNames.SCROLL_TO_BOTTOM_MSG, { detail: { behavior: payload.behavior } })
    }

    static isThisCustomEvent(event: Event): event is CustomEvent<TCreateEventPayload> {
        return event instanceof CustomEvent && typeof event.detail !== "undefined" && "behavior" in event.detail
    }
}