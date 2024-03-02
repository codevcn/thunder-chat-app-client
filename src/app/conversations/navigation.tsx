"use client"

import { Avatar, Badge, Tooltip, Flex } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faHouse, faBell, faGear, faComments } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

type Navs = {
    label: string
    href: string
    icon: JSX.Element
}[]

const navs: Navs = [
    {
        label: "Home",
        href: "/",
        icon: <FontAwesomeIcon icon={faHouse} />,
    },
    {
        label: "Conversation",
        href: "/conversation",
        icon: <FontAwesomeIcon icon={faComments} />,
    },
    {
        label: "Nofication",
        href: "/nofication",
        icon: <FontAwesomeIcon icon={faBell} />,
    },
]

export const Navigation = () => {
    return (
        <Flex
            className="h-screen bg-regular-bg-darkGray-cl border-r border-r-regular-hover-card-cl pt-6 pb-3 w-[55px] box-border"
            justify="space-between"
            vertical
            gap="middle"
        >
            <Tooltip title="Account" placement="right">
                <Link href="/account" className="flex">
                    <Badge dot color="green" className="m-auto">
                        <div className="cursor-pointer transition duration-200 hover:scale-125">
                            <Avatar icon={<FontAwesomeIcon icon={faUser} />} />
                        </div>
                    </Badge>
                </Link>
            </Tooltip>

            <Flex align="center" className="w-full" vertical>
                {navs.map(({ label, href, icon }) => (
                    <Tooltip key={label} placement="right" title={label}>
                        <Link
                            href={href}
                            className="flex w-[55px] cursor-pointer transition duration-200 hover:bg-regular-hover-card-cl py-3"
                        >
                            <div className="m-auto">{icon}</div>
                        </Link>
                    </Tooltip>
                ))}
            </Flex>

            <Tooltip placement="right" title="Settings">
                <Link
                    href="/settings"
                    className="flex w-[55px] cursor-pointer transition duration-200 hover:bg-regular-hover-card-cl py-3"
                >
                    <div className="m-auto">
                        <FontAwesomeIcon icon={faGear} />
                    </div>
                </Link>
            </Tooltip>
        </Flex>
    )
}
