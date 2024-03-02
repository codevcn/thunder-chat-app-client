export enum EAuthStatus {
    UNKNOWN = "AUTH_STATUS_UNKNOWN",
    AUTHENTICATED = "AUTH_STATUS_AUTHENTICATED",
    UNAUTHENTICATED = "AUTH_STATUS_UNAUTHENTICATED",
}

export enum EConversationErrMsg {
    CONV_NOT_FOUND = "Conversation not found",
}

export enum EInvalidHttpErrMsg {
    INVALID_REQUEST = "Invalid request",
}

export enum EEventName {
    SCROLL_TO_BOTTOM_MSG = "SCROLL_TO_BOTTOM_MSG",
}

export enum EServerErrMsg {
    BAD_NETWORK_OR_ERROR = "Bad network or error from server.",
}

export enum ECustomHttpErrMsg {
    SOMETHING_WENT_WRONG = "Something went wrong, please try again minutes later!",
}

export enum ETimeGapOfStickyTime {
    IN_HOURS = 1,
    IN_DAYS = 1,
}

export enum ETimeFormat {
    MMMM_DD_YYYY = "MMMM DD, YYYY",
    HH_mm = "HH:mm",
}
