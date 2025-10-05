import {Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import phoneSchema from "../validations/phoneValidation";
import {ValidationError} from "yup"
import emailValidation from "../validations/emailValidation";
import passwordValidation from "../validations/passwordValidation";
import nameValidation from "../validations/textValidation"

type inputType = "text" | "password" | "phone" | "email"

interface InputProps {
    type: inputType,
    placeholder: string,
    value: string,
    setValue: (value: string) => void,
    setErrorsCount: Dispatch<SetStateAction<number>>
}

const Input: FC<InputProps> = ({type, placeholder, setValue, value, setErrorsCount}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const spanRef = useRef<HTMLSpanElement>(null)
    const [inputType, setInputType] = useState<inputType>(type)
    const [errors, setErrors] = useState<string[]>([])

    const focusInput = () => {
        const input = inputRef.current
        if (input) {
            input.focus()
            if (spanRef.current) {
                spanRef.current.classList.add("placeholder-top")
            }
        }
    }

    const inputBlur = () => {
        if (!value.length) {
            if (spanRef.current) {
                spanRef.current.classList.remove("placeholder-top")
            }
        }
    }

    const switchInputType = () => {
        setTimeout(() => {
            focusInput()
            const input = inputRef.current

            if (input) {
                input.setSelectionRange(input.value.length, input.value.length)
            }
        }, 0.1)

        if (inputType === "text") {
            setInputType("password")
        } else {
            setInputType("text")
        }
    }

    const checkInputValid = useCallback(async () => {
        switch (type) {
            case "text": {
                try {
                    await nameValidation.validate({name: value}, {abortEarly: false})
                    setErrors([])
                    setErrorsCount(0)
                } catch (err) {
                    if (err instanceof ValidationError) {
                        const errors: string[] = err.inner.map(err => err.message)
                        setErrors(errors)
                        setErrorsCount(errors.length)
                    }
                }
                break
            }
            case "phone": {
                try {
                    await phoneSchema.validate({phone: value}, {abortEarly: false})
                    setErrors([])
                    setErrorsCount(0)
                } catch (err) {
                    if (err instanceof ValidationError) {
                        const errors: string[] = err.inner.map(err => err.message)
                        setErrors(errors)
                        setErrorsCount(errors.length)
                    }
                }
                break
            }
            case "email": {
                try {
                    await emailValidation.validate({email: value}, {abortEarly: false})
                    setErrors([])
                    setErrorsCount(0)
                } catch (err) {
                    if (err instanceof ValidationError) {
                        const errors: string[] = err.inner.map(err => err.message)
                        setErrors(errors)
                        setErrorsCount(errors.length)
                    }
                }
                break
            }
            case "password": {
                try {
                    await passwordValidation.validate({password: value}, {abortEarly: false})
                    setErrors([])
                    setErrorsCount(0)
                } catch (err) {
                    if (err instanceof ValidationError) {
                        const errors: string[] = err.inner.map(err => err.message)
                        setErrors(errors)
                        setErrorsCount(errors.length)
                    }
                }
                break
            }
        }
    },[setErrorsCount, type,value])

    useEffect(() => {
        if (value.length) {
            spanRef.current?.classList.add("placeholder-top")
        } else {
            spanRef.current?.classList.remove("placeholder-top")
        }

        checkInputValid().then()
    }, [value, checkInputValid]);

    return (
        <div>
            <div onClick={focusInput}
                 className="input-wrapper dark:text-white border-solid text-sm xs:text-base w-full xs:w-[400px] relative mx-auto">
                <span ref={spanRef} onClick={focusInput}
                  className="absolute transition-all ease-in-out duration-200 pb-1 top-0 bottom-0 px-3  dark:text-white text-black/50 my-auto leading-8 xs:leading-9">{placeholder}</span>
                <input value={value} onChange={e => setValue(e.target.value)} onBlur={inputBlur} ref={inputRef}
                       type={(type === "password" || type === "text" || type === "email") ? inputType : "text"}
                       className={`w-full outline-none p-2 pt-2 h-8 xs:h-9 bg-white ${value.length ? "h-12 xs:h-12 pb-[2px] pt-2 xs:pt-4" : ""} focus:h-12 ${type === "password" ? "pr-10" : ""} xs:focus:pt-4 focus:pb-[2px] font-roboto bg-white dark:bg-zinc-700 border-solid border-2 transition-all ease-in-out duration-200 ${errors.length ? "border-red-700" : "border-black/20 dark:border-white dark:focus:border-white focus:border-black/60"}  rounded-md`}/>
                {
                    type === "password" ? <>
                        {
                            inputType === "password" ?
                                <FaEye onClick={switchInputType}
                                       className="w-4 h-4 cursor-pointer hover:scale-150 transition-all ease-in-out duration-150 absolute top-0 bottom-0 my-auto right-3"/>
                                : <FaEyeSlash onClick={switchInputType}
                                              className="w-4 h-4 cursor-pointer hover:scale-150 transition-all ease-in-out duration-150 absolute top-0 bottom-0 my-auto right-3"/>
                        }
                    </> : null
                }
            </div>
            {
                errors.length ?
                    <span
                        className="font-bold w-full xs:w-[400px] mt-1 mx-auto text-sm xs:text-base text-red-600 dark:text-orange-400 line-clamp-2 overflow-hidden text-ellipsis">{errors[0]}</span>
                    : null
            }
        </div>
    )
}

export default Input