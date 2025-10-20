import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import SearchBar from "../../../components/SearchBar";
import {useSearchParams} from "react-router-dom";
import SelectBox from "../../../components/SelectBox";
import {Category} from "../../../components/Product.T"
import Input from "../../../components/Input";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {FaEdit, FaInfoCircle, FaTrashAlt} from "react-icons/fa";
import {IoTriangle} from "react-icons/io5";
import Modal from "../../../components/Modal";
import SwiperWithButtons from "../../../components/SwiperWithButtons";
import InputModal from "../../../components/InputModal";
import {DiscountCodeProps} from "../../../components/Discount.T";

const discounts: DiscountCodeProps[] = [
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "count",
        expireCount: 20,
        status: "Expired"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "date",
        expireDate: 1760950281825,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "count",
        expireCount: 20,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "date",
        expireDate: 1760950281825,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "count",
        expireCount: 20,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "date",
        expireDate: 1760950281825,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "count",
        expireCount: 20,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "date",
        expireDate: 1760950281825,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "count",
        expireCount: 20,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "date",
        expireDate: 1760950281825,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "count",
        expireCount: 20,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "date",
        expireDate: 1760950281825,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "count",
        expireCount: 20,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "date",
        expireDate: 1760950281825,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "count",
        expireCount: 20,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "date",
        expireDate: 1760950281825,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "count",
        expireCount: 20,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "date",
        expireDate: 1760950281825,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "count",
        expireCount: 20,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "date",
        expireDate: 1760950281825,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "count",
        expireCount: 20,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "date",
        expireDate: 1760950281825,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "count",
        expireCount: 20,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "date",
        expireDate: 1760950281825,
        status: "Valid"
    },
    {
        title: "ASUS Special Off",
        category: "All",
        creator: "Sina Saber",
        expireType: "count",
        expireCount: 20,
        status: "Valid"
    },
    {
        title: "Monitors Off",
        category: "Monitor",
        creator: "Tyler Rake",
        expireCount: 99,
        expireType: "count",
        status: "Expired"
    },
]

const admins: string[] = ["All", "Sina Saber", "Alex Morgan"]

const categories: (Category | "All")[] = ["All", "Laptop", "Tablet", "Computer", "Mobile", "Monitor"]

type InputType = "search" | "filter" | "sort"

type SortDiscountType = "Default" | "Lowest Discount" | "Highest Discount" | "Oldest" | "Newest"
const sortDiscountCodes: SortDiscountType[] = ["Newest", "Oldest", "Lowest Discount", "Highest Discount"]

type FilterDiscountType = "Filter by Expiration Date"
    | "Filter by Quantity" | "All" | Category
const filterDiscountItems: FilterDiscountType[] = [
    "All", "Monitor", "Tablet", "Laptop", "Computer", "Filter by Expiration Date", "Filter by Quantity",
]

export type DiscountType = "Expiration by Usage Count" | "Expiration by Date"
export const discountTypeItems: DiscountType[] = ["Expiration by Usage Count", "Expiration by Date"]

const DiscountCodes: FC = () => {
    const [query, setQuery] = useSearchParams()
    const [searchInput, setInputSearch] = useState(getDefaultValue("search"))
    const ticketNotifs = [
        "Ticket 989898 can only use for 5 times",
        "Ticket 989898 can only use for 5 times",
        "Ticket 989898 can only use for 5 times",
        "Ticket 989898 can only use for 5 times",
        "Ticket 989898 can only use for 5 times",
    ]

    // Filter & Sort :
    const [filterDiscount, setFilterDiscount] = useState<FilterDiscountType>(getDefaultValue("filter") as FilterDiscountType)
    const [filterByAdmin, setFilterByAdmin] = useState<string>(admins[0])
    const [sortDiscount, setSortDiscount] = useState<SortDiscountType>(getDefaultValue("sort") as SortDiscountType)

    // Discount Inputs :
    const [discountTitle, setDiscountTitle] = useState("")
    const [category, setCategory] = useState<Category | "All">("All")
    const [expirationType, setExpirationType] = useState<DiscountType>("Expiration by Usage Count")
    const [allowedNumber, setAllowedNumber] = useState(0)
    const [discountExpireDate, setDiscountExpireDate] = useState<number>(Date.now())

    // Detail Discount & Remove & Edit Modal :
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [isShowRemoveModal, setIsShowRemoveModal] = useState(false)

    // Pages :
    const discountPages = Math.ceil(discounts.length / 10)

    // Discounts :
    const [discounts10, setDiscounts10] = useState<DiscountCodeProps[]>(getDiscountsByPage())

    // show discounts state :
    const [isShowDiscounts, setIsShowDiscounts] = useState(false)

    // Current Discount :
    const [currentDiscount, setCurrentDiscount] = useState<DiscountCodeProps>({
        status: "Expired",
        expireCount: 0,
        creator: "Sina Saber",
        expireType: "count",
        category: "All",
        title: ""
    })

    const searchHandler = () => {
        // Query Update
        query.set("search", searchInput)
        query.set("sort", sortDiscount)
        query.set("filter", filterDiscount)
        setQuery(query)
        // Query Update
    }

    function getDiscountsByPage(): DiscountCodeProps[] {
        const page = query.get("page") || 0
        const pageNumber = +page

        if (!pageNumber || isNaN(pageNumber) || !(pageNumber >= 1 && pageNumber <= discountPages)) {
            query.set("page", "1")
            return discounts.slice(0, 10)
        }

        const from = (pageNumber - 1) * 10
        const to = from + 10

        return discounts.slice(from, to)
    }

    function getDefaultValue(type: InputType): FilterDiscountType | SortDiscountType | string {
        switch (type) {
            case "search": {
                const search = query.get("search")

                if (!search) {
                    query.set("search", "")
                    return ""
                }

                return search
            }
            case "sort": {
                const sort = query.get("sort")
                const defaultSort: SortDiscountType = "Default"

                if (!sort || !sortDiscountCodes.some(sortItem => sortItem === sort)) {
                    query.set("sort", defaultSort)
                    return defaultSort
                }

                return sort
            }
            case "filter": {
                const filter = query.get("filter")
                const defaultFilter: FilterDiscountType = "All"

                if (!filter || !filterDiscountItems.some(filterItem => filterItem === defaultFilter)) {
                    query.set("filter", defaultFilter)
                    return defaultFilter
                }

                return filter
            }
        }
    }

    const showModal = (event: React.MouseEvent, set: Dispatch<SetStateAction<boolean>>) => {
        event.stopPropagation()
        set(prev => true)
    }

    const showDiscounts = () => {
        setIsShowDiscounts(false)

        setTimeout(() => {
            setIsShowDiscounts(true)
        }, 500)
    }

    const changePage = (newPage: number) => {
        query.set("page", newPage.toString())
        setQuery(query)
        showDiscounts()
        setDiscounts10(getDiscountsByPage())
    }

    const getDate = (dateNumber: number): string => {
        const date = new Date(dateNumber)
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const day = date.getDate().toString().padStart(2, "0")

        return `${year}-${month}-${day}`
    }

    const getCurrentIndex = (): number => {
        const number = query.get("page")

        if (!number || isNaN(+number)) {
            return 0
        }

        return +number - 1
    }

    const removeFunc = () => {

    }

    const editFunc = (newDiscount: DiscountCodeProps) => {
        console.log(newDiscount)
    }

    const readyToEditDiscount = (event: React.MouseEvent, discount: DiscountCodeProps) => {
        setCurrentDiscount(discount)
        showModal(event, setIsShowEditModal)
    }

    useEffect(() => {
        showDiscounts()
        setQuery(query)
    }, [])

    return (
        <>
            <InputModal show={isShowEditModal} setShow={setIsShowEditModal} yesButtonText="Yes, edit" noButtonText="No"
                        editType="DISCOUNT" item={currentDiscount} editFunc={editFunc}/>
            <Modal noText="No" yesText="Yes, remove" question="Are you sure you want to remove this disocunt ?"
                   agreeFunction={removeFunc} type="agree" show={isShowRemoveModal} setShow={setIsShowRemoveModal}/>

            <Modal text={""} doYouHaveChildren={true} type="detail" show={showDetailModal} setShow={setShowDetailModal}>
                <h3 className="font-bold text-lg text-center dark:text-white">Discount detail :</h3>
                <div
                    className="detail-wrapper grid grid-cols-[150px_150px] justify-items-center justify-center mt-4 gap-y-3 dark:text-white">
                    <span className="">Discount Status :</span>
                    <span className="">Valid</span>
                    <span className="">Discount Category :</span>
                    <span className="">Laptop</span>
                    <span className="block md:hidden">Expire Date :</span>
                    <span className="block md:hidden">2025-12-12</span>
                    <span className="block sm:hidden">Discount creator :</span>
                    <span className="block sm:hidden">Sina Saber</span>
                </div>
            </Modal>

            <div className="w-full px-[1.5px] sm:px-3 rounded-md bg-white dark:bg-zinc-700 py-5 dark:text-white">
                <h3 className="discount-managemnt-title font-bold text-2xl pl-2 py-3">Discount Create Section</h3>
                <div
                    className="discount-create-wrapper px-2 grid sm:justify-center items-center gap-x-4 gap-y-8 sm:gap-y-5
                grid-cols-[280px]
                sm:grid-cols-[300px_300px]
                xl:grid-cols-[500px_500px]
                ">
                    <div className="discount-input-wrapper w-full flex flex-col gap-2 items-center sm:justify-center">
                        <Input type="normal" placeholder="Enter discount title" value={discountTitle}
                               setValue={setDiscountTitle} isFullWidth={true}/>
                        <span
                            className="error text-red-600 dark:text-red-400 overflow-hidden w-full text-ellipsis whitespace-nowrap">Discount title error</span>
                    </div>
                    <div className="discount-input-wrapper w-full flex items-center sm:justify-center">
                        <SelectBox items={categories} defaultItem={category} setDefaultItem={setCategory}
                                   placeholder="Enter category"/>
                    </div>
                    <div className="discount-input-wrapper w-full flex items-center sm:justify-center">
                        <SelectBox items={discountTypeItems} defaultItem={expirationType}
                                   setDefaultItem={setExpirationType}
                                   placeholder="Enter expiration type"/>
                    </div>
                    <div className="discount-input-wrapper w-full flex flex-col gap-2 items-center sm:justify-center">
                        {
                            expirationType === "Expiration by Usage Count"
                                ?
                                <>
                                    <Input type="normal" placeholder="Enter allowed number of discount codes"
                                           value={allowedNumber.toLocaleString()}
                                           setValue={setAllowedNumber} isFullWidth={true}/>
                                    <span
                                        className="error text-red-600 dark:text-red-400 overflow-hidden w-full text-ellipsis whitespace-nowrap">Discount allow number error</span>
                                </>
                                :
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        onChange={newDate => {
                                            if (newDate) {
                                                setDiscountExpireDate(newDate.valueOf() as number)
                                            }
                                        }}
                                        label="Basic date picker"/>
                                </LocalizationProvider>
                        }
                    </div>
                </div>

                <h3 className="discount-managemnt-title font-bold text-2xl pl-2 py-3 mt-10">Discounts Management</h3>

                <SearchBar inputSearch={searchInput} setInputSearch={setInputSearch} search={searchHandler}
                           query={query}
                           setQuery={setQuery} notifications={ticketNotifs}/>

                <div className="filter-and-sort-wrapper flex flex-wrap justify-center items-center gap-5">
                    <SelectBox items={filterDiscountItems} defaultItem={filterDiscount}
                               setDefaultItem={setFilterDiscount}
                               placeholder="Filter by category"/>
                    <SelectBox items={admins} defaultItem={filterByAdmin} setDefaultItem={setFilterByAdmin}
                               placeholder="Filter by admins"/>
                    <SelectBox items={sortDiscountCodes} defaultItem={sortDiscount} setDefaultItem={setSortDiscount}
                               placeholder="Sort discount"/>
                </div>

                <div
                    className="discounts w-fit max-w-[915px] mx-auto mt-10 flex flex-col rounded-md border-solid border-black/50 dark:border-white/50 border-[1px]">
                    <div className="discount-header text-sm font-semibold h-[60px] grid items-center border-b-solid border-b-black/50 dark:border-b-white/50 border-b-[1.5px]
                    grid-cols-[60px_130px_100px]
                    sm:grid-cols-[60px_150px_150px_100px]
                    md:grid-cols-[60px_150px_150px_150px_100px]
                    lg:grid-cols-[60px_150px_150px_190px_150px_145px]
                    ">
                        <span
                            className="discount-number-header flex items-center justify-center text-center h-full w-full">Discount number</span>
                        <span
                            className="discount-title-header flex items-center justify-center text-center h-full w-full mt border-l-solid border-l-black/50 dark:border-l-white/50 border-l-[1.5px]">Discount title</span>
                        <span
                            className="discount-creator-header hidden sm:flex items-center justify-center text-center h-full w-full mt border-l-solid border-l-black/50 dark:border-l-white/50 border-l-[1.5px]">Discount creator</span>
                        <span
                            className="discount-type-header hidden md:flex items-center justify-center text-center h-full w-full mt border-l-solid border-l-black/50 dark:border-l-white/50 border-l-[1.5px]">Discount expiration</span>
                        <span
                            className="discount-category-header hidden lg:flex items-center justify-center text-center h-full w-full mt border-l-solid border-l-black/50 dark:border-l-white/50 border-l-[1.5px]">Discount category</span>
                        <span
                            className="discount-operation-header flex items-center justify-center text-center h-full w-full mt border-l-solid border-l-black/50 dark:border-l-white/50 border-l-[1.5px]">Discount operation</span>
                    </div>
                    {
                        isShowDiscounts
                            ?
                            discounts10.map((discount, index) => (
                                <div key={index} className="discount relative h-[60px] grid items-center
                    border-t-solid border-t-black/50 dark:border-white/50 border-t-[1.5px]
                    grid-cols-[60px_130px_100px]
                    sm:grid-cols-[60px_150px_150px_100px]
                    md:grid-cols-[60px_150px_150px_150px_100px]
                    lg:grid-cols-[60px_150px_150px_190px_150px_145px]
                ">
                    <span
                        className={`discount-status ${discount.status === "Valid" ? "hidden" : ""} absolute top-0 right-0 bottom-0 left-0 m-auto w-fit h-fit p-2 rounded-md bg-red-700 rotate-[10deg] text-white`}>Ticket is expired</span>
                                    <span
                                        className="discount-number mx-auto text-center leading-[50px] text-sm font-bold w-[50px] h-[50px] bg-gray-500 text-white rounded-md">{(index + 1).toLocaleString()}</span>
                                    <span
                                        className="discount-title px-[2px] truncate block text-center leading-[60px] w-full border-solid border-l-black/50 dark:border-l-white/50 border-l-[1.5px]">{discount.title}</span>
                                    <span
                                        className="discount-creator hidden sm:block px-[2px] truncate text-center leading-[60px] w-full h-full border-solid border-l-black/50 dark:border-l-white/50 border-l-[1.5px]">{discount.creator}</span>
                                    <span
                                        className="discount-type hidden md:block px-[2px] h-full truncate text-center leading-[60px] border-solid border-l-black/50 dark:border-l-white/50 border-l-[1.5px]">{discount.expireType === "date" ? getDate(discount.expireDate) : discount.expireCount}</span>
                                    <span
                                        className="discount-category hidden lg:block px-[2px] truncate text-center leading-[60px] h-full border-solid border-l-black/50 dark:border-l-white/50 border-l-[1.5px]">{discount.category}</span>
                                    <div
                                        className="buttons flex items-center justify-center gap-3 h-full border-solid border-l-black/50 dark:border-l-white/50 border-l-[1.5px]">
                        <span className="btn-wrapper relative group">
                            <FaTrashAlt
                                onClick={event => showModal(event, setIsShowRemoveModal)}
                                className="w-5 h-5 cursor-pointer transition hover:scale-[1.1] hover:text-red-500"/>
                            <span
                                className="btn-tooltip group-hover:visible group-hover:opacity-100 opacity-0 invisible transition absolute top-full right-[80%] mt-5 z-20 bg-gray-500 text-white rounded-md p-2.5 whitespace-nowrap">Remove discount</span>
                            <IoTriangle
                                className="w-6 h-6 group-hover:visible group-hover:opacity-100 opacity-0 invisible transition text-gray-500 absolute top-full right-1/2 rotate-[22deg] mt-1 z-10"/>
                        </span>
                                        <span className="btn-wrapper relative group">
                            <FaEdit
                                onClick={event => readyToEditDiscount(event, discount)}
                                className="w-5 h-5 cursor-pointer transition hover:scale-[1.1]"/>
                             <span
                                 className="btn-tooltip group-hover:visible group-hover:opacity-100 opacity-0 invisible transition absolute top-full right-[80%] mt-5 z-20 bg-gray-500 text-white rounded-md p-2.5 whitespace-nowrap">Edit discount</span>
                            <IoTriangle
                                className="w-6 h-6 group-hover:visible group-hover:opacity-100 opacity-0 invisible transition text-gray-500 absolute top-full right-1/2 rotate-[22deg] mt-1 z-10"/>
                        </span>
                                        <span className="btn-wrapper lg:hidden relative group">
                            <FaInfoCircle
                                onClick={event => showModal(event, setShowDetailModal)}
                                className="w-5 h-5 cursor-pointer transition hover:scale-[1.1]"/>
                             <span
                                 className="btn-tooltip group-hover:visible group-hover:opacity-100 opacity-0 invisible transition absolute top-full right-[80%] mt-5 z-20 bg-gray-500 text-white rounded-md p-2.5 whitespace-nowrap">detail discount</span>
                            <IoTriangle
                                className="w-6 h-6 group-hover:visible group-hover:opacity-100 opacity-0 invisible transition text-gray-500 absolute top-full right-1/2 rotate-[22deg] mt-1 z-10"/>
                        </span>
                                    </div>
                                </div>
                            ))
                            :
                            Array.from({length: 5})
                                .map((shimmer, index) => (
                                    <div key={index}
                                         className={`${index > 0 ? "border-t-solid border-t-[1.5px] dark:border-t-white/50 border-t-black/50" : ""} discount-shimmer grid items-center
                    grid-cols-[60px_130px_100px]
                    sm:grid-cols-[60px_150px_150px_100px]
                    md:grid-cols-[60px_150px_150px_150px_100px]
                    lg:grid-cols-[60px_150px_150px_190px_150px_145px]
                    h-[60px]
                    `}>
                        <span
                            className="number-shimmer mx-auto w-[50px] h-[50px] block bg-shimmer dark:bg-dark-shimmer shimmer-animation rounded-md"></span>
                                        <span
                                            className="title-shimmer flex items-center justify-center border-l-solid border-l-black/50 dark:border-white/50 border-l-[1.5px] h-[60px]">
                            <span
                                className="mx-auto block h-3 w-[80px] rounded-sm bg-shimmer dark:bg-dark-shimmer shimmer-animation"></span>
                        </span>
                                        <span
                                            className="creator-shimmer hidden sm:flex items-center justify-center border-l-solid border-l-black/50 dark:border-white/50 border-l-[1.5px] h-[60px]">
                            <span
                                className="mx-auto block h-3 w-[80px] rounded-sm bg-shimmer dark:bg-dark-shimmer shimmer-animation"></span>
                        </span>
                                        <span
                                            className="expire-shimmer hidden md:flex items-center justify-center border-l-solid border-l-black/50 dark:border-white/50 border-l-[1.5px] h-[60px]">
                            <span
                                className="mx-auto block h-3 w-[80px] rounded-sm bg-shimmer dark:bg-dark-shimmer shimmer-animation"></span>
                        </span>
                                        <span
                                            className="category-shimmer hidden lg:flex items-center justify-center border-l-solid border-l-black/50 dark:border-white/50 border-l-[1.5px] h-[60px]">
                            <span
                                className="mx-auto block h-3 w-[80px] rounded-sm bg-shimmer dark:bg-dark-shimmer shimmer-animation"></span>
                        </span>
                                        <span
                                            className="category-shimmer flex items-center justify-center border-l-solid border-l-black/50 dark:border-white/50 border-l-[1.5px] h-[60px]">
                            <span
                                className="mx-auto block h-3 w-[80px] rounded-sm bg-shimmer dark:bg-dark-shimmer shimmer-animation"></span>
                        </span>
                                    </div>
                                ))
                    }
                </div>

                {
                    isShowDiscounts
                        ?
                        <div className="page-wrapper max-w-[300px] mx-auto mt-8">
                            <SwiperWithButtons slides={
                                Array.from({length: discountPages})
                                    .map((btnPage, index) => (
                                        <button
                                            onClick={() => changePage(index + 1)}
                                            key={index}
                                            className={`w-9 h-9 ${query.get("page") === (index + 1).toString() ? "bg-orange-700" : ""} shrink-0 text-sm font-bold bg-orange-500 text-white flex items-center justify-center hover:bg-orange-700 transition-all ease-in-out duration-150 cursor-pointer rounded-full`}>{index + 1}</button>
                                    ))
                            } initialSlide={getCurrentIndex()}/>
                        </div>
                        : null
                }
            </div>
        </>
    )
}

export default DiscountCodes