'use client'

import { Avatar, Tooltip, Flex } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMagnifyingGlass, faThumbtack, faArrowLeft, faXmark,
} from '@fortawesome/free-solid-svg-icons'
import dayjs from "dayjs"
import { useDebounce } from '@/hooks/debounce'
import type { TSearchConversationParams, TUserWithProfile } from '@/utils/types'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { searchConversationThunk } from '@/redux/conversations/conversationsThunks'
import { ChangeEventHandler, Dispatch, SetStateAction, useRef, useState } from 'react'
import validator from 'validator'
import { Spinner } from '@/materials/Spinner'
import { IconButton } from '@/materials/IconButton'
import { clearSearchResult } from '@/redux/conversations/conversationsSlice'
import { useRouter } from 'next/navigation'
import { sortConversationsByPinned } from '@/redux/conversations/conversationsSelectors'
import { startConversationThunk } from '@/redux/messages/messagesThunks'
import { unwrapResult } from '@reduxjs/toolkit'

const Result = ({
    convResult,
    handleStartConversation,
}: {
    convResult: TUserWithProfile,
    handleStartConversation: (id: number) => void,
}) => {
    const { Profile, id, firstName, lastName } = convResult

    return (
        <Tooltip
            title="Click to open a chat"
            placement="right"
        >
            <Flex
                className='w-full p-3 py-2 cursor-pointer hover:bg-regular-hover-card-cl rounded-xl'
                gap={10}
                onClick={() => handleStartConversation(id)}
            >
                <div>
                    {
                        Profile && Profile.avatar ?
                            <Avatar src={Profile.avatar} size={50} />
                            :
                            <Avatar size={50}>
                                {firstName}
                            </Avatar>
                    }
                </div>
                <Flex
                    vertical
                    justify="center"
                    gap={5}
                >
                    <span className='font-bold text-base'>
                        {firstName + ' ' + lastName}
                    </span>
                    <span className="text-xs text-regular-icon-cl">
                        {'Last seen 10/08/2023'}
                    </span>
                </Flex>
            </Flex>
        </Tooltip>
    )
}

const Results = ({
    loading,
}: {
    loading: boolean,
}) => {
    const { searchResults } = useAppSelector(({ conversations }) => conversations)
    const router = useRouter()
    const dispatch = useAppDispatch()

    const startConversation = async (id: number) => {
        const res = await dispatch(startConversationThunk({ recipientId: id }))
        const conv_data = unwrapResult(res)

        router.push('/conversations/' + conv_data.id)
    }

    return (
        searchResults && searchResults.length > 0 ?
            searchResults.map((result) => (
                <Result
                    key={result.id}
                    convResult={result}
                    handleStartConversation={() => startConversation(result.id)}
                />
            ))
            :
            <Flex
                className="pt-5"
                justify="center"
                align="center"
            >
                {
                    loading &&
                    <Spinner className="h-[40px]" />
                }
            </Flex>
    )
}

const ConversationsList = () => {
    const conversations = useAppSelector(sortConversationsByPinned)

    return (
        conversations && conversations.length > 0 &&
        conversations.map(({ id, avatar, lastMessageTime, pinIndex, subtitle, title }) => (
            <Flex
                align="center"
                className="px-3 py-3 w-full cursor-pointer hover:bg-regular-hover-card-cl rounded-xl"
                gap={8}
                key={id}
            >
                <Flex>
                    <Avatar
                        className="mt-auto"
                        src={avatar}
                        size={50}
                    />
                </Flex>
                <div className="w-full max-w-[200px]">
                    <Flex
                        justify="space-between"
                        align="center"
                        gap={10}
                        className="w-full"
                    >
                        <h3 className="truncate font-bold w-fit">
                            {title}
                        </h3>
                        <div className="text-[10px] w-max text-regular-icon-cl">
                            {dayjs(lastMessageTime).format('MMM D, YYYY')}
                        </div>
                    </Flex>
                    <Flex
                        justify="space-between"
                        align="center"
                        gap={10}
                        className="mt-1 w-full"
                    >
                        <p className="truncate w-full text-regular-placeholder-text-cl">
                            {subtitle}
                        </p>
                        {
                            pinIndex !== 0 &&
                            <Tooltip
                                title="This conversation was pinned"
                                placement="bottom"
                            >
                                <span><FontAwesomeIcon icon={faThumbtack} /></span>
                            </Tooltip>
                        }
                    </Flex>
                </div>
            </Flex>
        ))
    )
}

type TSearchProps = {
    setSearching: Dispatch<SetStateAction<boolean>>,
    setIsTyping: Dispatch<SetStateAction<boolean>>,
    isTyping: boolean,
}

const Search = ({
    setIsTyping,
    setSearching,
    isTyping,
}: TSearchProps) => {
    const input_ref = useRef<HTMLInputElement>(null)
    const debounce = useDebounce(300)
    const dispatch = useAppDispatch()

    const search: ChangeEventHandler<HTMLInputElement> = async (e) => {
        let search_value = e.target.value.trim()
        let search_data: TSearchConversationParams = {}

        if (validator.isEmail(search_value)) {
            search_data.email = search_value
        } else if (search_value.includes(' ')) {
            search_data.nameOfUser = search_value
        } else {
            search_data.username = search_value
        }

        setSearching(true)
        await dispatch(searchConversationThunk(search_data))
        setSearching(false)
    }

    const cancelSearch = () => {
        if (input_ref.current?.value)
            input_ref.current.value = ''
        setIsTyping(false)
    }

    const clearInput = () => {
        if (input_ref.current?.value)
            input_ref.current.value = ''
        dispatch(clearSearchResult({}))
    }

    return (
        <Flex
            gap={5}
            align="center"
            className='px-3 box-border'
        >
            <div className={`flex ${isTyping ? 'animate-appear-zoom-in-s40' : 'animate-disappear-zoom-out-s40'}`}>
                <IconButton
                    className="flex justify-center items-center h-[40px] w-[40px]"
                    onClick={cancelSearch}
                    title="Cancel"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </IconButton>
            </div>

            <div className="flex flex-auto relative w-full">
                <span className="absolute top-1/2 -translate-y-1/2 z-20 left-3.5">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>

                <input
                    type="text"
                    className="box-border h-[40px] w-full px-10 rounded-full transition duration-200 border-2 placeholder:text-regular-placeholder-text-cl outline-none text-white bg-regular-hover-card-cl border-regular-hover-card-cl hover:border-regular-violet-cl hover:bg-regular-hover-card-cl focus:border-regular-violet-cl"
                    placeholder="Search..."
                    onChange={debounce(search)}
                    onFocus={() => setIsTyping(true)}
                    ref={input_ref}
                />

                <IconButton
                    className='flex justify-center items-center right-1 h-[35px] w-[35px] absolute top-1/2 -translate-y-1/2 z-20'
                    onClick={clearInput}
                    title="Clear"
                >
                    <FontAwesomeIcon icon={faXmark} />
                </IconButton>
            </div>
        </Flex>
    )
}

export const Conversations = () => {
    const [isTyping, setIsTyping] = useState<boolean>(false)
    const [searching, setSearching] = useState<boolean>(false)

    return (
        <Flex
            className="pt-3 pb-2 box-border h-screen bg-regular-bg-darkGray-cl w-convs-bar-width border-regular-hover-card-cl border-r"
            vertical
            gap={10}
        >
            <Search
                setIsTyping={setIsTyping}
                setSearching={setSearching}
                isTyping={isTyping}
            />

            <div className="relative z-10 h-full w-full overflow-hidden">
                <div className={`${isTyping ? 'animate-super-zoom-out-fade-in' : 'animate-super-zoom-in-fade-out'} pt-3 absolute top-0 left-0 z-20 px-3 box-border w-full h-full overflow-x-hidden overflow-y-auto styled-scrollbar`}>
                    <div className="font-bold pl-3 pb-1 text-regular-icon-cl">
                        Result
                    </div>
                    <Results
                        loading={searching}
                    />
                </div>

                <div className={`${isTyping ? 'animate-zoom-fade-out' : 'animate-zoom-fade-in'} absolute top-0 left-0 z-30 px-2 box-border w-full h-full overflow-x-hidden overflow-y-auto styled-scrollbar`}>
                    <ConversationsList />
                </div>
            </div>
        </Flex>
    )
}