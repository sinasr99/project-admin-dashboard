import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import SearchBar from "../../../components/SearchBar";
import {useSearchParams} from "react-router-dom";
import SelectBox from "../../../components/SelectBox";
import {MdQuestionAnswer} from "react-icons/md";
import {FaMessage} from "react-icons/fa6";
import {FaCheck, FaInfoCircle, FaTrashAlt} from "react-icons/fa";
import {IoCloseSharp, IoTriangle} from "react-icons/io5";
import {HiDotsVertical} from "react-icons/hi";
import SwiperWithButtons from "../../../components/SwiperWithButtons";
import Modal from "../../../components/Modal";
import InputModal from "../../../components/InputModal";

type InputType = "filter" | "sort" | "search" | "comments10"

type CommentType = {
    title: string,
    isApproved: boolean,
    creator: string,
    sentTime: number,
    answers: string[],
    message: string,
}
const comments: CommentType[] = [
    {
        title: "Thanks message",
        answers: ["We’re glad you’re satisfied.", "It’s an honor for us."],
        creator: "Tyler Rake",
        message: "Really thank you for this product with this amazing price",
        isApproved: false,
        sentTime: 1761032776476,
    },
    {
        title: "news message",
        answers: [""],
        creator: "Ryan Pitt",
        message: "It was very very helpful, thank you.",
        isApproved: true,
        sentTime: 1761032776476,
    },
    {
        title: "Thanks message",
        answers: ["We’re glad you’re satisfied.", "It’s an honor for us."],
        creator: "Tyler Rake",
        message: "Really thank you for this product with this amazing price",
        isApproved: false,
        sentTime: 1761032776476,
    },
    {
        title: "Thanks message",
        answers: ["We’re glad you’re satisfied.", "It’s an honor for us."],
        creator: "Tyler Rake",
        message: "Really thank you for this product with this amazing price",
        isApproved: false,
        sentTime: 1761032776476,
    },
    {
        title: "news message",
        answers: [""],
        creator: "Ryan Pitt",
        message: "It was very very helpful, thank you.",
        isApproved: true,
        sentTime: 1761032776476,
    },
    {
        title: "Thanks message",
        answers: ["We’re glad you’re satisfied.", "It’s an honor for us."],
        creator: "Tyler Rake",
        message: "Really thank you for this product with this amazing price",
        isApproved: false,
        sentTime: 1761032776476,
    },
    {
        title: "Thanks message",
        answers: ["We’re glad you’re satisfied.", "It’s an honor for us."],
        creator: "Tyler Rake",
        message: "Really thank you for this product with this amazing price",
        isApproved: false,
        sentTime: 1761032776476,
    },
    {
        title: "news message",
        answers: [""],
        creator: "Ryan Pitt",
        message: "It was very very helpful, thank you.",
        isApproved: true,
        sentTime: 1761032776476,
    },
    {
        title: "Thanks message",
        answers: ["We’re glad you’re satisfied.", "It’s an honor for us."],
        creator: "Tyler Rake",
        message: "Really thank you for this product with this amazing price",
        isApproved: false,
        sentTime: 1761032776476,
    },
    {
        title: "Thanks message",
        answers: ["We’re glad you’re satisfied.", "It’s an honor for us."],
        creator: "Tyler Rake",
        message: "Really thank you for this product with this amazing price",
        isApproved: false,
        sentTime: 1761032776476,
    },
    {
        title: "news message",
        answers: [""],
        creator: "Ryan Pitt",
        message: "It was very very helpful, thank you.",
        isApproved: true,
        sentTime: 1761032776476,
    },
    {
        title: "Thanks message",
        answers: ["We’re glad you’re satisfied.", "It’s an honor for us."],
        creator: "Tyler Rake",
        message: "Really thank you for this product with this amazing price",
        isApproved: false,
        sentTime: 1761032776476,
    },
    {
        title: "Thanks message",
        answers: ["We’re glad you’re satisfied.", "It’s an honor for us."],
        creator: "Tyler Rake",
        message: "Really thank you for this product with this amazing price",
        isApproved: false,
        sentTime: 1761032776476,
    },
    {
        title: "news message",
        answers: [""],
        creator: "Ryan Pitt",
        message: "It was very very helpful, thank you.",
        isApproved: true,
        sentTime: 1761032776476,
    },
    {
        title: "Thanks message",
        answers: ["We’re glad you’re satisfied.", "It’s an honor for us."],
        creator: "Tyler Rake",
        message: "Really thank you for this product with this amazing price",
        isApproved: false,
        sentTime: 1761032776476,
    },
    {
        title: "Thanks message",
        answers: ["We’re glad you’re satisfied.", "It’s an honor for us."],
        creator: "Tyler Rake",
        message: "Really thank you for this product with this amazing price",
        isApproved: false,
        sentTime: 1761032776476,
    },
    {
        title: "news message",
        answers: [""],
        creator: "Ryan Pitt",
        message: "It was very very helpful, thank you.",
        isApproved: true,
        sentTime: 1761032776476,
    },
    {
        title: "Thanks message",
        answers: ["We’re glad you’re satisfied.", "It’s an honor for us."],
        creator: "Tyler Rake",
        message: "Really thank you for this product with this amazing price",
        isApproved: false,
        sentTime: 1761032776476,
    },
    {
        title: "Thanks message",
        answers: ["We’re glad you’re satisfied.", "It’s an honor for us."],
        creator: "Tyler Rake",
        message: "Really thank you for this product with this amazing price",
        isApproved: false,
        sentTime: 1761032776476,
    },
    {
        title: "news message",
        answers: [""],
        creator: "Ryan Pitt",
        message: "It was very very helpful, thank you.",
        isApproved: true,
        sentTime: 1761032776476,
    },
    {
        title: "Thanks message",
        answers: ["We’re glad you’re satisfied.", "It’s an honor for us."],
        creator: "Tyler Rake",
        message: "Really thank you for this product with this amazing price",
        isApproved: false,
        sentTime: 1761032776476,
    },
    {
        title: "Thanks message",
        answers: ["We’re glad you’re satisfied.", "It’s an honor for us."],
        creator: "Tyler Rake",
        message: "Really thank you for this product with this amazing price",
        isApproved: false,
        sentTime: 1761032776476,
    },
    {
        title: "news message",
        answers: [""],
        creator: "Ryan Pitt",
        message: "It was very very helpful, thank you.",
        isApproved: true,
        sentTime: 1761032776476,
    },
    {
        title: "Thanks message",
        answers: ["We’re glad you’re satisfied.", "It’s an honor for us."],
        creator: "Tyler Rake",
        message: "Really thank you for this product with this amazing price",
        isApproved: false,
        sentTime: 1761032776476,
    },
    {
        title: "Thanks message",
        answers: ["We’re glad you’re satisfied.", "It’s an honor for us."],
        creator: "Tyler Rake",
        message: "Really thank you for this product with this amazing price",
        isApproved: false,
        sentTime: 1761032776476,
    },
    {
        title: "news message",
        answers: [""],
        creator: "Ryan Pitt",
        message: "It was very very helpful, thank you.",
        isApproved: true,
        sentTime: 1761032776476,
    },
    {
        title: "Thanks message",
        answers: ["We’re glad you’re satisfied.", "It’s an honor for us."],
        creator: "Tyler Rake",
        message: "Really thank you for this product with this amazing price",
        isApproved: false,
        sentTime: 1761032776476,
    },
]

const notifications = [
    "Alex Morgan sent comment for ASUS TUF F15",
    "Alex Morgan sent comment for ASUS TUF F15",
    "Alex Morgan sent comment for ASUS TUF F15",
    "Alex Morgan sent comment for ASUS TUF F15",
    "Alex Morgan sent comment for ASUS TUF F15",
    "Alex Morgan sent comment for ASUS TUF F15",
    "Alex Morgan sent comment for ASUS TUF F15",
    "Alex Morgan sent comment for ASUS TUF F15",
    "Alex Morgan sent comment for ASUS TUF F15",
    "Alex Morgan sent comment for ASUS TUF F15",
]
type SortCommentType = "Default" | "Sort by newest" | "Sort by oldest" | "Sort by read" | "Sort by unread"
const sortItems: SortCommentType[] = ["Sort by newest", "Sort by oldest", "Sort by read", "Sort by unread"]

type FilterCommentType =
    "All"
    | "Filter by main comments"
    | "Filter by answer comments"
    | "Filter by approved comments"
    | "Filter by unapproved comments"
const filterItems: FilterCommentType[] = ["Filter by main comments", "Filter by answer comments", "Filter by approved comments", "Filter by unapproved comments"]

const Comments: FC = () => {
    const [query, setQuery] = useSearchParams()

    // Search, Sort, Filter States :
    const [inputSearch, setInputSearch] = useState(getDefaultValue("search") as string)
    const [filterComment, setFilterComment] = useState<FilterCommentType>(getDefaultValue("filter") as FilterCommentType)
    const [sortComment, setSortComment] = useState<SortCommentType>(getDefaultValue("sort") as SortCommentType)

    // Show menu mobile comment :
    const [isShowCommentOption, setIsShowCommentOption] = useState(false)
    const [openedId, setOpenedId] = useState<number>(-1)

    // Comments 10 :
    const [comments10, setComments10] = useState<CommentType[]>(getDefaultValue("comments10") as CommentType[])

    // Is Show 10 Comments :
    const [isShow10Comments, setIsShow10Comments] = useState(false)

    // Modals States :
    const [isShowAnswersModal, setIsShowAnswersModal] = useState(false)
    const [isShowMessageModal, setIsShowMessageModal] = useState(false)
    const [isShowInfoModal, setIsShowInfoModal] = useState(false)
    const [isShowChangeStateModal, setIsShowChangeStateModal] = useState(false)
    const [isShowRemoveModal, setIsShowRemoveModal] = useState(false)

    // Current Comment :
    const [currentComment, setCurrentComment] = useState<CommentType | null>(null)

    const searchHandler = () => {
        query.set("search", inputSearch)
        query.set("sort", sortComment)
        query.set("filter", filterComment)

        setQuery(query)
    }

    const show10Comments = () => {
        setIsShow10Comments(false)

        setTimeout(() => {
            setIsShow10Comments(true)
        }, 500)
    }

    function getDefaultValue(inputType: InputType): (string | CommentType[] | FilterCommentType | SortCommentType) {
        switch (inputType) {
            case "search": {
                return query.get("search") || ""
            }
            case "comments10": {
                const page = query.get("page") || 0
                const pageNumber: number = Boolean(!page || isNaN(+page)) ? 1 : +page
                return getCommentsByPage(pageNumber)
            }
            case "filter": {
                const filter = query.get("filter") || ""
                const defaultFilter: FilterCommentType = "All"

                if (filterItems.some(filterItem => filterItem === filter)) {
                    return filter
                }

                return defaultFilter
            }
            case "sort": {
                const sort = query.get("sort") || ""
                const defaultSort: SortCommentType = "Default"

                if (sortItems.some(sortItem => sortItem === sort)) {
                    return sort
                }

                return defaultSort
            }
        }
    }

    function getCommentsByPage(page: number): CommentType[] {
        const from = (page - 1) * 10
        const to = from + 10

        return comments.slice(from, to)
    }

    const changeStateCommentOption = (event: React.MouseEvent, index: number) => {
        event.stopPropagation()
        setOpenedId(index)
        setIsShowCommentOption(prev => !prev)
    }

    const changePageAndItems = (newPage: number) => {
        query.set("page", newPage.toString())
        setQuery(query)

        show10Comments()
        setComments10(getDefaultValue("comments10") as CommentType[])
    }

    const getTimeAndDate = (time: number) => {
        const date = new Date(time)
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const day = date.getDate().toString().padStart(2, "0")

        let hours = date.getHours()       // 0-23
        const minutes = date.getMinutes().toString().padStart(2, "0")
        const ampm = hours >= 12 ? "PM" : "AM"
        hours = hours % 12
        if (hours === 0) hours = 12   // 12-hour format
        const timeString = `${hours}:${minutes} ${ampm}`

        return (
            <>
                <span>{`${day}-${month}-${year}`}</span>
                <span>{timeString}</span>
            </>
        )
    }

    const getPage = (): number => {
        const page = query.get("page") || 0

        if (!page || isNaN(+page)) {
            return 0
        }

        return +page - 1
    }

    const removeComment = () => {

    }

    const changeApproveState = () => {
        console.log(currentComment)
    }

    const showModal = (event: React.MouseEvent, setShow: Dispatch<SetStateAction<boolean>>, comment: CommentType) => {
        event.stopPropagation()

        setIsShowCommentOption(false) // Mobile Option State
        setCurrentComment(comment) // // Current comment
        setShow(true)
    }

    const answer = (answerMessage: string) => {
        console.log(`answer :\n${answerMessage}`)
    }

    useEffect(() => {
        show10Comments()

        // Close Comment Option :
        const closeCommentOption = () => {
            setIsShowCommentOption(false)
        }

        window.addEventListener("click", closeCommentOption)

        return () => window.removeEventListener("click", closeCommentOption)
    }, [])

    return (
        <>
            <Modal type="detail" show={isShowInfoModal} setShow={setIsShowInfoModal} text={""} doYouHaveChildren={true}>
                <div className="info-wrapper flex flex-col gap-4 mt-4">
                    <div
                        className="row-info grid grid-cols-[90px_160px] ap-2 items-center bg-gray-300 rounded-md pl-1 py-2">
                        <span className="label">Creator :</span>
                        <span className="value truncate">{currentComment?.creator}</span>
                    </div>
                    <div
                        className="row-info grid grid-cols-[90px_160px] gap-2 items-center bg-gray-300 rounded-md pl-1 py-2">
                        <span className="label">Sent time :</span>
                        <span
                            className="value flex gap-1">{currentComment?.sentTime ? getTimeAndDate(currentComment?.sentTime) : ""}</span>
                    </div>
                    <div
                        className="row-info grid grid-cols-[90px_160px] gap-2 items-center bg-gray-300 rounded-md pl-1 py-2">
                        <span className="label">Creator :</span>
                        <span className="value truncate">{currentComment?.creator}</span>
                    </div>
                </div>
            </Modal>
            <Modal doYouHaveChildren={true} text="" type="detail" show={isShowMessageModal}
                   setShow={setIsShowMessageModal}>
                <p className="text-justify rounded-md p-1.5 dark:text-white">{currentComment?.message}</p>
            </Modal>
            <Modal type="agree" show={isShowRemoveModal} setShow={setIsShowRemoveModal} agreeFunction={removeComment}
                   question="Are you sure you want to remove this comment ?" yesText="Yes, remove" noText="No"/>

            <Modal type="agree" show={isShowChangeStateModal} setShow={setIsShowChangeStateModal}
                   agreeFunction={changeApproveState}
                   question={`Are you sure you want to ${currentComment?.isApproved ? "reject" : "approve"} this comment ?`}
                   yesText={`Yes, ${currentComment?.isApproved ? "reject" : "approve"}`} noText="No"
                   noRedBtn={!currentComment?.isApproved}/>
            <InputModal show={isShowAnswersModal} setShow={setIsShowAnswersModal} yesButtonText="Answer"
                        noButtonText="Back"
                        editType="ANSWER-TICKET" item="" editFunc={answer}/>

            <div className="w-full px-[1.5px] sm:px-3 rounded-md bg-white dark:bg-zinc-700 py-5 dark:text-white">
                <h3 className="font-bold text-2xl text-center mb-6">Comments Management</h3>

                <div className="comments-management">
                    <SearchBar inputSearch={inputSearch} setInputSearch={setInputSearch} search={searchHandler}
                               query={query}
                               setQuery={setQuery} notifications={notifications}/>
                    <div className="comments-sort-filter flex items-center justify-center gap-5 flex-wrap">
                        <SelectBox items={filterItems} defaultItem={filterComment} setDefaultItem={setFilterComment}
                                   placeholder="filter comments"/>
                        <SelectBox items={sortItems} defaultItem={sortComment} setDefaultItem={setSortComment}
                                   placeholder="sort comments"/>
                    </div>
                </div>

                <div className="comments flex flex-col mt-[50px] box-shadow w-fit mx-auto rounded-md">
                    <div className="comment-header grid items-center text-sm text-center text-shadow h-[60px]
                grid-cols-[60px_130px_105px]
                from-400:grid-cols-[60px_150px_105px]
                from-500:grid-cols-[60px_150px_100px_105px]
                sm:grid-cols-[60px_150px_100px_85px_170px]
                md:grid-cols-[60px_150px_100px_150px_85px_170px]
                lg:grid-cols-[60px_200px_100px_200px_160px_170px]
                ">
                        <span className="text-xs">Comment number</span>
                        <span
                            className="border-l-solid border-l-black/50 dark:border-l-white/50 border-l-[1.5px] h-full flex items-center justify-center">Comment title</span>
                        <span
                            className="border-l-solid hidden from-500:flex border-l-black/50 dark:border-l-white/50 border-l-[1.5px] h-full justify-center items-center">Comment status</span>
                        <span
                            className="border-l-solid hidden md:flex border-l-black/50 dark:border-l-white/50 border-l-[1.5px] h-full justify-center items-center">Comment creator</span>
                        <span
                            className="border-l-solid flex border-l-black/50 dark:border-l-white/50 border-l-[1.5px] h-full items-center justify-center">Comment sent time</span>
                        <span
                            className="border-l-solid hidden sm:flex border-l-black/50 dark:border-l-white/50 border-l-[1.5px] h-full items-center justify-center">Comment actions</span>
                    </div>
                    {
                        isShow10Comments
                            ?
                            comments10.map((comment, index) => (
                                <div key={index} className={`comment relative h-[60px] grid items-center border-t-solid border-t-black/50 dark:border-t-white/50 border-t-[1.5px]
                grid-cols-[60px_130px_105px]
                from-400:grid-cols-[60px_150px_105px]
                from-500:grid-cols-[60px_150px_100px_105px]
                sm:grid-cols-[60px_150px_100px_85px_170px]
                md:grid-cols-[60px_150px_100px_150px_85px_170px]
                lg:grid-cols-[60px_200px_100px_200px_160px_170px]
                `}>
                                    <div
                                        className={`comment-approved ${comment.isApproved ? "" : "hidden"} absolute top-0 right-0 left-0 bottom-0 m-auto w-fit h-fit text-sm rotate-[10deg] rounded-md bg-green-700/80 text-white p-2`}>Comment
                                        Approved
                                    </div>
                                    <div
                                        className="comment-number text-sm w-[50px] h-[50px] mx-auto rounded-md bg-gray-500 text-white text-center leading-[50px]">{(index + 1).toLocaleString()}</div>
                                    <div
                                        className="comment-title border-l-solid border-l-black/50 dark:border-l-white/50 border-l-[1.5px] h-[60px] leading-[60px] px-[1.5px] truncate">{comment.title}</div>
                                    <div
                                        className="comment-status hidden from-500:block border-l-solid border-l-black/50 dark:border-l-white/50 border-l-[1.5px] h-[60px] leading-[60px] text-center">{comment.isApproved ? "Approved" : "Unapproved"}</div>
                                    <div
                                        className="comment-creator hidden md:block border-l-solid border-l-black/50 dark:border-l-white/50 border-l-[1.5px] h-[60px] leading-[60px] px-[1.5px] truncate">{comment.creator}</div>
                                    <div
                                        className="comment-sentTime h-full flex flex-col justify-center lg:flex-row pl-1.5 items-start sm:items-center text-sm lg:text-base gap-1.5 border-l-solid border-l-black/50 dark:border-l-white/50 border-l-[1.5px] lg:h-[60px] lg:leading-[60px] sm:px-[1.5px]">
                                        {getTimeAndDate(comment.sentTime)}
                                    </div>
                                    <div
                                        className="comment-buttons hidden sm:flex border-l-solid border-l-black/50 dark:border-l-white/50 border-l-[1.5px] h-[60px] leading-[60px] px-[1.5px] items-center justify-center gap-2">
                                        <div className="btn-wrapper relative group">
                                            <FaTrashAlt
                                                onClick={event => showModal(event, setIsShowRemoveModal, comment)}
                                                className="w-5 h-5 cursor-pointer"/>
                                            <IoTriangle
                                                className="w-7 h-7 group-hover:opacity-100 group-hover:visible invisible opacity-0 transition rotate-[30deg] absolute top-full right-[40%] text-gray-600"/>
                                            <span
                                                className="tooltip-btn z-10 group-hover:opacity-100 group-hover:visible invisible opacity-0 transition absolute top-full right-[80%] mt-[18px] rounded-md text-white bg-gray-600 whitespace-nowrap text-sm p-2">Remove comment</span>
                                        </div>
                                        <div className="btn-wrapper relative group md:hidden">
                                            <FaInfoCircle
                                                onClick={event => showModal(event, setIsShowInfoModal, comment)}
                                                className="w-5 h-5 cursor-pointer"/>
                                            <IoTriangle
                                                className="w-7 h-7 group-hover:opacity-100 group-hover:visible invisible opacity-0 transition rotate-[30deg] absolute top-full right-[40%] text-gray-600"/>
                                            <span
                                                className="tooltip-btn z-10 group-hover:opacity-100 group-hover:visible invisible opacity-0 transition absolute top-full right-[80%] mt-[18px] rounded-md text-white bg-gray-600 whitespace-nowrap text-sm p-2">Info comment</span>
                                        </div>
                                        {
                                            comment.isApproved
                                                ?
                                                <div className="btn-wrapper relative group">
                                                    <IoCloseSharp
                                                        onClick={event => showModal(event, setIsShowChangeStateModal, comment)}
                                                        className="w-5 h-5 cursor-pointer"/>
                                                    <IoTriangle
                                                        className="w-7 h-7 group-hover:opacity-100 group-hover:visible invisible opacity-0 transition rotate-[30deg] absolute top-full right-[40%] text-gray-600"/>
                                                    <span
                                                        className="tooltip-btn z-10 group-hover:opacity-100 group-hover:visible invisible opacity-0 transition absolute top-full right-[80%] mt-[18px] rounded-md text-white bg-gray-600 whitespace-nowrap text-sm p-2">Reject comment</span>
                                                </div>
                                                :
                                                <div className="btn-wrapper relative group">
                                                    <FaCheck
                                                        onClick={event => showModal(event, setIsShowChangeStateModal, comment)}
                                                        className="w-5 h-5 cursor-pointer"/>
                                                    <IoTriangle
                                                        className="w-7 h-7 group-hover:opacity-100 group-hover:visible invisible opacity-0 transition rotate-[30deg] absolute top-full right-[40%] text-gray-600"/>
                                                    <span
                                                        className="tooltip-btn z-10 group-hover:opacity-100 group-hover:visible invisible opacity-0 transition absolute top-full right-[80%] mt-[18px] rounded-md text-white bg-gray-600 whitespace-nowrap text-sm p-2">Approve comment</span>
                                                </div>
                                        }
                                        <div className="btn-wrapper relative group">
                                            <FaMessage
                                                onClick={event => showModal(event, setIsShowMessageModal, comment)}
                                                className="w-5 h-5 cursor-pointer"/>
                                            <IoTriangle
                                                className="w-7 h-7 group-hover:opacity-100 group-hover:visible invisible opacity-0 transition rotate-[30deg] absolute top-full right-[40%] text-gray-600"/>
                                            <span
                                                className="tooltip-btn z-10 group-hover:opacity-100 group-hover:visible invisible opacity-0 transition absolute top-full right-[80%] mt-[18px] rounded-md text-white bg-gray-600 whitespace-nowrap text-sm p-2">Comment message</span>
                                        </div>
                                        <div className="btn-wrapper relative group">
                                            <MdQuestionAnswer
                                                onClick={event => showModal(event, setIsShowAnswersModal, comment)}
                                                className="w-5 h-5 cursor-pointer"/>
                                            <IoTriangle
                                                className="w-7 h-7 group-hover:opacity-100 group-hover:visible invisible opacity-0 transition rotate-[30deg] absolute top-full right-[40%] text-gray-600"/>
                                            <span
                                                className="tooltip-btn z-10 group-hover:opacity-100 group-hover:visible invisible opacity-0 transition absolute top-full right-[80%] mt-[18px] rounded-md text-white bg-gray-600 whitespace-nowrap text-sm p-2">Answer comment</span>
                                        </div>
                                    </div>

                                    <HiDotsVertical
                                        onClick={event => changeStateCommentOption(event, index)}
                                        className="absolute top-1 right-[2px] w-5 h-5 sm:hidden"/>
                                    <div
                                        className={`mobile-comment-menu sm:hidden transition ${(isShowCommentOption && index === openedId) ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-10"} z-10 absolute -top-[170px] right-0 flex flex-col overflow-hidden rounded-md bg-gray-500 text-white`}>
                                        <span
                                            onClick={event => showModal(event, setIsShowRemoveModal, comment)}
                                            className="text-center text-sm h-8 leading-8 px-1  active:bg-gray-600 transition ">Remove comment</span>
                                        <span
                                            onClick={event => showModal(event, setIsShowInfoModal, comment)}
                                            className="text-center text-sm h-8 leading-8 px-1  active:bg-gray-600 transition ">Show detail</span>
                                        <span
                                            onClick={event => showModal(event, setIsShowChangeStateModal, comment)}
                                            className="text-center text-sm h-8 leading-8 px-1  active:bg-gray-600 transition ">{comment.isApproved ? "Reject" : "Approve"} comment</span>
                                        <span
                                            onClick={event => showModal(event, setIsShowMessageModal, comment)}
                                            className="text-center text-sm h-8 leading-8 px-1  active:bg-gray-600 transition ">Show message</span>
                                        <span
                                            onClick={event => showModal(event, setIsShowAnswersModal, comment)}
                                            className="text-center text-sm h-8 leading-8 px-1  active:bg-gray-600 transition ">Answer comment</span>
                                    </div>
                                </div>
                            ))
                            :
                            Array.from({length: 5})
                                .map((_, index) => (
                                    <div key={index} className="comment-shield grid items-center h-[60px] border-t-solid border-t-black/50 dark:border-t-white/50 border-t-[1.5px]
                grid-cols-[60px_130px_105px]
                from-400:grid-cols-[60px_150px_105px]
                from-500:grid-cols-[60px_150px_100px_105px]
                sm:grid-cols-[60px_150px_100px_85px_170px]
                md:grid-cols-[60px_150px_100px_150px_85px_170px]
                lg:grid-cols-[60px_200px_100px_200px_160px_170px]
                ">
                    <span
                        className="shield-number mx-auto w-[50px] h-[50px] bg-shimmer dark:bg-dark-shimmer rounded-md shimmer-animation"></span>
                                        <span
                                            className="border-l-black/50 dark:border-l-white/50 border-l-[1.5px] h-full flex items-center justify-center">
                        <span
                            className="bg-shimmer dark:bg-dark-shimmer rounded-sm shimmer-animation h-4 w-3/4 block"></span>
                    </span>
                                        <span
                                            className="border-l-black/50 dark:border-l-white/50 border-l-[1.5px] h-full flex items-center justify-center">
                        <span
                            className="bg-shimmer dark:bg-dark-shimmer rounded-sm shimmer-animation h-4 w-3/4 block"></span>
                    </span>
                                        <span
                                            className="border-l-black/50 dark:border-l-white/50 border-l-[1.5px] h-full hidden from-500:flex items-center justify-center">
                        <span
                            className="bg-shimmer dark:bg-dark-shimmer rounded-sm shimmer-animation h-4 w-3/4 block"></span>
                    </span>
                                        <span
                                            className="border-l-black/50 dark:border-l-white/50 border-l-[1.5px] h-full hidden sm:flex items-center justify-center">
                        <span
                            className="bg-shimmer dark:bg-dark-shimmer rounded-sm shimmer-animation h-4 w-3/4 block"></span>
                    </span>
                                        <span
                                            className="border-l-black/50 hidden dark:border-l-white/50 border-l-[1.5px] h-full md:flex items-center justify-center">
                        <span
                            className="bg-shimmer dark:bg-dark-shimmer rounded-sm shimmer-animation h-4 w-3/4 block"></span>
                    </span>
                                    </div>
                                ))
                    }
                </div>
                <div className="pages max-w-[300px] mx-auto mt-5">
                    <SwiperWithButtons slides={
                        Array.from({length: Math.ceil(comments.length / 10)})
                            .map((_, index) => (
                                <button
                                    onClick={() => changePageAndItems(index + 1)}
                                    key={index}
                                    className={`w-9 h-9 ${query.get("page") === (index + 1).toString() ? "bg-orange-700" : ""} shrink-0 text-sm font-bold bg-orange-500 text-white flex items-center justify-center hover:bg-orange-700 transition cursor-pointer rounded-full`}>{index + 1}</button>
                            ))
                    } initialSlide={getPage()}/>
                </div>
            </div>
        </>
    )
}

export default Comments