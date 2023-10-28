import dayjs from "dayjs"

type TUser = {
    avatar: string,
    name: string,
    lastOnline: Date,
}

export const user_1: TUser = {
    avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/8.webp",
    lastOnline: new Date(dayjs().subtract(1, 'day').toISOString()),
    name: 'Thier Kat Lucas'
}

type TConversations = {
    id: number,
    avatar: string,
    title: string,
    subtitle: string,
    lastMessageTime: Date,
    pinIndex: number,
}[]

export const conversations: TConversations = [
    {
        id: 0,
        avatar: "https://cdn-icons-png.flaticon.com/512/8930/8930382.png",
        lastMessageTime: new Date(dayjs().subtract(0, 'day').toISOString()),
        title: 'Saved Messages',
        pinIndex: 0,
        subtitle: 'Bookmark',
    }, {
        id: 1,
        avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
        lastMessageTime: new Date(dayjs().subtract(7, 'day').toISOString()),
        title: 'Wibu Kingdom',
        pinIndex: 0,
        subtitle: 'wibu la tao',
    }, {
        id: 2,
        avatar: "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/bookmarks.png",
        lastMessageTime: new Date(dayjs().subtract(8, 'day').toISOString()),
        title: 'Bem',
        pinIndex: 1,
        subtitle: 'co ven duong thoi ma lam sao voi dc may, tu sau cau het tu em gai kia chang can bien lon hoac la bao giong',
    }, {
        id: 3,
        avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/8.webp",
        lastMessageTime: new Date(dayjs().subtract(9, 'day').toISOString()),
        title: 'H',
        pinIndex: 0,
        subtitle: 'wibu la tao',
    }, {
        id: 4,
        avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/5.webp",
        lastMessageTime: new Date(dayjs().subtract(10, 'day').toISOString()),
        title: 'Okay',
        pinIndex: 2,
        subtitle: 'wibu la tao',
    }, {
        id: 5,
        avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
        lastMessageTime: new Date(dayjs().subtract(11, 'day').toISOString()),
        title: 'Daddy Daddy Doo',
        pinIndex: 0,
        subtitle: 'Thuong dang',
    }, {
        id: 6,
        avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
        lastMessageTime: new Date(dayjs().subtract(12, 'day').toISOString()),
        title: 'S123',
        pinIndex: 3,
        subtitle: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    }, {
        id: 7,
        avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
        lastMessageTime: new Date(dayjs().subtract(13, 'day').toISOString()),
        title: '0 o 0',
        pinIndex: 0,
        subtitle: 'wibu la tao',
    }, {
        id: 8,
        avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
        lastMessageTime: new Date(dayjs().subtract(14, 'day').toISOString()),
        title: 'Crying',
        pinIndex: 0,
        subtitle: 'wibu la tao',
    }, {
        id: 9,
        avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
        lastMessageTime: new Date(dayjs().subtract(2, 'day').toISOString()),
        title: 'Chass2',
        pinIndex: 4,
        subtitle: '123999 diqdhoqdi dqiodqj',
    }
]