export enum EAuthStatus {
    UNKNOWN = "AUTH_STATUS_UNKNOWN",
    AUTHENTICATED = "AUTH_STATUS_AUTHENTICATED",
    UNAUTHENTICATED = "AUTH_STATUS_UNAUTHENTICATED",
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

export enum ETimeGapOfStickyTimes {
    IN_HOURS = 1,
    IN_DAYS = 1,
}

export enum ETimeFormats {
    MMMM_DD_YYYY = "MMMM DD, YYYY",
    HH_mm = "HH:mm",
}

export enum ECommonStatus {
    SUCCESS = "success",
    FAIL = "fail",
    ERROR = "error",
}

export enum ESocketEventNames {
    client_connected = "client_connected",
    connect_error = "connect_error",
}

export enum ESocketNamespaces {
    Chatting = "Chatting",
}
