import { EEventName } from "./enums"

type TCreateEventPayload = {
    behavior: ScrollBehavior
}

export class ScrollToBottomEventor {
    static createEvent(payload: TCreateEventPayload): CustomEvent<unknown> {
        return new CustomEvent<TCreateEventPayload>(EEventName.SCROLL_TO_BOTTOM_MSG, {
            detail: { behavior: payload.behavior },
        })
    }

    static isThisEvent(event: Event): event is CustomEvent<TCreateEventPayload> {
        return (
            event instanceof CustomEvent &&
            typeof event.detail !== "undefined" &&
            "behavior" in event.detail
        )
    }
}
