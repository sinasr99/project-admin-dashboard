import {IoMdDoneAll, IoMdNotifications} from "react-icons/io";
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {FaWindowClose} from "react-icons/fa";
import {BiSearchAlt2} from "react-icons/bi";
import {NavigateOptions, URLSearchParamsInit, useSearchParams} from "react-router-dom";

type SearchBarProps = {
    inputSearch: string,
    setInputSearch: Dispatch<SetStateAction<string>>,
    search: () => void
    query: URLSearchParams,
    setQuery: (nextInit: URLSearchParamsInit, navigateOptions?: NavigateOptions) => void,
    notifications: string[]
}

const SearchBar: FC<SearchBarProps> = ({search, setQuery, query, setInputSearch, inputSearch, notifications}) => {
    const [showNotificationModal, setShowNotificationModal] = useState<boolean>(false)

    const enterSearchHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") search()
    }

    const switchShowNotifModal = (event: React.MouseEvent<SVGElement>) => {
        event.stopPropagation()
        setShowNotificationModal(prev => !prev)
    }

    useEffect(() => {
        const clickZHandler = () => {
            setShowNotificationModal(false)
        }

        window.addEventListener("click", clickZHandler)


        return () => window.removeEventListener("click", clickZHandler)
    }, [])

    return (
        <div
            className="header bg-white dark:bg-zinc-700 rounded-md w-fit mx-auto mb-5 py-3 px-4 flex items-center justify-between gap-4 sm:gap-1 text-sm0">
            <div className="search-wrapper relative">
                <input
                    value={inputSearch}
                    onKeyUp={enterSearchHandler}
                    onChange={e => setInputSearch(e.target.value)} type="text"
                    className="search-input w-[200px] sm:w-[300px] h-[45px] p-2 rounded-md border-solid border-black/20 dark:border-white/50 border-[1px] transition-all ease-in-out duration-150 dark:text-white focus:border-black/60 dark:focus:border-white focus:border-[2px]"/>
                <button
                    onClick={search}
                    className="btn-search absolute top-0 bottom-0 my-auto right-1 w-8 h-8 cursor-pointer flex items-center justify-center rounded-md bg-orange-400 transition-all ease-in-out duration-150 text-white hover:bg-orange-500">
                    <BiSearchAlt2 className="w-6 h-6"/>
                </button>
            </div>
            <div className='notif-wrapper z-40 relative w-8 h-8'>
                <IoMdNotifications
                    onClick={switchShowNotifModal}
                    className='cursor-pointer hover:scale-105 transition-all ease-in-out duration-150 w-8 h-8 dark:text-white'/>
                <span
                    className="notif-count absolute -top-[15px] -right-[7px] flex items-center justify-center bg-orange-400 text-sm font-bold rounded-full w-6 h-6 text-white">3</span>

                <div
                    className={`notification-modal transition-all ease-in-out duration-300 overflow-hidden ${showNotificationModal ? "max-h-[380px] max-w-[500px] p-4" : "max-h-0 max-w-[0px] p-0"} -right-5 w-[300px] from-400:w-[350px] from-500:w-[400px] sm:w-[500px] rounded-md absolute top-full mt-[22px] box-shadow sm:right-0 lg:left-1/2 lg:-translate-x-1/2 mx-auto bg-white dark:bg-zinc-700 dark:text-white`}>
                    <div className="notif-header flex items-center justify-end mb-3">
                        <FaWindowClose
                            onClick={switchShowNotifModal}
                            className="w-7 h-7 transition-all ease-in-out duration-150 dark:text-white hover:text-red-600 cursor-pointer"/>
                    </div>
                    <div
                        className="notifications flex flex-col pl-1.5 pr-3 py-3 -mr-3 gap-4 overflow-y-auto max-h-[300px] custom-scroll">
                        {
                            notifications.map((notif, index) => (
                                <p key={index} className="rounded-md p-2 box-shadow relative flex items-center justify-between">
                                    <span
                                        className="max-w-[210px] from-400:max-w-[260px] from-500:max-w-[310px] sm:max-w-[410px] block whitespace-nowrap overflow-hidden text-ellipsis">{notif}</span>
                                    <IoMdDoneAll
                                        className="w-6 h-6 transition-all ease-in-out duration-150 dark:text-white hover:scale-[1.2] cursor-pointer"/>
                                </p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBar