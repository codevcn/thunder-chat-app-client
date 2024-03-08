import { EEventNames } from "./enums"

export class ScrollToBottomEventor {
    static createEvent(): CustomEvent<unknown> {
        return new CustomEvent(EEventNames.SCROLL_TO_BOTTOM_MSG)
    }

    static isThisEvent(event: Event): event is CustomEvent {
        return event instanceof CustomEvent
    }
}
