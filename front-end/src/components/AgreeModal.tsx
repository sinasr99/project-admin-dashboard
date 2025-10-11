import React, {Dispatch, FC, SetStateAction, useEffect} from "react";
import {FaWindowClose} from "react-icons/fa"

type AgreeModalProps = {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    agreeFunction: Function,
    question: string,
    yesText: string,
    noText: string,
    noRedBtn?: boolean
}

const AgreeModal: FC<AgreeModalProps> = ({agreeFunction, setShow, show, question, noText, yesText, noRedBtn}) => {

    useEffect(() => {
        const close = () => {
            setShow(false)
        }

        window.addEventListener("click", close)
        return () => window.removeEventListener("click", close)
    }, []);

    const callFunc = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        agreeFunction()
    }

    return (
        <div
            onClick={e => e.stopPropagation()}
            className={`modal ${show ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-10"} transition z-10 fixed top-0 bottom-0 right-0 left-0 w-full h-fit sm:w-[500px] py-3 px-4 m-auto rounded-md box-shadow bg-milky dark:bg-gray-700`}>
            <div className="header-modal flex items-center justify-end">
                <FaWindowClose
                    onClick={() => setShow(false)}
                    className="cursor-pointer w-6 h-6 transition-all ease-in-out duration-150 hover:text-red-600 dark:text-white"/>
            </div>

            <p className="question font-bold text-lg dark:text-white text-center mt-3 mb-8">{question}</p>

            <div className="button flex items-center justify-center gap-2">
                <button
                    onClick={() => setShow(false)}
                    className="w-[150px] rounded-md h-8 flex items-center cursor-pointer hover:bg-orange-600 transition-all ease-in-out duration-150 justify-center bg-orange-400 text-white">{noText}</button>
                <button
                    onClick={callFunc}
                    className={`w-[150px] ${noRedBtn ? "bg-zinc-500 hover:bg-zinc-600" : "bg-red-600 hover:bg-red-700"} rounded-md h-8 flex items-center cursor-pointer  transition-all ease-in-out duration-150 justify-center text-white`}>{yesText}</button>
            </div>
        </div>
    )
}

export default AgreeModal