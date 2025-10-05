import React, {
    Dispatch,
    FC,
    SetStateAction, useEffect,
    useReducer,
    useRef,
} from "react";

interface Input4DigitProps {
    title: string,
    setInput: Dispatch<SetStateAction<number>>
}

type codes = {
    code1: string,
    code2: string,
    code3: string,
    code4: string,
}

type codeAction = {
    onCode: "code1" | "code2" | "code3" | "code4",
    newValue: string
}

const Input4Digit: FC<Input4DigitProps> = ({setInput, title}) => {
    const [code, dispatchCode] = useReducer(setCode, {code1: "", code2: "", code3: "", code4: ""})

    // inputRefs :
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ]

    function setCode(state: codes, action: codeAction): codes {
        const newCode = action.newValue.slice(-1)

        if (isNaN(+newCode)) {
            return state
        }

        switch (action.onCode) {
            case "code1": {
                return {...state, code1: newCode}
            }
            case "code2": {
                return {...state, code2: newCode}
            }
            case "code3": {
                return {...state, code3: newCode}
            }
            case "code4": {
                return {...state, code4: newCode}
            }
        }
    }

    useEffect(() => {
        const newCode = code.code1 + code.code2 + code.code3 + code.code4
        setInput(+newCode)
    }, [code, setInput]);

    const changeInputsFocus = (event: React.KeyboardEvent<HTMLInputElement>, index: number, currentValue: string) => {

        switch (event.key) {
            case "Backspace": {
                if (index > 0 && !currentValue.length) {
                    event.preventDefault()
                    inputRefs[index - 1].current?.focus()
                }
                break
            }
            case "ArrowLeft": {
                if (index > 0) {
                    const input = inputRefs[index - 1].current
                    input?.focus()
                    input?.setSelectionRange(input.value.length, input.value.length);
                    event.preventDefault()
                }
                break
            }
            case "ArrowRight": {
                if (index < 3) {
                    inputRefs[index + 1].current?.focus()
                }
                break
            }
            default: {
                if (currentValue.length) {
                    if (index < 3) {
                        inputRefs[index + 1].current?.focus()
                    }
                }
            }
        }
    }

    return (
        <>
            <h6 className="text-lg mb-4 font-bold text-center text-green-700">{title} 👌</h6>
            <div className="inputs flex items-center justify-center gap-3 dark:text-white">
                <input
                    ref={inputRefs[0]}
                    onKeyDown={e => changeInputsFocus(e, 0, code.code1)}
                    value={code.code1} onChange={e => dispatchCode({newValue: e.target.value, onCode: "code1"})}
                    className="w-10 h-10 border-solid border-[1px] rounded-md border-black/50 dark:border-white text-center focus:outline-none font-bold text-xl"
                    type="text"/>
                <input
                    ref={inputRefs[1]}
                    onKeyDown={e => changeInputsFocus(e, 1, code.code2)}
                    value={code.code2} onChange={e => dispatchCode({newValue: e.target.value, onCode: "code2"})}
                    className="w-10 h-10 border-solid border-[1px] rounded-md border-black/50 dark:border-white text-center focus:outline-none font-bold text-xl"
                    type="text"/>
                <input
                    ref={inputRefs[2]}
                    onKeyDown={e => changeInputsFocus(e, 2, code.code3)}
                    value={code.code3} onChange={e => dispatchCode({newValue: e.target.value, onCode: "code3"})}
                    className="w-10 h-10 border-solid border-[1px] rounded-md border-black/50 dark:border-white text-center focus:outline-none font-bold text-xl"
                    type="text"/>
                <input
                    ref={inputRefs[3]}
                    onKeyDown={e => changeInputsFocus(e, 3, code.code4)}
                    value={code.code4} onChange={e => dispatchCode({newValue: e.target.value, onCode: "code4"})}
                    className="w-10 h-10 border-solid border-[1px] rounded-md border-black/50 dark:border-white text-center focus:outline-none font-bold text-xl"
                    type="text"/>
            </div>
        </>
    )
}

export default Input4Digit