import { useAppSelector } from "@/hooks/redux"
import { GAP_TO_SHOW_SCROLL_BTN } from "@/utils/constants"
import { ScrollToBottomEventor } from "@/utils/events"
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Tooltip } from "antd"
import { useEffect, useState, memo } from "react"

export const ScrollToBottomMessageBtn = memo(
    ({ messagesContainerRef }: { messagesContainerRef: React.RefObject<HTMLDivElement> }) => {
        const [showScrollBtn, setShowScrollBtn] = useState<boolean>(false)
        const { infoBarIsOpened } = useAppSelector(({ conversations }) => conversations)

        const scrollToBottomMessage = (behavior: ScrollBehavior) => {
            messagesContainerRef.current?.dispatchEvent(
                ScrollToBottomEventor.createEvent({ behavior })
            )
        }

        useEffect(() => {
            if (messagesContainerRef.current) {
                messagesContainerRef.current.addEventListener("scroll", function (e) {
                    if (-this.scrollTop > GAP_TO_SHOW_SCROLL_BTN) {
                        setShowScrollBtn(true)
                    } else {
                        setShowScrollBtn(false)
                    }
                })
            }

            return () => {
                messagesContainerRef.current?.removeEventListener("scroll", () => {})
            }
        }, [])

        return (
            <div
                onClick={() => scrollToBottomMessage("smooth")}
                className={`${showScrollBtn ? "bottom-24 opacity-100" : "-bottom-20 opacity-0"} z-50 fixed right-8 cursor-pointer transition-[bottom,opacity] duration-200`}
                onDoubleClick={() => scrollToBottomMessage("instant")}
            >
                <Tooltip title="Go to bottom" placement="left">
                    <div
                        className={`${infoBarIsOpened ? "translate-x-slide-header-icons" : "translate-x-0"} transition duration-300 ease-slide-info-bar-timing flex text-gray-400 items-center justify-center rounded-full h-6 w-6 bg-[#212121] p-4 box-content hover:bg-regular-violet-cl hover:text-white`}
                    >
                        <FontAwesomeIcon icon={faArrowDown} size="xl" color="inherit" />
                    </div>
                </Tooltip>
            </div>
        )
    }
)
