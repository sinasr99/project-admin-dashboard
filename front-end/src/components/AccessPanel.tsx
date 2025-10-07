import React, {FC, useCallback, useContext, useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {IoHomeSharp} from "react-icons/io5";
import {FaBox, FaComments, FaMoon, FaSun, FaUsers} from "react-icons/fa";
import {IoMdMail} from "react-icons/io";
import {BiSolidOffer} from "react-icons/bi";
import {ThemeContext} from "../contextAPI/themeContext"
import {MdAccountBox} from "react-icons/md";

const AccessPanel: FC = () => {
    const path = useLocation().pathname
    const {theme, setTheme} = useContext(ThemeContext)
    const [top, setTop] = useState<number>(20)

    const accessPanelRef = useRef<HTMLDivElement>(null)

    const isDraggingRef = useRef(false);
    const offsetYRef = useRef(0);

    const switchTheme = useCallback(() => {
        if (theme === "Light") {
            setTheme("Dark")
        } else {
            setTheme("Light")
        }
    }, [setTheme, theme])

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        isDraggingRef.current = true;
        offsetYRef.current = e.clientY - top;
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDraggingRef.current) return;
        let newTop = e.clientY - offsetYRef.current;
        const panelHeight: number = accessPanelRef.current ? accessPanelRef.current.offsetHeight : 0;
        let maxTop = window.innerHeight - panelHeight
        if (newTop < 0) newTop = 10;
        if (newTop > maxTop) newTop = (maxTop - 10);

        setTop(newTop)
    }

    const handleMouseUp = () => {
        isDraggingRef.current = false
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [])

    return (
        <>
            <div
                ref={accessPanelRef}
                onMouseDown={handleMouseDown}
                style={{top: `${top}px`}}
                className={`hidden z-50 xs:flex box-shadow backdrop-blur-2xl fixed cursor-grab left-4 my-auto h-fit flex-col justify-center items-center gap-4 py-4 w-[65px] rounded-md bg-white dark:bg-zinc-700 pt-4`}>
                <Link to="/dashboard" className="group">
                 <span className="relative">
                    <IoHomeSharp
                        className={`w-8 h-8 ${"/dashboard" === path ? "text-orange-500" : "dark:text-white"}`}/>
                    <span
                        className={`absolute z-20 delay-100 ${"/dashboard" === path ? "" : "hover:bg-orange-500 hover:text-white group-hover:-right-[141px] group-hover:opacity-100 group-hover:visible"} opacity-0 invisible -right-[120px] transition-all ease-in-out duration-200 top-0 bottom-0 my-auto w-[125px] h-10 leading-10 text-center bg-white dark:bg-zinc-700 dark:text-white rounded-tr-md rounded-br-md`}>Home</span>
                </span>
                </Link>
                <Link to="/dashboard/users" className="group z-20">
                <span className="relative">
                    <FaUsers
                        className={`w-8 h-8 ${"/dashboard/users" === path ? "text-orange-500" : "dark:text-white"}`}/>
                    <span
                        className={`absolute box-shadow z-20 delay-100 ${"/dashboard/users" === path ? "" : "hover:bg-orange-500 hover:text-white group-hover:-right-[141px] group-hover:opacity-100 group-hover:visible"} opacity-0 invisible -right-[120px] transition-all ease-in-out duration-200 top-0 bottom-0 my-auto w-[125px] h-10 leading-10 text-center bg-white dark:bg-zinc-700 dark:text-white rounded-tr-md rounded-br-md`}>Users</span>
                </span>
                </Link>
                <Link to="/dashboard/products" className="group z-20">
                <span className="relative">
                     <FaBox
                         className={`w-8 h-8 ${"/dashboard/products" === path ? "text-orange-500" : "dark:text-white"}`}/>
                    <span
                        className={`absolute box-shadow z-20 delay-100 ${"/dashboard/products" === path ? "" : "hover:bg-orange-500 hover:text-white group-hover:-right-[141px] group-hover:opacity-100 group-hover:visible"} opacity-0 invisible -right-[120px] transition-all ease-in-out duration-200 top-0 bottom-0 my-auto w-[125px] h-10 leading-10 text-center bg-white dark:bg-zinc-700 dark:text-white rounded-tr-md rounded-br-md`}>Products</span>
                </span>
                </Link>
                <Link to="/dashboard/tickets" className="group z-20">
                <span className="relative">
                    <IoMdMail
                        className={`w-8 h-8 ${"/dashboard/tickets" === path ? "text-orange-500" : "dark:text-white"}`}/>
                    <span
                        className={`absolute box-shadow z-20 delay-100 ${"/dashboard/tickets" === path ? "" : "hover:bg-orange-500 hover:text-white group-hover:-right-[141px] group-hover:opacity-100 group-hover:visible"} opacity-0 invisible -right-[120px] transition-all ease-in-out duration-200 top-0 bottom-0 my-auto w-[125px] h-10 leading-10 text-center bg-white dark:bg-zinc-700 dark:text-white rounded-tr-md rounded-br-md`}>Tickets</span>
                </span>
                </Link>
                <Link to="/dashboard/discount-codes" className="group z-20">
               <span className="relative">
                    <BiSolidOffer
                        className={`w-8 h-8 ${"/dashboard/discount-codes" === path ? "text-orange-500" : "dark:text-white"}`}/>
                    <span
                        className={`absolute box-shadow z-20 delay-100 ${"/dashboard/discount-codes" === path ? "" : "hover:bg-orange-500 hover:text-white group-hover:-right-[141px] group-hover:opacity-100 group-hover:visible"} opacity-0 invisible -right-[120px] transition-all ease-in-out duration-200 top-0 bottom-0 my-auto w-[125px] h-10 leading-10 text-center bg-white dark:bg-zinc-700 dark:text-white rounded-tr-md rounded-br-md`}>Discount codes</span>
                </span>
                </Link>
                <Link to="/dashboard/comments" className="group z-20">
                <span className="relative">
                    <FaComments
                        className={`w-8 h-8 ${"/dashboard/comments" === path ? "text-orange-500" : "dark:text-white"}`}/>
                    <span
                        className={`absolute box-shadow z-20 delay-100 ${"/dashboard/comments" === path ? "" : "hover:bg-orange-500 hover:text-white group-hover:-right-[141px] group-hover:opacity-100 group-hover:visible"} opacity-0 invisible -right-[120px] transition-all ease-in-out duration-200 top-0 bottom-0 my-auto w-[125px] h-10 leading-10 text-center bg-white dark:bg-zinc-700 dark:text-white rounded-tr-md rounded-br-md`}>Comments</span>
                </span>
                </Link>
                <Link to="/dashboard/account" className="group z-20">
                <span className="relative">
                    <MdAccountBox
                        className={`w-8 h-8 ${"/dashboard/account" === path ? "text-orange-500" : "dark:text-white"}`}/>
                    <span
                        className={`absolute box-shadow z-20 delay-100 ${"/dashboard/account" === path ? "" : "hover:bg-orange-500 hover:text-white group-hover:-right-[141px] group-hover:opacity-100 group-hover:visible"} opacity-0 invisible -right-[120px] transition-all ease-in-out duration-200 top-0 bottom-0 my-auto w-[125px] h-10 leading-10 text-center bg-white dark:bg-zinc-700 dark:text-white rounded-tr-md rounded-br-md`}>Account</span>
                </span>
                </Link>
                <div
                    className="theme-button-wrapper mt-20 border-t border-solid border-black/10 dark:border-white/30 w-full flex items-center justify-center pt-4">
                    {
                        theme === "Dark"
                            ? <FaSun onClick={switchTheme} className="w-8 h-8 cursor-pointer dark:text-white"/>
                            : <FaMoon onClick={switchTheme} className="w-8 h-8 cursor-pointer dark:text-white"/>
                    }

                </div>
            </div>

            <div
                className="access-panel-mobile fixed xs:hidden bottom-0 left-0 right-0 bg-white box-shadow flex items-center justify-between py-3 px-1 dark:bg-zinc-700">
                <Link to="/dashboard">
                    <IoHomeSharp
                        className={`w-8 h-6 ${"/dashboard" === path ? "text-orange-500" : "dark:text-white"}`}/>
                </Link>
                <Link to="/dashboard/users">
                    <FaUsers
                        className={`w-6 h-6 ${"/dashboard/users" === path ? "text-orange-500" : "dark:text-white"}`}/>
                </Link>
                <Link to="/dashboard/products">
                    <FaBox
                        className={`w-6 h-6 ${"/dashboard/products" === path ? "text-orange-500" : "dark:text-white"}`}/>
                </Link>
                <Link to="/dashboard/tickets">
                    <IoMdMail
                        className={`w-6 h-6 ${"/dashboard/tickets" === path ? "text-orange-500" : "dark:text-white"}`}/>
                </Link>
                <Link to="/dashboard/discount-codes">
                    <BiSolidOffer
                        className={`w-6 h-6 ${"/dashboard/discount-codes" === path ? "text-orange-500" : "dark:text-white"}`}/>
                </Link>
                <Link to="/dashboard/comments">
                    <FaComments
                        className={`w-6 h-6 ${"/dashboard/comments" === path ? "text-orange-500" : "dark:text-white"}`}/>
                </Link>
                <Link to="/dashboard/account">
                    <MdAccountBox
                        className={`w-6 h-6 ${"/dashboard/account" === path ? "text-orange-500" : "dark:text-white"}`}/>
                </Link>
                {
                    theme === "Dark"
                        ? <FaSun onClick={switchTheme} className="w-5 h-5 cursor-pointer dark:text-white"/>
                        : <FaMoon onClick={switchTheme} className="w-5 h-5 cursor-pointer dark:text-white"/>
                }
            </div>
        </>
    )
}

export default AccessPanel