import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {FaEdit, FaLongArrowAltRight, FaTrash} from "react-icons/fa";
import {useSearchParams} from "react-router-dom";
import Input from "../../../components/Input";
import SelectBox from "../../../components/SelectBox";
import {ImBlocked} from "react-icons/im";
import SwiperWithButtons from "../../../components/SwiperWithButtons";
import AgreeModal from "../../../components/AgreeModal";
import EditModal from "../../../components/EditModal";
import {UserType, UserRole} from "../../../components/User.T"
import SearchBar from "../../../components/SearchBar";

type UserFilterProps = "Default" | "Just admins" | "Just users" | "Blocked users" | "Unblocked users"

type UserSortProps =
    "Default"
    | "Sort by maximum bought"
    | "Sort by minimum bought"
    | "Sort by highest level"
    | "Sort by lowest level"

const userSortValues: UserSortProps[] = [
    "Default",
    "Sort by maximum bought",
    "Sort by minimum bought",
    "Sort by highest level",
    "Sort by lowest level"
];

const userFilterValue: UserFilterProps[] = [
    "Default",
    "Just users",
    "Just admins",
    "Blocked users",
    "Unblocked users"
]

const Users: FC = () => {
    const [query, setQuery] = useSearchParams()
    const [inputSearch, setInputSearch] = useState<string>(query.get("search") || "")
    const notifications = [
            "Alex Registered at 12:21 AM",
            "MMD09 Logged out at 09:21 PM",
            "MMD09 Logged out at 09:21 PM",
            "MMD09 Logged out at 09:21 PM",
            "MMD09 Logged out at 09:21 PM",
            "MMD09 Logged out at 09:21 PM",
            "MMD09 Logged out at 09:21 PM",
            "MMD09 Logged out at 09:21 PM",
            "MMD09 Logged out at 09:21 PM",
            "MMD09 Logged out at 09:21 PM",
            "MMD09 Logged out at 09:21 PM",
            "MMD09 Logged out at 09:21 PM",
            "MMD09 Logged out at 09:21 PM",
            "MMD09 Logged out at 09:21 PM",
        ]

    // -*-*-*-*-*-*-*-*-*-* User Input -*-*-*-*-*-*-*-*-*-*
    const [userName, setUserName] = useState<string>("")
    const [userPhone, setUserPhone] = useState<string>("")
    const [userEmail, setUserEmail] = useState<string>("")
    const [userPassword, setUserPassword] = useState<string>("")
    const [userRole, setUserRole] = useState<UserRole | null>(null)
    const userRoles: UserRole[] = ["USER", "ADMIN"]

    // -*-*-*-*-*-*-*-*-*-* User Input Errors -*-*-*-*-*-*-*-*-*-*
    const [nameErrors, setNameErrors] = useState<number>(0)
    const [emailErrors, setEmailErrors] = useState<number>(0)
    const [phoneErrors, setPhoneErrors] = useState<number>(0)
    const [passwordErrors, setPasswordErrors] = useState<number>(0)

    const [isValidInputs, setIsValidInputs] = useState(false)

    // -*-*-*-*-*-*-*-*-*-* User Filter & Sort -*-*-*-*-*-*-*-*-*-*
    const userSortItems = [
        "Default", "Sort by highest level", "Sort by lowest level", "Sort by maximum bought", "Sort by minimum bought"
    ]
    const [userSortCurrent, setUserSortCurrent] = useState<UserSortProps>(getDefaultSort())
    const [userFilterItems, setUserFilterItems] = useState<UserFilterProps[]>(
        ["Default", "Blocked users", "Unblocked users", "Just users", "Just admins"]
    )
    const [currentUserFilter, setCurrentUserFilter] = useState<UserFilterProps>(getDefaultFilter())

    // -*-*-*-*-*-*-*-*-*-* Users : -*-*-*-*-*-*-*-*-*-*
    const userPreview = 10
    const users: UserType[] = [
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "ADMIN"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
        {
            name: "Sina Saber",
            phone: "09915688029",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$sina*saber",
            role: "USER"
        },
    ]
    const [user10, setUsers10] = useState(getUsers(query.get("page") || ""))
    const [isShowUsers, setIsShowUsers] = useState(false)

    const [currentUser, setCurrentUser] = useState<UserType>({
        password: "",
        email: "",
        role: "USER",
        phone: "",
        name: ""
    })

    // -*-*-*-*-*-*-*-*-*-* Modal States : -*-*-*-*-*-*-*-*-*-*
    const [isShowRemove, setIsShowRemove] = useState(false)
    const [isShowBlock, setIsShowBlock] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsShowUsers(true)
        }, 500)
    }, []);

    useEffect(() => {
        setIsValidInputs(Boolean(!nameErrors && !phoneErrors && !emailErrors && !passwordErrors))
    }, [nameErrors, passwordErrors, phoneErrors, emailErrors])

    function getUsers(page: string): UserType[] {
        const currentPage = +page
        let from = 0
        let until = 0

        if (isNaN(currentPage) || !currentPage) {
            until = users.length < 10 ? users.length : 10
            return users.slice(0, until)
        }

        from = (currentPage - 1) * userPreview
        until = (from + 10) < users.length ? (from + 10) : users.length

        return users.slice(from, until)
    }

    function getDefaultSort(): UserSortProps {
        const sort = query.get("sort")

        if (!sort) {
            return "Default"
        }

        if (!userSortValues.find(item => item === sort)) {
            return "Default"
        }

        return sort as UserSortProps
    }

    function getDefaultFilter(): UserFilterProps {
        const filter = query.get("filter")

        if (!filter) {
            return "Default"
        }

        if (!userFilterValue.includes(filter as UserFilterProps)) {
            return "Default"
        }

        return filter as UserFilterProps
    }

    const search = () => {
        const filter = currentUserFilter || "Default"
        const sort = userSortCurrent || "Default"
        const page = query.get("page") || "1"
        setQuery({search: inputSearch, filter, sort, page})
    }

    const getPhone = (phone: string): string => {
        return `${phone.slice(0, 4)} ${phone.slice(4, 8)} ${phone.slice(8, phone.length)}`
    }

    const setUserPage = (page: number) => {
        setQuery(prev => {
            prev.set("page", page.toString())
            return prev
        })
        setIsShowUsers(false)
        setTimeout(() => {
            setIsShowUsers(true)
        }, 250)
        setUsers10(getUsers(page.toString()))
    }

    const block = () => {

    }

    const edit = async (newUser: UserType) => {

    }

    const remove = () => {

    }

    const showModal = (event: React.MouseEvent<SVGElement>, setState: Dispatch<SetStateAction<boolean>>) => {
        event.stopPropagation()
        setState(true)
    }

    return (
        <>
            <AgreeModal yesText="Block User" noText="No" question="Are you sure you want to block this user ?"
                        show={isShowBlock} agreeFunction={block} setShow={setIsShowBlock}/>
            <AgreeModal yesText="Remove User" noText="No" question="Are you sure you want to remove this user ?"
                        show={isShowRemove} agreeFunction={remove} setShow={setIsShowRemove}/>
            <EditModal editType="USER" noButtonText="No" yesButtonText="Yes, Edit" item={currentUser}
                       show={isShowEditModal}
                       setShow={setIsShowEditModal} editFunc={edit}/>
            <div className="container pt-5 pb-[60px]">
                <SearchBar notifications={notifications} inputSearch={inputSearch} setInputSearch={setInputSearch}
                           search={search} query={query} setQuery={setQuery}/>

                <div
                    className="users px-3 py-5 bg-white dark:bg-zinc-700 rounded-md max-w-[1000px] mx-auto dark:text-white mb-5">
                    <h3 className="users-title text-shadow font-bold text-center text-2xl">Users Management</h3>

                    <div className="user-create-wrapper mx-auto">
                        <h5 className="user-create-title text-shadow font-bold text-xl py-4">Add User</h5>

                        <div
                            className="user-input-wrapper w-full md:w-fit mx-auto flex flex-col gap-6 md:grid grid-cols-[300px_300px] lg:grid-cols-[400px_400px] justify-items-center items-start">
                            <div className="input-wrapper pt-1.5 overflow-hidden w-full">
                                <Input setErrorsCount={setNameErrors} isFullWidth={true} type='text'
                                       placeholder="Enter user name" value={userName}
                                       setValue={setUserName}/>
                            </div>
                            <div className="input-wrapper pt-1.5 overflow-hidden w-full">
                                <Input setErrorsCount={setNameErrors} isFullWidth={true} type='email'
                                       placeholder="Enter user email" value={userEmail}
                                       setValue={setUserEmail}/>
                            </div>
                            <div className="input-wrapper pt-1.5 overflow-hidden w-full">
                                <Input setErrorsCount={setPhoneErrors} isFullWidth={true} type='phone'
                                       placeholder="Enter user phone" value={userPhone} setValue={setUserPhone}/>
                            </div>
                            <div className="input-wrapper pt-1.5 overflow-hidden w-full">
                                <Input setErrorsCount={setPasswordErrors} isFullWidth={true} type='password'
                                       placeholder="Enter user password"
                                       value={userPassword} setValue={setUserPassword}/>
                            </div>
                            <div className="col-span-2 mx-auto">
                                <SelectBox placeholder="Enter user role" items={userRoles} defaultItem={userRole}
                                           setDefaultItem={setUserRole}/>
                            </div>
                            <button
                                disabled={!isValidInputs}
                                className={`bg-orange-400 ${isValidInputs ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-50"} mx-auto text-white rounded-md col-span-2 w-[200px] h-[35px] flex items-center justify-center`}>Register
                                user
                            </button>
                        </div>
                    </div>

                    <div className="user-control mt-5">
                        <h3 className="user-control-title text-shadow font-bold text-xl py-4">Users management</h3>

                        <div
                            className="filter-sort-wrapper grid gap-x-4 gap-y-6 justify-items-center sm:justify-items-start grid-cols-[300px] sm:grid-cols-[250px_250px] justify-center items-center">
                            <span className="flex font-bold items-center gap-4">
                                Sorting Users
                                <FaLongArrowAltRight className="w-7 h-7 rotate-90 sm:rotate-0"/>
                            </span>
                            <SelectBox items={userSortItems} defaultItem={userSortCurrent}
                                       setDefaultItem={setUserSortCurrent} placeholder="user sorting..."/>
                            <span className="flex font-bold items-center gap-4">
                                Filtering Users
                                <FaLongArrowAltRight className="w-7 h-7 rotate-90 sm:rotate-0"/>
                            </span>
                            <SelectBox items={userFilterItems} defaultItem={currentUserFilter}
                                       setDefaultItem={setCurrentUserFilter} placeholder="user filtering..."/>
                        </div>

                        <div className="users-wrapper flex flex-col gap-5 mt-5">
                            {
                                isShowUsers ?
                                    <>
                                        {
                                            user10.map((user, index) => (
                                                <div
                                                    key={index}
                                                    className="user-item max-w-[850px] mx-auto px-2 py-4 rounded-md border-solid border-black/20 dark:border-white/50 border-[1px] grid grid-cols-[90px_150px] from-400:grid-cols-[90px_230px] sm:grid-cols-[90px_420px] lg:grid-cols-[50px_100px_110px_200px_150px_53px_100px] items-center gap-3">
                                            <span
                                                className="user-content-key lg:hidden flex items-center gap-1 text-sm">
                                                Number
                                                <FaLongArrowAltRight className="w-5"/>
                                            </span>
                                                    <span
                                                        className="user-item__id bg-orange-500 text-sm font-semibold text-white rounded-full flex items-center justify-center w-[50px] h-[50px] justify-self-end">{index + 1}</span>
                                                    <span
                                                        className="user-content-key max-w-[150px] from-400:max-w-[250px] sm:max-w-[400px] lg:max-w-[110px] overflow-hidden text-ellipsis whitespace-nowrap lg:hidden flex items-center gap-1 text-sm">
                                                Name
                                                <FaLongArrowAltRight className="w-5"/>
                                            </span>
                                                    <span
                                                        className="user-item__id max-w-[150px] sm:max-w-[420px] lg:max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap justify-self-end">{user.name}</span>
                                                    <span
                                                        className="user-content-key lg:hidden flex items-center gap-1 text-sm">
                                                Phone
                                                <FaLongArrowAltRight className="w-5"/>
                                            </span>
                                                    <span
                                                        className="user-item__id max-w-[150px] from-400:max-w-[250px] sm:max-w-[400px] lg:max-w-[110px] overflow-hidden text-ellipsis whitespace-nowrap justify-self-end">{getPhone(user.phone)}</span>
                                                    <span
                                                        className="user-content-key lg:hidden flex items-center gap-1 text-sm">
                                                Email
                                                <FaLongArrowAltRight className="w-5"/>
                                            </span>
                                                    <span
                                                        className="user-item__id max-w-[150px] from-400:max-w-[250px] sm:max-w-[400px] lg:max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap justify-self-end">{user.email}</span>
                                                    <span
                                                        className="user-content-key lg:hidden flex items-center gap-1 text-sm">
                                    Password
                                    <FaLongArrowAltRight className="w-5"/>
                                </span>
                                                    <span
                                                        className="user-item__id max-w-[150px] sm:max-w-[400px] lg:max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap justify-self-end">{user.password}</span>
                                                    <span
                                                        className="user-content-key lg:hidden flex items-center gap-1 text-sm">
                                    Role
                                    <FaLongArrowAltRight className="w-5"/>
                                </span>
                                                    <span className="user-item__id justify-self-end">{user.role}</span>
                                                    <span
                                                        className="user-content-key lg:hidden flex items-center gap-1 text-sm">
                                    Operations
                                    <FaLongArrowAltRight className="w-5"/>
                                </span>
                                                    <div
                                                        className="user-item__operation flex gap-2 items-center justify-center justify-self-end">
                                                        <ImBlocked
                                                            onClick={event => showModal(event, setIsShowBlock)}
                                                            className="user-btn w-5 h-5 hover:text-red-600 cursor-pointer transition-all ease-in-out duration-150"/>
                                                        <FaEdit
                                                            onClick={event => {
                                                                event.stopPropagation()
                                                                setCurrentUser(user)
                                                                setIsShowEditModal(true)
                                                            }}
                                                            className="user-btn w-5 h-5 dark:text-white hover:text-green-700 cursor-pointer transition-all ease-in-out duration-150"/>
                                                        <FaTrash
                                                            onClick={event => showModal(event, setIsShowRemove)}
                                                            className="user-btn w-5 h-5 hover:text-red-600 cursor-pointer transition-all ease-in-out duration-150"/>
                                                    </div>
                                                </div>
                                            ))

                                        }

                                        <div
                                            className="users-pagination w-[240px] sm:w-full max-w-[300px] mx-auto">
                                            <SwiperWithButtons slides={
                                                Array.from({length: Math.ceil(users.length / userPreview)})
                                                    .map((user, index) => (
                                                        <button
                                                            onClick={() => setUserPage(index + 1)}
                                                            key={index}
                                                            className={`w-9 h-9 ${query.get("page") === (index + 1).toString() ? "bg-orange-700" : ""} shrink-0 text-sm font-bold bg-orange-500 text-white flex items-center justify-center hover:bg-orange-700 transition-all ease-in-out duration-150 cursor-pointer rounded-full`}>{index + 1}</button>
                                                    ))
                                            }/>
                                        </div>
                                    </>
                                    :
                                    Array.from({length: 5})
                                        .map((shimmer, i) => (
                                            <div
                                                key={i}
                                                className="user-item max-w-[850px] mx-auto px-2 py-4 rounded-md border-solid border-black/20 dark:border-white/50 border-[1px] grid grid-cols-[90px_150px] from-400:grid-cols-[90px_230px] sm:grid-cols-[90px_420px] lg:grid-cols-[50px_100px_110px_200px_150px_53px_100px] items-center gap-3">
                                                <span
                                                    className="w-8 h-2.5 block lg:hidden bg-shimmer dark:bg-dark-shimmer shimmer-animation"></span>
                                                <span
                                                    className="w-[50px] h-[50px] rounded-full bg-shimmer dark:bg-dark-shimmer shimmer-animation justify-self-end lg:justify-self-start"></span>
                                                <span
                                                    className="w-8 h-2.5 block lg:hidden bg-shimmer dark:bg-dark-shimmer shimmer-animation"></span>
                                                <span
                                                    className="w-[80px] h-[10px] rounded-sm bg-shimmer dark:bg-dark-shimmer shimmer-animation justify-self-end lg:justify-self-start"></span>
                                                <span
                                                    className="w-8 h-2.5 block lg:hidden bg-shimmer dark:bg-dark-shimmer shimmer-animation"></span>
                                                <span
                                                    className="w-[106px] h-[10px] rounded-sm bg-shimmer dark:bg-dark-shimmer shimmer-animation justify-self-end lg:justify-self-start"></span>
                                                <span
                                                    className="w-8 h-2.5 block lg:hidden bg-shimmer dark:bg-dark-shimmer shimmer-animation"></span>
                                                <span
                                                    className="w-[200px] h-[10px] rounded-sm bg-shimmer dark:bg-dark-shimmer shimmer-animation justify-self-end lg:justify-self-start"></span>
                                                <span
                                                    className="w-8 h-2.5 block lg:hidden bg-shimmer dark:bg-dark-shimmer shimmer-animation"></span>
                                                <span
                                                    className="w-[151px] h-[10px] rounded-sm bg-shimmer dark:bg-dark-shimmer shimmer-animation justify-self-end lg:justify-self-start"></span>
                                                <span
                                                    className="w-8 h-2.5 block lg:hidden bg-shimmer dark:bg-dark-shimmer shimmer-animation"></span>
                                                <span
                                                    className="w-[50px] h-[10px] rounded-sm bg-shimmer dark:bg-dark-shimmer shimmer-animation justify-self-end lg:justify-self-start"></span>
                                                <span
                                                    className="w-8 h-2.5 block lg:hidden bg-shimmer dark:bg-dark-shimmer shimmer-animation"></span>
                                                <span
                                                    className="w-[75px] h-[10px] justify-self-end rounded-md bg-shimmer dark:bg-dark-shimmer shimmer-animation "></span>
                                            </div>
                                        ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users