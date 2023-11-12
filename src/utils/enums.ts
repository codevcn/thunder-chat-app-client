
export enum EAuthStatuses {
    UNKNOWN = 0,
    AUTHENTICATED,
    UNAUTHENTICATED,
}

export enum EConversationErrMsgs {
    CONV_NOT_FOUND = "Conversation not found",
}

export enum EPeriodsOfStickyTime {
    IN_HOURS = 1,
    IN_DAYS = 1,
}

export enum ETimeFormats {
    MMMM_DD_YYYY = 'MMMM DD, YYYY',
    HH_mm = 'HH:mm',
}