import React, {Dispatch, FC, ReactNode, SetStateAction, useEffect, useState} from "react";
import {FaWindowClose} from "react-icons/fa";
import Input from "./Input";
import {UserRole, UserType} from "./User.T";
import SelectBox from "./SelectBox";
import {Category, ProductType} from "./Product.T";
import {DiscountCodeProps} from "./Discount.T"
import {categories} from "../pages/Dashboard/dashboard-pages/Products"
import {discountTypeItems, DiscountType} from "../pages/Dashboard/dashboard-pages/DiscountCodes"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

type InputTypes = "PRODUCT" | "USER" | "ANSWER-TICKET" | "DISCOUNT"

type baseEditType = {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    yesButtonText: string,
    noButtonText: string,
    editType: InputTypes,
}

type discountEditType = baseEditType & {
    editType: "DISCOUNT",
    item: DiscountCodeProps,
    editFunc: (discount: DiscountCodeProps) => void
}

type productEditType = baseEditType & {
    editType: "PRODUCT",
    item: ProductType,
    editFunc: (product: ProductType) => void
}

type userEditType = baseEditType & {
    editType: "USER",
    item: UserType,
    editFunc: (user: UserType) => void
}

type AnswerType = baseEditType & {
    editType: "ANSWER-TICKET",
    item: string,
    editFunc: (answer: string) => void
}

type EditUserModalProps = productEditType | userEditType | AnswerType | discountEditType

const userRoles: UserRole[] = ["USER", "ADMIN"]

const InputModal: FC<EditUserModalProps> = (props) => {
    // Props :
    const {editType, editFunc, setShow, show, item, noButtonText, yesButtonText} = props

    const [userName, setUserName] = useState<string>("")
    const [userEmail, setUserEmail] = useState<string>("")
    const [userPhone, setUserPhone] = useState<string>("")
    const [userPassword, setUserPassword] = useState<string>("")
    const [userRole, setUserRole] = useState<UserRole>("USER")

    const [cpu, setCpu] = useState<string>("")
    const [ram, setRam] = useState<number>(0)
    const [brand, setBrand] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [count, setCount] = useState<number>(0)
    const [category, setCategory] = useState<Category>("Computer")
    const [storage, setStorage] = useState<number>(0)
    const [title, setTitle] = useState<string>("")

    // Answer Input :
    const [inputAnswer, setInputAnswer] = useState("")

    // User Input Errors :
    const [userNameErrors, setUserNameErrors] = useState<number>(0)
    const [userEmailErrors, setUserEmailErrors] = useState<number>(0)
    const [userPhoneErrors, setUserPhoneErrors] = useState<number>(0)
    const [userPasswordErrors, setUserPasswordErrors] = useState<number>(0)

    // Discount Inputs :
    const discountCategories: (Category | "All")[] = ["All", "Laptop", "Tablet", "Computer", "Mobile", "Monitor"]

    const [discountTitle, setDiscountTitle] = useState<string>("")
    const [discountExpireType, setDiscountExpireType] = useState<DiscountType>("Expiration by Usage Count")
    const [discountCategory, setDiscountCategory] = useState<Category | "All">("All")
    const [discountExpireDate, setDiscountExpireDate] = useState<number>(0)
    const [discountExpireCount, setDiscountExpireCount] = useState<number>(0)

    const [isDisabled, setIsDisabled] = useState<boolean>(false)

    useEffect(() => {
        setIsDisabled(Boolean(userNameErrors || userEmailErrors || userPasswordErrors || userPhoneErrors))
    }, [userNameErrors, userPasswordErrors, userPhoneErrors, userEmailErrors]);

    useEffect(() => {
        const close = () => {
            setShow(false)
        }

        window.addEventListener("click", close)
        return () => window.removeEventListener("click", close)
    }, [])

    useEffect(() => {
        switch (editType) {
            case "USER": {
                setUserName(item.name)
                setUserPhone(item.phone)
                setUserPassword(item.password)
                setUserEmail(item.email)
                setUserRole(item.role)
                break
            }
            case "PRODUCT": {
                setCpu(item.cpu || "")
                setRam(item.ram)
                setBrand(item.brand)
                setPrice(item.price)
                setCount(item.count)
                setCategory(item.category)
                setStorage(item.storage)
                setTitle(item.title)
                break
            }
            case "ANSWER-TICKET": {
                setInputAnswer(item)
                break
            }
            case "DISCOUNT": {
                setDiscountTitle(item.title)
                setDiscountExpireType(item.expireType === "count" ? "Expiration by Usage Count" : "Expiration by Date")
                setDiscountCategory(item.category)

                if (item.expireType === "count") {
                    setDiscountExpireCount(item.expireCount)
                } else {
                    setDiscountExpireDate(item.expireDate)
                }

                break
            }
        }
    }, [item])

    const editFunction = () => {
        switch (editType) {
            case "USER": {
                const user: UserType = {
                    name: userName,
                    password: userPassword,
                    role: userRole as UserRole,
                    phone: userPhone,
                    email: userEmail
                }
                editFunc(user)
                break
            }
            case "PRODUCT": {
                const product: ProductType = {title, price, count, cpu, ram, brand, category, storage}
                editFunc(product)
                break
            }
            case "ANSWER-TICKET": {
                editFunc(inputAnswer)
                break
            }
            case "DISCOUNT": {
                if (discountExpireType === "Expiration by Usage Count") {
                    const newDiscount: DiscountCodeProps = {
                        title: discountTitle,
                        creator: item.creator,
                        category: discountCategory,
                        expireType: "count",
                        expireCount: discountExpireCount,
                        status: discountExpireCount <= 0 ? "Expired" : "Valid",
                    }

                    editFunc(newDiscount)
                } else {
                    const newDiscount: DiscountCodeProps = {
                        title: discountTitle,
                        creator: item.creator,
                        category: discountCategory,
                        expireType: "date",
                        expireDate: discountExpireDate,
                        status: discountExpireDate <= Date.now() ? "Expired" : "Valid",
                    }

                    editFunc(newDiscount)
                }
            }
        }
    }

    const getInputs = (type: InputTypes): ReactNode => {
        switch (type) {
            case "USER": {
                return (
                    <>
                        <>
                            <Input setErrorsCount={setUserNameErrors} type="text" placeholder="Enter user name"
                                   value={userName}
                                   setValue={setUserName} isFullWidth={true}/>
                            <Input setErrorsCount={setUserEmailErrors} type="email" placeholder="Enter user email"
                                   value={userEmail}
                                   setValue={setUserEmail} isFullWidth={true}/>
                            <Input setErrorsCount={setUserPhoneErrors} type="phone" placeholder="Enter user phone"
                                   value={userPhone}
                                   setValue={setUserPhone} isFullWidth={true}/>
                            <Input setErrorsCount={setUserPasswordErrors} type="password"
                                   placeholder="Enter user password"
                                   value={userPassword} setValue={setUserPassword} isFullWidth={true}/>
                            <SelectBox items={userRoles} defaultItem={userRole} setDefaultItem={setUserRole}
                                       placeholder="Enter user role"/>
                        </>
                    </>
                )
            }
            case "PRODUCT": {
                return (
                    <>
                        <Input type="normal" placeholder="Enter product cpu" value={cpu} setValue={setCpu}
                               isFullWidth={true}
                        />
                        <Input type="normal" placeholder="Enter product ram" value={ram.toString()}
                               setValue={setRam}
                               isFullWidth={true}
                        />
                        <Input type="normal" placeholder="Enter product brand" value={brand} setValue={setBrand}
                               isFullWidth={true}
                        />
                        <Input type="normal" placeholder="Enter product price" value={price.toString()}
                               setValue={setPrice}
                               isFullWidth={true}
                        />
                        <Input type="normal" placeholder="Enter product count" value={count.toString()}
                               setValue={setCount}
                               isFullWidth={true}
                        />
                        <SelectBox items={categories} defaultItem={category} setDefaultItem={setCategory}
                                   placeholder="Enter product category"/>
                        <Input type="normal" placeholder="Enter product title" value={storage.toString()}
                               setValue={setStorage}
                               isFullWidth={true}
                        />
                        <Input type="normal" placeholder="Enter product title" value={title} setValue={setTitle}
                               isFullWidth={true}
                        />
                    </>
                )
            }
            case "ANSWER-TICKET": {
                return (
                    <>
                        <Input type="normal" placeholder="Enter your answer" value={inputAnswer}
                               setValue={setInputAnswer} isFullWidth={true}/>
                    </>
                )
            }
            case "DISCOUNT": {
                return (
                    <>
                        <Input type="normal" placeholder="Enter discount title" value={discountTitle}
                               setValue={setDiscountTitle} isFullWidth={true}/>
                        <SelectBox items={discountCategories} defaultItem={discountCategory}
                                   setDefaultItem={setDiscountCategory}
                                   placeholder="Enter discount category"/>
                        <SelectBox items={discountTypeItems} defaultItem={discountExpireType}
                                   setDefaultItem={setDiscountExpireType}
                                   placeholder="Enter expiration type"/>
                        {
                            discountExpireType === "Expiration by Date"
                                ?
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        onChange={newDate => {
                                            if (newDate) {
                                                setDiscountExpireDate(newDate.valueOf() as number)
                                            }
                                        }}
                                        label="enter discount epire date"/>
                                </LocalizationProvider>
                                :
                                <Input type="normal" placeholder="Enter allowed number of discount codes"
                                       value={discountExpireCount.toLocaleString()}
                                       setValue={setDiscountExpireCount} isFullWidth={true}/>
                        }
                    </>
                )
            }
        }
    }

    const getTitle = (editType: InputTypes): string => {
        switch (editType) {
            case "USER":
                return "Edit user :"
            case "PRODUCT":
                return "Edit product :"
            case "ANSWER-TICKET":
                return "Answer ticket :"
            case "DISCOUNT":
                return "Edit discount :"
        }
    }

    return (
        <div
            onClick={e => e.stopPropagation()}
            className={`modal ${show ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-10"} dark:text-white transition z-10 fixed top-0 bottom-0 right-0 left-0 w-full h-fit sm:w-[500px] py-3 px-4 m-auto rounded-md box-shadow bg-white dark:bg-zinc-700`}>
            <div className="edit-modal-header flex items-center justify-end">
                <FaWindowClose
                    onClick={() => setShow(false)}
                    className="w-7 h-7 transition cursor-pointer hover:text-red-600"/>
            </div>
            <p className="label text-center text-xl font-bold mt-1 mb-3">{getTitle(editType)}</p>

            <div className="inputs-wrapper flex flex-col gap-5">
                {getInputs(editType)}
            </div>

            <div className="button flex items-center justify-center gap-2 mt-5">
                <button
                    onClick={() => setShow(false)}
                    className="w-[150px] rounded-md h-8 flex items-center cursor-pointer hover:bg-orange-600 transition-all ease-in-out duration-150 justify-center bg-orange-400 text-white">{noButtonText}</button>
                <button
                    disabled={isDisabled}
                    onClick={editFunction}
                    className={`w-[150px] ${isDisabled ? "opacity-40 cursor-not-allowed" : "opacity-100 cursor-pointer hover:bg-zinc-600"} bg-zinc-500 rounded-md h-8 flex items-center transition-all ease-in-out duration-150 justify-center text-white`}>{yesButtonText}</button>
            </div>
        </div>
    )
}

export default InputModal