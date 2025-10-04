import {Dispatch, FC, ReactNode, SetStateAction, useCallback, useEffect, useReducer, useState} from "react";
import {IoTriangle} from "react-icons/io5";
import Input from "./Input";
import Input4Digit from "./Input4Digit";
import getClassByEmailTimer from "../helperFunctions/getClassByTimer";

type LevelShowType = {
    isShowLevelOne: boolean,
    isShowLevelTow: boolean,
    isShowLevelThree: boolean
}

type ActionLevelType = "LEVEL-ONE" | "LEVEL-TWO" | "LEVEL-THREE"

const setLevelType = (state: LevelShowType, action: ActionLevelType): LevelShowType => {
    switch (action) {
        case "LEVEL-ONE": {
            const newState: LevelShowType = {isShowLevelOne: true, isShowLevelTow: false, isShowLevelThree: false}
            localStorage.setItem("auth-level", JSON.stringify(newState))
            return newState
        }
        case "LEVEL-TWO": {
            const newState: LevelShowType = {isShowLevelOne: false, isShowLevelTow: true, isShowLevelThree: false}
            localStorage.setItem("auth-level", JSON.stringify(newState))
            return newState
        }
        case "LEVEL-THREE": {
            const newState: LevelShowType = {isShowLevelOne: false, isShowLevelTow: false, isShowLevelThree: true}
            localStorage.setItem("auth-level", JSON.stringify(newState))
            return newState
        }
        default: {
            return state
        }
    }
}

function getFromLocalStorage(): LevelShowType {
    const authLocal = localStorage.getItem("auth-level")
    const defaultAuth: LevelShowType = {isShowLevelOne: true, isShowLevelTow: false, isShowLevelThree: false}

    if (!authLocal) {
        localStorage.setItem("auth-level", JSON.stringify(defaultAuth))
        return defaultAuth
    }

    try {
        const authLocalParsed = JSON.parse(authLocal)
        if ("isShowLevelOne" in authLocalParsed &&
            "isShowLevelTow" in authLocalParsed &&
            "isShowLevelThree" in authLocalParsed) {
            return authLocalParsed
        }

        localStorage.setItem("auth-level", JSON.stringify(defaultAuth))
        return defaultAuth
    } catch (err) {
        localStorage.setItem("auth-level", JSON.stringify(defaultAuth))
        return defaultAuth
    }
}

type RegisterProps = {
    switchAuth: Dispatch<SetStateAction<boolean>>
}

const Register: FC<RegisterProps> = ({switchAuth}) => {
    const [levelType, dispatchLevelType] = useReducer(setLevelType, getFromLocalStorage())

    // Register Input Level One :
    const [inputName, setInputName] = useState<string>("")
    const [inputPhone, setInputPhone] = useState<string>("")
    const [inputPassword, setInputPassword] = useState<string>("")
    const [inputEmail, setInputEmail] = useState<string>("")

    // Register Errors Level One :
    let [nameErrorsCount, setNameErrorsCount] = useState<number>(0)
    let [emailErrorsCount, setEmailErrorsCount] = useState<number>(0)
    let [passwordErrorsCount, setPasswordErrorsCount] = useState<number>(0)
    let [phoneErrorsCount, setPhoneErrorsCount] = useState<number>(0)

    // Input 4Digit Email validation :
    const [codeEmail, setCodeEmail] = useState<number>(0)
    const [emailTimer, setEmailTimer] = useState<number>(120)
    const [errorCodeEmailCount, setErrorCodeEmailCount] = useState<number>(0)

    // Input 4Digit Phone validation :
    const [codePhone, setCodePhone] = useState<number>(0)
    const [phoneTimer, setPhoneTimer] = useState<number>(120)
    const [errorCodePhoneCount, setErrorCodePhoneCount] = useState<number>(0)

    const isInValidRegister = (): boolean => {
        return Boolean(nameErrorsCount || emailErrorsCount || passwordErrorsCount || phoneErrorsCount)
    }

    const checkCodeEmail = useCallback(() => {
        if (codeEmail.toString() === "7777") {
            dispatchLevelType("LEVEL-THREE")
        } else {
            setErrorCodeEmailCount(prev => prev + 1)
        }
    }, [codeEmail])

    const checkCodePhone = useCallback(()=> {
        if (codePhone.toString() === "7777") {

        } else {
            setErrorCodePhoneCount(prev => prev + 1)
        }
    }, [codePhone])

    const getElementByAuthType = (authType: LevelShowType): ReactNode => {
        switch (true) {
            case authType.isShowLevelOne: {
                return <>
                    <Input setErrorsCount={setNameErrorsCount} value={inputName} setValue={setInputName} type="text"
                           placeholder="Enter your name"/>
                    <Input setErrorsCount={setEmailErrorsCount} value={inputEmail} setValue={setInputEmail} type="email"
                           placeholder="Enter your email"/>
                    <Input setErrorsCount={setPhoneErrorsCount} value={inputPhone} setValue={setInputPhone} type="phone"
                           placeholder="Enter your phone"/>
                    <Input setErrorsCount={setPasswordErrorsCount} value={inputPassword} setValue={setInputPassword}
                           type="password"
                           placeholder="Enter your password"/>
                    <button
                        disabled={isInValidRegister()}
                        onClick={() => dispatchLevelType("LEVEL-TWO")}
                        className={`${isInValidRegister() ? "opacity-60 cursor-not-allowed" : "opacity-100 cursor-pointer hover:bg-green-800"} bg-green-600 transition-all ease-in-out duration-200  text-white w-[400px] rounded-md h-8 font-bold flex items-center justify-center mx-auto`}>Send
                        data
                    </button>
                </>
            }
            case authType.isShowLevelTow: {
                return (
                    <>
                        <Input4Digit title="We sent code to your email" setInput={setCodeEmail}/>
                        <span
                            className={`timer-email ${getClassByEmailTimer(emailTimer)} text-center font-bold text-lg`}>
                            {
                                `${
                                    Math.floor(emailTimer / 60)
                                        .toString().padStart(2, "0")}:${(emailTimer % 60)
                                    .toString()
                                    .padStart(2, "0")
                                }`
                            }
                        </span>
                        <button
                            onClick={checkCodeEmail}
                            disabled={codeEmail.toString().length !== 4}
                            className={`bg-green-700 w-[90%] ${codeEmail.toString().length === 4 ? "cursor-pointer hover:bg-green-800 opacity-100" : "cursor-not-allowed opacity-60"} mx-auto rounded-md h-9  transition-all ease-in-out duration-200  text-white font-bold flex items-center justify-center`}>Check
                            code
                        </button>
                    </>
                )
            }
            case authType.isShowLevelThree: {
                return <>
                    <Input4Digit title="We sent code to your phone number" setInput={setCodePhone}/>
                    <span className={`timer-email ${getClassByEmailTimer(phoneTimer)} text-center font-bold text-lg`}>
                            {
                                `${
                                    Math.floor(phoneTimer / 60)
                                        .toString().padStart(2, "0")}:${(phoneTimer % 60)
                                    .toString()
                                    .padStart(2, "0")
                                }`
                            }
                        </span>
                    <button
                        onClick={checkCodePhone}
                        disabled={codePhone.toString().length !== 4}
                        className={`bg-green-700 w-[90%] ${codePhone.toString().length === 4 ? "cursor-pointer hover:bg-green-800 opacity-100" : "cursor-not-allowed opacity-60"} mx-auto rounded-md h-9  transition-all ease-in-out duration-200  text-white font-bold flex items-center justify-center`}>
                        Check code
                    </button>
                </>
            }
        }
    }

    useEffect(() => {
        if (errorCodeEmailCount >= 5) {
            dispatchLevelType("LEVEL-ONE")
            setErrorCodeEmailCount(0)
            setEmailTimer(120)
            setPhoneTimer(120)
        }
    }, [errorCodeEmailCount]);

    useEffect(() => {
        if (errorCodePhoneCount >= 5) {
            dispatchLevelType("LEVEL-ONE")
            setErrorCodePhoneCount(0)
            setPhoneTimer(120)
            setEmailTimer(120)
        }
    }, [errorCodePhoneCount]);

    useEffect(() => {
        if (!levelType.isShowLevelTow) return

        const intervalId = setInterval(() => {
            setEmailTimer(prev => {
                if (prev >= 1) {
                    return prev - 1
                }
                clearInterval(intervalId)
                dispatchLevelType("LEVEL-ONE")
                return 120
            })
        }, 1000)

        return () => clearInterval(intervalId)
    }, [levelType.isShowLevelTow])

    useEffect(() => {
        if (!levelType.isShowLevelThree) return

        const intervalId = setInterval(() => {
            setPhoneTimer(prev => {
                if (prev >= 1) {
                    return prev - 1
                }
                clearInterval(intervalId)
                dispatchLevelType("LEVEL-ONE")
                return 120
            })
        }, 1000)

        return () => clearInterval(intervalId)
    }, [levelType.isShowLevelThree])

    useEffect(() => {
        const enterHandler = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                switch (true) {
                    case levelType.isShowLevelOne: {
                        if (!nameErrorsCount &&
                            !emailErrorsCount &&
                            !passwordErrorsCount &&
                            !phoneErrorsCount) {
                            dispatchLevelType("LEVEL-TWO")
                        }
                        break
                    }
                    case levelType.isShowLevelTow: {
                        if (codeEmail.toString().length === 4) {
                            checkCodeEmail()
                        }
                        break
                    }
                    case levelType.isShowLevelThree: {
                        if (codePhone.toString().length === 4) {
                            checkCodePhone()
                        }
                        break
                    }
                }
            }
        }

        window.addEventListener("keyup", enterHandler)

        return () => window.removeEventListener("keyup", enterHandler)
    }, [nameErrorsCount, emailErrorsCount, phoneErrorsCount,
        passwordErrorsCount, checkCodePhone, checkCodeEmail,
        codePhone, codeEmail, levelType.isShowLevelThree, levelType.isShowLevelTow, levelType.isShowLevelOne
    ]);

    return (
        <>
            <div className="header p-5 flex items-center justify-center gap-10">
                <div
                    className="level after:absolute after:top-0 after:bottom-0 after:my-auto after:w-10 after:h-1 after:right-0 after:-mr-10 after:bg-black/20  group relative flex items-center justify-center gap-2">
                    <span
                        className={`number-level w-14 h-14 rounded-full flex items-center justify-center ${levelType.isShowLevelOne ? "bg-orange-500" : "bg-green-700"} text-white font-bold text-lg`}>1</span>
                    <div
                        className="tooltip-wrapper opacity-0 invisible pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 group-hover:visible transition-all ease-in-out duration-200 absolute flex flex-col justify-center items-center top-full mx-auto w-fit pt-7">
                        <IoTriangle className="text-green-800 w-6 h-6 -mt-[25px]"/>
                        <span
                            className="shadow-2xl z-20 bg-green-800 text-white p-2 rounded-md -mt-0.5 whitespace-nowrap">Getting Information Level</span>
                    </div>
                </div>
                <div
                    className="level after:absolute after:top-0 after:bottom-0 after:my-auto after:w-10 after:h-1 after:right-0 after:-mr-10 after:bg-black/20 group relative flex items-center justify-center gap-2">
                    <span
                        className={`number-level w-14 h-14 rounded-full flex items-center justify-center ${levelType.isShowLevelTow ? "bg-orange-500" : "bg-green-700"} text-white font-bold text-lg`}>2</span>
                    <div
                        className="tooltip-wrapper opacity-0 invisible pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 group-hover:visible transition-all ease-in-out duration-200 absolute flex flex-col justify-center items-center top-full mx-auto w-fit pt-7">
                        <IoTriangle className="text-green-800 w-6 h-6 -mt-[25px]"/>
                        <span
                            className="shadow-2xl z-20 bg-green-800 text-white p-2 rounded-md -mt-0.5 whitespace-nowrap">Email Validation Level</span>
                    </div>
                </div>
                <div className="level  group relative flex items-center justify-center gap-2">
                    <span
                        className={`number-level w-14 h-14 rounded-full flex items-center justify-center ${levelType.isShowLevelThree ? "bg-orange-500" : "bg-green-700"} text-white font-bold text-lg`}>3</span>
                    <div
                        className="tooltip-wrapper opacity-0 invisible pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 group-hover:visible transition-all ease-in-out duration-200 absolute flex flex-col justify-center items-center top-full mx-auto w-fit pt-7">
                        <IoTriangle className="text-green-800 w-6 h-6 -mt-[25px]"/>
                        <span
                            className="shadow-2xl z-20  bg-green-800 text-white p-2 rounded-md -mt-0.5 whitespace-nowrap">Phone Number Validation Level</span>
                    </div>
                </div>
            </div>

            <div className="form  bg-white rounded-md p-4 mx-auto w-[500px] flex flex-col gap-5">
                <div className="header-form flex justify-center gap-1 items-center ">
                    <img className="w-8 h-8 object-cover" src="/images/icon-dashboard.png" alt="Icon Web Page"/>
                    <h5 className='form-title font-bold text-xl text-shadow '>Register form</h5>
                </div>
                {
                    levelType.isShowLevelOne ?
                        <button
                            onClick={() => switchAuth(true)}
                            className="switch-auth font-bold text-shadow w-3/4 h-7 mx-auto rounded-md cursor-pointer bg-sky-500 text-white transition-all ease-in-out duration-200 hover:scale-105">
                            Dou you hava an account? then click to login !
                        </button>
                        : null
                }
                {
                    getElementByAuthType(levelType)
                }
            </div>
        </>
    )
}

export default Register