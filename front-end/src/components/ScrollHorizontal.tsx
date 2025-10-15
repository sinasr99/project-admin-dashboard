import React, {FC, ReactNode, useRef, useState} from "react";

type ScrollHorizontalProps = {
    children: ReactNode
}

const ScrollHorizontal: FC<ScrollHorizontalProps> = ({children}) => {
    const [isMouseDown, setIsMouseDown] = useState(false)
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const scrollHandler = (event: React.MouseEvent): void => {
        if (isMouseDown) return


    }

    const isMouseDownToOff = () => {
       setIsMouseDown(false)
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsMouseDown(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isMouseDown || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft
        const walk = x - startX
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseUp={isMouseDownToOff}
            onMouseLeave={isMouseDownToOff}
            onMouseMove={handleMouseMove}
            className={`scroll-wrapper select-none ${isMouseDown ? "hover:cursor-grabbing" : "hover:cursor-grab"} delay-100 overflow-hidden hover:overflow-x-auto custom-scroll-horizontal pb-1.5`}>
            {children}
        </div>
    )
}

export default ScrollHorizontal