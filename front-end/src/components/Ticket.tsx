import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {IoMdEye} from "react-icons/io";
import {AiFillCloseCircle} from "react-icons/ai";
import {RiQuestionAnswerFill} from "react-icons/ri";
import {IoTriangle} from "react-icons/io5";
import {FaEllipsisVertical} from "react-icons/fa6";
import {TicketType} from "./Ticket.T";
import {FaTrashAlt} from "react-icons/fa";

type TicketProps = {
    number: number,
    openNumber: number,
    setOpenNumber: Dispatch<SetStateAction<number>>,
    openModal: (event: React.MouseEvent, set: Dispatch<SetStateAction<boolean>>) => void,
    setShowTicketMessageModal: Dispatch<SetStateAction<boolean>>,
    setCurrentTicketMessage: Dispatch<SetStateAction<string>>,
    setShowAgreeRemove: Dispatch<SetStateAction<boolean>>,
    setShowDetailModal: Dispatch<SetStateAction<boolean>>,
    setShowAnswer: Dispatch<SetStateAction<boolean>>,
    setShowClose: Dispatch<SetStateAction<boolean>>,
    ticket: TicketType,
    setCurrentItem: Dispatch<SetStateAction<TicketType | null>>
}

const Ticket: FC<TicketProps> = (
    {
        openNumber,
        setOpenNumber,
        number,
        openModal,
        setCurrentTicketMessage,
        setShowTicketMessageModal,
        setShowDetailModal,
        ticket,
        setCurrentItem,
        setShowAgreeRemove,
        setShowAnswer,
        setShowClose
    }
) => {
    const switchTicketDetailMobile = (event: React.MouseEvent) => {
        event.stopPropagation()
        setOpenNumber(prev => prev === number ? -1 : number)
    }

    useEffect(() => {
        const switchTicketDetail = () => {
            setOpenNumber(-1)
        }

        window.addEventListener("click", switchTicketDetail)


        return () => window.removeEventListener("click", switchTicketDetail)
    }, [])

    return (
        <div className="ticket relative grid max-w-[638px] mx-auto sm:text-center items-center h-[70px] sm:px-2 rounded-md border-solid border-black/50 dark:border-white/50 border-[1px]
                    grid-cols-[60px_110px_110px]
                    sm:grid-cols-[60px_150px_120px_60px_80px_120px]
                    ">
                        <span
                            className="ticket-number m-auto sm:m-0 bg-gray-600 dark:bg-gray-200 dark:text-black text-white text-sm flex items-center justify-center rounded-md w-[50px] h-[50px]">{number.toLocaleString()}</span>
            <span
                className="ticket-title w-full overflow-hidden whitespace-nowrap text-ellipsis border-l border-solid border-black/50 dark:border-white/50 leading-[70px] block px-1">{ticket.title}</span>
            <span
                className="ticket-creator block w-full overflow-hidden whitespace-nowrap text-ellipsis border-l border-solid border-black/50 dark:border-white/50 leading-[70px] px-1">{ticket.creatorName}</span>
            <span
                className="ticket-status hidden sm:block w-full border-l border-solid border-black/50 dark:border-white/50 leading-[70px] px-1">{ticket.ticketStatus}</span>
            <span
                className="ticket-department hidden sm:block w-full border-l border-solid border-black/50 dark:border-white/50 leading-[70px] px-1">{ticket.department}</span>
            <span
                className="ticket-title hidden sm:flex text-ellipsis border-l border-solid border-black/50 dark:border-white/50 h-full items-center justify-center gap-1 px-1">
                            <button
                                onClick={event => {
                                    setCurrentTicketMessage(ticket.body)
                                    openModal(event, setShowTicketMessageModal)
                                }}
                                className="btn-wrapper relative group">
                                <IoMdEye className="w-5 h-5 transition hover:scale-[1.2] cursor-pointer"/>
                                <IoTriangle
                                    className="w-6 h-6 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition rotate-30 text-gray-500 z-20 absolute top-[90%] right-[50%]"/>
                                    <span
                                        className="absolute text-white top-[155%] right-[80%] opacity-0 invisible group-hover:visible group-hover:opacity-100 transition z-30 bg-gray-500 whitespace-nowrap rounded-md p-2">Show message</span>
                            </button>
                            <button
                                onClick={event => openModal(event, setShowAgreeRemove)}
                                className="btn-wrapper relative group">
                                 <FaTrashAlt className="w-5 h-5 transition hover:scale-[1.2] cursor-pointer"/>
                                <IoTriangle
                                    className="w-6 h-6 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition rotate-30 text-gray-500 z-20 absolute top-[90%] right-[50%]"/>
                                    <span
                                        className="absolute text-white top-[155%] right-[80%] opacity-0 invisible group-hover:visible group-hover:opacity-100 transition z-30 bg-gray-500 whitespace-nowrap rounded-md p-2">Remove ticket</span>
                            </button>
                            <button
                                onClick={event => {
                                    openModal(event, setShowAnswer)
                                }}
                                className="btn-wrapper relative group">
                                <RiQuestionAnswerFill className="w-5 h-5 transition hover:scale-[1.2] cursor-pointer"/>
                                   <IoTriangle
                                       className="w-6 h-6 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition rotate-30 text-gray-500 z-20 absolute top-[90%] right-[50%]"/>
                                    <span
                                        className="absolute text-white top-[155%] right-[80%] opacity-0 invisible group-hover:visible group-hover:opacity-100 transition z-30 bg-gray-500 whitespace-nowrap rounded-md p-2">Answer ticket</span>
                            </button>
                            <button
                                onClick={event => openModal(event, setShowClose)}
                                className="btn-wrapper relative group">
                                <AiFillCloseCircle className="w-5 h-5 transition hover:scale-[1.2] cursor-pointer"/>
                                <IoTriangle
                                    className="w-6 h-6 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition rotate-30 text-gray-500 z-20 absolute top-[90%] right-[50%]"/>
                                    <span
                                        className="absolute top-[155%] right-[80%] opacity-0 invisible group-hover:visible group-hover:opacity-100 transition z-30 bg-gray-500 text-white whitespace-nowrap rounded-md p-2">Close ticket</span>
                            </button>
                        </span>
            <span className='absolute top-1 right-1 block  sm:hidden'>
                            <FaEllipsisVertical
                                onClick={switchTicketDetailMobile}
                                className="w-5 h-5 cursor-pointer"/>
                            <span
                                className={`absolute ${(openNumber === number) ? "visible opacity-100" : "invisible opacity-0"} transition bottom-full text-sm right-full bg-gray-500 dark:bg-gray-700 text-white rounded-md flex flex-col`}>
                                <span
                                    onClick={event => openModal(event, setShowAgreeRemove)}
                                    className="whitespace-nowrap p-1.5 border-b-[1px] border-b-solid border-b-black/20 dark:border-b-white/20 hover:bg-gray-800">Remove ticket</span>
                                <span
                                    onClick={event => {
                                        setCurrentTicketMessage(ticket.body)
                                        openModal(event, setShowTicketMessageModal)
                                    }}
                                    className="whitespace-nowrap p-1.5 border-b-[1px] border-b-solid border-b-black/20 dark:border-b-white/20 hover:bg-gray-800">Show message</span>
                                <span
                                    onClick={event => openModal(event, setShowClose)}
                                    className="whitespace-nowrap p-1.5 border-b-[1px] border-b-solid border-b-black/20 dark:border-b-white/20 hover:bg-gray-800">Close ticket</span>
                                <span
                                    onClick={event => {
                                        setCurrentItem(ticket)
                                        openModal(event, setShowDetailModal)
                                    }}
                                    className="whitespace-nowrap p-1.5 border-b-[1px] border-b-solid border-b-black/20 dark:border-b-white/20 hover:bg-gray-800">Detail ticket</span>
                                <span
                                    onClick={event => openModal(event, setShowAnswer)}
                                    className="whitespace-nowrap p-1.5 hover:bg-gray-800">Answer ticket</span>
                            </span>
                        </span>
        </div>
    )
}

export default Ticket