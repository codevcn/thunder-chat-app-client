export enum EAuthStatuses {
    UNKNOWN = "UNKNOWN",
    AUTHENTICATED = "AUTHENTICATED",
    UNAUTHENTICATED = "UNAUTHENTICATED",
}

export enum EConversationErrMsgs {
    CONV_NOT_FOUND = "Conversation not found",
}

export enum EInvalidHttpErrMsgs {
    INVALID_REQUEST = "Invalid request",
}

export enum EEventNames {
    SCROLL_TO_BOTTOM_MSG = "SCROLL_TO_BOTTOM_MSG",
}

export enum EServerErrMsgs {
    BAD_NETWORK_OR_ERROR = "Bad network or error from server.",
}

export enum ECustomHttpErrMsgs {
    SOMETHING_WENT_WRONG = "Something went wrong, please try again minutes later!",
}

export enum EPeriodsOfStickyTime {
    IN_HOURS = 1,
    IN_DAYS = 1,
}

export enum ETimeFormats {
    MMMM_DD_YYYY = "MMMM DD, YYYY",
    HH_mm = "HH:mm",
}
