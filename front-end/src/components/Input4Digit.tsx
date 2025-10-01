import {Dispatch, FC, SetStateAction, useReducer, useState} from "react";

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
    onCode: "number1" | "number2" | "number3" | "number4"
}

const Input4Digit: FC<Input4DigitProps> = ({setInput, title}) => {
    const [code, dispatchCode] = useReducer(setCode, {code1: "", code2: "", code3: "", code4: ""})

    function setCode(state: codes, action: codeAction): codes {
        switch (action.onCode) {
            case "number1": {
                return {}
            }
        }
    }

    return (
        <div className="inputs flex items-center justify-center gap-3">
            <input
                className="w-10 h-10 border-solid border-[1px] rounded-md border-black/50 text-center focus:outline-none font-bold text-xl"
                type="number"/>
            <input
                className="w-10 h-10 border-solid border-[1px] rounded-md border-black/50 text-center focus:outline-none font-bold text-xl"
                type="number"/>
            <input
                className="w-10 h-10 border-solid border-[1px] rounded-md border-black/50 text-center focus:outline-none font-bold text-xl"
                type="number"/>
            <input
                className="w-10 h-10 border-solid border-[1px] rounded-md border-black/50 text-center focus:outline-none font-bold text-xl"
                type="number"/>
        </div>
    )
}

export default Input4Digit