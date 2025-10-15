import React, {Dispatch, FC, SetStateAction, useCallback, useEffect, useState} from "react";
import {IoIosArrowDown} from "react-icons/io";

type SelectBoxProps = {
    items: string[]
    defaultItem: string | null,
    setDefaultItem: Dispatch<SetStateAction<any>>,
    placeholder: string
}

const SelectBox: FC<SelectBoxProps> = ({defaultItem, items, setDefaultItem, placeholder}) => {
    const [isOpenSelectBox, setIsOpenSelectBox] = useState<boolean>(false)

    const switchSelectBoxStatus = useCallback((event : React.MouseEvent) => {
        event.stopPropagation()
        setIsOpenSelectBox(prev => !prev)
    }, [])

    const selectDefaultItem = useCallback((event: React.MouseEvent, newValue: string) => {
        switchSelectBoxStatus(event)
        setDefaultItem(newValue)
    }, [])

    useEffect(() => {
        const closeHandler = () => {
            setIsOpenSelectBox(false)
        }

        window.addEventListener("click", closeHandler)

        return () => window.addEventListener("click", closeHandler)
    }, [])

    return (
        <div
            className={`select-box ${isOpenSelectBox ? "border-b-0" : "border-b-[1px] rounded-md"} dark:text-white dark:border-white relative transition-all ease-in-out duration-150 w-[250px] border-black/20 border-t-[1px] border-l-[1px] border-r-[1px] rounded-tl-md rounded-tr-md`}>
            <div
                onClick={switchSelectBoxStatus}
                className="select-value cursor-pointer flex items-end justify-between p-3">
                <span className={`label-select-box ${defaultItem ? " absolute text-sm  py-[2px] px-1.5 bg-white dark:bg-zinc-700" : "block"} dark:text-white transition-all ease-in-out duration-150 -top-[10px] left-1 text-black/60`}>{placeholder}</span>
                <span
                    className={`select-content max-w-[195px] whitespace-nowrap overflow-hidden text-ellipsis ${defaultItem ? "block" : "hidden"}`}>{defaultItem}</span>
                <IoIosArrowDown className={`w-6 h-6 dark:text-white ${isOpenSelectBox ? "rotate-180" : "rotate-0"}`}/>
            </div>

            <div
                className={`${isOpenSelectBox ? "max-h-[400px] " : "max-h-0 border-none"} z-30 transition-all ease-in-out duration-200 overflow-hidden items flex flex-col bg-white dark:bg-zinc-700 absolute top-full -left-px -right-px border-b-[1px] border-r-[1px] border-l-[1px] rounded-bl-md rounded-br-md border-black/20 dark:border-white`}>
                {
                    items
                        .filter(item => item !== defaultItem)
                        .map((item, i) => (
                            i === 0
                                ? <p className="p-2 cursor-pointer transition-all ease-in-out duration-150 hover:bg-milky dark:hover:bg-zinc-500" onClick={e => selectDefaultItem(e, item)}
                                     key={i}>{item}</p>
                                : <p className="p-2 cursor-pointer transition-all ease-in-out duration-150 hover:bg-milky dark:hover:bg-zinc-500 border-t border-solid border-black/10 dark:border-white"
                                     onClick={e => selectDefaultItem(e, item)} key={i}>{item}</p>
                        ))
                }
            </div>
        </div>
    )
}

export default SelectBox