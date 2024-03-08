// >>> fix this: remove
import { dev_test_values } from "@/providers/test"

import { Flex } from "antd"
import { faXmark, faCircleInfo, faAt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { openInfoBar } from "@/redux/conversations/conversationsSlice"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { IconButton } from "@/materials/IconButton"
import { ProgressiveImage } from "@/components/progressiveImage"
import { getFullName, pickFirstLetterOfNameUser, setLastSeen } from "@/utils/helpers"
import { robotoFont } from "@/utils/fonts"
import type { TUserWithProfile } from "@/utils/types"

const Avatar = ({ recipient }: { recipient: TUserWithProfile }) => {
    return (
        <div className="aspect-square w-full bg-purple-200 relative">
            <div className="w-full h-full cursor-default">
                {recipient.Profile?.avatar ? (
                    <ProgressiveImage
                        src={recipient?.Profile?.avatar}
                        className="w-full h-full"
                        prgssClassName="w-full h-full bg-regular-black-cl"
                    />
                ) : (
                    <div
                        className={`${robotoFont.variable} w-full h-full flex justify-center font-roboto items-center overflow-hidden text-user-avt-fsize bg-user-avt-bgimg`}
                    >
                        {pickFirstLetterOfNameUser(recipient)}
                    </div>
                )}
            </div>

            <Flex
                className="absolute bottom-0 left-0 bg-modal-text-bgimg min-h-[100px] w-full px-6 pb-2"
                justify="end"
                vertical
            >
                <p className="text-xl font-bold">{getFullName(recipient)}</p>
                <span className="text-sm opacity-60">
                    {"Last seen " + setLastSeen(dev_test_values.user_1.lastOnline)}
                </span>
            </Flex>
        </div>
    )
}

const ProfileInfo = ({ recipient }: { recipient: TUserWithProfile }) => {
    const { Profile } = recipient

    return (
        <Flex className="px-2 pt-[0.87rem] pb-[0.87rem]" vertical gap={10}>
            {Profile?.about && (
                <Flex gap={17} align="center" className="px-4 py-2">
                    <div className="text-regular-icon-cl">
                        <FontAwesomeIcon icon={faCircleInfo} size="xl" color="inherit" />
                    </div>
                    <div className="w-info-bar-width">
                        <p className="text-base leading-5 w-full">{Profile.about}</p>
                        <p className="text-regular-text-secondary-cl mt-1">Bio</p>
                    </div>
                </Flex>
            )}

            {recipient.username && (
                <Flex gap={17} align="center" className="px-4 py-2">
                    <div className="text-regular-icon-cl">
                        <FontAwesomeIcon icon={faAt} size="xl" color="inherit" />
                    </div>
                    <div className="w-info-bar-width">
                        <p className="text-base leading-5 w-full">{recipient.username}</p>
                        <p className="text-regular-text-secondary-cl mt-1">Username</p>
                    </div>
                </Flex>
            )}
        </Flex>
    )
}

export const InfoBar = () => {
    const { infoBarIsOpened: open } = useAppSelector(({ conversations }) => conversations)
    const { recipient } = useAppSelector(({ messages }) => messages)
    const dispatch = useAppDispatch()

    const handleOpenInfoBar = (open: boolean) => {
        dispatch(openInfoBar(open))
    }

    return (
        <Flex
            className={`${open ? "right-0" : "-right-slide-info-mb-bar screen-large-chatting:-right-slide-info-bar"} bg-regular-info-bar-bgcl screen-large-chatting:bg-regular-darkGray-cl w-info-bar-mb-width screen-large-chatting:w-info-bar-width h-full overflow-hidden border-l-regular-hover-card-cl border-l z-[60] transition-[right] absolute duration-[0.4s] screen-large-chatting:duration-300 ease-slide-info-bar-timing`}
            vertical
        >
            <Flex className="h-header-height py-[7px] px-3" align="center" gap={15}>
                <IconButton
                    className="flex justify-center items-center h-10 w-10 text-regular-icon-cl"
                    onClick={() => handleOpenInfoBar(false)}
                >
                    <FontAwesomeIcon icon={faXmark} size="xl" />
                </IconButton>
                <div className="text-xl">
                    <h2>User Info</h2>
                </div>
            </Flex>

            {recipient && (
                <div className="h-chat-container-height w-full">
                    <div className="overflow-y-scroll styled-scrollbar h-full bg-regular-info-bar-bgcl">
                        <Avatar recipient={recipient} />

                        <ProfileInfo recipient={recipient} />
                    </div>
                </div>
            )}
        </Flex>
    )
}
