import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import SearchBar from "../../../components/SearchBar";
import {useSearchParams} from "react-router-dom";
import SelectBox from "../../../components/SelectBox";
import {FaArrowDown} from "react-icons/fa";
import Modal from "../../../components/Modal";
import InputModal from "../../../components/InputModal";
import SwiperWithButtons from "../../../components/SwiperWithButtons";
import Ticket from "../../../components/Ticket";
import {TicketType} from "../../../components/Ticket.T";

type FilterType =
    "Default"
    | "Filter by financial department"
    | "Filter by sales department"
    | "Filter by open tickets"
    | "Filter by close tickets"

type SortType = "Newest" | "Oldest"
type QueryType = "search" | "sort" | "filter" | "tickets" | "page"

const Tickets: FC = () => {
    // Searchbar Props :
    const [query, setQuery] = useSearchParams()
    const [inputSearch, setInputSearch] = useState(getDefaultQuery("search") as string)
    const notifications = [
        "Alex Morgan sent ticket in Financial department",
        "Tyler Rake sent ticket in Products department",
        "Alex Morgan sent ticket in Financial department",
        "Tyler Rake sent ticket in Products department",
        "Alex Morgan sent ticket in Financial department",
        "Tyler Rake sent ticket in Products department",
        "Alex Morgan sent ticket in Financial department",
        "Tyler Rake sent ticket in Products department",
        "Alex Morgan sent ticket in Financial department",
        "Tyler Rake sent ticket in Products department",
        "Alex Morgan sent ticket in Financial department",
        "Tyler Rake sent ticket in Products department",
        "Alex Morgan sent ticket in Financial department",
        "Tyler Rake sent ticket in Products department",
        "Alex Morgan sent ticket in Financial department",
        "Tyler Rake sent ticket in Products department",
        "Alex Morgan sent ticket in Financial department",
        "Tyler Rake sent ticket in Products department",
        "Alex Morgan sent ticket in Financial department",
        "Tyler Rake sent ticket in Products department",
        "Alex Morgan sent ticket in Financial department",
        "Tyler Rake sent ticket in Products department",
        "Alex Morgan sent ticket in Financial department",
        "Tyler Rake sent ticket in Products department",
    ]

    // Filter & Sort Props :
    const filterItems: FilterType[] = [
        "Filter by close tickets", "Filter by open tickets",
        "Filter by financial department", "Filter by sales department"
    ]
    const [filter, setFilter] = useState<FilterType>(getDefaultQuery("filter") as FilterType)
    const sortItems: SortType[] = ["Newest", "Oldest"]
    const [sort, setSort] = useState<SortType>(getDefaultQuery("sort") as SortType)

    // Tickets :
    const tickets: TicketType[] = [
        {
            title: "How to sale",
            body: "I wanted to buy laptop asus tuf gaming z509 but I couldn't",
            department: "Technical",
            ticketStatus: "CLOSE",
            creatorName: "Alex Morgan"
        },
        {
            title: "How to sale",
            body: "I wanted to buy laptop asus tuf gaming z509 but I couldn't",
            department: "Sales",
            ticketStatus: "OPEN",
            creatorName: "Alex Morgan"
        },
        {
            title: "How to sale",
            body: "I wanted to buy laptop asus tuf gaming z509 but I couldn't",
            department: "Sales",
            ticketStatus: "OPEN",
            creatorName: "Alex Morgan"
        },
        {
            title: "How to sale",
            body: "I wanted to buy laptop asus tuf gaming z509 but I couldn't",
            department: "Sales",
            ticketStatus: "OPEN",
            creatorName: "Alex Morgan"
        },
        {
            title: "How to sale",
            body: "I wanted to buy laptop asus tuf gaming z509 but I couldn't",
            department: "Sales",
            ticketStatus: "OPEN",
            creatorName: "Alex Morgan"
        },
        {
            title: "How to sale",
            body: "I wanted to buy laptop asus tuf gaming z509 but I couldn't",
            department: "Sales",
            ticketStatus: "OPEN",
            creatorName: "Alex Morgan"
        },
        {
            title: "How to sale",
            body: "I wanted to buy laptop asus tuf gaming z509 but I couldn't",
            department: "Sales",
            ticketStatus: "OPEN",
            creatorName: "Alex Morgan"
        },
        {
            title: "How to sale",
            body: "I wanted to buy laptop asus tuf gaming z509 but I couldn't",
            department: "Sales",
            ticketStatus: "OPEN",
            creatorName: "Alex Morgan"
        },
        {
            title: "How to sale",
            body: "I wanted to buy laptop asus tuf gaming z509 but I couldn't",
            department: "Sales",
            ticketStatus: "OPEN",
            creatorName: "Alex Morgan"
        },
        {
            title: "How to sale",
            body: "I wanted to buy laptop asus tuf gaming z509 but I couldn't",
            department: "Sales",
            ticketStatus: "OPEN",
            creatorName: "Alex Morgan"
        },
        {
            title: "How to sale",
            body: "I wanted to buy laptop asus tuf gaming z509 but I couldn't",
            department: "Sales",
            ticketStatus: "OPEN",
            creatorName: "Alex Morgan"
        },
        {
            title: "How to sale",
            body: "I wanted to buy laptop asus tuf gaming z509 but I couldn't",
            department: "Sales",
            ticketStatus: "OPEN",
            creatorName: "Alex Morgan"
        },
        {
            title: "How to sale",
            body: "I wanted to buy laptop asus tuf gaming z509 but I couldn't",
            department: "Sales",
            ticketStatus: "OPEN",
            creatorName: "Alex Morgan"
        },
        {
            title: "How to sale",
            body: "I wanted to buy laptop asus tuf gaming z509 but I couldn't",
            department: "Sales",
            ticketStatus: "OPEN",
            creatorName: "Alex Morgan"
        },
        {
            title: "How to sale",
            body: "I wanted to buy laptop asus tuf gaming z509 but I couldn't",
            department: "Sales",
            ticketStatus: "OPEN",
            creatorName: "Alex Morgan"
        },
        {
            title: "How to sale",
            body: "I wanted to buy laptop asus tuf gaming z509 but I couldn't",
            department: "Sales",
            ticketStatus: "OPEN",
            creatorName: "Alex Morgan"
        },
        {
            title: "How to sale",
            body: "I wanted to buy laptop asus tuf gaming z509 but I couldn't",
            department: "Sales",
            ticketStatus: "OPEN",
            creatorName: "Alex Morgan"
        },
    ]
    const [tickets10, setTickets10] = useState<TicketType[]>(getDefaultQuery("tickets") as TicketType[])

    // pagination :
    const pageNumbers = Math.ceil(tickets.length / 10)

    // Active Open Detail Ticket Mobile :
    const [number, setNumber] = useState(-1)

    // Agree Modal For Close Ticket
    const [isShowAgreeClose, setIsShowAgreeClose] = useState<boolean>(false)
    // Agree Modal For Remove Ticket
    const [isShowAgreeRemove, setIsShowAgreeRemove] = useState<boolean>(false)
    // Agree Modal For Message Ticket
    const [isShowMessageTicketModal, setIsShowMessageTicketModal] = useState(false)
    const [ticketMessage, setTicketMessage] = useState<string>("")
    // Answer Ticket Modal :
    const [isShowAnswerModal, setIsShowAnswerModal] = useState(false)
    // Agree Modal For Detail Ticket
    const [isShowDetailModal, setIsShowDetailModal] = useState(false)
    const [currentTicket, setCurrentTicket] = useState<TicketType | null>(null)

    // Ticket Operations

    const removeTicket = () => {
    }

    const closeTicket = () => {
    }

    // Ticket Operations

    const openModal = (event: React.MouseEvent, set: Dispatch<SetStateAction<boolean>>) => {
        event.stopPropagation()
        set(true)
    }

    const answerTicket = (answer: string) => {
        console.log(`answer => ${answer}`)
    }

    const searchHandler = () => {
        query.set("search", inputSearch)
        query.set("filter", filter)
        query.set("sort", sort)
        setQuery(query)
    }

    function getDefaultQuery(inputType: QueryType): string | TicketType[] | FilterType | SortType | number {
        switch (inputType) {
            case "search": {
                return query.get("search") || ""
            }
            case "filter": {
                const filter = query.get("filter") || ""

                if (filterItems.find(item => item === filter)) {
                    return filter as FilterType
                }
                return filterItems[0]
            }
            case "sort": {
                const sort = query.get("sort") || ""

                if (sortItems.find(item => sort === item)) {
                    return sort as SortType
                }

                return sortItems[0]
            }
            case "tickets": {
                const page = query.get("page") || null
                const pageNumber = page ? +page : 0
                let from = 0
                let to = 10

                if (!page || isNaN(+page)) {
                    query.set("page", "1")
                    return tickets.slice(from, to)
                }

                from = (pageNumber - 1) * 10
                to = from + 10
                return tickets.slice(from, to)
            }
            case "page": {
                const page = query.get("page") || 0

                if (!page || isNaN(+page)) {
                    query.set("page", "1")
                    return 1
                }

                return +page
            }
        }
    }

    const changePageAndItems = (newPage: number) => {
        // Page Change :
        query.set("page", newPage.toString())
        setQuery(query)

        // from and to change :
        const from = (newPage - 1) * 10
        const to = from + 10

        // Items Change :
        setTickets10(tickets.slice(from, to))
    }

    useEffect(() => {
        setQuery(query)
    }, [])

    return (
        <>
            <Modal type="agree" show={isShowAgreeRemove} setShow={setIsShowAgreeRemove} agreeFunction={removeTicket}
                   question="Are you sure you want to remove this ticket"
                   yesText="Yes, remove"
                   noText="No"/>

            <Modal type="agree" show={isShowAgreeClose} setShow={setIsShowAgreeClose} agreeFunction={closeTicket}
                   question="Are you sure you want to close this ticket"
                   yesText="Yes, close"
                   noText="No"/>

            <Modal doYouHaveChildren={false} type="detail" show={isShowMessageTicketModal}
                   setShow={setIsShowMessageTicketModal}
                   text={ticketMessage}>
                <p className="question font-bold text-lg dark:text-white text-center my-3">{ticketMessage}</p>
            </Modal>

            <InputModal show={isShowAnswerModal} setShow={setIsShowAnswerModal} yesButtonText="Answer"
                        noButtonText={"No"}
                        editType="ANSWER-TICKET" item="" editFunc={answerTicket}/>

            <Modal text="" doYouHaveChildren={true} type="detail" show={isShowDetailModal}
                   setShow={setIsShowDetailModal}>
                {
                    currentTicket
                        ?
                        <div
                            className="detail-wrapper mt-4 text-white font-bold grid justify-items-center items-center gap-y-4 grid-cols-[150px_150px]">
                            <span>Creator : </span>
                            <span>{currentTicket.creatorName}</span>
                            <span>Department : </span>
                            <span>{currentTicket.department}</span>
                        </div>
                        : null
                }
            </Modal>

            <div className="dark:text-white bg-white dark:bg-zinc-700 py-7">
                <h3 className="font-bold text-2xl px-3">Tickets Management</h3>
                <SearchBar inputSearch={inputSearch} setInputSearch={setInputSearch} search={searchHandler}
                           query={query}
                           setQuery={setQuery} notifications={notifications}/>

                <div className="tickets-management flex flex-col sm:flex-row items-center justify-center gap-5">
                    <div className="ticket-management-item flex flex-col lg:flex-row items-center gap-4">
                        <div className="flex flex-col lg:flex-row items-center gap-1">
                            <span>Filter tickets</span>
                            <FaArrowDown className="w-5 h-5 lg:-rotate-90"/>
                        </div>
                        <SelectBox items={filterItems} defaultItem={filter} setDefaultItem={setFilter}
                                   placeholder="Filter tickets"/>
                    </div>
                    <div className="ticket-management-item flex flex-col lg:flex-row items-center gap-4">
                        <div className="flex flex-col lg:flex-row items-center gap-1">
                            <span>Sort tickets</span>
                            <FaArrowDown className="w-5 h-5 lg:-rotate-90"/>
                        </div>
                        <SelectBox items={sortItems} defaultItem={sort} setDefaultItem={setSort}
                                   placeholder="Sort tickets"/>
                    </div>
                </div>

                <div className="tickets px-2">
                    <div className="tickets-wrapper mt-10 flex flex-col gap-6">
                        <div className="ticket-header">

                        </div>
                        {
                            tickets10.map((ticket, index) => (
                                <Ticket
                                    openNumber={number}
                                    setOpenNumber={setNumber}
                                    ticket={ticket}
                                    number={index + 1}
                                    setCurrentItem={setCurrentTicket}
                                    setShowDetailModal={setIsShowDetailModal}
                                    setShowAnswer={setIsShowAnswerModal}
                                    setShowAgreeRemove={setIsShowAgreeRemove}
                                    openModal={openModal}
                                    setCurrentTicketMessage={setTicketMessage}
                                    setShowClose={setIsShowAgreeClose}
                                    setShowTicketMessageModal={setIsShowMessageTicketModal}
                                    key={index}
                                />
                            ))
                        }
                    </div>

                    <div className="buttons max-w-[300px] mx-auto mt-5">
                        <SwiperWithButtons slides={
                            Array.from({length: pageNumbers})
                                .map((item, index) => (
                                    <button
                                        onClick={() => changePageAndItems(index + 1)}
                                        key={index}
                                        className={`w-9 h-9 ${query.get("page") === (index + 1).toString() ? "bg-orange-700" : ""} shrink-0 text-sm font-bold bg-orange-500 text-white flex items-center justify-center hover:bg-orange-700 transition-all ease-in-out duration-150 cursor-pointer rounded-full`}>{index + 1}</button>
                                ))
                        }/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tickets