import React, {Dispatch, FC, SetStateAction, useRef} from "react";
import {FaMinus, FaPlus} from "react-icons/fa";

type InputFileProps = {
    enterPlaceholder: string,
    removePlaceholder: string,
    file: File | null,
    setFile: Dispatch<SetStateAction<null | File>>,
    fileType: "image" | "video" | "doc"
}

const InputFile: FC<InputFileProps> = ({fileType, setFile, file, removePlaceholder, enterPlaceholder}) => {
    const inputFileRef = useRef<HTMLInputElement>(null)

    const showFileInput = () => {
        if (!inputFileRef.current) return
        inputFileRef.current.click()
    }

    const removeFile = (event: React.MouseEvent<SVGElement>) => {
        event.stopPropagation()
        setFile(null)
    }

    const changeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.length ? event.target.files[0] : null

        if (!file) return

        switch (fileType) {
            case "image": {
                const length = file.name.split(".").length
                const fileExtension = file.name.split(".")[length - 1]

                if (fileExtension === "png" || fileExtension === "jpeg" || fileExtension === "jpg" || fileExtension === "webp")
                    setFile(file)


                break
            }
            case "doc": {
                break
            }
            case "video": {
                break
            }
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <input accept="image/*" onChange={changeFile} ref={inputFileRef} type="file" className='hidden'/>
            <div
                onClick={showFileInput}
                className={`input-wrapper ${file ? "bg-green-700" : ""} relative cursor-pointer dark:hover:bg-gray-400 hover:bg-gray-200 transition-all ease-in-out duration-150 dark:border-white/50 rounded-md flex items-center justify-center h-10 border-dashed border-black/20 border-[3px]`}>
                {
                    file
                        ?
                        <>
                            <FaMinus
                                onClick={removeFile}
                                className={`absolute transition-all ease-in-out duration-150 hover:text-red-700 top-0 bottom-0 right-1 m-auto`}/>
                            <span
                                className="font-bold text-sm text-black/50 dark:text-white/70">{removePlaceholder}</span>
                        </>
                        :
                        <>
                            <FaPlus className="absolute top-0 bottom-0 right-1 m-auto"/>
                            <span
                                className="font-bold text-sm text-black/50 dark:text-white/70">{enterPlaceholder}</span>
                        </>
                }
            </div>
            {
                file
                    ? <span className="text-green-700 font-bold">File added successfully</span>
                    : null
            }
        </div>
    )
}

export default InputFile