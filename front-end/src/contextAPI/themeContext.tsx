import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useEffect, useState} from "react";

type themeType = "Dark" | "Light"

type ThemeContextProps = {
    theme: themeType,
    setTheme: Dispatch<SetStateAction<themeType>>
}


const ThemeContext = createContext<ThemeContextProps>(
    {
        theme: "Light",
        setTheme: () => {
        }
    }
)

const ThemeContextProvider: FC<PropsWithChildren> = ({children}) => {
    const htmlElement: HTMLElement = document.querySelector("html") as HTMLElement
    const [theme, setTheme] = useState<themeType>(getThemeFromLocal())

    function getThemeFromLocal(): themeType {
        const theme = localStorage.getItem("theme")

        if (!theme) {
            localStorage.setItem("theme", "Light")
            return "Light"
        }

        if (theme === "Light" || theme === "Dark") {
            return theme
        }

        localStorage.setItem("theme", "Light")
        return "Light"
    }

    useEffect(() => {
        localStorage.setItem("theme", theme)
        if (theme === "Dark") {
            htmlElement.className = "dark"
        } else {
            htmlElement.className = ""
        }
    }, [theme, htmlElement]);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
export {ThemeContextProvider, ThemeContext}