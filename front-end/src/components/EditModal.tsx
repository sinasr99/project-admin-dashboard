import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {FaWindowClose} from "react-icons/fa";
import Input from "./Input";
import {UserRole, UserType} from "./User.T";
import SelectBox from "./SelectBox";
import {Category, ProductType} from "./Product.T";
import {categories} from "../pages/Dashboard/dashboard-pages/Products"

type baseEditType = {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    yesButtonText: string,
    noButtonText: string
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

type EditUserModalProps = productEditType | userEditType

const userRoles: UserRole[] = ["USER", "ADMIN"]

const EditModal: FC<EditUserModalProps> = (props) => {
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

    // User Input Errors :
    const [userNameErrors, setUserNameErrors] = useState<number>(0)
    const [userEmailErrors, setUserEmailErrors] = useState<number>(0)
    const [userPhoneErrors, setUserPhoneErrors] = useState<number>(0)
    const [userPasswordErrors, setUserPasswordErrors] = useState<number>(0)

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
        if (editType === "PRODUCT") {
            setCpu(item.cpu || "")
            setRam(item.ram)
            setBrand(item.brand)
            setPrice(item.price)
            setCount(item.count)
            setCategory(item.category)
            setStorage(item.storage)
            setTitle(item.title)
        } else {
            setUserName(item.name)
            setUserPhone(item.phone)
            setUserPassword(item.password)
            setUserEmail(item.email)
            setUserRole(item.role)
        }
    }, [item])

    const editFunction = () => {
        if (editType === "USER") {
            const user: UserType = {
                name: userName,
                password: userPassword,
                role: userRole as UserRole,
                phone: userPhone,
                email: userEmail
            }
            return editFunc(user)
        }

        const product: ProductType = {title, price, count, cpu, ram, brand, category, storage}
        editFunc(product)
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
            <p className="label text-center text-xl font-bold mt-1 mb-3">Edit user :</p>

            <div className="inputs-wrapper flex flex-col gap-5">
                {
                    editType === "USER"
                        ?
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
                        :
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
                }
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

export default EditModal