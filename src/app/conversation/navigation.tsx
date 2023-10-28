'use client'

import { useAppSelector } from "@/hooks/redux"
import { Avatar, Badge, Space, Tooltip, Flex } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser, faHouse, faBell, faGear,
} from '@fortawesome/free-solid-svg-icons'
import Link from "next/link"

type Navs = {
    label: string,
    href: string,
    icon: JSX.Element,
}[]

const navs: Navs = [
    {
        label: 'Home',
        href: '/conversation',
        icon: <FontAwesomeIcon icon={faHouse} />
    }, {
        label: 'Nofication',
        href: '/nofication',
        icon: <FontAwesomeIcon icon={faBell} />
    }
]

export const Navigation = () => {
    const userInfo = useAppSelector(state => state.user.userInfo)

    return (
        <Flex
            className="h-screen bg-regular-DarkGray border-r border-r-regular-LightGray p-4 pt-6 pb-6 w-min box-border"
            justify="space-between"
            vertical
            gap="middle"
        >
            <Tooltip
                title="Account"
                placement="right"
                color="purple"
            >
                <Link
                    href="/account"
                >
                    <Badge
                        dot
                        color="green"
                    >
                        <div
                            className="cursor-pointer transition duration-200 hover:scale-125"
                        >
                            {
                                userInfo && (
                                    userInfo.avatar ?
                                        <Avatar src={userInfo.avatar} />
                                        :
                                        <Avatar icon={<FontAwesomeIcon icon={faUser} />} />
                                )
                            }
                        </div>
                    </Badge>
                </Link>
            </Tooltip>

            <Space
                direction="vertical"
                align="center"
                className="w-full"
                size="large"
            >
                {
                    navs.map(({ label, href, icon }) => (
                        <Tooltip
                            key={label}
                            placement="right"
                            title={label}
                            color="purple"
                        >
                            <Link
                                href={href}
                            >
                                <div
                                    className="cursor-pointer transition duration-200 hover:scale-125"
                                >
                                    {icon}
                                </div>
                            </Link>
                        </Tooltip>
                    ))
                }
            </Space>

            <Tooltip
                placement="right"
                title="Setting"
                color="purple"
            >
                <Link
                    href="/setting"
                >
                    <div
                        className="flex justify-center cursor-pointer transition duration-200 hover:scale-125 w-full"
                    >
                        <FontAwesomeIcon icon={faGear} />
                    </div>
                </Link>
            </Tooltip>
        </Flex >
    )
}