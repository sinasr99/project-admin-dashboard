import React, {
    Dispatch, FC, SetStateAction, useCallback, useEffect, useReducer, useState
} from "react";
import Input from "./Input";
import Input4Digit from "./Input4Digit";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

type LoginProps = {
    switchAuth: Dispatch<SetStateAction<boolean>>
}

type loginTypeProps = {
    otp: boolean,
    login: boolean
}

type actionLoginTypeProps = {
    switchTo: "OTP" | "LOGIN"
}

type otpLevelType = {getPhone: boolean, checkCode: boolean}

const Login: FC<LoginProps> = ({switchAuth}) => {
    const navigate = useNavigate()

    const [loginType, dispatchLoginType] = useReducer(setLoginType, getDefaultLoginType())

    // Login Inputs :
    const [inputEmail, setInputEmail] = useState<string>("")
    const [inputPassword, setInputPassword] = useState<string>("")

    // Login Inputs Errors :
    const [emailErrorsCount, setEmailErrorsCount] = useState<number>(0)
    const [passwordErrorsCount, setPasswordErrorsCount] = useState<number>(0)

    // OTP Levels :
    const [otpLevels, setOtpLevels] = useState<otpLevelType>(getOtpLevelFromLocal())

    // OTP Inputs :
    const [inputPhone, setInputPhone] = useState<string>("")
    const [inputCode, setInputCode] = useState<number>(0)

    // OTP Code Timer :
    const [phoneTimer, serPhoneTimer] = useState<number>(getPhoneTimerFromCookie())

    // OTP Errors :
    const [phoneErrorsCount, setPhoneErrorsCount] = useState<number>(0)

    function changeDefaultLoginType(newValue: loginTypeProps) {
        localStorage.setItem("login-type", JSON.stringify(newValue))
    }

    function getPhoneTimerFromCookie(): number {
        const phoneTimer = Cookies.get("code-timer")
        const phoneTimerNumber = phoneTimer ? +phoneTimer : 0
        const now = Date.now()

        if (phoneTimer && !isNaN(phoneTimerNumber)) {

            const currentSecond =Math.floor( (now - phoneTimerNumber) / 1000)
            const timer = 120 - currentSecond
            return timer >= 1 ? timer : 120
        }

        saveCookieTimer("code-timer")
        return 120
    }

    function saveCookieTimer(key: string) {
        const now = Date.now()
        const expireDate = new Date(now + (120 * 1000))
        Cookies.set(key, `${now}`, {path: "/", expires: expireDate})
    }

    function getDefaultLoginType(): loginTypeProps {
        const defaultValue: loginTypeProps = {login: true, otp: false}
        const key = "login-type"
        const loginTypeLocal = localStorage.getItem(key)

        if (!loginTypeLocal) {
            localStorage.setItem(key, JSON.stringify(defaultValue))
            return defaultValue
        }

        try {
            const loginTypeLocalParsed = JSON.parse(loginTypeLocal)

            if ("login" in loginTypeLocalParsed && "otp" in loginTypeLocalParsed) {
                return loginTypeLocalParsed
            }

            localStorage.setItem(key, JSON.stringify(defaultValue))
            return defaultValue
        } catch (err) {
            localStorage.setItem(key, JSON.stringify(defaultValue))
            return defaultValue
        }
    }

    function setLoginType(state: loginTypeProps, action: actionLoginTypeProps): loginTypeProps {
        console.log("dispatch login type run")
        switch (action.switchTo) {
            case "LOGIN": {
                const newValue: loginTypeProps = {login: true, otp: false}
                changeDefaultLoginType(newValue)
                return newValue
            }
            case "OTP": {
                const newValue: loginTypeProps = {login: false, otp: true}
                changeDefaultLoginType(newValue)
                return newValue
            }
            default: {
                return state
            }
        }
    }

    const switchLoginType = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.currentTarget.blur()
        if (loginType.otp) {
            dispatchLoginType({switchTo: "LOGIN"})
        } else {
            dispatchLoginType({switchTo: "OTP"})
        }
    }, [loginType])

    const sendCode = () => {
        setOtpLevels({getPhone: false, checkCode: true})
    }

    function getOtpLevelFromLocal (): otpLevelType {
        const defaultOtpLevel: otpLevelType = {getPhone: true, checkCode: false}
        const key = "otp-level"
        const otpLevel = localStorage.getItem(key)

        try {

            if (!otpLevel) {
                localStorage.setItem(key, JSON.stringify(defaultOtpLevel))
                return defaultOtpLevel
            }

            const otpLevelParsed: otpLevelType = JSON.parse(otpLevel)

            if ("checkCode" in otpLevelParsed && "getPhone" in otpLevelParsed) {
                return otpLevelParsed
            }

            localStorage.setItem(key, JSON.stringify(defaultOtpLevel))
            return defaultOtpLevel
        } catch (err) {
            localStorage.setItem(key, JSON.stringify(defaultOtpLevel))
            return defaultOtpLevel
        }
    }

    useEffect(() => {
        localStorage.setItem("otp-level", JSON.stringify(otpLevels))
    }, [otpLevels]);

    const checkCode = useCallback(() => {
        if (inputCode.toString() === "7777") {
            navigate("/dashboard")
        } else {
            alert("code is incorrect")
            setOtpLevels({getPhone: true, checkCode: false})
        }

        serPhoneTimer(120)
    }, [inputCode, navigate])

    useEffect(() => {
        if (otpLevels.getPhone) {
            Cookies.remove("code-timer")
        }
    }, [otpLevels.getPhone])

    const login = useCallback(() => {
        if (inputEmail === "sina123@gmail.com" && inputPassword === "Ss1383@#$") {
            navigate("/dashboard")
        } else {
            alert("Email or password is incorrect")
            setInputEmail("")
            setInputPassword("")
        }
    }, [inputEmail, inputPassword, navigate])

    // Phone Code Timer :
    useEffect(() => {
        if (!otpLevels.checkCode) return

        const intervalId = setInterval(() => {
            serPhoneTimer(prev => {
                if (prev >= 1) {
                    return prev - 1
                }

                clearInterval(intervalId)
                setOtpLevels({getPhone: true, checkCode: false})
                return 120
            })
        }, 1000)

        return () => clearInterval(intervalId)
    }, [otpLevels.checkCode]);

    const switchAuthentication = async () => {
        await new Promise((resolve) => {
            setOtpLevels({getPhone: true, checkCode: false})
            resolve(true)
        })
        switchAuth(false)
    }

    useEffect(() => {
        const enterHandler = (event: KeyboardEvent) => {
            if (event.key !== "Enter") return

            if (loginType.login) {
                if (!emailErrorsCount && !passwordErrorsCount) {
                    login()
                }
                return;
            }

            if (loginType.otp) {

                switch (true) {
                    case otpLevels.getPhone: {
                        if (!phoneErrorsCount) {
                            sendCode()
                        }

                        break
                    }
                    case otpLevels.checkCode: {
                        if (inputCode.toString().length === 4) {
                            checkCode()
                        }

                        break
                    }
                }

            }
        }

        window.addEventListener("keyup", enterHandler)

        return () => window.removeEventListener("keyup", enterHandler)
    }, [loginType, checkCode, emailErrorsCount, inputCode, login, otpLevels, passwordErrorsCount, phoneErrorsCount]);

    const getClassByEmailTimer = (timer: number): string => {
        switch (true) {
            case timer > 60 :
                return "text-green-500"
            case timer > 30 :
                return "text-yellow-500"
            default:
                return "text-red-500"
        }
    }

    return (
        <div className="login-root h-full flex items-center justify-center">
            <div className="form bg-white dark:bg-zinc-700 rounded-md p-4 mx-auto w-full sm:w-[500px] flex flex-col gap-5">
                <div className="header-form flex justify-center gap-1 items-center ">
                    <img className="w-8 h-8 object-cover" src="/images/icon-dashboard.png" alt="Icon Web Page"/>
                    <h5 className='form-title font-bold text-xl text-shadow dark:text-white'>Login form</h5>
                </div>
                <button
                    onClick={switchAuthentication}
                    className='switch-login bg-sky-700 text-white cursor-pointer transition-all ease-in-out duration-200 hover:scale-105 rounded-md mx-auto w-full xs:w-1/2 h-6 text-sm font-extrabold'>Switch
                    to Register Form
                </button>
                <button
                    onClick={switchLoginType}
                    className="switch-login bg-sky-600 text-white cursor-pointer transition-all ease-in-out duration-200 hover:scale-105 rounded-md mx-auto w-full xs:w-1/2 h-6 text-sm font-extrabold">
                    {
                        loginType.login ? "switch to OTP Login" : "switch to Email Login"
                    }
                </button>

                {
                    loginType.login ?
                        <div className="form-wrapper flex flex-col gap-9 pt-4">
                            <Input type="email" placeholder="Enter your email" value={inputEmail}
                                   setValue={setInputEmail} setErrorsCount={setEmailErrorsCount}/>
                            <Input type="password" placeholder="Enter your password" value={inputPassword}
                                   setValue={setInputPassword} setErrorsCount={setPasswordErrorsCount}/>
                            <button
                                disabled={Boolean(emailErrorsCount || passwordErrorsCount)}
                                onClick={login}
                                className={`${Boolean(emailErrorsCount || passwordErrorsCount) ? "opacity-60 cursor-not-allowed" : "opacity-100 hover:bg-green-800 cursor-pointer"} bg-green-600 text-white h-9 rounded-md w-full xs:w-[400px]
                transition-all ease-in-out duration-150 flex mx-auto items-center justify-center`}>Login
                            </button>
                        </div> :
                        <div className="form-wrapper">
                            <p className="otp-level-label text-orange-600 font-bold text-shadow my-4 text-center">
                                {otpLevels.getPhone ? "Send Code Level 📞" : "Check Code Level 🔑"}
                            </p>

                            {
                                otpLevels.getPhone ?
                                    <>
                                        <Input type="phone" placeholder="Enter your phone" value={inputPhone}
                                               setValue={setInputPhone}
                                               setErrorsCount={setPhoneErrorsCount}/>
                                        <button
                                            disabled={Boolean(phoneErrorsCount)}
                                            onClick={sendCode}
                                            className={`mt-3 ${phoneErrorsCount ? "cursor-not-allowed opacity-60" : "hover:bg-green-800 opacity-100 cursor-pointer"} mx-auto bg-green-600 text-white h-9 rounded-md w-full xs:w-[400px]
                                    transition-all ease-in-out duration-150 flex items-center justify-center `}>Send
                                            Code
                                        </button>
                                    </>
                                    :
                                    <>
                                        <Input4Digit title="We sent code to your phone" setInput={setInputCode}/>
                                        <span
                                            className={`timer-email ${getClassByEmailTimer(phoneTimer)} mx-auto block my-1 text-center font-bold text-lg`}>
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
                                            disabled={Boolean(inputCode.toString().length !== 4)}
                                            onClick={checkCode}
                                            className={`mt-3 ${Boolean(inputCode.toString().length !== 4) ? "cursor-not-allowed opacity-60" : "hover:bg-green-800 opacity-100 cursor-pointer"} mx-auto bg-green-600 text-white h-9 rounded-md w-full xs:w-[400px]
                                    transition-all ease-in-out duration-150 flex items-center justify-center `}>Check
                                            Code
                                        </button>
                                    </>
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default Login